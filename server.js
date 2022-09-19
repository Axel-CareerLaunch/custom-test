var http = require('https');
var fs = require("fs");
var url = require('url')
var port = 3001


const readFile = path => {
  try {
    return fs.readFileSync(path)
  } catch (error) {
    console.error(error)
    return ''
  }
}
 
let options = {
  key: readFile('localhost-key.pem'),
  cert: readFile('localhost.pem'),
}

if( !options.key || !options.cert ){
  return console.log(`
    No SSL cert or key provided!\r
    To serve your custom content files via an https, URL you will need to generate an SSL cert and key.\r
    We recommend using mkcert to do this.. https://github.com/FiloSottile/mkcert
  `)
}

const watchPath = (req, res, path) => {

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  fs.watchFile(path, { interval : 300 }, (data) => {
    console.log('file changed', { path })

    res.write(`event: fileChanged\ndata: ${path}\n\n`);
    
  });

  res.write(`event: watchingFile\ndata:\n\n`);
  
}

http.createServer(options, function(req, res) {


  let _url = url.parse( req.url )

  let path = _url.pathname.split('/').filter( p  => p )

  if( path.length === 1 ){
    path.push( 'index.vue' )
  }
 
  path = path.join('/')

  const mimetype = path.endsWith('html') ? 'html' : 'plan'

  let headers = {
    'Content-Type': `text/${mimetype}; charset=utf-8`,
    'Access-Control-Allow-Origin': '*'
  }  

  if( !fs.existsSync(path) ){
    res.writeHead(404, headers)
    res.write('Not found')
    return res.end()
  }

  if ( (_url.query || '').includes('watch=true') ) {
    return watchPath(req, res, path);
  }
  
  fs.readFile(path, function(err, data){
    res.writeHead(200, headers);
    res.write(data);
    res.end();
  });


}).listen(port);

console.log('serving on port ' + port);