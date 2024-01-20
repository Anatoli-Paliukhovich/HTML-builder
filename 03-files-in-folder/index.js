const fs = require('fs');
const path = require('path');

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, files) => {
    if (err) {
      throw err;
    } else {
      files.forEach((file) => {
        if (file.isFile()) {
          fs.stat(
            path.join(__dirname, `secret-folder/${file.name}`),
            (err, stats) => {
              if (err) {
                console.error(err);
                return;
              }
              const fileName = file.name.split('.')[0];
              const fileSize = stats.size;
              const fileExt = path.extname(file.name).slice(1);
              console.log(`${fileName} - ${fileExt} - ${fileSize}b`);
            },
          );
        }
      });
    }
  },
);

/*
//The second implementation of the task
const fs = require('fs/promises');
const path = require('path');
async function readFilesInfo() {
  try {
    const files = await fs.readdir(path.join(__dirname, 'secret-folder'), {
      withFileTypes: true,
    });
    for (const file of files) {
      if (file.isFile()) {
        const fileName = file.name.split('.')[0];
        const fileExt = path.extname(file.name).slice(1);
        const fileInfo = await fs.stat(
          path.join(__dirname, `secret-folder/${file.name}`),
        );
        const fileSize = fileInfo.size;
        console.log(`${fileName} - ${fileExt} - ${fileSize}b`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}
readFilesInfo();
*/
