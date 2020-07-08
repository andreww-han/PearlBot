const Discord = require('discord.js');
const search = require('youtube-search');
const ytdl = require('ytdl-core');
const bot = new Discord.Client();

const token = "NzIyNTYzODYzODg2NjkyNDgy.XwCqPw.We3JVMEupydCpfyHmeOGrWXu6T4";
const prefix = "!";

var servers = {};
var emptyQueue = true;

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
            if(!args[1]){
                msg.channel.send("Please provide a name I can search for you on lolchess.gg.");
            }
            else{
                msg.channel.send("https://lolchess.gg/profile/na/" + summonerName(extraArguments));
            }
            break;
        case 'op.gg' :
            if(!args[1]){
                msg.channel.send("Please provide a name I can search for you on op.gg.");
            }
            else{
                msg.channel.send("https://na.op.gg/summoner/userName=" + summonerName(extraArguments));
            }
            break;
        case 'info' :
            msg.channel.send("!op.gg <Summoner Name> to get a link to a user's op.gg.\n\n!lolchess <Summoner Name> to get a link to a user's lolchess.gg.\n\n!changename <Desired Name> to change your nickname on the server.\n\n!queue <youtube URL> OR <youtube search> to queue a song.\n\n!play to have me start playing queued songs.\n\n!skip to go to the next song.\n\n!stop to stop playing music.\n\n!info to get a list of valid commands.");
            break;
        case 'changename' :
            (await msg.guild.members.fetch()).get(msg.author.id).setNickname(extraArguments)
            break;
        case 'queue' :
            if (!servers[msg.guild.id]) servers[msg.guild.id] = {
                queue: []
            }
            emptyQueue = false;
            var server = servers[msg.guild.id];
            var opts = {
                maxResults: 1,
                key: 'AIzaSyCqnT5XsggoHB6UQTdlL5tmx9mwsoD83q4'
              };
            if(extraArguments.startsWith("https://www.youtube.com/")){
                server.queue.push(extraArguments);
                msg.channel.send(extraArguments + " was queued!");
            }
            else{
                search(extraArguments, opts, function(err, results) {
                    if(err) return console.log(err);
                    var result = results[0].link.toString();
                    server.queue.push(result);
                    msg.channel.send(result + " was queued!");
                });
            }   
            break;
        case 'play':
            function play(connection, message){
                var server = servers[msg.guild.id];
                server.dispatcher = connection.play(ytdl(server.queue[0],{filter: "audioonly"}));
                msg.channel.send(server.queue[0] + " is now playing");
                server.queue.shift();
                server.dispatcher.on("finish",function(){
                    if(server.queue[0]){
                        play(connection,message);
                    }else{
                        emptyQueue = true;
                        connection.disconnect();
                        msg.guild.me.voice.channel.leave();
                        msg.channel.send("The music queue has ended.");
                    }
                })
            }
            if(!msg.member.voice.channel){
                msg.channel.send("Please join a voice channel for me to play music.");
                return;
            }
            if(emptyQueue){
                msg.channel.send("Use the command !queue to add songs to the queue first. !info for help.");
            }
            if(!msg.member.voice.connection) msg.member.voice.channel.join().then(function(connection){
                play(connection, msg);
            });
            break;
        case 'skip':
            var server = servers[msg.guild.id];
            if(server.dispatcher) server.dispatcher.end();
            if(!server.queue[0]) {
                emptyQueue = true;
                msg.channel.send("The music queue has ended.");
            }
            break;
        case 'stop':
            var server = servers[msg.guild.id];
            if(msg.guild.voice.connection){
                for (var i = server.queue.length -1; i>= 0; i--){
                    server.queue.splice(i,1);
                }
                server.dispatcher.end();
                msg.channel.send("The music queue has ended.");
                console.log("Stopped the queue");
                emptyQueue = true;
            }
            if (msg.guild.connection) msg.guild.voice.connection.disconnect();
            break;

        // case 'summoner':
        //     var interval = setTimeout(function(){
        //         msg.channel.send("hi");
        //     }, 5000);
        //     break;
        default:
            msg.channel.send(prefix + args +" is not a valid command. Type !info to get a list of my commands.");
    }           
})

bot.login(token);