const commando = require('discord.js-commando');

class coinFlipCommand extends commando.command{
  constructor(client){
    super(client,{
      name: 'flip',
      group: 'botCommands',
      memberName: 'flip',
      description: 'Mud'
    })
  }

  async run(message, args)
  {
    var chance = math.floor(math.random() * 2)
    if(chance == 0)
    {
      message.reply('Heads');
    }
    else {
      message.reply('tails')
    }
  }
}


module.exports = coinFlipCommand;
