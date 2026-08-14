const http=require('http'),fs=require('fs'),path=require('path');
const PORT=process.env.PORT||8151, HOST='0.0.0.0';
const DB_FILE=path.join(__dirname,'db.json');
function loadFile(){try{return JSON.parse(fs.readFileSync(DB_FILE,'utf8'))||{}}catch(e){return{}}}
function saveFile(d){try{fs.writeFileSync(DB_FILE,JSON.stringify(d))}catch(e){}}
let db=loadFile();
const server=http.createServer((req,res)=>{
  const url=new URL(req.url,'http://x');
  if(url.pathname==='/api/db'){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');
    if(req.method==='OPTIONS'){res.end();return;}
    if(req.method==='GET'){res.setHeader('Content-Type','application/json;charset=utf-8');res.end(JSON.stringify(db));return;}
    if(req.method==='POST'){let b='';req.on('data',c=>b+=c);req.on('end',()=>{try{db=JSON.parse(b);saveFile(db);res.setHeader('Content-Type','application/json');res.end('{"ok":true}')}catch(e){res.statusCode=500;res.end('{"err":1}')}});return;}
    res.statusCode=405;res.end();return;
  }
  let fp=path.join(__dirname,decodeURIComponent(url.pathname));
  if(url.pathname==='/'||!fs.existsSync(fp))fp=path.join(__dirname,'system-class-checkin.html');
  fs.readFile(fp,(e,data)=>{if(e){res.statusCode=404;res.end('404 not found');return}
    const ext=path.extname(fp);
    const ct=ext==='.html'?'text/html;charset=utf-8':ext==='.js'?'text/javascript;charset=utf-8':ext==='.json'?'application/json;charset=utf-8':ext==='.css'?'text/css;charset=utf-8':'text/plain;charset=utf-8';
    res.setHeader('Content-Type',ct);res.end(data)});
});
server.listen(PORT,HOST,()=>console.log('系统班工作台服务器已启动: http://'+HOST+':'+PORT+'  本机IP访问: http://192.168.0.17:'+PORT));
