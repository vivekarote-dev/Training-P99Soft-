import http from 'http';

// const server = http.createServer((req, res)=>{
//     res.writeHead(200,{"content-type":"text/plain"});
//     res.end("HELLO WORLD");
// })



const server = http.createServer( (req, res) =>{
 res.writeHead(200,{"content-type": "text/plain"} );
 
    const url = req.url;


    if(url === '/home'){
        res.end( "This is the home route"
        );
    }

    if(url === '/login'){
        res.end("This is Login Route");
    }
}
)

server.listen(3000,()=>{
console.log("Server Running on port 3000 ")
})


