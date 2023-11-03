import { useEffect, useState } from "react"
import { io } from "socket.io-client"

const socket = io("http://localhost:4000")

function App() {


  const [messages, setMessages] = useState([])

  const [text, setText] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault()

    socket.emit("message", text)
    setText("")
  }


  useEffect(() => {
    socket.on("message", (data) => {
      setMessages(prev => [...prev, data])
    })

    return () => {
      socket.off("message")
    }
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      </form>

      <section>
        <ul>
          {messages.map((message, index) => (
            <li>
              <div>{message}</div>
            </li>
          ))}

        </ul>
      </section>
    </>
  )
}

export default App
