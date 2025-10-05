# 🧠 Pasos para Usar el Chat con MongoDB

Esta guía te mostrará cómo configurar, conectar y ejecutar correctamente tu **Mini Chat en Tiempo Real** usando **MongoDB Atlas** como almacenamiento persistente.

---

## 🪣 1️⃣ Crear una Base de Datos en MongoDB Atlas

1. Ve a [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta (si no tienes una).
3. Crea un **Cluster gratuito (M0)**.
4. Una vez creado, entra a **Database → Connect → Drivers**.
5. Copia la cadena de conexión, que se verá así:

   ```bash
   mongodb+srv://<usuario>:<contraseña>@cluster0.xxxxx.mongodb.net/chat
   ```

6. Sustituye `<usuario>` y `<contraseña>` por tus credenciales reales.
7. Pega esa URI en tu archivo `.env`:

   ```bash
   MONGO_URI=mongodb+srv://miusuario:mipassword@cluster0.xxxxx.mongodb.net/chat
   STORAGE=mongo
   ```

---

## ⚙️ 2️⃣ Instalar Dependencias Necesarias

Ejecuta en la raíz de tu proyecto:

```bash
npm install express socket.io mongoose dotenv
```

Estas librerías permiten el funcionamiento del servidor, la comunicación en tiempo real y la conexión con MongoDB.

---

## 🚀 3️⃣ Ejecutar el Servidor

```bash
npm run dev
```

Deberías ver algo similar en la consola:

```
✅ Connected to MongoDB
🚀 Server running on http://localhost:3000
💾 Storage mode: mongo
```

---

## 💬 4️⃣ Probar el Chat

1. Abre tu navegador en [http://localhost:3000](http://localhost:3000)  
2. Escribe un nombre de usuario.
3. Abre otra pestaña o dispositivo con la misma URL.
4. Envía mensajes desde ambos → verás la sincronización en tiempo real.
5. Si reinicias el servidor, los mensajes seguirán ahí (persistencia confirmada 🧠).

---

## 🧾 5️⃣ Verificar los Mensajes en MongoDB

En MongoDB Atlas:
- Abre **Collections**.
- Verás una base llamada `chat` y una colección `messages`.
- Cada documento tiene esta estructura:

```json
{
  "_id": "66fbe2b2...",
  "user": "Andres",
  "text": "Hola 👋",
  "time": "10:42:01 PM"
}
```

---

## 🔒 6️⃣ Consejos de Seguridad

- **Nunca subas el archivo `.env` a GitHub.**  
  Crea un archivo `.gitignore` con esta línea:

  ```bash
  .env
  ```

- Si vas a desplegar en **Render** o **Railway**, configura las variables de entorno desde su panel web.

---

## 🌐 7️⃣ Despliegue en la Nube

### 🚀 Render

1. Crea un servicio web en [Render.com](https://render.com).
2. Conecta tu repositorio de GitHub.
3. En la sección **Environment Variables**, agrega:

   ```bash
   MONGO_URI=tu_uri_de_mongodb
   STORAGE=mongo
   ```

4. Haz clic en **Deploy** y espera que se construya el servicio.
5. Obtén tu **URL pública** y pruébalo.

---

### ⚡ Railway

1. Ve a [Railway.app](https://railway.app).
2. Crea un nuevo proyecto y selecciona **Deploy from GitHub**.
3. Configura tus variables de entorno:

   ```bash
   MONGO_URI=tu_uri_de_mongodb
   STORAGE=mongo
   ```

4. Haz **Deploy** y abre la **URL pública** para probar el chat.

---

## ✅ Conclusión

Tu chat ahora está completamente integrado con MongoDB 🧠  
Podrás mantener el historial de conversaciones y escalar fácilmente tu aplicación para múltiples usuarios en producción.

---

✨ _Desarrollado con ❤️ y JavaScript_
