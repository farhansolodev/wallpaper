const fs = require('fs');
const path = require('path');

const IMAGES_DIR = './images';
const README_FILENAME = 'README.md';
const NB_IMAGES_PER_LINE = 4;
const IMAGE_EXTENSIONS = ['.jpg', '.webp', '.jpeg', '.png', '.gif', '.bmp', '.svg'];

let nbImages = 0;
let mdContent = '<table><tr>';

// Create images directory if it doesn't exist
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR);
}

// Read images directory and filter non-image files
const files = fs.readdirSync(IMAGES_DIR)
  .filter(file => IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase()))
  .sort();

files.forEach((image) => {
  if (!(nbImages % NB_IMAGES_PER_LINE)) {
    if (nbImages > 0) {
      mdContent += '\n</tr>';
    }
    mdContent += '\n<tr>';
  }
  nbImages++;
  mdContent += `
<td valign="bottom">
<img src="./images/${image}" width="200"><br>
${image}
</td>`;
});

mdContent += '\n</tr></table>';
fs.writeFileSync(README_FILENAME, mdContent);
