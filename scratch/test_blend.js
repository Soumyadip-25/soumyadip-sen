const cp = require('child_process');
const ffmpeg = require('ffmpeg-static');
const path = require('path');

const src = path.join(__dirname, '..', 'public', 'images', 'achievements-document-vertical.jpg');
const dst = path.join(__dirname, 'blend_short.png');

// Use -frames:v 1
const filter = `[0:v]crop=640:550:0:0[top];[0:v]crop=640:220:0:680,format=rgba[bot_raw];color=black@0.0:s=640x60,format=rgba[t0];color=black@1.0:s=640x160,format=rgba[t1];[t0][t1]vstack[bot_mask];[bot_raw][bot_mask]alphamerge[bot];[top]pad=640:700:0:0[canvas];[canvas][bot]overlay=0:480[out]`;

cp.execFileSync(ffmpeg, ['-i', src, '-filter_complex', filter, '-map', '[out]', '-frames:v', '1', dst, '-y']);
console.log('Success creating blend_short.png');
