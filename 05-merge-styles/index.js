const fs = require('fs');
const path = require('path');
let dataArr = [];

const writableStream = fs.createWriteStream(
  path.join(__dirname, 'project-dist', 'bundle.css'),
  'utf-8',
);
writableStream.on('open', () => {});

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if (err) {
    throw err;
  } else {
    files.forEach((file) => {
      if (path.extname(file) === '.css') {
        fs.readFile(
          path.join(__dirname, 'styles', file),
          'utf8',
          (err, data) => {
            if (err) {
              throw err;
            } else {
              dataArr.push(data);
              writableStream.write(data, 'utf-8', (err) => {
                if (err) {
                  throw err;
                } else {
                  writableStream.close();
                }
              });
            }
          },
        );
      }
    });
  }
});
