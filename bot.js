"use strict"
//----- modules used
global.servers ={};
const fs = require("fs");
const path = require("path");
const Commando = require('discord.js-commando');
//var Discord = require('discord.js');
var winston = require('winston'); // winston is a custom made library
var auth =  require('./auth.json');
var request = require('request');
var cheerio = require('cheerio');
var rbOpenTimes = require('./WebScraping\\WebScraping.js');
//var voiceChnCommands = require('./commandsForBot\\botCommands\\voiceChannelCommands.js');
//var textChnCommands = require('./commandsForBot\\botCommands\\textChannelCommands.js');
//------- Json files)
var insults = require('./deadinsults.json');
//var commandList =require('./commandsForBot\\jsonFiles\\botCommandsJSON.json');
var botInfo = require('./package.json');
var rndNumForIQuotes ;
var tmpQuote;
var dilim = "\"";
var teamSort1 = [ ];
var teamSort2 = [ ];
var removed;
var nakaVoiceChannelIDs = auth.IDs;
var dankVoiceChannelIDS = auth.IDs;
var openTimeData;
var openTimeArr = [];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var invalidInputCount = 0;
// code used to configure logger settings
const logger =  winston.createLogger({
  transports:
  new winston.transports.Console(),
  format: winston.format.combine(
    winston.format.colorize({all:true}),
    winston.format.simple()
  )
});
var day = new Date();
const logFiledir = "logs\\errorLogs: " + days[day.getUTCDay()] + " " + day.getUTCFullYear();

fs.appendFile(logFiledir,day +" Logs" , function er(err){
  if(err)throw err;
  console.log('File Created');
})
const errorLogger = winston.createLogger({
    transports:[
      new winston.transports.Console(),
      new winston.transports.File({filename: logFiledir})
   ]
})
async function webScrapingFunc (){
  await   rbOpenTimes();
  console.log("All scraping complete");
}
logger.log('error', "Updated")
/*logger.remove(logger.transports.Console);
logger.add(logger.transports.Console,{
  colorize : true
});*/
logger.level = 'debug';

// initialize discord bot

var bot = new Commando.Client();
bot.registry.registerGroup('botcommands', 'botCommands');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn('./commandsForBot');
bot.login(auth.token)
bot.on('ready' , function () {
  logger.info('Connected');
  logger.info('logged in as: ');
  logger.info(botInfo.name + ' - (' + botInfo.version +')');
  errorLogger.info('info',botInfo.name + ' - (' + botInfo.version +')');
  webScrapingFunc();

   console.log("bot on")
   //--- gets all the vocie channel IDs for Nakamandem discord

});
bot.on('disconnect', function(errMsg, code) {
    console.log(`Disconnected from Discord. Error Code ${code}. Message ${errMsg}.`)
    bot.connect();
})

//=== TODO: add a fuction to edit user messages in the h channel for Nakamandem to h no matter what is said

bot.on('message', message => {
  var prefix = message.content.substring(0,1);
  if(prefix === '?' && message.content.length > 1)
    {
      var fullMessage = message.content.substring(1).split(' ');
      var cmd = fullMessage[0].toLowerCase();
      var rndNum = Math.floor((Math.random()*12) + 0);
      var tmpName;
  // cases used to hold the information for the execution statments
    //cmd = cmd.toLowerCase();
//  var personId = ("<@"+ nakaIDs.nakaUserIDs[rndNum] +">");
    switch(cmd){
    //== a simple ping pong command
          case 'ping':

            console.log("pong");
            message.channel.send('pong');
            break;
          case 'info':
          //=== bot info
            message.channel.send("Bot Name: " + botInfo.name + "\n"+
                                "Bot Version: " + botInfo.version)
            break;
          case 'commands':
          //====== gives list of commands
            message.channel.send(commandList.commands)
            break;
          case 'redbull' :
            message.channel.send("TO:do no info found")
            message.channel.send("Never been updated ")
            break;
          case 'playMusic' :


            break;
          case 'stopMusic':

          case 'leave' :

            break;
          default :
          console.log("invalid input")
          invalidInputCount++;
          if(invalidInputCount > 10 ){
            invalidInputCount =0;
            message.channel.send("Use ?commands for a list of commands");
          }
          break;
          //====== if no input is detected
        }
      }
    });
