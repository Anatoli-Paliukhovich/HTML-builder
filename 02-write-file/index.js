const fs = require('fs');
const readline = require('readline');
const path = require('path');

const writableStream = fs.createWriteStream(
  path.join(__dirname, 'text2.txt'),
  'utf-8',
);
writableStream.on('open', () => {
  console.log('Please, write some lines!');
});
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Goodbye! See you later!');
    writableStream.destroy();
    process.exit();
  } else {
    writableStream.write(`${input}\n`);
  }
});
rl.on('SIGINT', () => {
  console.log('Goodbye! See you later!');
  writableStream.destroy();
  process.exit();
});
