const Http = require('http')
const Porta = 8080

const server =Http.createServer((req,res)=>{
	if (req.url=="/home"){
		res.writeHead(200,{"Content-Type":"text/html"})//res.writeHead(status-code,{"Content-Type":"{content}"})
		res.end("<h1>Home Page</h1>")
	}
	if (req.url == "/users"){
		const users=[
		{
			name:"John Doe",
			email:"john@doe.com",
		},
		{
			name:"Kaua Moreira",
			email:"aaaaaaaa@ssss.com",
		}
		]
		res.writeHead(200,{"Content-Type":"application/json"})//res.writeHead(status-code,{"Content-Type":"{content}"})
		res.end(JSON.stringify(users))
	}
})

server.listen(Porta,()=>{ console.log(`Rodando da porta ${Porta}!`) })