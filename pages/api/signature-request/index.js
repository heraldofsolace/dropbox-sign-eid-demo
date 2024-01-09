import { SignatureRequestApi } from "@dropbox/sign";
import formidable from 'formidable';
import fs from 'fs';

export const config = {
    api: {
        bodyParser: false,
    },
}

export default async function handler(request, response) {
    if(request.method !== 'POST') {
        return response.status(400).json({ success: false, message: 'Invalid request method' });
    }
    const form = formidable({ uploadDir: "./uploads", keepExtensions: true });
    
    let fields, files;

    try {
        // Parse the fields
        [fields, files] = await form.parse(request);
    } catch(error) {
        console.error(error);
        return response.status(400).json({ success: false, message: error })
    }
    const { title, subject, message, signer, name } = fields;

    // Return if fields are missing

    if(!title || !subject || !message || !signer || !name || !files) {
        return response.status(400).json({ success: false, message: 'Missing required fields' })
    }

    const signatureRequestApi = new SignatureRequestApi();

    signatureRequestApi.username = process.env.DS_API_KEY;
    const requestData = {
        title: title[0],
        subject: subject[0],
        message: message[0],
        signers: [ { emailAddress: signer[0], name: name[0] } ],
        files: [ fs.createReadStream(files.file[0].filepath) ],
        signingOptions: {
            draw: true,
            type: true,
            upload: true,
            phone: true,
            defaultType: "draw",
        },
        isEid: true,
    }

    try {
        const result = await signatureRequestApi.signatureRequestSend(requestData);
        return response.json({ success: true, message: result.body })
    } catch (error) {
        console.error(error);
        return response.status(400).json({ success: false, message: error })
    }
}