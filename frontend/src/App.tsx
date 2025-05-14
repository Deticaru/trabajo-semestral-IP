import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState<string>('Cargando...');

  useEffect(() => {
    fetch('http://localhost:8000/api/hello/')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Error al conectar con la API'));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Mensaje desde Django:</h1>
      <p>{message}</p>
    </div>
  );
}

export default App
