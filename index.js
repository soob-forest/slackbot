const Bot = require('slackbots');
const https = require("https");
const fetch = require("node-fetch");
const zlib = require('zlib');
const fs = require('fs')


const settings = {
    token: "",
    name: '16teambot'
}


const bot = new Bot(settings);

bot.on('start', () => {
    //bot.postMessageToGroup('16team', 'start');
})
bot.on('message', (msg) => {

    if (msg.files) {
        const fileUrl = msg.files[0].url_private_download;
        const filename = msg.files[0].name;
        fetch(fileUrl, {
            headers: {
                'Authorization': `Bearer ${settings.token}`,
            }
        }).then((res) => {

            const file = fs.createWriteStream(`./archive/${filename}`);

            res.body.pipe(file);
            bot.postMessageToGroup('16team', `${filename} 저장`)
        })
    }
    if (!msg.text || msg.text.charAt(0) !== '\\') {
        return;
    }
    const text = msg.text.slice(1);
    switch (text) {
        case 'build':
            build();
            break;
        case 'hello':
            bot.postMessageToGroup('16team', 'hi!')
            console.log('hi');
            break;
        default:
            bot.postMessageToGroup('16team', '무슨 명령어?')
    }
})
bot.on('file_created', (cb) => {
    bot.postMessageToGroup('16team', 'file_created', { as_user: true })
    console.log('file_created')
})
bot.on('file_shared', (cb) => {
    bot.postMessageToGroup('16team', 'file_shared', { as_user: true })
    console.log('file_shared')
})

function build() {
    bot.postMessageToGroup('16team', 'build start!')
    console.log('build start!')
}
