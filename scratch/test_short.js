const cp = require('child_process');
const ffmpeg = require('ffmpeg-static');
const path = require('path');

const src = path.join(__dirname, '..', 'public', 'images', 'achievements-document-vertical.jpg');
const dst = path.join(__dirname, 'test_short.png');

// Crop top part: 0 to 520 (w=640, h=520)
// Crop bottom part: 740 to 900 (w=640, h=160, y=740)
// vstack them -> total height 680
const filter = "[0:v]crop=640:520:0:0[top];[0:v]crop=640:160:0:740[bot];[top][bot]vstack=inputs=2[out]";

cp.execFileSync(ffmpeg, ['-i', src, '-filter_complex', filter, '-map', '[out]', dst, '-y']);
console.log('Created test_short.png');
