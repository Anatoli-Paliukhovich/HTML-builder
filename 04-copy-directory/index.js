const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) {
    throw err;
  }
});
function copyDir() {
  fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    if (err) {
      throw err;
    } else {
      files.forEach((file) => {
        fs.copyFile(
          path.join(__dirname, 'files', file),
          path.join(__dirname, 'files-copy', file),
          (err) => {
            if (err) {
              throw err;
            }
          },
        );
      });
    }
  });
}

function deleteFiles() {
  fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
    if (err) {
      throw err;
    } else {
      files.forEach((file) => {
        fs.unlink(path.join(__dirname, 'files-copy', file), (err) => {
          if (err) {
            throw err;
          }
        });
      });
    }
  });
}
deleteFiles();
copyDir();
