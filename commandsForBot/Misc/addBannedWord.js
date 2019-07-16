const { Command } = require('discord.js-commando');
//const bannedList = require('./jsonFiles\\bannedWords.json');
module.exports = class parrotCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bannedwords',
            group: 'misc',
            memberName: 'bannedwords',
            description: 'sends a list of all the banned words and also allows new words to be added',
            examples: ['anon']
        });
    }

  async run(msg, args) {

      if(!args[0]){
          for(let word of bannedList.bannedWords)
          {
              msg.say(word);
          }


      }
        else {
          bannedList.bannedWords.push(args);
        }
    }
};
