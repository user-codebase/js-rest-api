const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json());

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/concerts', concertsRoutes);
app.use('/api/seats', seatsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});