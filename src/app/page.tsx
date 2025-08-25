// src/app/page.js
'use client'; // <-- Importante: Esto le dice a Next.js que este código es para el navegador del niño

import { useEffect } from 'react';

export default function HomePage() {
  
  useEffect(() => {
    // Le pedimos al navegador del niño que se conecte con el ayudante
    const ws = new WebSocket("ws://localhost:8080");

    // Cuando la conexión está lista
    ws.onopen = () => {
      console.log('Cuerda mágica conectada!');
      ws.send('Hola, ayudante!');
    };

    // Cuando el ayudante nos envía un mensaje
    ws.onmessage = (event) => {
      console.log(`Mensaje del ayudante: ${event.data}`);
    };

    // Cuando la cuerda se desconecta
    ws.onclose = () => {
      console.log('Cuerda mágica desconectada.');
    };
  }, []);

  return (
    <main>
      <h1>¡Mi Casa Mágica!</h1>
      <p>Mira la consola del navegador para ver la magia de la cuerda.</p>
    </main>
  );
}