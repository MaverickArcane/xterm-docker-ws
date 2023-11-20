const express = require('express')
const app = express()
const port = process.env.FRONTEND_PORT

app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
  res.render(__dirname + "/index.html", {port:process.env.BACKEND_PORT});
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
