const { Person } = require("./person")// { varName } => Destruction Assignment | Isso significa que a variável Person vai pegar, diretamente, o objeto importado da biblioteca
const dotenv = require("dotenv")
const connectToDatabase = require("./src/database/connect")

dotenv.config()//Permite o uso das variáveis de ambiente(arquivo .env)

//require("./modules/path")
//require("./modules/fs")
//require("./modules/http")
require("./modules/express")
connectToDatabase()
const person = new Person("Kauã")
console.log(person.sayMyName())

