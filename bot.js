"use strict"
//----- modules used
global.servers ={};
const fs = require("fs");
const path = require("path");
const {CommandoClient} = require('discord.js-commando');
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
var commandList =require('./information\\jsonFiles\\botCommandsJSON.json');
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
  //await   rbOpenTimes();
  console.log("All scraping complete");
}
logger.log('error', "Updated")
/*logger.remove(logger.transports.Console);
logger.add(logger.transports.Console,{
  colorize : true
});*/
logger.level = 'debug';

// initialize discord bot

const bot = new CommandoClient({
  commandPrefix: '?',
  owner: auth.IDs.myID,
  disableEveryone: true,
  unknownCommandResponse: false

});
 bot.registry
   .registerDefaultTypes()
   .registerGroups([
     ['misc', 'Misc'],
     ['music','Music commands'],
     ['tounement', 'Tournement Commands'],
     ['redbull', 'Redbull Openingtimes'],
     ['framedata', 'Framedata commands'],
     ['patchnotes', 'Patch note commands']
   ])
   .registerDefaultGroups()
   .registerDefaultCommands({help: false})
	 .registerCommandsIn(path.join(__dirname, 'commandsForBot'));

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
bot.on('error', console.error);
bot.on('disconnect', function(errMsg, code) {
    console.log(`Disconnected from Discord. Error Code ${code}. Message ${errMsg}.`)
    if(msg.guild.voiceChannel) msg.guild.voiceConnection.disconnect(); ;
    bot.connect();
})

//=== TODO: add a fuction to edit user messages in the h channel for Nakamandem to h no matter what is said

bot.on('message', message => {
      if(message.author.bot) return;
      if (!message.content.startsWith('?')) return;

    });
