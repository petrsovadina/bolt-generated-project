import { useState } from 'react'

export default function Telemedicine() {
  const [isCallActive, setIsCallActive] = useState(false)

  const startCall = () => {
    setIsCallActive(true)
    // Integrace s video API (např. WebRTC) by šla sem
  }

  const endCall = () => {
    setIsCallActive(false)
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Telemedicína</h1>
      {!isCallActive ? (
        <button onClick={startCall} className="w-full bg-green-500 text-white p-2">Zahájit hovor</button>
      ) : (
        <div>
          <p>Hovor je aktivní...</p>
          <button onClick={endCall} className="w-full bg-red-500 text-white p-2 mt-4">Ukončit hovor</button>
        </div>
      )}
    </div>
  )
}
