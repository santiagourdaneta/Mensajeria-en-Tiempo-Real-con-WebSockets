Este es un proyecto de demostración que explora la creación de una aplicación full-stack en tiempo real utilizando Next.js y WebSockets. La "Casa Mágica" permite a los usuarios enviar y recibir mensajes de forma instantánea, demostrando cómo funciona la comunicación bidireccional entre el cliente y el servidor.

---

## Características Principales 🚀

* **Comunicación en Tiempo Real**: Envío y recepción de mensajes instantáneos a través de una conexión WebSocket persistente.
* **Diseño Moderno**: Una interfaz de usuario limpia y minimalista.
* **Modo Oscuro**: Estilos de modo claro y oscuro listos para usar.
* **Validación de Datos**: Protección contra datos no válidos o maliciosos usando **Zod**.
* **Persistencia de Datos**: Almacenamiento de mensajes en una base de datos local con **SQLite**.

---

## Tecnologías Utilizadas 🛠️

* **Framework**: [Next.js](https://nextjs.org/) (con App Router)
* **Frontend**: React
* **Backend**: Servidor de **WebSockets** (Node.js)
* **Base de Datos**: [SQLite](https://www.sqlite.org/index.html) (con `better-sqlite3`)
* **Validación**: [Zod](https://zod.dev/)
* **Estilos**: [Pico.css](https://picocss.com/) (CSS minimalista)

---

## Cómo Ejecutar el Proyecto 🏁

Para que la casa mágica funcione, debes encender tanto el servidor de Next.js como el servidor de WebSockets.

**1. Clona el Repositorio:**

```bash
git clone https://github.com/santiagourdaneta/Mensajeria-en-Tiempo-Real-con-WebSockets/
cd Mensajeria-en-Tiempo-Real-con-WebSockets

2. Instala las Dependencias:

npm install

3. Inicia el Servidor de WebSockets:
Abre una terminal y ejecuta el servidor de WebSockets.

node server.js

4. Inicia el Servidor de Next.js:
Abre una segunda terminal y ejecuta el servidor de desarrollo.

npm run dev

Una vez que ambos servidores estén funcionando, abre http://localhost:3000 en tu navegador para ver la aplicación.

Arquitectura de la Aplicación 🗺️
Este proyecto utiliza una arquitectura de "dos servidores":

Servidor de Next.js: Se encarga de servir las páginas web (la interfaz de la casa).
Servidor de WebSockets: Se encarga de la comunicación en tiempo real (las "cuerdas mágicas").

El cliente se conecta al servidor de Next.js para ver la página, y luego establece una conexión de WebSocket separada con el servidor server.js para enviar y recibir mensajes instantáneamente.

Licencia 📄
Este proyecto está bajo la licencia MIT. Puedes usarlo y modificarlo libremente.
