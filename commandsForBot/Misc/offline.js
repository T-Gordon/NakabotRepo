const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'offline',
            group: 'misc',
            memberName: 'offline',
            description: 'turns the bot offline(can only be used be Certain users)',
            examples: ['naka']
        });
    }

  async run(msg) {
      msg.reply("Currently Unavalible");
    }
};
