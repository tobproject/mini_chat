require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
let STORAGE = process.env.STORAGE || 'local';

// --- SERVIR ARCHIVOS ESTÁTICOS ---
app.use(express.static('public'));

// --- USUARIOS CONECTADOS ---
let users = {}; // { socket.id: username }

// --- MENSAJES (para modo local) ---
let localMessages = [];

// --- CONEXIÓN A MONGODB ---
let Message;
if (STORAGE === 'mongo') {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // 5s timeout
  })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    const messageSchema = new mongoose.Schema({
      user: String,
      text: String,
      createdAt: { type: Date, default: Date.now }
    });
    Message = mongoose.model('Message', messageSchema);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed, switching to local mode.', err.message);
    STORAGE = 'local';
  });
}

// --- SOCKET.IO ---
io.on('connection', (socket) => {
  console.log('🔌 A user connected');

  // Usuario se une
  socket.on('user joined', async (username) => {
    if (!username) return;

    users[socket.id] = username;
    io.emit('user joined', username);
    io.emit('update users', Object.values(users));

    // Enviar últimos 50 mensajes al usuario recién conectado
    if (STORAGE === 'mongo' && Message) {
      try {
        const lastMessages = await Message.find().sort({ createdAt: 1 }).limit(50);
        lastMessages.forEach(msg => {
          socket.emit('chat message', { user: msg.user, text: msg.text });
        });
      } catch (err) {
        console.error('❌ Error loading messages from MongoDB:', err.message);
      }
    } else {
      // Modo local
      localMessages.forEach(msg => {
        socket.emit('chat message', msg);
      });
    }
  });

  // Mensaje de chat
  socket.on('chat message', async (msg) => {
    if (!msg.user) msg.user = users[socket.id];
    if (!msg.user) return;

    io.emit('chat message', msg);

    if (STORAGE === 'mongo' && Message) {
      try {
        const newMsg = new Message(msg);
        await newMsg.save();
      } catch (err) {
        console.error('❌ Error saving message to MongoDB:', err.message);
      }
    } else {
      // Guardar localmente
      localMessages.push(msg);
      if (localMessages.length > 50) localMessages.shift(); // solo últimos 50
    }
  });

  // Usuario se desconecta
  socket.on('disconnect', () => {
    if (users[socket.id]) {
      const username = users[socket.id];
      delete users[socket.id];
      io.emit('user left', username);
      io.emit('update users', Object.values(users));
    }
    console.log('❌ A user disconnected');
  });
});

// --- INICIAR SERVIDOR ---
http.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`💾 Storage mode: ${STORAGE}`);
});
