const fs=require('fs'),path=require('path'),vm=require('vm');const root=__dirname,read=file=>fs.readFileSync(path.join(root,file),'utf8');
const html=read('template.html').replace('/* STYLES */',()=>read('style.css')+'\n'+read('mobile.css')).replace('/* CHARACTER */',()=>read('model.js')).replace('/* GAME */',()=>['audio.js','game.js','render.js'].map(read).join('\n'));
for(const match of html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(match[1]);
fs.writeFileSync(path.join(root,'index.html'),html);console.log('Built standalone index.html');
