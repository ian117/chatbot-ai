import { useEffect, useState } from "react"
import { Button } from "./components/ui/button"

function App() {
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch('/api/message')
      .then(res => res.json())
      .then(data => {
        setMessage(data.message)
      })

  }, [])

  return (
    <div className="p-4" >
      <p>{message}</p>
      <Button>Click me</Button>
    </div>

  )
}

export default App
