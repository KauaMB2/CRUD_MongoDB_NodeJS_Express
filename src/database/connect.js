const mongoose = require('mongoose')

const connectToDatabase = async ()=>{
	await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cursonodejs.aulevzm.mongodb.net/?retryWrites=true&w=majority`,(error)=>{
		if (error){
			return console.log(`Ocorreu um erro ao se conectar com o banco de dados ${error}`)
		}
		return console.log("Conexão com o banco de dados")
	})
}

module.exports=connectToDatabase