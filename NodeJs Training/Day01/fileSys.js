import fs from'fs';
import { CLIENT_RENEG_LIMIT } from 'tls';

const data = fs.readFileSync('./abc.txt','utf-8');

fs.writeFile('message.txt','Hello World!',(err) =>{
    if(err){
    console.log(err)
    }
})

console.log(data);
