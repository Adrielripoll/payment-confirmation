import { S3, PutObjectCommandInput } from '@aws-sdk/client-s3'
import { CreateFileResponse } from './interfaces'

const s3 = new S3({
    region: process.env.AWS_REGION,
    apiVersion: '2006-03-01',
})

export const saveObject = async (file: CreateFileResponse) => {
    const params: PutObjectCommandInput = {
        Bucket: process.env.BUCKET,
        Key: file.name,
        Body: file.content
    }
    
    try {
        await s3.putObject(params)
    } catch(error: any){ 
        throw new Error(error)
    }
}