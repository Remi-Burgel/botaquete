const Discord = require('discord.js');
const client = new Discord.Client();

let commands = [];
let QUEST_CHAN_ID = '443419924875051038';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === '!quest ping') {
        msg.channel.send('pong');
    } else if (msg.content.substring(0,7) === '!quest ' && msg.channel.id === QUEST_CHAN_ID){
        let command = msg.content.split(' ');
        if(commands.hasOwnProperty(command[1])){
            commands[command[1]](msg, command.splice(2));
        } else {
            msg.channel.send("Je ne connais pas cette commande, !quest help pour la liste des commandes disponibles")
        }
    }
});

commands["test"] = function (msg, args){
    msg.channel.send("Vous avez appellé la fonction test avec les arguments : " + args);
};
commands["test"].desc = "Une fonction pour tester l'appel de commande";


commands["help"] = function (msg){
    let answer = 'Pour apeller une commande tapez "!quest " suivit du nom de votre commande puis de ses arguments séparé par des espaces.\n' +
        'Liste des commandes :\n\n';

    for(let command in commands){
        answer += command + " : " + commands[command].desc + '\n';
    }

    msg.channel.send(answer);
};
commands["help"].desc = "Commande d'aide";

client.login('NDQzMzkxMjU4MTg3MTM3MDI0.DdMr6g.SgQKRutHVl__BY5ZF0Go6fIaMAQ');