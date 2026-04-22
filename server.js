const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/testimonials', require('./routes/testimonials.routes'));
app.use('/api/concerts', require('./routes/concerts.routes'));
app.use('/api/seats', require('./routes/seats.routes'));


app.use(express.static(path.join(__dirname, 'client/build')));


app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }

  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});


app.use('/api', (req, res) => {
  res.status(404).json({ message: 'Not found...' });
});


app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running');
});