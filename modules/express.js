const UserModel = require("../src/models/user.models")
const express = require('express')
const bodyParser = require('body-parser')//Biblioteca responsável por fazer a análise do corpo da requisição e converter em um JSON
const cors=require('cors')
const app = express()

//O QUE É UM MIDDLEWARE??
//Um middleware é qualquer função que será executada entre a requisição e a reesposta

app.use(bodyParser.json())//Esse middleware faz com que o corpo das requisições sejam convertidos a um JSON
// bodyParser.json() -> Esse comando é um MIDDLEWARE, ou seja, linhas de códigos que processam informações entre a requisição e a resposta
app.use(cors())// cors() é um MIDDLEWARE que adiciona, no cabeçalho da requisição, as informações necessárias para permitir o acesso por diferentes origens.
// Uma origem nada mais é do que a junção do PROTOCÓLO, SUBDOMÍNIO, DOMÍNIO E PORTA. Exemplo: http://api.meusite.io:80
// const corsOptions = {origin: 'http://127.0.0.1:8080'} => Isso também pode ser utilizado para definir a permissão para somente algumas origens específicas. Logo após isso,m é necessário utilizar: app.use(cors(corsOptions))


app.use((req,res,next)=>{//MIDDLEWARE
	console.log(`Request Type: ${req.method}`)
	console.log(`Content Type: ${req.headers['content-type']}`)
	console.log(`Date: ${new Date()}\n`)

	next()//O comando next() permite com que a requisição prossiga o processamento
})

app.set("view engine","ejs")//Define o motor de vizualização como sendo EJS(Embadded Javascript)
app.set("views","src/views")//Define a pasta em que ficará os arquivos de vizualização
app.use(express.static("src/views/public"))//Define a pasta dos estilos

app.get("/views/home",async (req,res)=>{
	try{
		const users=await UserModel.find({})
		res.render("index",{ users:users })
	}catch(error){
		res.status(500).send(error.message)
	}
})

app.get('/home',(req,res)=>{
	res.contentType('text/html')//Type of the content that will be send
	res.status(200).send('<h1>Olá, Mundo!</h1>')
})
app.get('/users',async (req,res)=>{
	const users=await UserModel.find({})
	res.status(200).json(users)
})
app.get("/users/:id", async (req,res)=>{
	try{
		const id=req.params.id
		const user=await UserModel.findById(id)
		return res.status(200).json(user)
	}catch(error){
		res.status(500).send(error.message) 
	}
})
app.post('/users',async (req,res)=>{
	try{
		const user=await UserModel.create(req.body)
		res.status(201).json(user)
	}catch(error){
		res.status(500).send(error.message)
	}
})
app.patch('/users/:id',async (req,res)=>{
	try{
		const id=req.params.id
		const user=await UserModel.findByIdAndUpdate(id, req.body, {new:true})//{new:true} => Return the register updated in the database(After be updated) | {new:false} => Return the old register(before be updated)
		res.status(201).json(user)
	}catch(error){
		res.status(500).send(error.message)
	}
})
app.delete("/users/:id",async (req,res)=>{
	try{
		const id=req.params.id
		const user=await UserModel.findByIdAndDelete(id)
		res.status(200).json(user)
	}catch(error){
		res.status(500).send(error.message)
	}
})
const Porta=8080
app.listen(8080,()=>{ console.log(`Rodando da porta ${Porta}!`) })