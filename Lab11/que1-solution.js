// Create a simple Node script that converts 'www.miu.edu' domain name to the equivalent IP address. 
const dns = require('dns'); 

dns.resolve4('www.miu.edu', (err,address) => {
    if(!err){
        console.log(address);
    } else {
        console.log("There is no such address.")
    }
});

