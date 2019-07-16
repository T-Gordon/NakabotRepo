const { Command } = require('discord.js-commando');

module.exports = class joinChannel extends Command{
  constructor(client){
    super(client,{
      name: 'join',
      group: 'music',
      memberName: 'join',
      description: 'joins the voice channel of the sender'
    });
  };
  async run(msg, args){
    if(msg.member.voiceChannel){

      if(!msg.guild.voiceChannel)
      {

        await msg.member.voiceChannel.join()
        msg.reply("connection complete use ?play [song] to play music")

      }
      else{
        msg.reply("please use ?play [song] to play music when connected")
      }

    }
    else {
      msg.reply("please join a voice channel first")
    };

  };
};
