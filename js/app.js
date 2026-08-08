/**
 * GRID - O Gestor da Rede Elétrica Nacional
 * Master 16-Bit HUD UI Design Mockup & RPG Cutscene System
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

document.addEventListener('DOMContentLoaded', () => {
  const initialDialogueElem = document.getElementById('initial-dialogue-text');
  const initialText = "Bem-vindo, Gestor! Identifique-se para assumir o controle do sistema elétrico nacional.";
  const inputElem = document.getElementById('player-name');
  const btnStart = document.getElementById('btn-start');

  const titleScreen = document.getElementById('title-screen');
  const cutsceneScreen = document.getElementById('cutscene-screen');
  const hudDashboardScreen = document.getElementById('hud-dashboard-screen');
  const hudBgRoom = document.getElementById('hud-bg-room');
  const btnToggleHud = document.getElementById('btn-toggle-hud-mode');

  const cutsceneAvatar = document.getElementById('cutscene-avatar');
  const cutsceneSpeakerName = document.getElementById('cutscene-speaker-name');
  const cutsceneSpeakerTitle = document.getElementById('cutscene-speaker-title');
  const cutsceneTextElem = document.getElementById('cutscene-text');

  let playerName = "GESTOR";
  let initialTypeIndex = 0;
  let cutsceneIndex = 0;
  let cutsceneTypeIndex = 0;
  let cutsceneTimer = null;
  let isTyping = false;
  let isStableMode = true;
  let audioCtx = null;
  let hudChart = null;

  function initAudioOnUserGesture() {
    try {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          audioCtx = new AudioContextClass();
        }
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    } catch (e) {}
  }

  window.addEventListener('click', initAudioOnUserGesture, { once: true });
  window.addEventListener('keydown', initAudioOnUserGesture, { once: true });

  function typeInitialWriter() {
    if (initialTypeIndex < initialText.length) {
      initialDialogueElem.textContent += initialText.charAt(initialTypeIndex);
      initialTypeIndex++;
      playRetroBeep(480);
      setTimeout(typeInitialWriter, 35);
    }
  }

  function playRetroBeep(freq = 480) {
    if (!audioCtx || audioCtx.state !== 'running') return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {}
  }

  function playChime() {
    initAudioOnUserGesture();
    if (!audioCtx || audioCtx.state !== 'running') return;
    try {
      [261, 329, 392, 523].forEach((f, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(f, audioCtx.currentTime + i * 0.07);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.07 + 0.12);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + i * 0.07);
        osc.stop(audioCtx.currentTime + i * 0.07 + 0.12);
      });
    } catch (e) {}
  }

  setTimeout(typeInitialWriter, 300);

  inputElem.addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase();
  });

  btnStart.addEventListener('click', () => {
    playerName = inputElem.value.trim() || 'GESTOR';
    playChime();

    titleScreen.classList.add('hidden');
    cutsceneScreen.classList.remove('hidden');

    cutsceneIndex = 0;
    renderCutsceneLine();
  });

  function renderCutsceneLine() {
    if (cutsceneIndex >= CUTSCENE_SCRIPT.length) {
      cutsceneScreen.classList.add('hidden');
      hudDashboardScreen.classList.remove('hidden');
      initHudChart();
      return;
    }

    const currentLine = CUTSCENE_SCRIPT[cutsceneIndex];
    const textToType = currentLine.text.replace(/{NAME}/g, playerName);

    cutsceneAvatar.src = currentLine.avatar;
    cutsceneSpeakerName.textContent = currentLine.speaker;
    cutsceneSpeakerName.style.color = currentLine.color || '#60a5fa';
    cutsceneSpeakerTitle.textContent = currentLine.title;

    cutsceneTextElem.textContent = '';
    cutsceneTypeIndex = 0;
    isTyping = true;

    if (cutsceneTimer) clearInterval(cutsceneTimer);

    const beepFreq = currentLine.speaker.includes('Robô') ? 640 : 420;

    cutsceneTimer = setInterval(() => {
      if (cutsceneTypeIndex < textToType.length) {
        cutsceneTextElem.textContent += textToType.charAt(cutsceneTypeIndex);
        if (cutsceneTypeIndex % 2 === 0) playRetroBeep(beepFreq);
        cutsceneTypeIndex++;
      } else {
        clearInterval(cutsceneTimer);
        isTyping = false;
      }
    }, 28);
  }

  function advanceCutscene() {
    if (cutsceneScreen.classList.contains('hidden')) return;

    if (isTyping) {
      clearInterval(cutsceneTimer);
      const currentLine = CUTSCENE_SCRIPT[cutsceneIndex];
      cutsceneTextElem.textContent = currentLine.text.replace(/{NAME}/g, playerName);
      isTyping = false;
    } else {
      cutsceneIndex++;
      renderCutsceneLine();
    }
  }

  cutsceneScreen.addEventListener('click', advanceCutscene);

  document.addEventListener('keydown', (e) => {
    if (!cutsceneScreen.classList.contains('hidden')) {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
        e.preventDefault();
        advanceCutscene();
      }
    }
  });

  if (btnToggleHud) {
    btnToggleHud.addEventListener('click', () => {
      isStableMode = !isStableMode;

      if (isStableMode) {
        hudBgRoom.className = 'hud-bg-room stable';
        btnToggleHud.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> Modo Estável (Clique para Emergência)';
      } else {
        hudBgRoom.className = 'hud-bg-room critical';
        btnToggleHud.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Modo Emergência Red (Clique para Estável)';
        playRetroBeep(880);
      }
    });
  }

  function initHudChart() {
    const ctx = document.getElementById('hudMatrixChart');
    if (!ctx || hudChart) return;

    hudChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Hidrelétrica', 'Solar', 'Eólica', 'Termelétrica', 'Nuclear', 'Biomassa'],
        datasets: [{
          data: [60, 8, 12, 15, 3, 2],
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
          tooltip: {
            callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.raw}%` }
          }
        },
        cutout: '60%'
      }
    });
  }
});
