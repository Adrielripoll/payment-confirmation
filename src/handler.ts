import { S3, SES } from 'aws-sdk'
import { PutObjectRequest, PutObjectAclOutput } from 'aws-sdk/clients/s3'
import { SendRawEmailRequest } from 'aws-sdk/clients/ses'
import { randomUUID } from 'crypto'
import { PDFDocument } from 'pdf-lib'

interface Recipient {
    email: string
}

const sendEmail = (recipient: Recipient, object: PutObjectAclOutput) => {
    const ses = new SES({
        region: process.env.AWS_REGION,
        apiVersion: ''
    })
    
    const emailParams: SendRawEmailRequest = {
        Source: process.env.SOURCE,
        Destinations: [recipient.email],
        RawMessage: { Data: {} }
    }

    ses.sendRawEmail(emailParams).promise()
}

const saveObject = async () => {
    const filename = `${randomUUID()}.pdf`
    const filecontent = await createFile()

    const s3 = new S3({
        region: process.env.AWS_REGION,
        apiVersion: '2006-03-01', 
    })

    const params: PutObjectRequest = {
        Bucket: process.env.BUCKET,
        Key: filename,
        Body: filecontent
    }
    
    const object = await s3.putObject(params).promise()
    console.log(object)
    return object
}

const createFile = async (): Promise<Uint8Array> => {
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage()
    page.drawText('nf-e')
    const bytes = await pdfDoc.save()
    return bytes
}

export const handler = async (event) => {
    await saveObject()
}
