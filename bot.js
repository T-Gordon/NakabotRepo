"use strict"
const fs = require("fs");
var Discord = require('discord.io');
var logger = require('winston'); // winston is a custom made library
var auth =  require('./auth.json');
var insult = require('./deadinsults.json');
var nakaQoutes = require('./nakaQuotes.json');
let points = JSON.parse(fs.readFileSync("./Points.json","utf8"));
var nakaIDs = require('./userIDs.json');
var ban_list = require('./strainBanList');
var serverID=  "170058625329397760"
var botInfo = ('./package.json');
var banned_list = require('./strainBanList.json');
var usedIndexList1 = [ ];
var sfryuFrameData = require('./Framedata/framedataSFV json/RyuFrameData.json')

//const Gamedig = require('gamedig');
//var requestStats = require('request-stats');
//var stats = http.createServer(...);
//var imageSearch = require('https://cse.google.com/cse/publicurl?cx=006129633008948740803:lkyx-phdzci');
//var results = imageSearch('<search-term>' , callback,0,5)
var rndNumForIQuotes ;
function pointSystemObj(userName,userID, points , level, Lrecactioncount , Discrim){
  this.userName = username;
  this.userID = userID ;
  this.points = points  ;
  this.level = level ;
  this.Lrecactioncount = Lrecactioncount;
  this.Discrim = Discrim;
};

function callback(results){
  var userImage = results;
};
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
  var test = { userid : "not change", count : 0, personName: " "} ;
  //  var tempMembers = [ ];
  var listOfMembers = [ ] ;
  var tempMembers = bot.servers[serverID].members;
  var tmpcount = 1;
  for(var member in tempMembers)
  {   test.count = tmpcount;
    test.userid = member;
    test.personName = "person " + tmpcount;
    listOfMembers.push(test);
    tmpcount++ ;
    //console.log(member);

  }
  for(var i = 0 ; i < nakaQoutes.quotesList1.length; i++)
  {
    usedIndexList1.push(i);

  }

  console.log(usedIndexList1);
  for (var i = usedIndexList1.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = usedIndexList1[i];
    usedIndexList1[i] = usedIndexList1[j];
    usedIndexList1[j] = temp;
  }

  console.log(usedIndexList1);
});
//================

function formatFrameDataTableSF(characterChoice){
var frameDataString = "+=======================================================================================+ \n+==================================  " + characterChoice + "   =====================================+\n+ Move Name | Start Up | Active Frames | Recovery Frames | on Hit | on Block | Damage | Stun | Attack Lvl | Cancel into |\n+=======================================================================================+\n";
//var moveName = "Op punch", startUp = 1,activeFrames=2,recoveryFrames=3,onHit=4,Vtrig1=5,vtrig2 =6 ,damage =99999999,stun=999999999,attacklvl='H',cancelInfo ="everything";
    switch(characterChoice)
    {
      case 'ryu':
                for(var i =0 ; i <10;i++)
                {
                  frameDataString += "|     "+ sfryuFrameData[i].MoveName + "      |      " + sfryuFrameData[i].Startup + "        |     " + sfryuFrameData[i].Active + "          |    " + sfryuFrameData[i].Recovery + "      | " + sfryuFrameData[i].OnHit + "      | " + sfryuFrameData[i].OnBlock + "      | " + sfryuFrameData[i].xxVTrigger12oH
                  frameDataString += "   | " + sfryuFrameData[i].xxVTrigger12oB + "   | " + sfryuFrameData[i].Damage +"    | " + sfryuFrameData[i].Stun + "  | " + sfryuFrameData[i].AttackLvl + "    | " + sfryuFrameData[i].CancelInto + "   |\n";

                }



      break;
      default:
      bot.sendMessage({to:chnl_ID ,

                      message: "Character doesnt exist or typo error"})


     };

    frameDataString+= "+=======================================================================================+"
return frameDataString.toString();
}

// holds the commands for the bot to execute once it reads a key (?)
//======
//=== TODO: add a fuction to edit user messages in the h channel for Nakamandem to h no matter what is said
bot.on('message', function (user, userID , chnl_ID, message, event){
  //====== checks for messages other than h in h channel (includes capital H)

  var hChannelID = "282674503618789378"; // id for 'h' channel in Nakamandem discord
  var tempChar = message.substring(0,1)
  var messID = event.d.id;
  var tmpQuote = " ";
  var quoteChnlID = "267830443183702026";
  if(chnl_ID === hChannelID && tempChar !== 'h' && message.length >= 1)
  {
    bot.deleteMessage({channelID: hChannelID , messageID : messID}, function(err){
      console.log(err);
    });
    console.log( tempChar +' message deleted'+ '(ID: ' + messID + ')');
  };
  //========================== checks for new mesages in quotes and only saves messages that start with " "
  //============ for getting quotes from channel
  var dilim = "\"";
  if(chnl_ID === quoteChnlID && tempChar == "\"")
  {
    console.log("quote saved" + message);
    console.log("old count: " + nakaQoutes.quotesList1.length);
    nakaQoutes.quotesList1.push(message);
    console.log("new count: " + nakaQoutes.quotesList1.length);
    //fs.writeFile('./nakaQuotes.json')
  };
  //======================
  /*else
  {
  console.log("no message found");
  console.log("tempchar=" + tempChar + " message = " + message);
}; */

//======================================= points system
//if()

//======

if(message.substring(0,1) === '?' && message.substring(1,1) !== '?' && message.length != 1){
  var args = message.substring(1).split(' ');
  var cmd = args[0];
  var commandList = ['ping(replies pong)', 'info(bot information)', 'stressed(replies "fuck you {user name} "")',
  'Quote(random quote form nakaquotes channel)','commands(list of commands)','insults [name/menton](sends random isult to mention/text)',
  'league sort name1 name2 nameN (randomise the list of names into 2 even teams(odd on one team, if odd num of team members))', 'bannedlist [strain name] (adds the given strain to a list of banned strains.\n If no strain name is detected sends a list of strains)'];
  var rndNum = Math.floor((Math.random()*12) + 0);
  var tmpName = " ";
  // cases used to hold the information for the execution statments
  args = args.splice(1);
  cmd = cmd.toLowerCase();
  var team1 = [ ];
  var team2 = [ ];
  var removed ;

  while(userID === nakaIDs.nakaUserIDs[rndNum])
  {
    rndNum = Math.floor((Math.random()*12)+0);
  };
  var personId = ("<@"+ nakaIDs.nakaUserIDs[rndNum] +">");
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
    for(i = 0 ; i < commandList.length ; i++ )
    {
      bot.sendMessage({
        to:chnl_ID,
        message: ' place ? infront of command' ,
        message :   commandList[i]
      });
    };
    break;
    case 'bannedlist' :
    //======= list of banned strains or adds to list
    var newBannedStrain = message.substring(12).split(" ");
    console.log(newBannedStrain);
    if(newBannedStrain.length <= 1 && newBannedStrain[0] === '')
    {
      ban_list.banList.forEach(function(strain){
        bot.sendMessage({to:chnl_ID,
          message: strain});
        });
      }
      else
      {
        ban_list.banList.push(newBannedStrain);
        bot.sendMessage({to:chnl_ID ,
          message: newBannedStrain + " ,Has been added to the banned list"});
          console.log(newBannedStrain + " added to strain ban list");
        };
        console.log(newBannedStrain.length)

        break;
        case 'combos':
        var comboType = message.substring(8).split(" ");
        if(comboType[0] === "street fighter V")
        {
          if(comboType[1] === "ryu")
          {

          }
        }
        if(comboType[0] === "tekken7")
        {
          if(comboType[1] === "king")
          {

          }
        }
        if(comboType[0] === "DBFZ")
        {
          if(comboType[1] === "goku black")
          {

          }
        }
        break;
        case 'framedata' :
        var frameDataType = message.substring(8).split(" ");
        var tmpdata = 'ryu';
        var tmptxt = formatFrameDataTableSF(tmpdata);
        //console.log(tmptxt);
        console.log(sfryuFrameData[1].MoveName);
        bot.sendMessage({to:chnl_ID, message: tmptxt});
      /*  if(frameDataType[0] === "street fighter V")
        {
          if(frameDataType[1] === "ryu")
          {
            bot.sendMessage(to:chnl_ID, message : "+==========================================================================================================================================================================================================================+ \n \
                                                  | ----------------------------------------------------------" + characterName + "-------------------------------------------------------------------------------------------------------------------------------------------|\n  \
                                                  +    Move Name    |     Start Up   |    Active Frames    |     Recovery Frames    |     on Hit    |    on Block    |   Vtrig 1/2   |    Vtrig 1/2   |    Damage     |     Stun     |     Attack Lvl    |    Cancel into     |                                                         |\n  \
                                                  +---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+\n \
                                                  | "+ moveName + " | " + startUp + "|" + activeFrames + " | " + recoveryFrames + " | " + onHit + " | " + onBlock + "|" + Vtrig1 + " | " + vtrig2 + " | " + damage +" | " + stun + " | " + attacklvl + " | " + cancelInfo + " | ")
          } */
      //}


        break;
        case 'characterdetails' :

        break;
        /*  case 'status' :
        //==== gets server info for games
        var gameChoice = message.substring(8).split(" ");
        var siteHost ;
        var nameDetected = false ;
        console.log(gameChoice);
        if(gameChoice[0] === "league")
        {
        siteHost = 'leagueoflegends.com'


        nameDetected = true;
      }
      if(gameChoice === "overwatch")
      {

    }
    if(gameChoice === "fortnite")
    {

  }
  if(gameChoice === "dbzf")
  {

}
if(nameDetected === true)
{
var requestStats = require()

}
else
{
console.log(nameDetected);
console.log("no game dectected");
};
break;
case 'onlinecount' :
break; */
case 'quotes':
if(usedIndexList1.length === 0)
{
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
}

bot.sendMessage({to:chnl_ID,
  message: nakaQoutes.quotesList1[usedIndexList1[0]]});

  removed = usedIndexList1.splice(0 , 1);

  console.log(" ")
  console.log(removed);
  console.log(usedIndexList1);

  break;
  case 'stressed':


  bot.sendMessage({to:chnl_ID,
    message: "Just fuck off  " + personId});
    break;
    case 'albumRating':
    bot.sendMessage({to:chnl_ID,
      message:tmpInfo + " is TRASSHHH "});
      break;
      case 'insult':
      var rndNumForInsults = Math.floor((Math.random()*99) + 0);
      var personName = message.substring(8).split(" ");
      bot.sendMessage({to:chnl_ID ,
        message: personName + " - " + insult.deadInsults[rndNumForInsults]});
        break;
        case 'leaguesort' :


        var membersToSort = message.substring(12).split(' '); // gets memebers to be sorted from user message
        var rndnumForSort; // random number to sort into one of 2 teams
        var countTeam1 = 0;
        var countTeam2 = 0;
        var rndMember = Math.floor((Math.random()* membersToSort.length)); // the amount of people to sort
        var maxTeamSize = membersToSort.length / 2 ;
        var rndNumCount1 = 0;
        var rndNumCount2 =0;
        if(membersToSort.length < 3)
        {
          bot.sendMessage({to:chnl_ID ,
            message: "please enter a minimum of 3 people to be sorted"});
          }
          else
          {
            membersToSort.forEach(function(teamMember){
              rndnumForSort = Math.floor((Math.random()* 2) + 1);
              if(rndNumCount1 <= maxTeamSize)
              {
                rndnumForSort = 2;

              }
              if((rndNumCount2 <= maxTeamSize))
              {
                rndnumForSort =1;
              }
              else {
                rndnumForSort = Math.floor((MAth.random()* 2)+1)
              }


              if(rndnumForSort == 1  ) // put in team 1
              {
                team1[countTeam1] = teamMember;
                countTeam1 +=1;
              };
              if(rndnumForSort == 2) // put in team 2
              {
                team2[countTeam2] = teamMember;
                countTeam2 +=1;
              };
            });

            console.log(team1);
            console.log(team2);
            console.log(team1.length+ " " + team2.length);
            //====== team1

            team1.forEach(function(member){
              bot.sendMessage({to:chnl_ID , message: "team1" + member});
            });
            //===== team2


            team2.forEach(function(member){
              bot.sendMessage({to:chnl_ID , message: "team 2" + member});
            });

          }
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
