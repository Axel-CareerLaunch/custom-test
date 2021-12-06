var http = require('https');
var fs = require("fs");
var url = require('url')
var port = 3001

 
let options = {
  key : fs.readFileSync('localhost-key.pem'),
  cert : fs.readFileSync('localhost.pem'),
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


  console.log({
    path,
    headers
  })
  

  if( !fs.existsSync(path) ){
    res.writeHead(404, headers)
    res.write('Not found')
    return res.end()
  }


  
  fs.readFile(path, function(err, data){
    res.writeHead(200, headers);
    res.write(data);
    res.end();
  });

}).listen(port);

console.log('serving on port ' + port);