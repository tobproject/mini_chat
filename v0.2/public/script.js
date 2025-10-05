// Conexión con Socket.io
const socket = io();

// --- ELEMENTOS DEL DOM ---
const loginContainer = document.getElementById('login-container');
const chatContainer = document.getElementById('chat-container');
const usernameInput = document.getElementById('username-input');
const loginBtn = document.getElementById('login-btn');

const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const messagesList = document.getElementById('messages');
const userList = document.getElementById('user-list');

let username = "";

// --- LOGIN ---
loginBtn.addEventListener('click', () => {
  const enteredName = usernameInput.value.trim();
  if (!enteredName) {
    alert("Please enter a username!");
    return;
  }
  username = enteredName;

  // Emitir evento al servidor indicando nuevo usuario
  socket.emit('user joined', username);

  // Mostrar chat y ocultar login
  loginContainer.classList.add('hidden');
  chatContainer.classList.remove('hidden');
});

// --- ENVIAR MENSAJE ---
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!username) {
    alert("You must join the chat first!");
    return;
  }
  const msg = messageInput.value.trim();
  if (!msg) return;

  socket.emit('chat message', { user: username, text: msg });
  messageInput.value = '';
});

// --- RECIBIR MENSAJES ---
socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = `${msg.user}: ${msg.text}`;
  messagesList.appendChild(li);
  messagesList.scrollTop = messagesList.scrollHeight;
});

// --- NOTIFICACIONES DE USUARIO ---
socket.on('user joined', (user) => {
  const li = document.createElement('li');
  li.textContent = `🔔 ${user} joined the chat`;
  li.style.fontStyle = 'italic';
  messagesList.appendChild(li);
  messagesList.scrollTop = messagesList.scrollHeight;
});

socket.on('user left', (user) => {
  const li = document.createElement('li');
  li.textContent = `🔔 ${user} left the chat`;
  li.style.fontStyle = 'italic';
  messagesList.appendChild(li);
  messagesList.scrollTop = messagesList.scrollHeight;
});

// --- ACTUALIZAR LISTA DE USUARIOS ---
socket.on('update users', (usersArray) => {
  userList.innerHTML = '';
  usersArray.forEach((user) => {
    const li = document.createElement('li');
    li.textContent = user;
    userList.appendChild(li);
  });
});
