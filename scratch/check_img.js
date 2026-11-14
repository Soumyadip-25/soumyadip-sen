const cp = require('child_process');
const ffmpeg = require('ffmpeg-static');
const path = require('path');

const src = path.join(__dirname, '..', 'public', 'images', 'achievements-document-vertical.jpg');
const dst = path.join(__dirname, 'sample.png');

cp.execFileSync(ffmpeg, ['-i', src, '-vf', 'scale=320:-1', dst, '-y']);
console.log('Saved to', dst);
