const fs = require('fs');
const cp = require('child_process');
const path = require('path');
const ffmpeg = require('ffmpeg-static');

const srcJpg = path.join(__dirname, '..', 'public', 'images', 'achievements-document-vertical.jpg');
const rawIn = path.join(__dirname, 'in.raw');
const rawOut = path.join(__dirname, 'out.raw');
const outJpg = path.join(__dirname, 'shortened_test.jpg');

// 1. Decode to raw RGB24
cp.execFileSync(ffmpeg, ['-i', srcJpg, '-f', 'rawvideo', '-pix_fmt', 'rgb24', rawIn, '-y']);

const width = 640;
const origHeight = 900;
const rowBytes = width * 3;
const buf = fs.readFileSync(rawIn);

// We want to shorten by 220px: from 900 down to 680px.
// Top section: rows 0 to 460 (460 rows)
// Blend section: rows 460 to 520 (60 rows) blended with rows 680 to 740 of original
// Bottom section: rows 740 to 900 (160 rows)
// Total output rows: 460 + 60 + 160 = 680 rows!

const outRows = 680;
const outBuf = Buffer.alloc(width * outRows * 3);

// Copy top section: 0 to 460
buf.copy(outBuf, 0, 0, 460 * rowBytes);

// Blend section: 60 rows
for (let r = 0; r < 60; r++) {
  const t = r / 59; // 0 at top, 1 at bottom
  const topRowIdx = 460 + r;
  const botRowIdx = 680 + r;
  const outRowIdx = 460 + r;

  for (let c = 0; c < width * 3; c++) {
    const topVal = buf[topRowIdx * rowBytes + c];
    const botVal = buf[botRowIdx * rowBytes + c];
    outBuf[outRowIdx * rowBytes + c] = Math.round((1 - t) * topVal + t * botVal);
  }
}

// Copy bottom section: rows 740 to 900 (160 rows)
buf.copy(outBuf, (460 + 60) * rowBytes, 740 * rowBytes, 900 * rowBytes);

fs.writeFileSync(rawOut, outBuf);

// 2. Encode to high-quality JPG
cp.execFileSync(ffmpeg, [
  '-f', 'rawvideo',
  '-pix_fmt', 'rgb24',
  '-s', `${width}x${outRows}`,
  '-i', rawOut,
  '-q:v', '2',
  outJpg,
  '-y'
]);

console.log('Successfully created shortened_test.jpg with height 680px');
