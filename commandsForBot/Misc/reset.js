const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'reset',
            group: 'misc',
            memberName: 'reset',
            description: 'Resets the bot (specific users)',
            examples: ['naka']
        });
    }

  async run(msg) {
      msg.reply("Currently Unavalible");
    }
};
