/**
 * GRID - O Gestor da Rede Elétrica Nacional
 * Master 16-Bit HUD UI Design System, Typewriter Animation & Immediate Ex-Minister Tutorial Engine
 */

const CUTSCENE_SCRIPT = [
  // ==========================================
  // CENA 1: O DIAGNÓSTICO DO COLAPSO
  // ==========================================
  {
    speaker: "Dra. Elena",
    avatar: "assets/dra_elena_avatar.jpg",
    title: "Membro Sênior / Física Teórica",
    color: "#60a5fa",
    text: "{NAME}... Sente-se. O que você vai ouvir agora não está nos jornais."
  },
  {
    speaker: "Dra. Elena",
    avatar: "assets/dra_elena_avatar.jpg",
    title: "Membro Sênior / Física Teórica",
    color: "#60a5fa",
    text: "Nós perdemos o controle. O modelo energético do século XX entrou em colapso definitivo. A dependência excessiva de combustíveis fósseis no Hemisfério Norte gerou um efeito cascata no clima global."
  },
  {
    speaker: "Robô Volta",
    avatar: "assets/robo_volta_avatar.jpg",
    title: "Assistente de Automação SIN",
    color: "#00e5ff",
    text: "[Bip] Nossos sistemas inteligentes de medição e automação da rede registram falhas múltiplas. A Europa está racionando gás natural, e o preço do barril de petróleo atingiu picos insustentáveis."
  },
  {
    speaker: "Dra. Elena",
    avatar: "assets/dra_elena_avatar.jpg",
    title: "Membro Sênior / Física Teórica",
    color: "#60a5fa",
    text: "E aqui no Brasil, a conta chegou. Uma anomalia climática brutal secou as principais bacias hidrográficas do Sudeste e Centro-Oeste. Sem água, nossa principal fonte despencou."
  },
  {
    speaker: "Robô Volta",
    avatar: "assets/robo_volta_avatar.jpg",
    title: "Assistente de Automação SIN",
    color: "#00e5ff",
    text: "[Alerta] A energia potencial gravítica dos nossos reservatórios atingiu a marca de 14%. A conversão para energia cinética e elétrica nas turbinas está comprometida."
  },

  // ==========================================
  // CENA 2: O IMPACTO ECONÔMICO E SOCIAL
  // ==========================================
  {
    speaker: "Dra. Elena",
    avatar: "assets/dra_elena_avatar.jpg",
    title: "Membro Sênior / Física Teórica",
    color: "#60a5fa",
    text: "Para evitar um apagão total, o antigo Ministério religou todas as usinas termelétricas a carvão e óleo diesel de emergência."
  },
  {
    speaker: "Dra. Elena",
    avatar: "assets/dra_elena_avatar.jpg",
    title: "Membro Sênior / Física Teórica",
    color: "#60a5fa",
    text: "O resultado? A energia química transformada em térmica nestas usinas possui um custo operacional altíssimo e uma perda gigantesca de rendimento, além de poluir os céus das nossas cidades."
  },
  {
    speaker: "Robô Volta",
    avatar: "assets/robo_volta_avatar.jpg",
    title: "Assistente de Automação SIN",
    color: "#00e5ff",
    text: "[Bip] Impacto social crítico: A tarifa de energia subiu 85% em três meses. Indústrias estão demitindo em massa para compensar os custos. Protestos violentos foram registrados em cinco capitais."
  },
  {
    speaker: "Dra. Elena",
    avatar: "assets/dra_elena_avatar.jpg",
    title: "Membro Sênior / Física Teórica",
    color: "#60a5fa",
    text: "O antigo Ministro não suportou a pressão e renunciou esta manhã. O país está à beira do abismo econômico, {NAME}."
  },

  // ==========================================
  // CENA 3: A POSSE E AS REGRAS DO JOGO
  // ==========================================
  {
    speaker: "Dra. Elena",
    avatar: "assets/dra_elena_avatar.jpg",
    title: "Membro Sênior / Física Teórica",
    color: "#60a5fa",
    text: "O Presidente assinou sua nomeação. A partir de agora, você é a autoridade máxima do Sistema Elétrico Nacional."
  },
  {
    speaker: "Robô Volta",
    avatar: "assets/robo_volta_avatar.jpg",
    title: "Assistente de Automação SIN",
    color: "#00e5ff",
    text: "Iniciando protocolo de transição. Ministro {NAME}, você deverá monitorar os dados das nossas centrais automatizadas."
  },
  {
    speaker: "Robô Volta",
    avatar: "assets/robo_volta_avatar.jpg",
    title: "Assistente de Automação SIN",
    color: "#00e5ff",
    text: "Você deve manter quatro pilares acima da linha de colapso de 20%: O Caixa do Governo, a Aprovação Popular, a Preservação Ambiental e a Estabilidade da Rede Elétrica."
  },
  {
    speaker: "Dra. Elena",
    avatar: "assets/dra_elena_avatar.jpg",
    title: "Membro Sênior / Física Teórica",
    color: "#60a5fa",
    text: "Não existe mágica aqui, Ministro. A primeira lei da conservação da energia é implacável: a energia não se cria, apenas se transforma."
  },
  {
    speaker: "Dra. Elena",
    avatar: "assets/dra_elena_avatar.jpg",
    title: "Membro Sênior / Física Teórica",
    color: "#60a5fa",
    text: "Se você investir pesado em fazendas solares e eólicas, teremos energia limpa, mas terá que lidar com a intermitência dos ventos e do sol. Se optar por construir novas hidrelétricas, enfrentará a fúria da população e de ativistas devido ao alagamento de terras e perda de biodiversidade."
  },
  {
    speaker: "Dra. Elena",
    avatar: "assets/dra_elena_avatar.jpg",
    title: "Membro Sênior / Física Teórica",
    color: "#60a5fa",
    text: "Cada escolha sua moldará o mapa geográfico e a economia do Brasil nas próximas três décadas. Nós não temos margem para erro."
  },
  {
    speaker: "Robô Volta",
    avatar: "assets/robo_volta_avatar.jpg",
    title: "Assistente de Automação SIN",
    color: "#00e5ff",
    text: "[Bip] O sistema está online. A primeira crise acaba de chegar na sua mesa, Ministro. Boa sorte."
  }
];

// Roteiro do Tutorial Guiado pelo Ex-Ministro Mendes
const TUTORIAL_STEPS = [
  {
    stepBadge: "PASSO 1 DE 6",
    title: "MENSAGEM DO EX-MINISTRO MENDES",
    targetId: null,
    arrowDirection: "none",
    text: "Ministro {NAME}... Antes de eu entregar minhas credenciais e sair da sala de controle, escute com atenção. O sistema elétrico do Brasil é complexo. Vou te mostrar como funciona cada elemento desta mesa para você não cometer os mesmos erros que eu cometi."
  },
  {
    stepBadge: "PASSO 2 DE 6",
    title: "1. BARRAS DE INDICADORES (TOPO)",
    targetId: "tut-target-indicators",
    arrowDirection: "top",
    text: "Ali no topo estão os seus 4 pilares de sobrevivência: Economia ($), Sociedade (♥), Meio Ambiente (🌲) e Estabilidade da Rede (⚡). Se QUALQUER um deles chegar a 0%, o país entra em colapso total na hora!"
  },
  {
    stepBadge: "PASSO 3 DE 6",
    title: "2. CARTA DE DILEMA (CENTRO)",
    targetId: "tut-target-dilemma",
    arrowDirection: "center",
    text: "No centro da mesa está o seu dilema da rodada. Cada carta é uma decisão real de Física ou Geografia. Escolha entre a OPÇÃO A (Esquerda) ou OPÇÃO B (Direita). Lembre-se: não existe escolha perfeita, toda decisão ganha em uma área e perde em outra."
  },
  {
    stepBadge: "PASSO 4 DE 6",
    title: "3. HOLÓGRAFO REGIONAL (CANTO ESQUERDO)",
    targetId: "tut-target-map",
    arrowDirection: "bottom-left",
    text: "Neste mapa holográfico do Brasil, você acompanha o impacto nas regiões. Veja a seca nos reservatórios do Sudeste, a vazão das usinas na Amazônia e os ventos do Nordeste. Clima e geografia afetam a geração!"
  },
  {
    stepBadge: "PASSO 5 DE 6",
    title: "4. MATRIZ ENERGÉTICA (CANTO DIREITO)",
    targetId: "tut-target-chart",
    arrowDirection: "bottom-right",
    text: "Este gráfico circular mede a divisão da nossa matriz elétrica (Hidrelétrica, Solar, Eólica, Termelétrica, Nuclear e Biomassa). As legendas ao lado mostram a porcentagem exata em tempo real. Sua missão é fazer a transição para fontes limpas!"
  },
  {
    stepBadge: "PASSO 6 DE 6",
    title: "5. MODO CRÍTICO DE EMERGÊNCIA (< 20%)",
    targetId: null,
    arrowDirection: "none",
    text: "CUIDADO! Se qualquer barra cair abaixo de 20%, o sistema entrará automaticamente em Modo Crítico de Emergência com luzes vermelhas piscantes. Agora as chaves do Sistema Elétrico Nacional são suas. Boa sorte, Ministro {NAME}!"
  }
];

const systemIndicators = { economy: 70, social: 75, environment: 60, stability: 80 };
const energyMatrix = { hydro: 60.0, solar: 8.0, wind: 12.0, thermal: 15.0, nuclear: 3.0, biomass: 2.0 };

document.addEventListener('DOMContentLoaded', () => {

  document.addEventListener('selectstart', (e) => {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  });

  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  });

  const initialDialogueElem = document.getElementById('initial-dialogue-text');
  const initialText = "Bem-vindo, Gestor! Identifique-se para assumir o controle do sistema elétrico nacional.";
  const inputElem = document.getElementById('player-name');
  const btnStart = document.getElementById('btn-start');

  const titleScreen = document.getElementById('title-screen');
  const cutsceneScreen = document.getElementById('cutscene-screen');
  const hudDashboardScreen = document.getElementById('hud-dashboard-screen');
  const hudBgRoom = document.getElementById('hud-bg-room');

  const tutorialOverlay = document.getElementById('tutorial-overlay');
  const tutStepBadge = document.getElementById('tut-step-badge');
  const tutStepTitle = document.getElementById('tut-step-title');
  const tutStepText = document.getElementById('tut-step-text');
  const tutArrow = document.getElementById('tutorial-arrow');
  const btnTutPrev = document.getElementById('btn-tut-prev');
  const btnTutNext = document.getElementById('btn-tut-next');

  const cutsceneAvatar = document.getElementById('cutscene-avatar');
  const cutsceneSpeakerName = document.getElementById('cutscene-speaker-name');
  const cutsceneSpeakerTitle = document.getElementById('cutscene-speaker-title');
  const cutsceneTextElem = document.getElementById('cutscene-text');

  let playerName = "GESTOR";
  let cutsceneIndex = 0;
  let tutorialStepIndex = 0;
  let activeTypingTimer = null;
  let isCurrentlyTyping = false;
  let currentFullText = "";
  let hudChart = null;

  function typeTextEffect(targetElem, text, speed = 22, onComplete) {
    if (activeTypingTimer) clearInterval(activeTypingTimer);
    targetElem.textContent = "";
    currentFullText = text;
    isCurrentlyTyping = true;
    let charIndex = 0;

    activeTypingTimer = setInterval(() => {
      if (charIndex < text.length) {
        targetElem.textContent += text.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(activeTypingTimer);
        activeTypingTimer = null;
        isCurrentlyTyping = false;
        if (onComplete) onComplete();
      }
    }, speed);
  }

  function completeTypingInstantly(targetElem) {
    if (isCurrentlyTyping && activeTypingTimer) {
      clearInterval(activeTypingTimer);
      activeTypingTimer = null;
      targetElem.textContent = currentFullText;
      isCurrentlyTyping = false;
      return true;
    }
    return false;
  }

  if (initialDialogueElem) {
    typeTextEffect(initialDialogueElem, initialText, 25);
  }

  if (inputElem) {
    inputElem.addEventListener('input', (e) => {
      e.target.value = e.target.value.toUpperCase();
    });
  }

  if (btnStart) {
    btnStart.addEventListener('click', (e) => {
      e.preventDefault();
      playerName = (inputElem && inputElem.value.trim()) ? inputElem.value.trim() : 'GESTOR';

      if (titleScreen) titleScreen.classList.add('hidden');
      if (cutsceneScreen) cutsceneScreen.classList.remove('hidden');

      cutsceneIndex = 0;
      renderCutsceneLine();
    });
  }

  function renderCutsceneLine() {
    if (cutsceneIndex >= CUTSCENE_SCRIPT.length) {
      if (cutsceneScreen) cutsceneScreen.classList.add('hidden');
      if (hudDashboardScreen) hudDashboardScreen.classList.remove('hidden');
      updateHUD();
      startTutorial();
      return;
    }

    const currentLine = CUTSCENE_SCRIPT[cutsceneIndex];
    const textToDisplay = currentLine.text.replace(/{NAME}/g, playerName);

    if (cutsceneAvatar) cutsceneAvatar.src = currentLine.avatar;
    if (cutsceneSpeakerName) {
      cutsceneSpeakerName.textContent = currentLine.speaker;
      cutsceneSpeakerName.style.color = currentLine.color || '#60a5fa';
    }
    if (cutsceneSpeakerTitle) cutsceneSpeakerTitle.textContent = currentLine.title;

    if (cutsceneTextElem) {
      typeTextEffect(cutsceneTextElem, textToDisplay, 22);
    }
  }

  function advanceCutscene() {
    if (cutsceneScreen && cutsceneScreen.classList.contains('hidden')) return;

    if (completeTypingInstantly(cutsceneTextElem)) {
      return;
    }

    cutsceneIndex++;
    renderCutsceneLine();
  }

  if (cutsceneScreen) cutsceneScreen.addEventListener('click', advanceCutscene);

  document.addEventListener('keydown', (e) => {
    if (cutsceneScreen && !cutsceneScreen.classList.contains('hidden')) {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
        e.preventDefault();
        advanceCutscene();
      }
    }
  });

  function startTutorial() {
    tutorialStepIndex = 0;
    if (tutorialOverlay) tutorialOverlay.classList.remove('hidden');
    renderTutorialStep();
  }

  function renderTutorialStep() {
    document.querySelectorAll('.tutorial-target-highlight').forEach(el => {
      el.classList.remove('tutorial-target-highlight');
    });

    if (tutorialStepIndex >= TUTORIAL_STEPS.length) {
      closeTutorial();
      return;
    }

    const step = TUTORIAL_STEPS[tutorialStepIndex];

    if (tutStepBadge) tutStepBadge.textContent = step.stepBadge;
    if (tutStepTitle) tutStepTitle.textContent = step.title;

    if (tutStepText) {
      typeTextEffect(tutStepText, step.text.replace(/{NAME}/g, playerName), 20);
    }

    if (btnTutPrev) {
      btnTutPrev.style.visibility = tutorialStepIndex === 0 ? 'hidden' : 'visible';
    }

    if (btnTutNext) {
      btnTutNext.textContent = tutorialStepIndex === TUTORIAL_STEPS.length - 1 ? 'CONCLUIR ▶' : 'PRÓXIMO ▶';
    }

    if (step.targetId) {
      const targetElem = document.getElementById(step.targetId);
      if (targetElem) {
        targetElem.classList.add('tutorial-target-highlight');
        positionTutorialArrow(targetElem, step.arrowDirection);
      }
    } else {
      if (tutArrow) tutArrow.style.display = 'none';
    }
  }

  function positionTutorialArrow(targetElem, direction) {
    if (!tutArrow || !targetElem) return;
    const rect = targetElem.getBoundingClientRect();
    tutArrow.style.display = 'block';

    if (direction === 'top') {
      tutArrow.className = 'tutorial-pixel-arrow top';
      tutArrow.innerHTML = '<div class="arrow-shape">▼</div>';
      tutArrow.style.top = `${Math.max(10, rect.top - 45)}px`;
      tutArrow.style.left = `${rect.left + rect.width / 2 - 15}px`;
    } else if (direction === 'bottom-left') {
      tutArrow.className = 'tutorial-pixel-arrow bottom';
      tutArrow.innerHTML = '<div class="arrow-shape">▲</div>';
      tutArrow.style.top = `${rect.top - 40}px`;
      tutArrow.style.left = `${rect.left + 40}px`;
    } else if (direction === 'bottom-right') {
      tutArrow.className = 'tutorial-pixel-arrow bottom';
      tutArrow.innerHTML = '<div class="arrow-shape">▲</div>';
      tutArrow.style.top = `${rect.top - 40}px`;
      tutArrow.style.left = `${rect.right - 50}px`;
    } else if (direction === 'center') {
      tutArrow.className = 'tutorial-pixel-arrow top';
      tutArrow.innerHTML = '<div class="arrow-shape">▼</div>';
      tutArrow.style.top = `${rect.top - 40}px`;
      tutArrow.style.left = `${rect.left + rect.width / 2 - 15}px`;
    }
  }

  function closeTutorial() {
    if (activeTypingTimer) clearInterval(activeTypingTimer);
    document.querySelectorAll('.tutorial-target-highlight').forEach(el => {
      el.classList.remove('tutorial-target-highlight');
    });
    if (tutArrow) tutArrow.style.display = 'none';
    if (tutorialOverlay) tutorialOverlay.classList.add('hidden');
  }

  if (btnTutNext) {
    btnTutNext.addEventListener('click', () => {
      if (isCurrentlyTyping && tutStepText) {
        completeTypingInstantly(tutStepText);
        return;
      }
      tutorialStepIndex++;
      renderTutorialStep();
    });
  }

  if (btnTutPrev) {
    btnTutPrev.addEventListener('click', () => {
      if (tutorialStepIndex > 0) {
        tutorialStepIndex--;
        renderTutorialStep();
      }
    });
  }

  function updateHUD() {
    let isAnyCritical = false;

    const map = [
      { key: 'economy', idVal: 'hud-val-eco', idFill: 'hud-fill-eco', idCard: 'hud-card-eco' },
      { key: 'social', idVal: 'hud-val-soc', idFill: 'hud-fill-soc', idCard: 'hud-card-soc' },
      { key: 'environment', idVal: 'hud-val-env', idFill: 'hud-fill-env', idCard: 'hud-card-env' },
      { key: 'stability', idVal: 'hud-val-sta', idFill: 'hud-fill-sta', idCard: 'hud-card-sta' }
    ];

    map.forEach(item => {
      const val = Math.round(systemIndicators[item.key]);
      const valElem = document.getElementById(item.idVal);
      const fillElem = document.getElementById(item.idFill);
      const cardElem = document.getElementById(item.idCard);

      if (valElem) valElem.textContent = `${val}%`;
      if (fillElem) fillElem.style.width = `${val}%`;

      if (val < 20) {
        isAnyCritical = true;
        if (cardElem) cardElem.classList.add('critical');
      } else {
        if (cardElem) cardElem.classList.remove('critical');
      }
    });

    if (hudBgRoom) {
      hudBgRoom.className = isAnyCritical ? 'hud-bg-room critical' : 'hud-bg-room stable';
    }

    initHudChart();
  }

  function initHudChart() {
    const ctx = document.getElementById('hudMatrixChart');
    if (!ctx || typeof Chart === 'undefined') return;

    document.getElementById('leg-val-hydro').textContent = `${energyMatrix.hydro.toFixed(1)}%`;
    document.getElementById('leg-val-solar').textContent = `${energyMatrix.solar.toFixed(1)}%`;
    document.getElementById('leg-val-wind').textContent = `${energyMatrix.wind.toFixed(1)}%`;
    document.getElementById('leg-val-thermal').textContent = `${energyMatrix.thermal.toFixed(1)}%`;
    document.getElementById('leg-val-nuclear').textContent = `${energyMatrix.nuclear.toFixed(1)}%`;
    document.getElementById('leg-val-biomass').textContent = `${energyMatrix.biomass.toFixed(1)}%`;

    if (hudChart) {
      hudChart.data.datasets[0].data = [
        energyMatrix.hydro, energyMatrix.solar, energyMatrix.wind,
        energyMatrix.thermal, energyMatrix.nuclear, energyMatrix.biomass
      ];
      hudChart.update();
      return;
    }

    try {
      hudChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Hidrelétrica', 'Solar', 'Eólica', 'Termelétrica', 'Nuclear', 'Biomassa'],
          datasets: [{
            data: [
              energyMatrix.hydro, energyMatrix.solar, energyMatrix.wind,
              energyMatrix.thermal, energyMatrix.nuclear, energyMatrix.biomass
            ],
            backgroundColor: ['#2980b9', '#f39c12', '#1abc9c', '#e67e22', '#9b59b6', '#27ae60'],
            borderColor: '#000',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (c) => ` ${c.label}: ${c.raw}%` } }
          },
          cutout: '55%'
        }
      });
    } catch (err) {}
  }

  window.updateHUD = updateHUD;
});
