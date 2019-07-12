const { Command } = require('discord.js-commando');

module.exports = class joinChannel extends Command{
  constructor(client){
    super(client,{
      name: 'leave',
      group: 'music',
      memberName: 'leave',
      description: 'Leaves channel the voice channel of the sender'
    });
  };
  async run(msg, args){
  //  var botVoiceChnid = msg.guild.voiceConnection;
    //var userVoicechnid = msg.member.channel ;
  //  console.log("bot channel id:" + botVoiceChnid);
    //console.log("User channel id" + userVoicechnid)
//to do make it so you have to be in the same channel as the bot
    if(msg.guild.voiceConnection && msg.member.voiceChannel){
      const memberVoiceid = msg.member.voiceChannelID;
      var memberList = msg.guild.voiceChannelID;
      var voiceChan = msg.guild.channels.get(memberVoiceid);
      //var memInChannel = voiceChan.members;

        console.log(memberList)
      //  console.log(memInChannel)
        console.log("done")

          await  msg.guild.voiceConnection.disconnect();
          msg.reply('Disconnection complete');


          msg.reply("not in the same voice channel")




    }
    else {
      msg.reply("Please us command with both user and bot are connected to a voice channel")
    };

  };
};
