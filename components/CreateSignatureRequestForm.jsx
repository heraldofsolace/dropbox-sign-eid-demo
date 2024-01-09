import { useState } from 'react'

export function CreateSignatureRequestForm() {
    const [file, setFile] = useState();
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [signer, setSigner] = useState("");
    const [signerName, setSignerName] = useState("");
    const [result, setResult] = useState({});

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!file) return

        try {
            const data = new FormData()
            data.set('file', file)
            data.set('title', title)
            data.set('subject', subject)
            data.set('message', message)
            data.set('signer', signer)
            data.set('name', signerName)

            const res = await fetch('/api/signature-request', {
                method: 'POST',
                body: data
            })
            // handle the error
            if (!res.ok) throw new Error(await res.text())
            setResult(await res.json())
        } catch (e) {
            // Handle errors here
            console.error(e)
        }
    }

  return (
    <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                </label>
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="title"
                    name="title" 
                    type="text" 
                    placeholder="Title"
                    required
                    onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Subject
                </label>
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="subject"
                    name="subject" 
                    type="text" 
                    placeholder="Subject"
                    required
                    onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Message
                </label>
                <textarea 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="message"
                    name="message" 
                    type="text" 
                    placeholder="Message"
                    required
                    onChange={(e) => setMessage(e.target.value)} />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signer">
                    Signer Email
                </label>
                <input 
                    className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                    id="signer"
                    name="signer"
                    type="email" 
                    placeholder="Signer Email"
                    required
                    onChange={(e) => setSigner(e.target.value)} />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signer">
                    Signer Name
                </label>
                <input 
                    className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                    id="name"
                    name="name"
                    type="text" 
                    placeholder="Signer Name"
                    required
                    onChange={(e) => setSignerName(e.target.value)} />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                    Document
                </label>
                <input
                    type="file"
                    name="file"
                    accept='application/pdf'
                    required
                    onChange={(e) => setFile(e.target.files?.[0])}
                />
            </div>
            <div className="flex items-center justify-between">
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                    type="submit">
                    Submit
                </button>
                {result.success? <p className="text-green-500 text-xs italic">Success</p> : null}
            </div>
        </form>
    </div>
  )
}
