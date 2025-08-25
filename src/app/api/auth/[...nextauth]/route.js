import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  // Configura los proveedores de autenticación
  providers: [
    CredentialsProvider({
      // El nombre es lo que se mostrará en la página de inicio de sesión
      name: "Credentials",
      // Las credenciales se usan para generar un formulario de inicio de sesión
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // En una aplicación real, aquí buscarías al usuario en tu base de datos
        // y verificarías la contraseña. Por ahora, es un usuario de ejemplo.
        
        if (credentials.email === "test@example.com" && credentials.password === "password123") {
          // Si el email y la contraseña son correctos, devuelve el objeto de usuario
          return { id: "1", name: "Test User", email: "test@example.com" }
        } else {
          // Si las credenciales no son válidas, devuelve null
          return null
        }
      }
    })
  ],
  // Configura las páginas de tu sitio
  pages: {
    signIn: '/auth/signin', // Puedes crear una página personalizada para iniciar sesión
  },
}

// Crea el manejador de la API de NextAuth
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }