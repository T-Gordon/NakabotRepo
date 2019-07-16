"use strict"
//----- Golbal declarations
global.servers = {queue: []};
global.teams = {team1: [], team2:[]};
global.gConnection;
//----- modules
const {CommandoClient} = require('discord.js-commando');
const fs = require("fs");
const path = require("path");
var winston = require('winston');
var auth =  require('./auth.json');
var rbOpenTimes = require('./WebScraping\\WebScraping.js');

//----- configure logger settings
const logger =  winston.createLogger({
  transports:
  new winston.transports.Console(),
  format: winston.format.combine(
    winston.format.colorize({all:true}),
    winston.format.simple()
  )
});

//----- Log File Creation
var day = new Date();
const logFiledir = "logs\\errorLogs: ";
fs.appendFile(logFiledir,day +" Logs" , function er(err){
  if(err)throw err;
  console.log('File Created');
});

const errorLogger = winston.createLogger({
    transports:[
      new winston.transports.Console(),
      new winston.transports.File({filename: logFiledir})
   ]
});

logger.log('error', "Updated");
logger.level = 'debug';

//--- Web Scraping check
async function webScrapingFunc (){
  await   rbOpenTimes();
  console.log("All scraping complete");
};

// initialize discord bot
const bot = new CommandoClient({
  commandPrefix: '?',
  owner: auth.IDs.myID,
  disableEveryone: true,
  unknownCommandResponse: false
});

// Registers the command folders containing the commands
 bot.registry
   .registerDefaultTypes()
   .registerGroups([
     ['misc', 'Misc'],
     ['music','Music commands'],
     ['tounement', 'Tournement Commands'],
     ['redbull', 'Redbull Openingtimes'],
     ['framedata', 'Framedata commands'],
     ['patchnotes', 'Patch note commands'],
     ['image', 'Search image commands']
   ])
   .registerDefaultGroups()
   .registerDefaultCommands({help: false})
	 .registerCommandsIn(path.join(__dirname, 'commandsForBot'));

bot.login(auth.token)

bot.on('ready' , function () {
  logger.info('Connected');
  logger.info('logged in as:Nakabot');
  webScrapingFunc();
});


bot.on('disconnect', function(errMsg, code) {
    console.log(`Disconnected from Discord. Error Code ${code}. Message ${errMsg}.`)
    if(msg.guild.voiceChannel) msg.guild.voiceConnection.disconnect(); ;
    bot.connect();
})

bot.on('message', message => {
      if(message.author.bot) return;
      if (!message.content.startsWith('?')) return;

    });
bot.on('error', err => {
  console.log(error);
});
