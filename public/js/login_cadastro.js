
function cadastrar() {
    let nome = ipt_nome.value
    let cpf = ipt_cpf.value
    let email = ipt_email.value
    let senha = ipt_senha.value
    let codigo_ativacao = ipt_codigo_ativacao.value

    let usuario = {
        nome: nome,
        cpf: cpf,
        email: email,
        senha: senha,
        codigo: codigo_ativacao
    };

    let listaUsuario = JSON.parse(sessionStorage.getItem("meusUsuarios")) || [];
    console.log(listaUsuario);

    listaUsuario.push(usuario);

    sessionStorage.setItem("meusUsuarios", JSON.stringify(listaUsuario));
}

function login() {
    let emailLogin = ipt_email_login.value
    let senhaLogin = ipt_senha_login.value

    let erro = false

    if (emailLogin == "" || !emailLogin.includes("@")) {
        alert("E-mail inválido! O e-mail deve conter pelo menos um '@'.");
        erro = true
    }

    if (!erro) {
        let usuarioEncontrado = false
        let contador = 0 // Esse contador vai percorrer toda a lista com os objetos(usuario)


        let meusUsuarios = JSON.parse(sessionStorage.getItem("meusUsuarios"));
        console.log(meusUsuarios)


        while (contador < meusUsuarios.length || !usuarioEncontrado) {
            if (meusUsuarios[contador].email == emailLogin && meusUsuarios[contador].senha == senhaLogin) {
                usuarioEncontrado = true;
                sessionStorage.setItem("usuarioLogado", JSON.stringify(meusUsuarios[contador]));
            }
            contador++
        }

        if (usuarioEncontrado) {
            alert("Login realizado com sucesso!");
        } else if (!erro) {
            alert("E-mail ou senha incorretos.");
        }
    }
}