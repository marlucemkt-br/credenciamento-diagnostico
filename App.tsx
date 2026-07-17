import React, { useState, useEffect, useRef } from 'react';

// ============================================================
// CONFIGURAÇÃO — edite estes valores antes de publicar
// ============================================================
const CONFIG = {
  MAKE_WEBHOOK_URL: "https://hook.us2.make.com/e9h94kbkrn7pfovn8rxvm9hpcgh6ikrr",
  CTA_CURSO_GRATUITO: "https://youtube.com/playlist?list=PLiaMfvC6IZ-MkhteJIG_BX95iqZb0jcho&si=C9M63La3tKn9m9Nu",
  PREVIEW_MODE: false,
};
// ============================================================

const MOCK_DIAGNOSTICO = {
  bloco1_perfil: "Marluce tem um perfil de empreendedora com clareza de objetivo e disposição real para começar. Sua busca por renda extra com baixo risco mostra maturidade empreendedora. Com espaço disponível e tempo para se dedicar, você tem o essencial — o que falta é entrar com método, não no impulso.",
  bloco2_mercado: "Sua cidade tem potencial real. O fato de nunca ter visto microverdes sendo vendidos localmente não é um obstáculo — é uma janela. O mercado global de microverdes atingiu US$ 3 bilhões em 2025 e deve chegar a US$ 5,2 bilhões até 2030 (Fonte: Mordor Intelligence, 2025). Quem chega primeiro, bem preparado, tende a ocupar esse espaço antes que outros produtores se estabeleçam.",
  bloco3_retorno: "Considerando seu investimento, espaço e tempo disponível, veja o caminho realista: FASE 1 — Semanas 1 e 2: aprendizagem, estudo e pesquisa de mercado. Quem busca informações soltas na internet pode levar o dobro do tempo — seguir um método estruturado encurta esse prazo com direção clara. FASE 2 — Semanas 3 e 4: primeiras bandejas e abordagem de clientes, faturamento bruto estimado de R$ 0 a R$ 350. FASE 3 — Mês 2: primeiros clientes recorrentes, potencial estimado de R$ 350 a R$ 700 por mês. FASE 4 — Mês 3 em diante: com 4 a 5 clientes fixos e 1m² bem utilizado, potencial de até R$ 1.000 por mês por m² desde que haja consistência. Retorno estimado do investimento inicial: entre 45 e 75 dias. Para chegar a R$ 5.000 por mês, o caminho passa por 5 a 7 m² em operação com carteira de clientes recorrentes.",
  bloco4_investimento: "Microverdes é um dos negócios mais democráticos do Brasil para começar — pouco capital, retorno rápido quando feito certo. Mas não é jogo do tigrinho: requer investimento, seriedade, estudo, testes e trabalho. Com o valor disponível, seu primeiro passo é montar uma estrutura simples e validar antes de escalar. Evite os erros mais comuns: comprar semente difícil antes de validar o mercado local, montar estrutura cara antes de ter cliente confirmado, gastar em embalagem premium antes de ter pedido recorrente. Esses erros custam dinheiro e tempo e são o motivo número 1 de desistência. No Workshop de Implementação, Marcos mostra exatamente como evitar esses erros desde o primeiro dia.",
  bloco5_riscos: [
    "Produzir antes de ter cliente confirmado — o risco de ficar com bandeja pronta e sem comprador é real e desmotiva rápido. No Workshop de Implementação, Marcos ensina como abordar clientes antes mesmo de plantar.",
    "Comprar sementes erradas no início — erros de germinação custam tempo, dinheiro e confiança. No mini curso, Marcos mostra quais variedades funcionam para quem está começando.",
    "Começar sozinho, pesquisando informações soltas na internet sem uma jornada definida — isso dá margem para outro produtor local entrar mais preparado e ser pioneiro na sua região. O mercado de microverdes no Brasil ainda não saturou. A janela de pioneirismo está aberta — mas não fica aberta para sempre. Solução: seguir uma jornada estruturada, com método claro em vez de tentativa e erro.",
    "Não manter consistência nas primeiras entregas — uma falha para um restaurante fecha essa porta definitivamente. No Workshop de Implementação, Marcos explica como organizar produção e entrega para nunca furar um cliente.",
  ],
  bloco6_consistencia: "Consistência não é diferencial no mercado de microverdes — é pré-requisito. Restaurantes cortam fornecedor na primeira falha sem aviso prévio porque precisam de previsibilidade para montar cardápio. Plantar apenas o que você já tem intenção de venda e manter um calendário fixo de colheita e entrega é o que separa quem constrói carteira de clientes de quem fica rodando sem crescer.",
  bloco7_proximo_passo: "Eu, Marcos, preparei um Workshop de Implementação prático para te ajudar a sair do zero com direção clara.\n\nVou te mostrar por que esse mercado ainda está invisível na maioria das cidades do Brasil — e por que isso é uma vantagem enorme para quem entra agora. Números reais, margens reais, como começar com menos do que você imagina.\n\nTambém vou te mostrar como começar com investimento controlado, o que comprar primeiro, o que evitar — e a diferença entre entrar como profissional ou como aventureiro.\n\nE o coração do negócio: como mapear os clientes certos na sua cidade, como vender antes de plantar e como transformar uma venda em cliente fixo toda semana.\n\nO mercado de microverdes no Brasil ainda não saturou. A janela de pioneirismo na sua cidade ainda está aberta — mas não fica aberta para sempre. Eu te espero lá.",
  bloco8_transformacao: "Imagine acordar sabendo que tem entregas para fazer nesta semana — não por obrigação, mas porque você construiu isso. Imagine trocar o cansaço da rotina atual pela sensação de ver algo crescendo, literalmente, no seu espaço. O cenário negativo é real: cada semana que passa sem direção é uma semana que outro produtor pode estar se preparando para ocupar o seu mercado local. Você tem o espaço, tem o tempo e agora tem o diagnóstico — o próximo passo é simples: dar o primeiro passo com método.",
};

const PERGUNTAS = [
  {
    id: "p1", etapa: 1, tipo: "single", titulo: "Seu objetivo",
    pergunta: "Qual é seu principal objetivo com microverdes?",
    opcoes: ["Renda extra","Renda principal","Transição de carreira","Complementar renda da família","Viver da terra / sítio / chácara","Começar um negócio com baixo investimento","Produzir para consumo próprio inicialmente"],
  },
  {
    id: "p2", etapa: 1, tipo: "single", titulo: "Seu momento",
    pergunta: "Qual frase mais combina com seu momento atual?",
    opcoes: ["Estou cansado do meu trabalho atual","Quero mais tempo com minha família","Quero uma renda mais estável","Quero trabalhar com algo ligado à natureza","Quero parar de depender só de salário","Quero empreender, mas tenho medo de errar","Quero complementar minha renda sem largar tudo agora","Já cultivo e quero escalar"],
  },
  {
    id: "p6", etapa: 1, tipo: "texto", titulo: "Desafio de vida",
    pergunta: "Qual desafio da sua vida o negócio de microverdes pode te ajudar?",
    placeholder: "Escreva com suas palavras...",
  },
  {
    id: "p3", etapa: 1, tipo: "single", titulo: "Sua preocupação",
    pergunta: "Qual sua maior preocupação para começar?",
    opcoes: ["Não conseguir vender","Minha cidade não ter mercado","Não ter dinheiro para investir","Não ter tempo","Não saber produzir","Não saber por onde começar","Investir e não ter retorno","Fazer tudo sozinho e errar"],
  },
  {
    id: "p4", etapa: 2, tipo: "single", titulo: "Sua cidade",
    pergunta: "Qual o tamanho aproximado da sua cidade?",
    opcoes: ["Até 20 mil habitantes","20 a 50 mil habitantes","50 a 100 mil habitantes","100 a 300 mil habitantes","300 mil a 1 milhão de habitantes","Mais de 1 milhão de habitantes","Não sei"],
  },
  {
    id: "p5", etapa: 2, tipo: "single", titulo: "Região",
    pergunta: "Existe alguma cidade com mais de 300 mil habitantes em até 100 km de você?",
    opcoes: ["Sim, até 30 km","Sim, entre 30 e 60 km","Sim, entre 60 e 100 km","Não existe","Não sei"],
  },
  {
    id: "p7", etapa: 2, tipo: "single", titulo: "Mercado local",
    pergunta: "Sua cidade tem restaurantes, empórios, hortifrutis, mercados naturais, academias ou clínicas de nutrição?",
    opcoes: ["Sim, vários","Sim, alguns","Poucos","Não conheço","Não existem"],
  },
  {
    id: "p8", etapa: 2, tipo: "single", titulo: "Concorrência",
    pergunta: "Você já viu alguém vendendo microverdes na sua cidade ou região?",
    opcoes: ["Sim, já tem produtor","Vi poucas vezes","Nunca vi","Não sei"],
  },
  {
    id: "p9", etapa: 2, tipo: "single", titulo: "Público saudável",
    pergunta: "Na sua região existem pessoas que valorizam alimentação saudável?",
    opcoes: ["Sim, bastante — tem comunidade fitness, veganos, nutricionistas","Sim, alguns grupos","Poucos","Não percebo esse público"],
  },
  {
    id: "p11", etapa: 3, tipo: "single", titulo: "Seu espaço",
    pergunta: "Onde você pretende produzir?",
    opcoes: ["Quintal","Chácara / sítio","Varanda","Quarto / cômodo indoor","Garagem","Área coberta","Espaço emprestado","Ainda não tenho espaço definido"],
  },
  {
    id: "p12", etapa: 3, tipo: "single", titulo: "Tamanho do espaço",
    pergunta: "Qual o tamanho aproximado disponível para começar?",
    opcoes: ["Menos de 0,5m²","0,5m² a 1m²","1m² a 3m²","3m² a 6m²","6m² a 10m²","Mais de 10m²"],
  },
  {
    id: "p15", etapa: 3, tipo: "single", titulo: "Investimento",
    pergunta: "Quanto você poderia investir para começar nos próximos 60 dias?",
    opcoes: ["Menos de R$ 500","R$ 500 a R$ 1.500","R$ 1.500 a R$ 3.000","Acima de R$ 3.000","Ainda não tenho valor disponível, mas quero me planejar"],
  },
  {
    id: "p16", etapa: 3, tipo: "texto", titulo: "Maior desafio",
    pergunta: "Qual o maior desafio você tem, fora tempo e dinheiro, para conseguir faturar R$ 1.000 por m² de cultivo de microverdes todos os meses?",
    placeholder: "Escreva com suas palavras...",
  },
  {
    id: "p18", etapa: 4, tipo: "single", titulo: "Seu tempo",
    pergunta: "Quanto tempo por dia você teria para se dedicar no começo?",
    opcoes: ["Menos de 30 minutos","30 minutos a 1 hora","1 a 2 horas","2 a 4 horas","Mais de 4 horas"],
  },
  {
    id: "p21", etapa: 4, tipo: "single", titulo: "Experiência comercial",
    pergunta: "Você já vendeu algum produto ou serviço antes?",
    opcoes: ["Sim, vendo atualmente","Já vendi no passado","Pouca experiência","Nunca vendi","Tenho medo de vender","Estou tranquilo em vender"],
  },
  {
    id: "p23", etapa: 4, tipo: "single", titulo: "Bloqueio de venda",
    pergunta: "O que mais te trava na venda?",
    opcoes: ["Não saber o que falar","Medo de rejeição","Não saber o preço","Não saber apresentar o produto","Achar que ninguém conhece microverdes","Não saber onde encontrar clientes"],
  },
  {
    id: "p24", etapa: 4, tipo: "texto", titulo: "O que vai mudar",
    pergunta: "O que você acredita que vai mudar na sua vida? Me conta seu objetivo com isso.",
    placeholder: "Escreva com suas palavras...",
  },
];

const ETAPAS = [
  { numero: 1, label: "Objetivo" },
  { numero: 2, label: "Mercado" },
  { numero: 3, label: "Espaço" },
  { numero: 4, label: "Vendas" },
];

function calcularPerfil(respostas) {
  const invest = respostas.p15 || "";
  const espaco = respostas.p12 || "";
  const cidade = respostas.p4 || "";
  const cidadePerto = respostas.p5 || "";
  let scoreMercado = 50;

  if (cidade.includes("300 mil") || cidade.includes("1 milhão")) scoreMercado += 25;
  else if (cidade.includes("100 a 300")) scoreMercado += 15;
  else if (cidade.includes("50 a 100")) scoreMercado += 10;
  else if (cidade.includes("20 a 50")) scoreMercado += 5;

  if (cidadePerto.includes("até 30")) scoreMercado += 20;
  else if (cidadePerto.includes("30 e 60")) scoreMercado += 15;
  else if (cidadePerto.includes("60 e 100")) scoreMercado += 10;

  if (respostas.p7?.includes("vários")) scoreMercado += 10;
  else if (respostas.p7?.includes("alguns")) scoreMercado += 5;
  if (respostas.p9?.includes("bastante")) scoreMercado += 5;
  if (respostas.p8?.includes("Sim, já tem")) scoreMercado -= 5;
  else if (respostas.p8?.includes("Nunca vi")) scoreMercado += 5;

  scoreMercado = Math.min(100, Math.max(10, scoreMercado));

  let perfil = "Teste de Validação";
  if (invest.includes("Acima de R$ 3.000") && (espaco.includes("3m²") || espaco.includes("6m²") || espaco.includes("10m²")))
    perfil = "Aceleração com Validação";
  else if (invest.includes("R$ 1.500 a R$ 3.000")) perfil = "Estrutura Inicial";
  else if (invest.includes("R$ 500 a R$ 1.500")) perfil = "Começo Controlado";

  const regional = cidadePerto.includes("até 30") || cidadePerto.includes("30 e 60") || cidadePerto.includes("60 e 100");
  if (regional && (cidade.includes("Até 20") || cidade.includes("20 a 50") || cidade.includes("50 a 100")))
    perfil += " com Potencial Regional";

  return { perfil, scoreMercado };
}

async function gerarDiagnostico(respostas, nome, perfil, scoreMercado) {
  if (CONFIG.PREVIEW_MODE) {
    await new Promise(r => setTimeout(r, 3000));
    return MOCK_DIAGNOSTICO;
  }

  const preocupacoes = Array.isArray(respostas.p3) ? respostas.p3.join(", ") : respostas.p3;

  const prompt = `Você é Marcos Rosetti, cientista ambiental, produtor de microverdes há 5 anos, dono da Plântula em Brasília, que já produziu e vendeu mais de 6 toneladas de microverdes e fatura 60 mil reais mensais. Você ensina pessoas comuns a empreender com microverdes. Tom: humano, direto, simples, como uma conversa real — não corporativo. Fala em primeira pessoa quando faz sentido. Nunca prometa resultados garantidos. Use sempre "potencial estimado", "faturamento bruto estimado", "desde que haja consistência de produção e vendas". Cada bloco deve terminar com uma frase de gancho curta que cria curiosidade para continuar lendo — tom amigável, não publicitário.

Responda APENAS com JSON válido, sem markdown, sem texto fora do JSON:

{
  "bloco1_perfil": "2-3 frases descrevendo o perfil de ${nome} como empreendedor de microverdes. Perfil calculado: ${perfil}. Score de mercado: ${scoreMercado}/100. Tom humano e direto. Termine com frase de gancho curta criando curiosidade para continuar lendo.",

  "bloco2_mercado": "2-3 frases sobre o potencial de mercado local e regional de ${nome}. Se cidade pequena com cidade maior próxima: destacar produção local mais venda regional 2x por semana. Se já tem produtor: validação de mercado existe, diferenciação por qualidade e consistência é o caminho. Se nunca viu microverdes: mercado virgem, vantagem de quem chega bem preparado primeiro. Mencione que o mercado global de microverdes atingiu US$ 3 bilhões em 2025 com projeção de US$ 5,2 bilhões até 2030 — Fonte: Mordor Intelligence, 2025 — e que no Brasil o crescimento também é consistente. Termine com frase de gancho.",

  "bloco3_retorno": "Diagnóstico considerando as variáveis de ${nome}: investimento ${respostas.p15}, espaço ${respostas.p12}, tempo diário ${respostas.p18}, cidade ${respostas.p4}. Estruture em 4 fases claras: FASE 1 — Semanas 1 e 2: aprendizagem, estudo e pesquisa de mercado. Avise que quem busca informações soltas na internet pode levar o dobro do tempo, e que seguir um método estruturado encurta esse prazo com direção clara. FASE 2 — Semanas 3 e 4: primeiras bandejas e abordagem de clientes, faturamento bruto estimado R$ 0 a R$ 350. FASE 3 — Mês 2: primeiros clientes recorrentes, faturamento bruto estimado R$ 350 a R$ 700 por mês. FASE 4 — Mês 3 em diante: com 4 a 5 clientes fixos e 1m² bem utilizado, potencial de até R$ 1.000 por mês por m² desde que haja consistência. Ao final indique: prazo estimado de retorno do investimento inicial, quanto reinvestir e em quanto tempo o faturamento pode chegar a R$ 5.000 por mês considerando o espaço informado. Termine com gancho.",

  "bloco4_investimento": "Comece dizendo que todo negócio precisa de investimento e que microverdes é um dos negócios mais democráticos do Brasil para começar — pouco capital, retorno rápido quando feito certo. Mas deixe claro: não é jogo do tigrinho, não é fórmula mágica. Requer investimento, seriedade, estudo, testes e trabalho. Com o valor informado que é ${respostas.p15}, diga o que faz sentido priorizar. Liste os erros mais comuns a evitar: comprar semente difícil antes de validar o mercado local, montar estrutura cara antes de ter cliente, gastar em embalagem premium antes de ter pedido recorrente. Esses erros custam dinheiro e tempo e são o motivo número 1 de desistência. Diga que no Workshop de Implementação Marcos mostra exatamente como evitar esses erros desde o primeiro dia. Termine com gancho.",

  "bloco5_riscos": [
    "Risco 1 personalizado para o perfil de ${nome} baseado nas respostas. Ao final cite que a solução para esse risco específico é ensinada no Workshop de Implementação com Marcos.",
    "Risco 2 personalizado. Ao final cite que a solução é ensinada no Workshop de Implementação com Marcos.",
    "SEMPRE incluir este risco: começar sozinho, pesquisar informações soltas na internet, aprender no erro sem jornada definida. Isso dá margem para outro produtor local entrar mais preparado e ser pioneiro na região. O mercado de microverdes no Brasil ainda não saturou — a janela de pioneirismo está aberta, mas não fica aberta para sempre. Solução: seguir uma jornada estruturada em vez de aprender sozinho por tentativa e erro.",
    "Risco 4 personalizado. Ao final cite que a solução é ensinada no Workshop de Implementação com Marcos."
  ],

  "bloco6_consistencia": "2 frases fortes. Consistência não é diferencial — é pré-requisito. Restaurantes cortam fornecedor na primeira falha sem aviso porque precisam de previsibilidade para montar cardápio. Plantar sem cliente garantido é o erro que mais gera desistência e queima reputação local. Termine com gancho curto.",

  "bloco7_proximo_passo": "Escreva como Marcos Rosetti falando diretamente para ${nome}, em primeira pessoa, tom simples e humano. Use quebras de linha reais entre seções. Estruture assim:\n\nAbertura: diga que preparou o Workshop de Implementação, um encontro prático para ${nome} sair com um plano claro na mão.\n\nO Choque da Oportunidade: O que vou te mostrar: por que esse mercado ainda está invisível na maioria das cidades do Brasil e por que isso é uma vantagem enorme para quem entra agora. Números reais, margens reais, como começar com menos do que você imagina. Por que você não pode perder: sem essa clareza a tendência é continuar adiando — e enquanto você adia alguém na sua cidade pode estar se preparando para entrar antes.\n\nO Jeito Certo de Entrar: O que vou te mostrar: como começar com investimento controlado, o que comprar primeiro, o que evitar, e a diferença entre entrar como profissional ou como aventureiro. Essa diferença define quem domina o mercado local e quem se queima nele.\n\nVendas e Recorrência: O que vou te mostrar: o coração do negócio — o Método Casamento de Vendas. Como mapear os clientes certos na sua cidade, como vender antes de plantar e como transformar uma venda em cliente fixo toda semana.\n\nFechamento: O mercado de microverdes no Brasil ainda não saturou — a janela de pioneirismo na sua cidade ainda está aberta, mas não fica aberta para sempre. Eu te espero no Workshop.",

  "bloco8_transformacao": "3-4 frases emocionais baseadas na dor principal de ${nome} que é ${respostas.p2}. Comece com Imagine. Mostre o cenário positivo — o que a vida pode ser com um negócio que funciona — e o cenário negativo — o custo invisível de continuar adiando: tempo perdido, mercado perdido, outro produtor chegando primeiro. Termine com encorajamento realista e humano, sem exagero."
}

Respostas de ${nome}: objetivo=${respostas.p1} | momento=${respostas.p2} | preocupações=${preocupacoes} | cidade=${respostas.p4} | cidade próxima=${respostas.p5} | estabelecimentos=${respostas.p7} | concorrência=${respostas.p8} | público saudável=${respostas.p9} | espaço=${respostas.p11} | tamanho=${respostas.p12} | investimento=${respostas.p15} | tempo diário=${respostas.p18} | experiência comercial=${respostas.p21} | bloqueio venda=${respostas.p23}`;

  try {
    const response = await fetch("/api/diagnostico", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    if (!response.ok) throw new Error(`API ${response.status}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Erro API:", err);
    return null;
  }
}

async function enviarParaMake(dados) {
  if (CONFIG.MAKE_WEBHOOK_URL.startsWith("COLE_AQUI")) return;

  try {
    await fetch(CONFIG.MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });
  } catch (e) {
    console.error("Webhook falhou:", e);
  }

const s = {
  green: "#2d6a2d", greenLight: "#5a9e3a", greenDark: "#1a3d1a",
  greenBg: "#f0f7f0", greenBorder: "#d4e8d4", text: "#3d5c3d",
};

function Logo() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
      <div style={{ width:38, height:38, borderRadius:"50%", background:`linear-gradient(135deg,${s.green},${s.greenLight})`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 8px rgba(45,106,45,.3)" }}>
        <span style={{ fontSize:18 }}>🌱</span>
      </div>
      <div>
        <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:15, color:s.greenDark, lineHeight:1.1 }}>Marcos</div>
        <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, color:s.greenLight, letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:600 }}>Microverdes</div>
      </div>
    </div>
  );
}

function BarraProgresso({ etapaAtual, totalEtapas }) {
  const pct = Math.round((etapaAtual / totalEtapas) * 100);
  return (
    <div style={{ marginBottom:28 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
        <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#6b7c6b", fontWeight:500 }}>Etapa {etapaAtual} de {totalEtapas}</span>
        <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:s.green, fontWeight:600 }}>{pct}%</span>
      </div>
      <div style={{ height:6, background:"#e8f0e8", borderRadius:99, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${s.green},${s.greenLight})`, borderRadius:99, transition:"width .5s cubic-bezier(.4,0,.2,1)" }} />
      </div>
      <div style={{ display:"flex", gap:6, marginTop:10, justifyContent:"center" }}>
        {ETAPAS.map(e => (
          <div key={e.numero} style={{ display:"flex", alignItems:"center", gap:4 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:e.numero<=etapaAtual?s.green:"#d4e8d4", transition:"background .3s" }} />
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, color:e.numero<=etapaAtual?s.green:"#9ab89a", fontWeight:e.numero===etapaAtual?700:400 }}>{e.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OpcaoSingle({ texto, selecionado, onClick }) {
  return (
    <button onClick={onClick} style={{
      width:"100%", textAlign:"left", padding:"13px 16px", borderRadius:10,
      border:selecionado?`2px solid ${s.green}`:"1.5px solid #d4e0d4",
      background:selecionado?s.greenBg:"#fff", cursor:"pointer",
      fontFamily:"'DM Sans',sans-serif", fontSize:14,
      color:selecionado?s.greenDark:s.text, fontWeight:selecionado?600:400,
      display:"flex", alignItems:"center", gap:10,
      transition:"all .18s ease", marginBottom:8,
      boxShadow:selecionado?"0 2px 12px rgba(45,106,45,.12)":"none",
    }}>
      <div style={{ width:18, height:18, borderRadius:"50%", flexShrink:0, border:selecionado?`5px solid ${s.green}`:"1.5px solid #b0c8b0", background:"#fff", transition:"all .18s" }} />
      {texto}
    </button>
  );
}

function OpcaoMulti({ texto, selecionado, onClick, desabilitado }) {
  return (
    <button onClick={onClick} disabled={desabilitado && !selecionado} style={{
      width:"100%", textAlign:"left", padding:"13px 16px", borderRadius:10,
      border:selecionado?`2px solid ${s.green}`:"1.5px solid #d4e0d4",
      background:selecionado?s.greenBg:desabilitado?"#f8fbf8":"#fff",
      cursor:(desabilitado&&!selecionado)?"not-allowed":"pointer",
      fontFamily:"'DM Sans',sans-serif", fontSize:14,
      color:selecionado?s.greenDark:desabilitado?"#b0c8b0":s.text,
      fontWeight:selecionado?600:400, display:"flex", alignItems:"center", gap:10,
      transition:"all .18s ease", marginBottom:8, opacity:(desabilitado&&!selecionado)?.5:1,
      boxShadow:selecionado?"0 2px 12px rgba(45,106,45,.12)":"none",
    }}>
      <div style={{ width:18, height:18, borderRadius:4, flexShrink:0, border:selecionado?"none":"1.5px solid #b0c8b0", background:selecionado?s.green:"#fff", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .18s" }}>
        {selecionado && <span style={{ color:"#fff", fontSize:11, fontWeight:900 }}>✓</span>}
      </div>
      {texto}
    </button>
  );
}

function CampoTexto({ valor, placeholder, onChange }) {
  return (
    <textarea
      value={valor}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder || "Escreva sua resposta..."}
      rows={4}
      style={{
        width:"100%", padding:"13px 16px", borderRadius:10,
        border:"1.5px solid #d4e0d4", background:"#fafcfa",
        fontFamily:"'DM Sans',sans-serif", fontSize:14, color:s.text,
        outline:"none", resize:"vertical", boxSizing:"border-box",
        lineHeight:1.6, transition:"border-color .18s ease",
      }}
      onFocus={e => e.target.style.borderColor = s.green}
      onBlur={e => e.target.style.borderColor = "#d4e0d4"}
    />
  );
}

function Card({ children, style={} }) {
  return (
    <div style={{ background:"#fff", borderRadius:16, padding:24, boxShadow:"0 2px 20px rgba(45,106,45,.08)", border:"1px solid #e8f0e8", marginBottom:16, ...style }}>
      {children}
    </div>
  );
}

function SecTitle({ emoji, titulo }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
      <span style={{ fontSize:20 }}>{emoji}</span>
      <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:s.greenDark, margin:0 }}>{titulo}</h3>
    </div>
  );
}

function TagPerfil({ texto }) {
  return (
    <span style={{ display:"inline-block", background:`linear-gradient(135deg,${s.green},${s.greenLight})`, color:"#fff", borderRadius:99, padding:"4px 14px", fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:700, letterSpacing:"0.04em", marginBottom:8 }}>
      {texto}
    </span>
  );
}

function ScoreBarra({ score }) {
  const cor = score>=70?s.green:score>=45?"#e6a817":"#c0392b";
  const label = score>=70?"Alto":score>=45?"Moderado":"Baixo";
  return (
    <div style={{ marginTop:12 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
        <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#6b7c6b" }}>Score de mercado local</span>
        <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:700, color:cor }}>{score}/100 — {label}</span>
      </div>
      <div style={{ height:8, background:"#e8f0e8", borderRadius:99, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${score}%`, background:cor, borderRadius:99, transition:"width 1s ease" }} />
      </div>
    </div>
  );
}

const bodyTxt = { fontFamily:"'DM Sans',sans-serif", fontSize:14, color:s.text, lineHeight:1.7, margin:0 };

function TelaInicial({ onStart }) {
  return (
    <div style={{ textAlign:"center", padding:"20px 0" }}>
      <div style={{ width:72, height:72, borderRadius:"50%", background:`linear-gradient(135deg,${s.green},${s.greenLight})`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", boxShadow:"0 4px 20px rgba(45,106,45,.25)" }}>
        <span style={{ fontSize:32 }}>📊</span>
      </div>
      <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:s.greenDark, lineHeight:1.25, marginBottom:12 }}>
        Descubra o potencial do negócio de microverdes para sua cidade e seu perfil
      </h1>
      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:15, color:"#4a6b4a", lineHeight:1.65, maxWidth:380, margin:"0 auto 28px" }}>
        Responda algumas perguntas e receba um diagnóstico personalizado sobre mercado local, espaço, investimento, riscos e próximos passos para começar do jeito certo.
      </p>
      <div style={{ background:"#f5faf5", border:`1px solid ${s.greenBorder}`, borderRadius:12, padding:"14px 18px", marginBottom:28, textAlign:"left" }}>
        {["✅ Diagnóstico personalizado por IA","✅ Simulação de retorno realista por fases","✅ Análise de riscos e mercado local","✅ Resultado enviado para seu e-mail"].map(t => (
          <div key={t} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:s.green, fontWeight:500, padding:"3px 0" }}>{t}</div>
        ))}
      </div>
      <button onClick={onStart} style={{ width:"100%", padding:16, background:`linear-gradient(135deg,${s.green},#3d8c3d)`, color:"#fff", border:"none", borderRadius:12, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:16, fontWeight:700, boxShadow:"0 4px 16px rgba(45,106,45,.35)", letterSpacing:"0.02em" }}>
        Fazer meu diagnóstico gratuito →
      </button>
      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"#9ab89a", marginTop:12 }}>Leva cerca de 3 minutos · 100% gratuito</p>
    </div>
  );
}

function TelaCadastro({ onNext }) {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");

  const ir = () => {
    if (!nome.trim()||!whatsapp.trim()||!email.trim()) { setErro("Preencha todos os campos."); return; }
    if (!email.includes("@")) { setErro("E-mail inválido."); return; }
    onNext({ nome:nome.trim(), whatsapp:whatsapp.trim(), email:email.trim() });
  };

  const inp = { width:"100%", padding:"13px 14px", borderRadius:10, border:"1.5px solid #d4e0d4", fontFamily:"'DM Sans',sans-serif", fontSize:14, color:s.greenDark, outline:"none", boxSizing:"border-box", background:"#fafcfa", marginBottom:12 };

  return (
    <div>
      <div style={{ textAlign:"center", marginBottom:24 }}>
        <div style={{ fontSize:32, marginBottom:8 }}>👋</div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:s.greenDark, marginBottom:8 }}>Antes de começar</h2>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"#4a6b4a", lineHeight:1.6 }}>Seu diagnóstico será enviado para o seu e-mail ao final.</p>
      </div>
      <input style={inp} placeholder="Seu nome" value={nome} onChange={e=>setNome(e.target.value)} />
      <input style={inp} placeholder="WhatsApp (com DDD)" value={whatsapp} onChange={e=>setWhatsapp(e.target.value)} type="tel" />
      <input style={inp} placeholder="Seu melhor e-mail" value={email} onChange={e=>setEmail(e.target.value)} type="email" />
      {erro && <p style={{ color:"#c0392b", fontSize:13, fontFamily:"'DM Sans',sans-serif", marginBottom:8 }}>{erro}</p>}
      <button onClick={ir} style={{ width:"100%", padding:15, background:`linear-gradient(135deg,${s.green},#3d8c3d)`, color:"#fff", border:"none", borderRadius:12, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:15, fontWeight:700, boxShadow:"0 4px 16px rgba(45,106,45,.3)" }}>
        Continuar →
      </button>
      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"#9ab89a", textAlign:"center", marginTop:10 }}>Seus dados não serão compartilhados com terceiros.</p>
    </div>
  );
}

function TelaPerguntas({ perguntasEtapa, etapaAtual, totalEtapas, respostas, onResposta, onNext, onBack }) {
  const todasOk = perguntasEtapa.every(p => {
    if (p.tipo === "multi") return Array.isArray(respostas[p.id]) && respostas[p.id].length > 0;
    if (p.tipo === "texto") return !!(respostas[p.id] && respostas[p.id].trim().length > 0);
    return !!respostas[p.id];
  });

  const toggleMulti = (id, opcao, max) => {
    const atual = Array.isArray(respostas[id]) ? respostas[id] : [];
    if (atual.includes(opcao)) onResposta(id, atual.filter(x=>x!==opcao));
    else if (atual.length < max) onResposta(id, [...atual, opcao]);
  };

  return (
    <div>
      <BarraProgresso etapaAtual={etapaAtual} totalEtapas={totalEtapas} />
      {perguntasEtapa.map(p => {
        const selMulti = Array.isArray(respostas[p.id]) ? respostas[p.id] : [];
        const limiteOk = p.tipo==="multi" && selMulti.length >= p.maxSelect;
        return (
          <div key={p.id} style={{ marginBottom:28 }}>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:17, color:s.greenDark, marginBottom:4, lineHeight:1.35 }}>{p.pergunta}</h3>
            {p.subtitulo && (
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#7a9a7a", marginBottom:12 }}>
                {p.subtitulo}{p.tipo==="multi"&&selMulti.length>0&&` · ${selMulti.length}/${p.maxSelect} selecionadas`}
              </p>
            )}
            {p.tipo==="texto"
              ? <CampoTexto valor={respostas[p.id]||""} placeholder={p.placeholder} onChange={val=>onResposta(p.id,val)} />
              : p.tipo==="multi"
                ? p.opcoes.map(op => <OpcaoMulti key={op} texto={op} selecionado={selMulti.includes(op)} desabilitado={limiteOk} onClick={()=>toggleMulti(p.id,op,p.maxSelect)} />)
                : p.opcoes.map(op => <OpcaoSingle key={op} texto={op} selecionado={respostas[p.id]===op} onClick={()=>onResposta(p.id,op)} />)
            }
          </div>
        );
      })}
      <div style={{ display:"flex", gap:10, marginTop:8 }}>
        <button onClick={onBack} style={{ flex:1, padding:14, background:s.greenBg, color:s.green, border:`1.5px solid ${s.greenBorder}`, borderRadius:12, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600 }}>← Voltar</button>
        <button onClick={onNext} disabled={!todasOk} style={{ flex:2, padding:14, background:todasOk?`linear-gradient(135deg,${s.green},#3d8c3d)`:"#d4e8d4", color:todasOk?"#fff":"#9ab89a", border:"none", borderRadius:12, cursor:todasOk?"pointer":"not-allowed", fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:700, boxShadow:todasOk?"0 4px 16px rgba(45,106,45,.3)":"none", transition:"all .2s" }}>
          {etapaAtual===totalEtapas?"Gerar meu diagnóstico →":"Próxima etapa →"}
        </button>
      </div>
    </div>
  );
}

function TelaCarregando() {
  const msgs = [
    "Analisando seu perfil e mercado local...",
    "Calculando seu potencial de retorno...",
    "Mapeando seus principais riscos...",
    "Preparando seu diagnóstico personalizado...",
    "Quase lá, finalizando tudo para você...",
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => { const t = setInterval(()=>setIdx(i=>(i+1)%msgs.length),2200); return ()=>clearInterval(t); }, []);
  return (
    <div style={{ textAlign:"center", padding:"40px 0" }}>
      <div style={{ fontSize:48, marginBottom:20, display:"inline-block", animation:"spin 3s linear infinite" }}>🌿</div>
      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:s.greenDark, marginBottom:12 }}>Gerando seu diagnóstico</h2>
      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"#4a6b4a", minHeight:24 }}>{msgs[idx]}</p>
      <div style={{ display:"flex", justifyContent:"center", gap:6, marginTop:24 }}>
        {[0,1,2].map(i=><div key={i} style={{ width:8, height:8, borderRadius:"50%", background:s.green, animation:`bounce 1.2s ${i*.2}s infinite` }} />)}
      </div>
      <div style={{ marginTop:20, padding:"12px 16px", background:"#f5faf5", borderRadius:10, border:"1px solid #d4e8d4", maxWidth:300, margin:"20px auto 0" }}>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#4a6b4a", lineHeight:1.6, margin:0 }}>
          ⏱️ Seu diagnóstico leva cerca de <strong>1 minuto</strong> para ser gerado — já já aparece para você.
        </p>
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes bounce{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-8px);opacity:1}}`}</style>
    </div>
  );
}

function TelaErro({ onVoltar }) {
  return (
    <div style={{ textAlign:"center", padding:"40px 0" }}>
      <div style={{ fontSize:48, marginBottom:16 }}>⚠️</div>
      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:s.greenDark, marginBottom:12 }}>Não foi possível gerar o diagnóstico</h2>
      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"#4a6b4a", lineHeight:1.6, marginBottom:24 }}>
        Houve um problema na conexão com o servidor. Seus dados foram salvos. Tente novamente em instantes.
      </p>
      <button onClick={onVoltar} style={{ padding:"14px 28px", background:`linear-gradient(135deg,${s.green},#3d8c3d)`, color:"#fff", border:"none", borderRadius:12, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:700 }}>
        Tentar novamente
      </button>
    </div>
  );
}
function BlocoRetorno({ texto, respostas }) {
  if (!texto) return null;
  return (
    <div>
      <div style={{ background:"#f5faf5", border:"1px solid #d4e8d4", borderRadius:10, padding:"10px 14px", marginBottom:14 }}>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#4a6b4a", fontWeight:600, marginBottom:6 }}>📊 Cenário analisado:</p>
        {respostas?.p15 && <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#3d5c3d", margin:"2px 0" }}>• Investimento: <strong>{respostas.p15}</strong></p>}
        {respostas?.p12 && <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#3d5c3d", margin:"2px 0" }}>• Espaço: <strong>{respostas.p12}</strong></p>}
        {respostas?.p18 && <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#3d5c3d", margin:"2px 0" }}>• Tempo por dia: <strong>{respostas.p18}</strong></p>}
      </div>
      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"#3d5c3d", lineHeight:1.8, whiteSpace:"pre-line" }}>{texto}</p>
    </div>
  );
}
function TelaDiagnostico({ diagnostico, nome, perfil, scoreMercado, respostas }) {
  if (!diagnostico) return null;
  return (
    <div>
      <div style={{ background:`linear-gradient(135deg,${s.greenDark},${s.green})`, borderRadius:16, padding:24, marginBottom:16, textAlign:"center", color:"#fff" }}>
        <div style={{ fontSize:36, marginBottom:8 }}>🌿</div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, margin:"0 0 6px", color:"#fff" }}>Diagnóstico de {nome}</h2>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, opacity:.8, margin:0 }}>Diagnóstico personalizado por IA · Marcos Microverdes</p>
      </div>

      <Card>
        <SecTitle emoji="🧭" titulo="Seu perfil" />
        <TagPerfil>{perfil}</TagPerfil>
        <ScoreBarra score={scoreMercado} />
        <p style={{ ...bodyTxt, marginTop:14 }}>{diagnostico.bloco1_perfil}</p>
      </Card>

      <Card>
        <SecTitle emoji="📍" titulo="Seu potencial de mercado" />
        <p style={bodyTxt}>{diagnostico.bloco2_mercado}</p>
      </Card>

      <Card>
  <SecTitle emoji="📈" titulo="Diagnóstico de tempo e retorno de investimento" />
  <BlocoRetorno texto={diagnostico.bloco3_retorno} respostas={{p15: respostas?.p15, p12: respostas?.p12, p18: respostas?.p18}} />
</Card>

      <Card>
        <SecTitle emoji="💰" titulo="Diagnóstico do investimento inicial" />
        <p style={bodyTxt}>{diagnostico.bloco4_investimento}</p>
      </Card>

      <Card>
        <SecTitle emoji="⚠️" titulo="Seus principais riscos" />
        {Array.isArray(diagnostico.bloco5_riscos) && diagnostico.bloco5_riscos.map((r,i) => (
          <div key={i} style={{ display:"flex", gap:10, padding:"10px 0", borderBottom:i<diagnostico.bloco5_riscos.length-1?"1px solid #f0f5f0":"none" }}>
            <span style={{ color:"#c0392b", fontWeight:700, fontSize:16, flexShrink:0 }}>→</span>
            <p style={{ ...bodyTxt, margin:0 }}>{r}</p>
          </div>
        ))}
      </Card>

      <Card style={{ background:"linear-gradient(135deg,#f5faf5,#e8f5e8)", border:"1.5px solid #b8d8b8" }}>
        <SecTitle emoji="🔄" titulo="Por que consistência define tudo" />
        <p style={bodyTxt}>{diagnostico.bloco6_consistencia}</p>
      </Card>

      <div style={{ background:`linear-gradient(135deg,${s.greenDark},${s.green})`, borderRadius:16, padding:24, textAlign:"center" }}>
        <div style={{ fontSize:32, marginBottom:12 }}>🌿</div>

        <div style={{ display:"inline-block", background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.35)", borderRadius:99, padding:"7px 18px", marginBottom:16 }}>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#fff", fontWeight:800, letterSpacing:"0.06em", textTransform:"uppercase" }}>
            Você está credenciado(a) para o Workshop de Implementação
          </span>
        </div>

        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:19, color:"#fff", marginBottom:14, lineHeight:1.35 }}>
          Um domingo inteiro, das 9h às 17h, dedicado só a colocar seu 1m² pra funcionar.
        </h3>

        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"#d4f0d4", marginBottom:10, lineHeight:1.65 }}>
          Não é uma aula, é um dia inteiro prático: da germinação à primeira venda. Você sai de lá sabendo onde cultivar, o que cultivar primeiro, como mapear compradores na sua cidade e como abordar seus primeiros clientes.
        </p>

        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"#fff", fontWeight:700, marginBottom:22, lineHeight:1.6 }}>
          Antes do domingo, assista as aulas preparatórias — elas garantem que você chegue no Workshop já com a base pronta pra aproveitar cada minuto.
        </p>

        <a href={CONFIG.CTA_CURSO_GRATUITO} style={{ display:"block", width:"100%", padding:16, background:"#ffb100", color:"#1a3d1a", borderRadius:12, textDecoration:"none", fontFamily:"'DM Sans',sans-serif", fontSize:15, fontWeight:800, boxShadow:"0 4px 18px rgba(0,0,0,.3)", boxSizing:"border-box" }}>
          ASSISTIR AULAS PREPARATÓRIAS →
        </a>

        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"rgba(255,255,255,0.7)", marginTop:16 }}>📧 Seu diagnóstico completo foi enviado para o seu e-mail.</p>
      </div>
    </div>
  );
}

export default function DiagnosticoMicroverdes() {
  const [tela, setTela] = useState("inicio");
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [cadastro, setCadastro] = useState({ nome:"", whatsapp:"", email:"" });
  const [respostas, setRespostas] = useState({});
  const [diagnostico, setDiagnostico] = useState(null);
  const [perfil, setPerfil] = useState("");
  const [scoreMercado, setScoreMercado] = useState(0);
  const topoRef = useRef(null);

  const scroll = () => setTimeout(()=>topoRef.current?.scrollIntoView({behavior:"smooth"}),50);
  const perguntasPorEtapa = etapa => PERGUNTAS.filter(p=>p.etapa===etapa);
  const totalEtapas = 4;

  const handleResposta = (id, valor) => setRespostas(r=>({...r,[id]:valor}));

  const handleNext = async () => {
    scroll();
    if (etapaAtual < totalEtapas) { setEtapaAtual(e=>e+1); return; }

    setTela("carregando");
    const { perfil:p, scoreMercado:sc } = calcularPerfil(respostas);
    setPerfil(p); setScoreMercado(sc);

    const diag = await gerarDiagnostico(respostas, cadastro.nome, p, sc);
    if (!diag) { setTela("erro"); return; }

    setDiagnostico(diag);
    enviarParaMake({ ...cadastro, respostas, perfil:p, score_mercado:sc, diagnostico:diag, timestamp:new Date().toISOString() });
    setTela("resultado");
    scroll();
  };

  const handleBack = () => {
    scroll();
    if (etapaAtual > 1) setEtapaAtual(e=>e-1);
    else setTela("cadastro");
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}body{background:#f5faf5}`}</style>
      <div ref={topoRef} style={{ minHeight:"100vh", background:"linear-gradient(160deg,#f0f7f0 0%,#fafcfa 60%,#e8f5e8 100%)", fontFamily:"'DM Sans',sans-serif", paddingBottom:60 }}>
        <div style={{ background:"#fff", borderBottom:"1px solid #e8f0e8", padding:"14px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:10, boxShadow:"0 1px 8px rgba(45,106,45,.06)" }}>
          <Logo />
          {tela!=="inicio"&&tela!=="resultado"&&<span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"#9ab89a" }}>Diagnóstico gratuito</span>}
        </div>
        <div style={{ maxWidth:480, margin:"0 auto", padding:"24px 16px" }}>
          {tela==="inicio"    && <TelaInicial onStart={()=>{scroll();setTela("cadastro");}} />}
          {tela==="cadastro"  && <TelaCadastro onNext={d=>{setCadastro(d);scroll();setTela("perguntas");}} />}
          {tela==="perguntas" && <TelaPerguntas perguntasEtapa={perguntasPorEtapa(etapaAtual)} etapaAtual={etapaAtual} totalEtapas={totalEtapas} respostas={respostas} onResposta={handleResposta} onNext={handleNext} onBack={handleBack} />}
          {tela==="carregando"&& <TelaCarregando />}
          {tela==="erro"      && <TelaErro onVoltar={()=>{setEtapaAtual(totalEtapas);setTela("perguntas");}} />}
          {tela==="resultado" && <TelaDiagnostico diagnostico={diagnostico} nome={cadastro.nome} perfil={perfil} scoreMercado={scoreMercado} respostas={respostas} />}
        </div>
      </div>
    </>
  );
}
