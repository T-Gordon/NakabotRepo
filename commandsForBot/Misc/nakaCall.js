const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'naka',
            group: 'misc',
            memberName: 'naka',
            description: 'Replies with a Message.',
            examples: ['naka']
        });
    }

  async run(msg) {
        return msg.say('MANDEM');
    }
};
