'use client'

import { useState } from 'react'
import axios from 'axios'

export default function ChatInterface() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post('http://localhost:8000/chat/1', { query }) // Assuming file_id is 1
      setResponse(res.data.result)
    } catch (error) {
      console.error('Query failed:', error)
      setResponse('An error occurred while processing your query.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question about your data..."
          className="w-full px-3 py-2 border rounded-md"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? 'Processing...' : 'Ask'}
        </button>
      </form>
      {response && (
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="font-bold mb-2">Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  )
}
