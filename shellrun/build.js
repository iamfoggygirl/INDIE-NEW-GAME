#!/usr/bin/env node
// Inlines src/*.js into one self-contained page: dist/index.html (+ dist/artifact.html for publishing).
const fs = require('fs'), path = require('path');
const src = path.join(__dirname, 'src');
const order = ['core.js', 'look.js', 'world.js', 'models.js', 'game.js', 'ui.js'];
const code = order.map((f) => `/* ---- ${f} ---- */\n` + fs.readFileSync(path.join(src, f), 'utf8')).join('\n');
// fonts are embedded so the game looks right on the first frame, offline, and inside the future app
const FONT = [['Fredoka', 600, 'fredoka-latin-600-normal'], ['Fredoka', 700, 'fredoka-latin-700-normal'], ['Nunito', 700, 'nunito-latin-700-normal'], ['Nunito', 800, 'nunito-latin-800-normal'], ['Lilita One', 400, 'lilita-one-latin-400-normal']];
const fontCss = FONT.map(([f, w, file]) => `@font-face{font-family:"${f}";font-weight:${w};font-style:normal;font-display:block;src:url(data:font/woff2;base64,${fs.readFileSync(path.join(__dirname, 'fonts', file + '.woff2')).toString('base64')}) format("woff2")}`).join('\n');
const html = fs.readFileSync(path.join(src, 'template.html'), 'utf8').replace('/*__FONTS__*/', () => fontCss).replace('/*__SRC__*/', () => code);
fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), html);
// artifact variant: the host supplies doctype/head/body, so ship title + style + body content only
const style = html.match(/<style>[\s\S]*?<\/style>/)[0];
const body = html.match(/<body>([\s\S]*)<\/body>/)[1];
fs.writeFileSync(path.join(__dirname, 'dist', 'artifact.html'), '<title>Shell Run</title>\n' + style + '\n' + body);
for (const f of fs.existsSync(path.join(__dirname, 'static')) ? fs.readdirSync(path.join(__dirname, 'static')) : []) fs.copyFileSync(path.join(__dirname, 'static', f), path.join(__dirname, 'dist', f));
console.log('built dist/index.html', (html.length / 1024).toFixed(0) + ' KB');
