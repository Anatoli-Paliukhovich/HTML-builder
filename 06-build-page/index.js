const fs = require('fs');
const path = require('path');

//Create project-dist folder
fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) {
    throw err;
  }
});

//Bundle all styles and put it to project-dist folder
let dataArr = [];

const writableStream = fs.createWriteStream(
  path.join(__dirname, 'project-dist', 'style.css'),
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

//Replace tags in template
fs.readFile(path.join(__dirname, 'template.html'), 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  let tags = data.match(/{{(.*?)}}/g);
  tags.filter((tag) => {
    let tagName = tag.slice(2).slice(0, -2);
    fs.readFile(
      path.join(path.join(__dirname, 'components', tagName + '.html')),
      'utf8',
      (err, componentsData) => {
        if (err) {
          throw err;
        } else {
          data = data.replace(tag, componentsData);
          fs.writeFile(
            path.join(path.join(__dirname, 'project-dist', 'index.html')),
            data,
            'utf8',
            (err) => {
              if (err) {
                throw err;
              }
            },
          );
        }
      },
    );
  });
});

//Copy assets folder
const input = path.join(__dirname, 'assets');
const output = path.join(__dirname, 'project-dist', 'assets');
function copyDir(input, output) {
  fs.readdir(input, { withFileTypes: true }, (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach((file) => {
      const inputPath = path.join(input, file.name);
      const outputPath = path.join(output, file.name);
      if (file.isDirectory()) {
        fs.mkdir(outputPath, { recursive: true }, (err) => {
          if (err) {
            throw err;
          } else {
            copyDir(inputPath, outputPath);
          }
        });
      } else {
        fs.copyFile(inputPath, outputPath, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    });
  });
}

copyDir(input, output);

//Delete files in project-dist
(function deleteDir() {});
