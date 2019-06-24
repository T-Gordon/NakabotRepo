"use strict"
const fs = require("fs");
var Discord = require('discord.io');
var logger = require('winston'); // winston is a custom made library
var auth =  require('./auth.json');
var insult = require('./deadinsults.json');
var nakaServerID=  "170058625329397760"
var dankServerID = "23"
var botInfo = ('./package.json');
var rndNumForIQuotes ;
var hChannelID = "282674503618789378"; // id for 'h' channel in Nakamandem discord
var tmpQuote;
var quoteChnlID = "267830443183702026";
var dilim = "\"";
var commandList = ['ping(replies pong)', 'info(bot information)', 'stressed(replies "fuck you {user name} "")',
'Quote(random quote form nakaquotes channel)','commands(list of commands)','insults [name/menton](sends random isult to mention/text)',
'league sort name1 name2 nameN (randomise the list of names into 2 even teams(odd on one team, if odd num of team members))', 'bannedlist [strain name] (adds the given strain to a list of banned strains.\n If no strain name is detected sends a list of strains)'];
var team1 = [ ];
var team2 = [ ];
var removed ;
// code used to configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console,{
  colorize : true
});
logger.level = 'debug';
// initialize discord bot
var bot = new Discord.Client ({
  token: auth.token,
  autorun: true
});

bot.on('ready' , function (servers ,event) {
  logger.info('Connected');
  logger.info('logged in as: ');
  logger.info(bot.username + ' - (' + bot.id +')');

});

//=== TODO: add a fuction to edit user messages in the h channel for Nakamandem to h no matter what is said
bot.on('message', function (user, userID , chnl_ID, message, event){
  //====== checks for messages other than h in h channel (includes capital H)
  var tempChar = message.substring(0,1)
  var messID = event.d.id;

if(message.substring(0,1) === '?' && message.substring(1,1) !== '?' && message.length != 1){
  var args = message.substring(1).split(' ');
  var cmd = args[0];
  var rndNum = Math.floor((Math.random()*12) + 0);
  var tmpName;
  // cases used to hold the information for the execution statments
  args = args.splice(1);
  cmd = cmd.toLowerCase();
//  var personId = ("<@"+ nakaIDs.nakaUserIDs[rndNum] +">");
  switch(cmd){
    //== a simple ping pong command
    case 'ping':
    console.log("pong");
    bot.sendMessage({
      to: chnl_ID,
      message : 'pong'
    });
    break;
    case 'info':
    //=== bot info
    bot.sendMessage({
      to:chnl_ID,
      message: botInfo
    });
    break;
    case 'commands':
    //====== gives list of commands
        bot.sendMessage({
        to:chnl_ID,
        message: ' place ? infront of command' ,
        message :   commandList[i]

      });
      break;
    case 'framedata' :

        break;
        case 'characterdetails' :

        break;

   case 'quotessssssdsssss':

    for(var i = 0; i < nakaQoutes.quotesList1.length; i++)
    {
      usedIndexList1.push(i);
    };
    for (var i = usedIndexList1.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = usedIndexList1[i];
      usedIndexList1[i] = usedIndexList1[j];
      usedIndexList1[j] = temp;
    };


  bot.sendMessage({to:chnl_ID,
    message: nakaQoutes.quotesList1[usedIndexList1[0]]});

    removed = usedIndexList1.splice(0 , 1);

    console.log(" ")
    console.log(removed);
    console.log(usedIndexList1);
    break;
        case 'teamSort' :

          break;
          default :
          bot.sendMessage({
            to:chnl_ID,
            message: 'invalid input'
          });
          break;
          //====== if no input is detected
        }
      }
    });
