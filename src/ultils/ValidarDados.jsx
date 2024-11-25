export default function ValidarDados(username=null, name=null, bio=null){
    if(username){
        if(username.length > 40){
            return ({erro: 'Erro', mensagem: "Tamanho invalido. Digite um username com menos de 40 caracteres", resposta: false});
        }
        console.log(username.split(" "))
        if(username.split(" ") >= 2){
            return ({erro: 'Erro', mensagem: "Username invalido. Digite um username sem ' '", resposta: false});
        }
    }
    if(name){
        if(name.length >= 100){
            return ({erro: 'Erro', mensagem: "Tamanho invalido. Digite um nome com menos de 100 caracteres", resposta: false});
        }
    }
    if(bio){
        if(bio.length >= 500){
            return ({erro: 'Erro', mensagem: "Tamanho invalido. Digite uma bio com menos de 500 caracteres", resposta: false});
        }
    }
    if(!username){
        return ({erro: 'Erro', mensagem: "Username nao preenchido. Por favor coloque um username valido", resposta: false});
    }
    return true
}