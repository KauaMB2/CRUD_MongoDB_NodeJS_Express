const Path = require('path')

//Basename -> Nome do arquivo atual
console.log(Path.basename(__filename))

//Dirname -> Nome do diretório atual
console.log(Path.dirname(__filename))

//Extname -> Extensão do arquivo
console.log(Path.extname(__filename))

//Parse -> Criar objeto Path
console.log(Path.parse(__filename))

//Juntar caminhos de arquivos
console.log(Path.join(__dirname,"teste","teste.html"))