export default function imageValidation(file){
    const MAX_SIZE = 5 * 1024 * 1024; // Tamanho máximo do arquivo em bytes (5MB)
    if(file && file.type.startsWith("image/")){
        if(file.size <= MAX_SIZE){
            return true;
        }else{
            return ({erro:"Erro",mensagem:"a imagem e maior que 5MB. Por favor selecione uma imagem valida!!!", resposta:false})
        }
    }else{
        return ({erro:"Erro",mensagem:"o arquivo selecionado nao e uma imagem. Por favor selecione uma imagem valida!!!", resposta:false})
    }
}