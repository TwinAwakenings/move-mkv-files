const path = require('path');
const fse = require('fs-extra');

// Function to recursively traverse a directory
function traverseDirectory(directoryPath, callback) {
    const files = fse.readdirSync(directoryPath);

    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const isDirectory = fse.statSync(filePath).isDirectory();

        if (isDirectory) {
            traverseDirectory(filePath, callback);
        } else {
            callback(filePath);
        }
    });
}

// Function to move MKV files to a specified folder
function moveMKVFiles(sourceFolder, destinationFolder) {
    traverseDirectory(sourceFolder, filePath => {
        if (path.extname(filePath).toLowerCase() === '.mkv') {
            const destinationPath = path.join(destinationFolder, path.basename(filePath));
            fse.move(filePath, destinationPath, err => {
                if (err) {
                    console.error(`Error moving ${filePath}: ${err}`);
                } else {
                    console.log(`Moved ${filePath} to ${destinationPath}`);
                }
            });
        }
    });
}

// Specify the source folder and destination fold
const sourceFolder = path.join(__dirname, "./source");  // Replace with your actual source folder
const destinationFolder = path.join(__dirname, "./out/");  // Replace with your actual destination folder

// Move MKV files
moveMKVFiles(sourceFolder, destinationFolder);
