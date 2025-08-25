// server.js
const WebSocket = require('ws');
const Database = require('better-sqlite3');
const { z } = require('zod'); // <-- Importar Zod
const rateLimitMap = new Map(); // Mapa para el límite de mensajes
const MESSAGE_LIMIT = 5000; // 5000 milisegundos = 5 segundos

const db = new Database('my-magic-db.sqlite');

// Esquema de validación para los mensajes
const messageSchema = z.object({
  user: z.string().min(1, 'Usuario es obligatorio'),
  content: z.string().min(1, 'El mensaje no puede estar vacío').max(250, 'El mensaje es demasiado largo'),
});

const cache = new Map(); // Mapa para el caché
const CACHE_LIFETIME = 60 * 1000; // La data caduca en 60 segundos

// Función para obtener data del caché
const getFromCache = (key) => {
  const cachedItem = cache.get(key);
  if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_LIFETIME) {
    return cachedItem.data;
  }
  return null;
};

// Función para guardar data en el caché
const setToCache = (key, data) => {
  cache.set(key, { data, timestamp: Date.now() });
};

// ... En tu lógica de 'message', imagina que un cliente pide una búsqueda:
if (data.type === 'search') {
    const query = data.query;
    const cachedResults = getFromCache(`search-${query}`);

    if (cachedResults) {
        ws.send(JSON.stringify({ type: 'search_results', results: cachedResults }));
    } else {
        const results = db.prepare('SELECT * FROM messages WHERE content LIKE ?').all(`%${query}%`);
        setToCache(`search-${query}`, results);
        ws.send(JSON.stringify({ type: 'search_results', results: results }));
    }
}

const wss = new WebSocket.Server({ port: 8080 });



wss.on('connection', ws => {
  ws.on('message', message => {

     const userId = 'user_id_from_auth'; // En un proyecto real, obtendrías esto de una sesión

    // Revisar si el usuario está enviando mensajes muy rápido
    if (rateLimitMap.has(userId) && (Date.now() - rateLimitMap.get(userId) < MESSAGE_LIMIT)) {
      ws.send(JSON.stringify({ error: true, message: '¡No tan rápido! Espera un poco para enviar otro mensaje.' }));
      return; // Detiene la ejecución si el límite es excedido
    }
    
    rateLimitMap.set(userId, Date.now()); // Guardar el tiempo actual

    try {
      // 1. Validar el mensaje con el esquema de Zod
      const parsedData = messageSchema.parse(JSON.parse(message));
      
      // 2. Si la validación es exitosa, se procede a la lógica
      const insert = db.prepare('INSERT INTO messages (user, content) VALUES (?, ?)');
      insert.run(parsedData.user, parsedData.content);

      // 3. Reenviar el mensaje a todos los clientes
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(parsedData));
        }
      });
    } catch (error) {
      // Si la validación falla, se envía un mensaje de error solo al cliente
      ws.send(JSON.stringify({ error: true, message: 'Mensaje no válido.' }));
    }
  });
});

console.log('Servidor WebSocket y base de datos listos.');