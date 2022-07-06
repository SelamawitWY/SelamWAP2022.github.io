const path = require('path');
const fs = require('fs');
const http = require('http');

let fileName = 'happy.jpeg'; 
/**  readFile synchronous  */
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    try {
       let src = fs.readFileSync(path.join(__dirname, fileName))
       res.end(src);
    } catch (error) {
       console.log('no such file 1');
    }
}).listen(3000, '127.0.0.1', () => { console.log('listening on 3000...') });

/**  readFile asynchronous */
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    fs.readFile(path.join(__dirname, fileName) , (err, data) => {
       if(err){
           console.log('no such file 2');
       }
       else {
           res.end(data);
       }
     }); 
}).listen(4000, '127.0.0.1', () => { console.log('listening on 4000...') });

/**  using file stream  */
http.createServer().on('request', (req, res) => {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        const src = fs.createReadStream(path.join(__dirname, fileName)); 
        src.on('error', function(err) {
            console.log("File not found!");
           }).pipe(res);
}).listen(5000, '127.0.0.1', () => { console.log('listening on 5000...') });



