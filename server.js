const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // ✅ ajouter CORS

const app = express();
connectDB(); // connexion à la DB

// Autoriser les requêtes depuis ton frontend
app.use(cors({
  origin: 'https://olympiade-du-faso.onrender.com', // remplacer par l'URL de ton frontend si différente
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Routes API
app.use('/api', require('./routes/inscription'));

// Test serveur
app.get('/', (req, res) => {
  res.send({ message: 'Backend Express + MongoDB is running!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
