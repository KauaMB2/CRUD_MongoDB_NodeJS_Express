const fs = require("fs")
const Path = require("path")

//----------------------------------------------------------
//Criar uma pasta
fs.mkdir(Path.join(__dirname,"/CriandoPasta"),
	(error) =>{
		if(error){
			return console.log(`Erro: ${error}`)
		}
		console.log("Pasta criada com sucesso!")
	}
)

//----------------------------------------------------------
//Criar um arquivo
fs.writeFile(
	Path.join(__dirname,"/CriandoPasta","CriandoArquivo.js"),
	"console.log('Arquivo teste criado com sucesso!')\n",
	(error) =>{//FUNÇÃO ASSÍNCRONA
		if(error){
			return console.log(`Erro: ${error}`)
		}
		console.log("Arquivo criado com sucesso!")
		
		//----------------------------------------------------------
		//Adiciona conteúdo a um arquivo
		fs.appendFile(Path.join(__dirname,"/CriandoPasta","CriandoArquivo.js"),
			"console.log('Arquivo teste modificado com sucesso!')\n",
			(error) =>{//FUNÇÃO ASSÍNCRONA
				if(error){
					return console.log(`Erro: ${error}`)
				}
				console.log("Arquivo criado com sucesso!")
				
				//----------------------------------------------------------
				//Ler arquivo
				fs.readFile(Path.join(__dirname,"/CriandoPasta","CriandoArquivo.js"), 'utf8',
					(error,data)=>{//FUNÇÃO ASSÍNCRONA
						if (error){
							return console.log("Erro: ", error)
						}
						console.log(data)
					}
				)
			}
		)
	}
)