function simular() {
  let qtdPainel = Number(ipt_qtd_painel.value);
  let potenciaPainel = Number(ipt_potencia_painel.value);
  let regiao = slt_regiao.value;
  let ambiente = slt_ambiente.value;

  let mensagem = "";

  if (ipt_potencia_painel.value.trim() === "") {
    potenciaPainel = 550;
  }
  if (potenciaPainel <= 0) {
    mensagem = `Informe uma potência válida. Caso não souber deixe o campo vazio,
    por padrão será usado 550wp.`;
  } else if (qtdPainel <= 0) {
    mensagem = `Informe uma quantidade válida de painéis solares.`;
  } else if (regiao == "") {
    mensagem = `Selecione a região da instalação.`;
  } else if (ambiente == "") {
    mensagem = `Selecione o ambiente das instalações.`;
  } else {
    let irradiancia = 0;
    let tarifa = 0;

    if (regiao == "norte") {
      irradiancia = 4.79;
      tarifa = 0.89;
    } else if (regiao == "nordeste") {
      irradiancia = 5.49;
      tarifa = 0.82;
    } else if (regiao == "centroOeste") {
      irradiancia = 5.25;
      tarifa = 0.82;
    } else if (regiao == "sudeste") {
      irradiancia = 4.93;
      tarifa = 0.79;
    } else if (regiao == "sul") {
      irradiancia = 4.33;
      tarifa = 0.68;
    } else {
      mensagem = `Selecione uma região válida`;
    }

    let coefSujeira = 0;

    if (ambiente == "rural") {
      coefSujeira = 0.0004;
    } else if (ambiente == "urbanoBaixa") {
      coefSujeira = 0.00065;
    } else if (ambiente == "rodovia") {
      coefSujeira = 0.00125;
    } else if (ambiente == "urbanoAlta") {
      coefSujeira = 0.00175;
    } else {
      mensagem = `Selecione um ambiente válido`;
    }

    let potenciaTotalKwp = (qtdPainel * potenciaPainel) / 1000;

    const diasReferencia = 30;
    const performanceRatio = 0.8;
    const geracaoReferencia = potenciaTotalKwp * irradiancia * performanceRatio;

    let dia = 1;
    let energiaPerdidaMensal = 0;

    while (dia <= diasReferencia) {
      const perdaAcumulada = dia * coefSujeira;
      const desempenhoDia = performanceRatio * (1 - perdaAcumulada);
      const geracaoEstimadaDia = potenciaTotalKwp * irradiancia * desempenhoDia;
      const energiaPerdidaDia = geracaoReferencia - geracaoEstimadaDia;

      energiaPerdidaMensal += energiaPerdidaDia;
      dia++;
    }

    const energiaPerdidaDia = energiaPerdidaMensal / diasReferencia;
    const geracaoRealMedia = geracaoReferencia - energiaPerdidaDia;
    const perdaPercentual =
      (energiaPerdidaMensal / (geracaoReferencia * diasReferencia)) * 100;

    const impactoFinanceiroMensal = energiaPerdidaMensal * tarifa;
    const impactoFinanceiroAnual = impactoFinanceiroMensal * 12;

    divResult.innerHTML = `
      <div class="resultado">
        <div class="dados_rapidos">
          <div class="card_dado_rapido">
            <span>Geração diária estimada</span>
            <span>${geracaoRealMedia.toFixed(2)} kWh</span>
          </div>
          <div class="card_dado_rapido">
            <span>Perda estimada por sujeira</span>
            <span>${perdaPercentual.toFixed(2)}%</span>
          </div>
          <div class="card_dado_rapido">
            <span>Impato financeiro mensal</span>
            <span>R$ ${impactoFinanceiroMensal.toFixed(2)}</span>
          </div>
        </div>

        <div>
            <p>
              Com base nos dados informados, sua usina possui uma potência total instalada de
              <span class="geracao">${potenciaTotalKwp.toFixed(2)} kWp</span> e uma geração diária de referência
              de <span class="geracao">${geracaoReferencia.toFixed(2)} kWh</span>.
            </p> 

            <p>
              Considerando as características do ambiente, estima-se uma perda média
              de <span class="perda">${perdaPercentual.toFixed(2)}%</span> por sujeira. Com isso,
              a geração diária média estimada é de
              <span class="perda">${geracaoRealMedia.toFixed(2)} kWh</span>, representando
              aproximadamente <span class="perda">${energiaPerdidaDia.toFixed(2)} kWh/dia</span>
              de energia que deixa de ser gerada.
            </p>

            <p>
              Essa perda representa um impacto financeiro mensal estimado de
              <span class="perda">R$ ${impactoFinanceiroMensal.toFixed(2)}</span>,
              podendo chegar a <span class="perda">R$ ${impactoFinanceiroAnual.toFixed(2)}</span>
              ao ano.
            </p>

            <p>
              Sua empresa pode estar deixando de gerar energia devido ao acúmulo
              de sujeira nos painéis fotovoltaicos. Com o monitoramento da Cellara,
              é possível acompanhar o desempenho da usina e identificar variações
              que podem indicar perdas de geração, permitindo uma intervenção mais rápida.
            </p>
        </div>
      </div>
    `;
  }
  pMessage.innerHTML = mensagem;
}
