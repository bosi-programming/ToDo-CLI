/**criar uma função que recebe um parâmetro ok
 * log.txt ok
 * Se o arquivo não existe, deve-se criar o log.txt ok
 * Se o arquivo existe, deve-se adicionar o conteúdo enviado por par em uma nova linha ok
 * Adicionar no log a data e hora que foi gravado*/ 

//O modelo do dado de entrada deve ser: data -> conteúdo

const fs = require('fs');
const logFileName = 'log.txt'

const log = (content) => {
    fs.appendFileSync(logFileName, `${new Date()} -> ${content}\n`)
}

module.exports = log