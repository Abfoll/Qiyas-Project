const express = require('express');
const path = require('path');
const apiRoutes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3008;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
