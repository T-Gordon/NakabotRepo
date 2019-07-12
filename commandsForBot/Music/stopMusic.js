const { Command } = require('discord.js-commando');

module.exports = class parrotCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            group: 'music',
            memberName: 'stop',
            description: 'plays music from a search term and plays when in a music channel',
            examples: ['music song name']
        });
    }

  async run(msg, args) {
      if(msg.guild.voiceConnection)
      {

      }
      else {
        msg.say("Please add me to a music bot. use ?join.")
      }
    }
};
