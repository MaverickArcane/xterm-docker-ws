const express = require('express')
const app = express()
const port = process.env.FRONTEND_PORT

app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
