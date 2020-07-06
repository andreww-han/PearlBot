const Discord = require('discord.js');
const bot = new Discord.Client();

const token = "NzIyNTYzODYzODg2NjkyNDgy.XwCqPw.We3JVMEupydCpfyHmeOGrWXu6T4";
const prefix = "!";

function summonerName(arg){
    return arg.replace(/ /g, "")
}

bot.on('ready', () => {
    console.log(`${bot.user.username} is now online.`);
})

bot.on('message', async msg=>{
    if (msg.author.bot) return;
    if (!msg.guild) return;
    if (msg.content.charAt(0) != prefix) return;
    let args = msg.content.substring(prefix.length).split(" ");
    var extraArguments = msg.content.substring(prefix.length + args[0].length + 1);
    switch(args[0]){
        case 'lolchess':
            msg.channel.send("https://lolchess.gg/profile/na/" + summonerName(extraArguments));
            break;
        case 'op.gg' :
            msg.channel.send("https://na.op.gg/summoner/userName=" + summonerName(extraArguments));
            break;
        case 'info' :
            msg.channel.send("!op.gg Summoner Name to get a link to a user's op,gg.\n\n!lolches!ops Summoner Name to get a link to a user's lolchess.gg.\n\n!info to get a list of valid commands.");
            break;
        case 'changename' :
            console.log(msg.guild.me.hasPermission("MANAGE_NICKNAMES"));
            console.log(msg.member);
            // msg.member.setNickname(extraArguments);
        //    console.log((await msg.guild.members.fetch()).get(bot.user.id).setNickname(extraArguments);
            (await msg.guild.members.fetch()).get(msg.author.id).setNickname(extraArguments)
            
            break;
        default:
            msg.channel.send(prefix + args +" is not a valid command. Type !info to get a list of my commands.");
    }           
})

bot.login(token);