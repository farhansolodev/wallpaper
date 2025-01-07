const fs = require('fs');
const path = require('path');

const ROOT_DIR = './';
const README_FILENAME = 'README.md';
const NB_IMAGES_PER_LINE = 4;
const IMAGE_EXTENSIONS = ['.jpg', '.webp', '.jpeg', '.png', '.gif', '.bmp', '.svg'];

let nbImages = 0;
let mdContent = '<table><tr>';

// Read directory and filter out non-image files and .git folder
const files = fs.readdirSync(ROOT_DIR)
  .filter(file => {
    const isGitFolder = file === '.git';
    const isReadme = file === README_FILENAME;
    const isImage = IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase());
    return !isGitFolder && !isReadme && isImage;
  })
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
<img src="./${image}" width="200"><br>
${image}
</td>`;
});

mdContent += '\n</tr></table>';
fs.writeFileSync(path.join(ROOT_DIR, README_FILENAME), mdContent);
