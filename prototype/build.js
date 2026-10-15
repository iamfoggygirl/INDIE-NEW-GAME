#!/usr/bin/env node
// Inlines engine + levels into one self-contained file: prototype/dist/index.html (works offline, no server needed).
const fs = require('fs'), path = require('path');
const src = path.join(__dirname, 'src');
let html = fs.readFileSync(path.join(src, 'index.template.html'), 'utf8');
html = html.replace('/*__ENGINE__*/', () => fs.readFileSync(path.join(src, 'engine.js'), 'utf8'))
           .replace('/*__LEVELS__*/', () => fs.readFileSync(path.join(src, 'levels.js'), 'utf8'));
fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), html);
console.log('built dist/index.html', (html.length / 1024).toFixed(0) + ' KB');

// Artifact variant: the host wraps the page in its own doctype/head/body, so ship only title + style + body content.
{
  const full = fs.readFileSync(path.join(__dirname, 'dist', 'index.html'), 'utf8');
  const style = full.match(/<style>[\s\S]*?<\/style>/)[0]
    .replace('#app{position:relative;margin:0 auto;height:100dvh;', '#app{position:relative;margin:0 auto;height:100%;')
    .replace('.screen{position:absolute;inset:0;display:flex;flex-direction:column;padding:env(safe-area-inset-top) 0 env(safe-area-inset-bottom)}', '.screen{position:absolute;inset:0;display:flex;flex-direction:column}')
    .replace('html,body{margin:0;height:100%;', 'html,body{margin:0;height:100%;background:#2b2118;');
  const body = full.match(/<body>([\s\S]*)<\/body>/)[1];
  fs.writeFileSync(path.join(__dirname, 'dist', 'artifact.html'), '<title>Harvest Sow</title>\n' + style + '\n' + body);
  console.log('built dist/artifact.html');
}
