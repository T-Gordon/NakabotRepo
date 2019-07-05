const request = require('request');
const cheerio = require('cheerio');

request('https://en.bandainamcoent.eu/tekken/news/tekken-7-patch-note-220', (error,
    response, html) => {
    if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        const fieldHEading = $('.views-field views-field-title-field-et');
        console.log(fieldHEading);
       // console.log(fieldHEading.text());
    }
});