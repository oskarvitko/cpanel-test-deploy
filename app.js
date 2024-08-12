const path = require('path')
const express = require('express')
const app = express()
const exec = require('child_process').exec

const runBashCommand = (command) =>
    new Promise((res, rej) => {
        console.log(`Running: ${command}`)
        exec(command, (error, log) => {
            if (!error) {
                console.log(log)
                res()
            } else {
                rej(error)
            }
        })
    })

const PORT = process.env.PORT || 8080

app.get('/app', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(PORT, () => {
    console.log('SERVER STARTED')
})
