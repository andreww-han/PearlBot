const Discord = require('discord.js');
const search = require('youtube-search');
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
            msg.channel.send("!op.gg <Summoner Name> to get a link to a user's op.gg.\n\n!lolchess <Summoner Name> to get a link to a user's lolchess.gg.\n\n!changename <Desired Name> to change your nickname on the server.\n\n !youtube <Your Search> to return the first Youtube link.\n\n!info to get a list of valid commands.");
            break;
        case 'changename' :
            (await msg.guild.members.fetch()).get(msg.author.id).setNickname(extraArguments)
            break;
        case 'youtube' :
            var opts = {
                maxResults: 10,
                key: 'AIzaSyCqnT5XsggoHB6UQTdlL5tmx9mwsoD83q4'
              };
               
            search(extraArguments, opts, function(err, results) {
            if(err) return console.log(err);
            //console.log(results.reverse().pop().link);
            var result = results[0].link.toString();
            msg.channel.send(result);
            });
            break;
        case 'summoner':
            var interval = setTimeout(function(){
                msg.channel.send("hi");
            }, 5000);
            break;
        default:
            msg.channel.send(prefix + args +" is not a valid command. Type !info to get a list of my commands.");
    }           
})

bot.login(token);