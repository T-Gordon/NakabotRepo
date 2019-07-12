const { Command } = require('discord.js-commando');

module.exports = class parrotCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'parrot',
            group: 'misc',
            memberName: 'parrot',
            description: 'Replies with a Message.',
            examples: ['Parrot']
        });
    }

  async run(msg, args) {
      if(args !== ""){
        await msg.delete();
        return msg.say(args);

      }
        else {
          msg.say("say something")
        }
    }
};
