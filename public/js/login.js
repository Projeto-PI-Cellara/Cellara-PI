function login() {
    const email = ipt_email.value
    const senha = ipt_senha.value

    const usuariosCadastrados = JSON.parse(sessionStorage.getItem("usuariosCadastrados")) || []

    let erro = false
    if (email == "" || !email.includes("@")) {
        alert("E-mail inválido! O e-mail deve conter pelo menos um '@'.")
        erro = true
    }

    if (!erro) {
        let usuarioLogado

        let contador = 0 // Esse contador vai percorrer toda a lista com os objetos(usuario)
        while (contador < usuariosCadastrados.length && !usuarioLogado) {
            const usuario = usuariosCadastrados[contador]

            if (usuario.email == email && usuario.senha == senha) {
                usuarioLogado = usuario
            }

            contador++
        }

        if (usuarioLogado) {
            alert("Login realizado com sucesso!")
            sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado))
            window.location.href = "dashboard.html"
        } else if (!erro) {
            alert("E-mail ou senha incorretos.")
        }
    }
}