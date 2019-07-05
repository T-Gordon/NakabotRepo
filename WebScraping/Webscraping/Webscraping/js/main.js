const request = require('request');
const cheerio = require('cheerio');

request('https://www.google.com', (error,
    response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const fieldHEading = $('.views-field views-field-title-field-et');
        //console.log(fieldHEading.html());
        // console.log(fieldHEading.text());
        const output = 
    }
});