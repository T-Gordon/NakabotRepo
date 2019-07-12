const { Command } = require('discord.js-commando');
const YTDL  = require('ytdl-core');


function play(msg,server)
{
  var server = servers[msg.guild.id];
  if(!server)
  {
    server = {queue:[]};
  }
  if(!server.queue[0])
  {
    msg.reply("please add songs to the list to use this command")
  }
  const dispatcher = server.queue.connection.playArbitraryInput(ytdl(server.queue))
                .on('end', function musicFinished(){
                  console.log('music finished playing')
                  server.queue.shift();
                  play(msg,server)
                })
                .on('error', error =>{
                  console.log(error);
                });
                dispatcher.setVolumeLogarithmic(server.queue.volume /5);

};

module.exports = class parrotCommand extends Command {

    constructor(client) {
        super(client, {
            name: 'play',
            group: 'music',
            memberName: 'play',
            description: 'plays music from a search term and plays when in a music channel',
            examples: ['music song name']
        });
    }

    async run(msg, args){
      if(msg.member.voiceChannel){

        if(!msg.guild.voiceChannel)
        {
          var server = servers[msg.guild.id];

          if(!server)
          {
            server = {queue:[]};
          }
          server.queue.push(args);
        await  play(msg, server);

          msg.reply("now playing: ");

        }

      }
      else {
        msg.reply("please join a voice channel first")
      };

    };
};
