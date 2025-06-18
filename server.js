const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const seedAdmin = require('./utils/seedAdmin');

// Cargar variables de entorno
dotenv.config();

// Conectar a MongoDB y crear admin si no existe
connectDB().then(() => seedAdmin());

// Inicializar Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Para recibir JSON

// Rutas base
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/properties', require('./routes/propertyRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api', require('./routes/uploadRoutes'));

// Ruta por defecto para endpoints no existentes
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
