import { randomUUID } from 'crypto'
import { PDFDocument } from 'pdf-lib'
import { CreateFileResponse } from './interfaces'

export const createFile = async (): Promise<CreateFileResponse> => {
    const filename = `${randomUUID()}.pdf`
    
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage()
    page.drawText('Eletronic invoice')

    const bytes = await pdfDoc.save()
    const buff = Buffer.from(bytes)
    
    return { content: buff, name: filename } 
}
