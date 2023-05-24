import { createFile } from './create-file'
import { saveObject } from './save-object'
import { sendEmail } from './send-email'

export const handler = async (event: any) => {
    const createFileResponse = await createFile()
    await saveObject(createFileResponse)
    await sendEmail({ email: event.recipient.email }, createFileResponse)
}