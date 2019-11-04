const Bot = require('slackbots');

const settings = {
    token: '',
    name: '16teambot'
}

const bot = new Bot(settings);

bot.on('start', () => {
    bot.postMessageToGroup('16team', 'start');
})
bot.on('message', (msg) => {

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
function build() {
    bot.postMessageToGroup('16team', 'build start!')
    console.log('build start!')
}