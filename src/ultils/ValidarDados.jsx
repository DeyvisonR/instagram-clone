export default function ValidarDados(username=null, name=null, bio=null){
    if(username){
        username = username.trim();
        if(username.length > 20){
            return ({erro: 'Erro', mensagem: "Tamanho invalido. Digite um username com menos de 20 caracteres", resposta: false});
        }
        if(username.split(" ").length >= 2){
            return ({erro: 'Erro', mensagem: "Username invalido. Digite um username sem espaço", resposta: false});
        }
    }
    if(name){
        name = name.trim();
        if(name.length > 60){
            return ({erro: 'Erro', mensagem: "Tamanho invalido. Digite um nome com menos de 60 caracteres", resposta: false});
        }
    }
    if(bio){
        bio = bio.trim();
        if(bio.length > 500){
            return ({erro: 'Erro', mensagem: "Tamanho invalido. Digite uma bio com menos de 500 caracteres", resposta: false});
        }
    }
    if(!username){
        return ({erro: 'Erro', mensagem: "Username nao preenchido. Por favor coloque um username valido", resposta: false});
    }
    return true
}