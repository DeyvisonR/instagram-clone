export default function ValidarLogin(email=null, password=null, username=null, usernameTeste = false){
    email = email.trim();
    password = password.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if(email){
        if(!emailRegex.test(email)){
            return ({erro: 'Erro', mensagem: "Email invalido. Por favor coloque um email valido", resposta: false});
        }
    }
    if(password){
        if(password < 8 || password > 20){
            return ({erro: 'Erro', mensagem: "Tamanho invalido. A senha deve conter de 8 a 20 caracteres", resposta: false});
        }
        if(!passwordRegex.test(password)){
            return ({erro: 'Erro', mensagem: "Senha invalida. Digite uma senha com pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial [@$!%*?&]", resposta: false});
        }
    }
    if(username){
        username = username.trim();
        if(username.length > 20){
            return ({erro: 'Erro', mensagem: "Tamanho invalido. Digite um username com menos de 20 caracteres", resposta: false});
        }
        if(username.split(" ").length >= 2){
            return ({erro: 'Erro', mensagem: "Username invalido. Digite um username sem espaço", resposta: false});
        }  
    }
    if(!email || !password){
        return ({erro: 'Erro', mensagem: "Ha campos que nao foram preenchidos. Por favor preencha todos os campos", resposta: false});
    }
    if(usernameTeste){
        if(!username){
            return ({erro: 'Erro', mensagem: "Ha campos que nao foram preenchidos. Por favor preencha todos os campos", resposta: false});
        }
    }
    return true
}