const path = require('path')
const express = require('express')
const app = express()

const PORT = process.env.PORT || 8080

app.get('/app', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(PORT, () => {
    console.log('SERVER STARTED')
})
