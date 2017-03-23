const fs = require('fs');
const fetchTopbar = require('./fetch-topbar');
const fetchFooter = require('./fetch-footer');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

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

async function handle(token) {
  const eventualTopbar = fetchTopbar(token);
  const eventualFooter = fetchFooter(token);

  const index = await fetchIndex();
  const $ = cheerio.load(index);

  $('#topbar').html(await eventualTopbar);
  $('#footer').html(await eventualFooter);

  return $.html();
}

app.get('/:token', async (req, res) => res.send(await handle(req.params.token)));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on port', port));
