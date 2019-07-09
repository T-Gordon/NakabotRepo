const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const filePath = "C:\\Users\\damia\\Documents\\programming\\bots\\Nakabot\\information\\redBull\\openingTimes"

let openTimeArr = []
module.exports = function openingTimesScraper (){
  request('https://www.redbull.com/gb-en/projects/gaming-sphere/sphere-opening-times', (error,
      response, html) => {
      if (!error && response.statusCode == 200) {

        const $ = cheerio.load(html);
        const openingTimeTable = $('.caption-and-content-layout');

              openingTimeTable.find('span').each(function findTimes(i,elem){

               openTimeArr[i] = $(this).text();

             });
            // console.log(openTimeOb.openTime);
            // openTimeArr.push(openTimeOb);
          //   console.log("pushed too temp, new length: " + openTimeArr.length);

          try{
            fs.writeFile(filePath, JSON.stringify(openTimeArr))
          }catch(err){
            console.error(err);
          }
        //  console.log(temp.length);
          return console.log("scraping complete");

      }
      else
      {
        return console.error(error);
      }
  });

}
