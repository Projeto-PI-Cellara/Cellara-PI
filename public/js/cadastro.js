function cadastrar() {
    const nome = ipt_nome.value
    const cpf = ipt_cpf.value
    const email = ipt_email.value
    const senha = ipt_senha.value
    const confirmacaoSenha = ipt_confirmacao_senha.value
    const codigoAtivacao = ipt_codigo_ativacao.value

    let erro = false

    if (nome == "") {
        alert("O nome está vazio")
        erro = true
    }else if (cpf == ""){
        alert("O cpf está vazio")
        erro = true
    }else if (email == "") {
        alert("O email está vazio")
        erro = true
    }else if(senha == ""){
        alert("A senha está vazia")
        erro = true
    }else if(codigoAtivacao == ""){
        alert("O código de ativação está vazio")
        erro = true
    }

    if (senha != confirmacaoSenha) {
        alert("As senhas inseridas não condizem.")
        erro = true
    }

    if (cpf.length != 11) {
        alert("Insira um CPF válido com apenas 11 números")
        erro = true
    }

    if (senha.length <= 7) {
        alert("A senha precisa ser maior que 7 caracteres")
        erro = true
    }

    if (!erro) {
        const usuario = {
            nome: nome,
            cpf: cpf,
            email: email,
            senha: senha,
            codigo: codigoAtivacao
        };

        let usuariosCadastrados = JSON.parse(sessionStorage.getItem("usuariosCadastrados")) || [];
        usuariosCadastrados.push(usuario);

        sessionStorage.setItem("usuariosCadastrados", JSON.stringify(usuariosCadastrados));
        alert("Usuário cadastrado com sucesso!")
        window.location.href = "login.html"
    }
}