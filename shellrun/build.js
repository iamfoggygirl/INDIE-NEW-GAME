#!/usr/bin/env node
// Inlines src/*.js into one self-contained page: dist/index.html (+ dist/artifact.html for publishing).
const fs = require('fs'), path = require('path');
const src = path.join(__dirname, 'src');
const order = ['core.js', 'look.js', 'world.js', 'models.js', 'game.js', 'ui.js'];
const code = order.map((f) => `/* ---- ${f} ---- */\n` + fs.readFileSync(path.join(src, f), 'utf8')).join('\n');
const html = fs.readFileSync(path.join(src, 'template.html'), 'utf8').replace('/*__SRC__*/', () => code);
fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), html);
// artifact variant: the host supplies doctype/head/body, so ship title + style + body content only
const style = html.match(/<style>[\s\S]*?<\/style>/)[0];
const body = html.match(/<body>([\s\S]*)<\/body>/)[1];
fs.writeFileSync(path.join(__dirname, 'dist', 'artifact.html'), '<title>Shell Run</title>\n' + style + '\n' + body);
for (const f of fs.existsSync(path.join(__dirname, 'static')) ? fs.readdirSync(path.join(__dirname, 'static')) : []) fs.copyFileSync(path.join(__dirname, 'static', f), path.join(__dirname, 'dist', f));
console.log('built dist/index.html', (html.length / 1024).toFixed(0) + ' KB');
