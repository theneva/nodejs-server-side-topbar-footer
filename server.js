const fs = require('fs');
const fetchTopbar = require('./fetch-topbar');
const cheerio = require('cheerio');

function fetchIndex() {
  return new Promise((resolve, reject) => {
    fs.readFile('./index.html', 'utf8', (err, index) => {
      if (err) {
        return reject(err);
      }

      return resolve(index);
    });
  });
}

function handle(token) {
  const eventualTopbar = fetchTopbar(token);
  fetchIndex()
    .then(index => [eventualTopbar, cheerio.load(index)])
    .then(([eventualTopbar, $]) => eventualTopbar.then(topbarHtml => {
      $('#topbar').html(topbarHtml);
      return $.html();
    }))
    .then(console.log)
    .catch(console.error);
}

handle('a super secret token');
