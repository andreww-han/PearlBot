const Discord = require('discord.js');
const bot = new Discord.Client();

const token = "NzIyNTYzODYzODg2NjkyNDgy.XwCqPw.We3JVMEupydCpfyHmeOGrWXu6T4";
const prefix = "!";

function summonerName(arg){
    return arg.replace(/ /g, "")
}

bot.on('ready', () => {
    console.log("Bot is online.");
})

bot.on('message', msg=>{
    if (msg.author.bot) return;
    let args = msg.content.substring(prefix.length).split(" ");
    switch(args[0]){
        case 'lolchess':
            msg.channel.send("https://lolchess.gg/profile/na/" + summonerName(msg.content.substring(prefix.length + args[0].length + 1)));
            break;
        case 'op.gg' :
            msg.channel.send("https://na.op.gg/summoner/userName=" + summonerName(msg.content.substring(prefix.length + args[0].length + 1)));
            break;
        case 'info' :
            msg.channel.send("!op.gg Summoner Name to get a link to a user's op,gg.\n\n!lolches!ops Summoner Name to get a link to a user's lolchess.gg.\n\n!info to get a list of valid commands.");
            break;
        default:
            msg.channel.send(prefix + args +" is not a valid command. Type !info to get a list of my commands.");
    }           
})

bot.login(token);