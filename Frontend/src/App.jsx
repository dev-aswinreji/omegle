import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")
  const [socket, setSocket] = useState("")

  useEffect(() => {

    const ws = new WebSocket(`ws://localhost:5000`)

    ws.onopen = () => {
      console.log('Connected to websocket server');
    }

    ws.onmessage = (event) => {
      setResponse(event.data)
    }

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    }

    setSocket(ws)

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close()
      }
    }
  }, [])

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message)
    }else {
      console.log('Websocket connection is not open . Cannot send message');
      
    }
  }

  return (
    <>
      <div className="App">
        <h1>WebSocket React App</h1>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
        />
        <button onClick={sendMessage}>Send</button>
        <p>Server Response: {response}</p>
      </div>
    </>
  )
}

export default App
