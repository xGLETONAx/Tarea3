const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

let users = [];

// Ruta de registro
app.post('/register', (req, res) => {
  const { name, dpi, email, password } = req.body;

  // Verificar si el email ya está registrado
  const userExists = users.some(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ error: 'El email ya está registrado.' });
  }

  // Agregar el nuevo usuario al arreglo
  const newUser = { name, dpi, email, password };
  users.push(newUser);
  res.status(201).json({ message: 'Registro exitoso' });
});

// Ruta de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Verificar si el email y la contraseña son correctos
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(400).json({ error: 'Email o contraseña incorrectos.' });
  }

  // Si es correcto, devolver los datos del usuario
  res.status(200).json({ message: 'Login exitoso', user });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
