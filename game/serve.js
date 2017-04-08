
const express = require('express');
const app = express();

app.use(express.static(__dirname));
app.all('*', function(req, res) {
  res.sendFile('index.html', { root: __dirname });
});

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Server listening at http://${host}":"${port}`);
});
