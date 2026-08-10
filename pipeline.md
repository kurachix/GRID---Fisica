# 🔄 Pipeline de Execução e Fluxo do Jogo (GRID)

Este documento detalha o fluxo operacional completo, a arquitetura de transição de telas, o loop de governança e a sincronização de estados no jogo **GRID - O Gestor da Rede Elétrica Nacional (2026-2056)**.

---

## 📐 1. Arquitetura Geral do Fluxo

```mermaid
flowchart TD
    A["🎮 Tela de Título (#title-screen)"] -->|Entrada de Nome + START| B["🎬 Cinemática RPG (#cutscene-screen)"]
    B -->|16 Diálogos (Dra. Elena & Robô Volta)| C["🎛️ Master HUD (#hud-dashboard-screen)"]
    C -->|Carregamento Imediato| D["👨‍💼 Tutorial Guiado (#tutorial-overlay)"]
    D -->|6 Passos pelo Ex-Ministro Mendes| E["🔄 Loop de Governança (30 Turnos)"]
    
    subgraph Loop ["Loop de Turno (Ano a Ano: 2026 a 2056)"]
        E --> F["🎲 Sorteio de Dilemas (Fisher-Yates 110 Cartas)"]
        F --> G{"Qualquer Indicador < 20%?"}
        G -- Sim --> H["🔴 Ativar Modo Crítico (Bg Vermelho + Cartas de Crise)"]
        G -- Não --> I["🟢 Manter Modo Estável (Bg Normal)"]
        H --> J["🃏 Exibir Carta no HUD Central"]
        I --> J
        J --> K["👆 Escolha do Jogador (Opção A / B | Tecla A/B / Setas)"]
        K --> L["⚡ Processamento Síncrono de Impacto"]
        L --> M["📊 Atualização da UI (Barras, Mapa e Gráfico Matriz)"]
        M --> N{"Checou Condição de Término?"}
    end

    N -- Indicador = 0% --> O["💀 Game Over: Colapso do Sistema (#game-over-modal)"]
    N -- Turno > 30 --> P["🏆 Vitória: Mandato 2056 (#game-over-modal)"]
    N -- Turno <= 30 --> E

    O -->|Botão Reiniciar| A
    P -->|Botão Reiniciar| A
```

---

## 🕹️ 2. Detalhamento Etapa por Etapa

### 📌 Etapa 1: Identificação e Entrada (#title-screen)
1. **Interface**: Layout 16-bit com CRT Scanlines overlay, fonte retro *Press Start 2P*, caixa estilo *Undertale* do Robô Volta e campo de texto com cursor piscante.
2. **Entrada do Jogador**: O jogador digita seu nome de gestor no campo `[ ________ ]`.
3. **Trigger**: Ao clicar no botão `INICIAR MISSÃO [START]`, o estado `GameState.playerName` é salvo e a aplicação transita escondendo `#title-screen` e exibindo `#cutscene-screen`.

---

### 🎬 Etapa 2: Roteiro Cinemático RPG (#cutscene-screen)
1. **Ambiente**: Fundo fixo da sala de controle CNOS sob luzes vermelhas de emergência.
2. **Estrutura de Diálogos**: 16 falas dinâmicas divididas em 3 Cenas com sistema de efeito máquina de escrever (*typewriter*):
   - **Cena 1 (O Diagnóstico do Colapso)**: Dra. Elena e Robô Volta explicam a anomalia climática de 2026 e a queda dos reservatórios para 14% de energia potencial gravítica ($E_p = m \cdot g \cdot h$).
   - **Cena 2 (As Consequências Econômicas e Sociais)**: Explicação sobre o acionamento emergencial de termelétricas, salto de 85% na tarifa de luz, demissões em massa, protestos e a renúncia do Ex-Ministro Mendes.
   - **Cena 3 (A Posse e as Regras do Jogo)**: Nomeação presidencial do jogador, apresentação dos 4 pilares estratégicos e da 1ª Lei da Conservação da Energia.
3. **Avanço**: O jogador pode clicar na tela ou pressionar `ESPAÇO`/`ENTER`/`SETA DIREITA` para avançar fala por fala ou acelerar o texto em andamento.
4. **Fim da Cinemática**: Esconde `#cutscene-screen` e exibe `#hud-dashboard-screen`.

---

### 👨‍💼 Etapa 3: Onboarding Guiado pelo Ex-Ministro Mendes (#tutorial-overlay)
1. **Disparo**: Inicializado **automaticamente e imediatamente** quando a sala de controle principal carrega.
2. **Mecânica de Destaque Visual**:
   - `z-index: 500`: Backdrop escuro cobrindo a tela.
   - `z-index: 501`: Elemento focado ganha borda amarela pulsante `.tutorial-target-highlight`.
   - `z-index: 502`: Card de fala do Ex-Ministro Mendes + Seta indicadora pixelada animada.
3. **Passos do Tutorial (1 a 6)**:
   - **Passo 1**: 4 Barras de Indicadores (`#tut-target-indicators`).
   - **Passo 2**: Carta de Dilema Central (`#tut-target-dilemma`).
   - **Passo 3**: Hológrafo Regional do Brasil (`#tut-target-map`).
   - **Passo 4**: Gráfico da Matriz Energética (`#tut-target-chart`).
   - **Passo 5**: Alerta de Modo Crítico (<20%).
   - **Passo 6**: Conclusão do Tutorial e Liberação da Governança.

---

### 🔄 Etapa 4: Loop Principal de Governança (30 Turnos / 2026-2056)

#### A. Sorteio de Dilemas (Fisher-Yates 100% Sem Viés)
* O baralho é composto por **110 dilemas cadastrados em `question.md`**, variando entre escolhas equilibradas e crises de corrupção (*Perde-Perde*).
* A cada novo jogo, a função `shuffleArray()` embaralha o baralho completo usando o algoritmo Fisher-Yates, garantindo ordenação estritamente aleatória sem repetição.

#### B. Checagem de Modo Crítico (<20%)
* Se algum indicador ($\$$, $\heartsuit$, $\mathrm{Tree}$, $\text{Zap}$) cair abaixo de 20%:
  - A sala de controle altera o fundo automaticamente para `game_ui_critical.jpg` com filtro pulsante de emergência.
  - A carta do topo é substituída por um **Dilema de Crise Emergencial / Perde-Perde** (IDs 71 a 110).

#### C. Interação de Escolha
* **Opção A (Esquerda)** ou **Opção B (Direita)** pode ser acionada via:
  - Clique direto nos botões do HUD.
  - Atalhos de teclado: Tecla `A` ou `Seta Esquerda` (Opção A) | Tecla `B` ou `Seta Direita` (Opção B).

---

### 📊 Etapa 5: Processamento do Impacto & Sincronização Síncrona da UI

Ao confirmar uma escolha:
1. **Animação de Deslize**: A carta desliza suavemente (`slide-left` ou `slide-right`) e reseta a posição.
2. **Atualização de Indicadores**:
   $$\text{Novo Valor} = \max(0, \min(100, \text{Valor Atual} + \Delta))$$
3. **Re-normalização da Matriz Energética**:
   - Ajusta os deltas nas 6 fontes (Hidro, Solar, Eólica, Térmica, Nuclear, Biomassa).
   - Recalcula a matriz para que a soma permaneça exatamente em **100,0%**:
     $$\text{Fonte}_i = \left(\frac{\text{Fonte}_i}{\sum \text{Fontes}}\right) \times 100$$
   - Atualiza o gráfico Donut Chart.js e os valores numéricos dos rótulos.
4. **Atualização do Hológrafo Regional**:
   - Altera as cores dos nós SVG e tags de status das regiões (Norte, Nordeste, Sudeste, Sul) entre `active` (Verde), `warning` (Amarelo) e `stable`.
5. **Histórico do Mandato**: Grava a decisão em `GameState.history`.

---

### 🏁 Etapa 6: Avaliação de Fim de Jogo (#game-over-modal)

A cada turno processado, o motor verifica as condições de parada:

1. **Derrota por Colapso (Qualquer Indicador = 0%)**:
   - Exibe o modal `#game-over-modal` em tema de colapso vermelho (`defeat`).
   - Apresenta o cenário específico da falha (Apagão Sistêmico, Falência Financeira, Insurreição Popular ou Colapso Ecológico), juntamente com a nota `F` de exoneração.
2. **Vitória por Conclusão de Mandato (Turno 30 / Ano 2056)**:
   - Exibe o modal `#game-over-modal` em tema dourado/verde de vitória.
   - Apresenta estatísticas de 30 anos governados, redução de emissões de $CO_2$ (meta $\ge 50\%$), aprovação social média e nota pedagógica `A+`.

3. **Reinício**: O botão `REINICIAR MANDATO` reseta o estado `GameState`, re-embaralha as 110 cartas e retorna o jogo para a Tela de Título.
