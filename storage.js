'use strict';

const fs = require('fs');

const writeCache = {};

async function storeComment(comment) {
  const key = encodeURIComponent(comment.itemId);
  if (!writeCache[key]) {
    writeCache[key] = fs.createWriteStream(`./comments/${key}.jsonl`, {
      flags: 'a',
    });
  }

  return new Promise((resolve, reject) => {
    writeCache[key].write(`${JSON.stringify(comment)}\n`, 'utf8', (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

async function readComments(itemId) {
  const key = encodeURIComponent(itemId);
  const data = await new Promise((resolve, reject) => {
    fs.readFile(`./comments/${key}.jsonl`, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
  return data
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => JSON.parse(line));
}

module.exports = {
  storeComment,
  readComments,
};
