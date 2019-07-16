const { Command } = require('discord.js-commando');

module.exports = class parrotCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'anon',
            group: 'misc',
            memberName: 'anon',
            description: 'makes a copy of the message ,deletes the original then send it as the bot to the anon channel',
            examples: ['anon']
        });
    }

  async run(msg, args) {
      if(args !== ""){
         msg.delete();

        return msg.guild.channels.get("599630963357777921").send(args);

      }
        else {
          msg.say("say something")
        }
    }
};
