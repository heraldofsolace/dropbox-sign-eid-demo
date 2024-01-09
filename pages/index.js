import { Inter } from 'next/font/google'
import { CreateSignatureRequestForm } from '@/components/CreateSignatureRequestForm'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-16">Create Signature Request</h1>
      <CreateSignatureRequestForm />
    </main>
  )
}
