function cadastrar() {
    const nome = ipt_nome.value
    const cpf = ipt_cpf.value
    const email = ipt_email.value
    const senha = ipt_senha.value
    const confirmacaoSenha = ipt_confirmacao_senha.value
    const codigoAtivacao = ipt_codigo_ativacao.value

    let erro = false
    if (senha != confirmacaoSenha) {
        alert("As senhas inseridas não condizem.")
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