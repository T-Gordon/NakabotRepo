const request = require('request');
const cheerio = require('cheerio');
//const charac
var patchNotes = { "itemName":"",
                   "Move":
                      {"moveName": " ",
                        "patchNote": []
                      }
                  };
var gameName =  " ";
//var test = { "dragonballFighters" :[]};
var itemName;
var moveName;
var patch_note;
var temptext;
var num = 0;
var obj;
var test;
var temp= [];
//var temp1 = [];
//var temp2 = [];
request('https://www.redbull.com/gb-en/projects/gaming-sphere/sphere-opening-times', (error,
    response, html) => {
    if (!error && response.statusCode == 200) {

      const $ = cheerio.load(html);
      const openingTimeTable = $('.data-table__table-body');
         openingTimeTable.find('tr').each( function(i, elem){
           test  =  $(this).find('.data-table__column-data').text()
          // console.log(test);
           temp.push(test);
           console.log("pushed too temp, new length: " + temp.length);
        })
        console.log(temp.length);
        for(let obj of temp)
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
