const { Command } = require('discord.js-commando');
const YTDL  = require('ytdl-core');
var isPlaying;
var vConnnection ;
function play(msg,connection)
{
  var server = servers[msg.guild.id];
  server.dispatcher = connection.playStream(YTDL(server.queue[0] , {filter:"audioonly"}));
  server.queue.shift();
  if(!server.queue[0])
  {
     return msg.reply("please add songs to the list to use this command")
  }
  else{
    play(msg,connection)
  }
};

module.exports = class playMusicCommand extends Command {

    constructor(client) {
        super(client, {
            name: 'play',
            group: 'music',
            memberName: 'play',
            description: 'plays music from a search term and plays when in a music channel',
            guildOnly: true,
            examples: ['music song name']
        });
    }

    async run(msg, args){

      if(msg.member.voiceChannel){

        if(!msg.guild.voiceChannel)
        {
          if(!servers[msg.guild.id])
          {
            servers[msg.guild.id] =  {queue:[]};
          }
          var server = servers[msg.guild.id];
           msg.member.voiceChannel.join()
                   .then(connection =>{

                     msg.reply("Joined channel");
                     if(!args[0]) return msg.reply("Add a search term after ?play [song choice]");
                     server.queue.push(args);
                     msg.say("song added");
                     play(msg, connection);
                   }).catch(err =>{
                     console.log(err)
                   })
        }
        else{
          if(!args[0]) return msg.reply("Add a search term after ?play [song choice]");

          server.queue.push(args);
          msg.say("song added");
          //play(msg, connection);
        }

      }
      else {
        msg.reply("please join a voice channel first")
      };

    };
};
