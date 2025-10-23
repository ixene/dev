import { useEffect, useState } from "react"

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("http://localhost:8080/")
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>ixene-dev Frontend</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default App
