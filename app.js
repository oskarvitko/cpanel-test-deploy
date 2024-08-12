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
                rej()
            }
        })
    })

const PORT = process.env.PORT || 8080

app.get('/app', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/deploy', async () => {
    console.log('Deploy Started...')
    await runBashCommand(
        'cd /hosting1/benzoxby/repositories/cpanel-test-deploy && git pull origin master',
    )
    await runBashCommand('npm install --production')
    await runBashCommand('touch /tmp/restart.txt')
    console.log('Deploy Ends Successfully')
})

app.listen(PORT, () => {
    console.log('SERVER STARTED')
})
