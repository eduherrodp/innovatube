const express = require('express');
const path = require('path');

const app = express();

// Configurar el directorio estático para servir archivos generados por Vue.js
app.use(express.static(path.join(__dirname, 'dist')));

// Configurar una ruta para servir el archivo index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Puerto en el que escuchará el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor frontend iniciado en el puerto ${port}`);
});
