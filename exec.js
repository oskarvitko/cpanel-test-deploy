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

async function start() {
    console.log('Deploy Started...')
    await runBashCommand(`git reset --hard origin/master`)
    await runBashCommand('npm install --production')
    await runBashCommand('touch /tmp/restart.txt')
    console.log('Deploy Ends Successfully')
}

start()
