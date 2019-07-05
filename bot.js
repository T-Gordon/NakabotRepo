"use strict"
const fs = require("fs");
var Discord = require('discord.io');
var winston = require('winston'); // winston is a custom made library
var auth =  require('./auth.json');
var request = require('request');
var cheerio = require('cheerio');
var insult = require('./deadinsults.json');
var nakaServerID=  "170058625329397760"
var dankServerID = "389537084102410241"
//  var botInfo = ('./package.json');
var rndNumForIQuotes ;
var hChannelID = "282674503618789378"; // id for 'h' channel in Nakamandem discord
var tmpQuote;
var quoteChnlID = "267830443183702026";
var dilim = "\"";
var commandList = ['ping(replies pong)',
                   'info(bot information)', 'stressed(replies "fuck you {user name} "")',
                   'Quote(random quote form nakaquotes channel)',
                   'commands(list of commands)','insults [name/menton](sends random isult to mention/text)',
                   'league sort name1 name2 nameN (randomise the list of names into 2 even teams(odd on one team, if odd num of team members))',
                   'bannedlist [strain name] (adds the given strain to a list of banned strains.\n If no strain name is detected sends a list of strains)'];
var team1 = [ ];
var team2 = [ ];
var removed ;
var voiceID= "574235518192189440";
var nakaVoiceChannelIDs = [];
var dankVoiceChannelIDS = [];
var openTimeData;
var openTimeArr = [];
// code used to configure logger settings
const logger =  winston.createLogger({
  transports:[new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize({all:true}),
    winston.format.simple()
  )
});

/*logger.remove(logger.transports.Console);
logger.add(logger.transports.Console,{
  colorize : true
});*/
logger.level = 'debug';

// initialize discord bot
var bot = new Discord.Client ({
  token: auth.token,
  autorun: true
});
bot.on('ready' , function () {
  logger.info('Connected');
  logger.info('logged in as: ');
  logger.info(bot.username + ' - (' + bot.id +')');
   console.log("bot on")
   //--- gets all the vocie channel IDs for Nakamandem discord
   for(var voicechn in bot.channels )
   {
        if(bot.channels[voicechn].type === 2)
      {
        nakaVoiceChannelIDs.push(bot.channels[voicechn].id);
        console.log("voice added");
      }
   }
   //=-================= websxcraping
   //--- redbull Opening times
   request('https://www.redbull.com/gb-en/projects/gaming-sphere/sphere-opening-times', (error,
       response, html) => {
       if (!error && response.statusCode == 200) {

         const $ = cheerio.load(html);
         const openingTimeTable = $('.data-table__table-body');
            openingTimeTable.find('tr').each( function(i, elem){
             openTimeData  =  $(this).find('.data-table__column-data').text()
             // console.log(test);
              openTimeArr.push(openTimeData);
              console.log("New item pushed to array, new length: " + openTimeArr.length);
           })
           console.log(openTimeArr.length);
           for(let obj of openTimeArr)
           {
             console.log(obj);
           //  console.log("mard")
           }
         //  console.log(test)
           console.log("scraping complete")

       }
       else
       {
         return console.error(error);
       }
   });
});
bot.on('disconnect', function(errMsg, code) {
    console.log(`Disconnected from Discord. Error Code ${code}. Message ${errMsg}.`)
    bot.connect();
})
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
      case 'redbull' :
      for(var i = 0 ; i < openTimeArr.length ; i++)
      {
        bot.sendMessage({to:chnl_ID,
                         message: openTimeArr[i]})
        //console.log(obj);
      //  console.log("mard")
      }

      break;
    case 'spotify' :
        //voiceID = bot.members[userID];
          console.log(bot.channels[chnl_ID].members[userID].voice_channel_id);

            bot.joinVoiceChannel(voiceID, function(err, events) {
              if (err)
                {
                  console.log("no Channel ID found")
                  bot.sendMessage({to:chnl_ID,
                                   message:'Please join a voice channel'
                                 })
                  return  console.error(err);
                }
                bot.sendMessage({to:chnl_ID,
                                 message: "Connected to: " + bot.channels[voiceID].name})
                console.log("mi deya");
              });

         break;
    case 'stopMusic':
        break;
    case 'pause' :
      break;
    case 'skip' :
    break ;
    case 'leave' :
        bot.leaveVoiceChannel(voiceID, function(err, events){
          if(err)
          {
            bot.sendMessage({to:chnl_ID,
                             message: "Not connected to a Voice Channel"})
                             return console.error(err);
          }
          bot.sendMessage({to:chnl_ID,
                           message: "Disconnected from: " + bot.channels[voiceID].name})

        });
        break;
    case 'framedata' :

        break;
        case 'characterdetails' :

        break;

   case 'quotessssssdsssss':
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
