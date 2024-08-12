const path = require('path')
const express = require('express')
const app = express()
const exec = require('child_process').exec

const runBashCommand = (command) =>
    new Promise((res, rej) => {
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

app.post('/deploy', async (req, res) => {
    const deploySecret = 'test-secret'
    console.log(req.body)

    try {
        console.log('Deploy Started...')
        await runBashCommand('git reset --hard origin/master')
        await runBashCommand('npm install --production')
        await runBashCommand('touch /tmp/restart.txt')
        console.log('Deploy Ends Successfully')
    } catch (e) {
    } finally {
        res.status(200).json('GOOD')
    }
})

app.listen(PORT, () => {
    console.log('SERVER STARTED')
})
