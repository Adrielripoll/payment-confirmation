import * as aws from '@aws-sdk/client-ses'
import { SES } from '@aws-sdk/client-ses'
import { createTransport } from 'nodemailer'
import { CreateFileResponse, Recipient } from './interfaces'

const ses = new SES({
    region: process.env.AWS_REGION,
    apiVersion: '2010-12-01',
})

export const sendEmail = async (recipient: Recipient, file: CreateFileResponse) => {
    
    const transporter = createTransport({ SES: { ses, aws } })

    const mailOptions = {
        from: process.env.SOURCE,
        to: recipient.email,
        subject: "Payment confirmation",
        text: "Payment confirmed",
        attachments: [
            { filename: file.name, content: file.content, contentType: 'application/pdf' }
        ]
    }

    try {
        await transporter.sendMail(mailOptions)
    } catch (error: any) {
        throw new Error(error)
    }
}