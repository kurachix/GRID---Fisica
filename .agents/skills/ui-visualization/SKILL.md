---
name: ui-visualization
description: >-
  Especificações da Interface de Usuário (UX/UI), renderização de gráficos Chart.js,
  efeitos visuais de emergência e interações de arrastar/clicar cartas.
---

# Skill: UI & Chart Visualization System

Esta skill contém os requisitos estéticos e funcionais da interface do jogo web.

## 1. Paleta de Cores e Estilo Glassmorphism

- **Tema**: Dark Mode de alto impacto visual.
- **Background Principal**: Gradiente escuro `#0d1117` a `#161b22` com elementos translúcidos de vidro (`backdrop-filter: blur(16px)`).
- **Cores dos Indicadores**:
  - Economia ($\$): Amarelo/Dourado (`#f1c40f`)
  - Aceitação Social ($\heartsuit$): Rosa/Vermelho suave (`#e74c3c`)
  - Meio Ambiente ($\mathrm{Tree}$): Verde Esmeralda (`#2ecc71`)
  - Estabilidade da Rede ($\text{Zap}$): Azul elétrico (`#3498db`)

## 2. Gráficos Chart.js

### Gráfico 1: Matriz Energética (Pie / Doughnut Chart)
- **Cores das Fontes**:
  - Hidrelétrica: `#2980b9`
  - Solar: `#f39c12`
  - Eólica: `#1abc9c`
  - Termelétrica: `#e67e22`
  - Nuclear: `#9b59b6`
  - Biomassa: `#27ae60`
- Atualização em tempo real após cada decisão do jogador.

### Gráfico 2: Curva de Emissões de $CO_2$ e Perdas por Efeito Joule (Line Chart)
- Eixo X: Turnos (2026 a 2056).
- Linha 1 (Eixo Y1): Emissões de $CO_2$ em Mt (Cor: Vermelho Escuro `#c0392b`).
- Linha 2 (Eixo Y2): Perda por Efeito Joule em % (Cor: Amarelo Néon `#f1c40f`).

## 3. Feedback do Modo Crítico (Indicador $< 20\%$)

- **Visual**: A borda do card e da tela inteira pisca em tom vermelho pulsante (`animation: criticalPulse 1.5s infinite`).
- **Banner de Emergência**: Exibe "ALERTA DE CRISE SISTÊMICA" com o indicador vulnerável.
- **Áudio Synth**: Efeito sonoro sintetizado em frequência de alarme via `AudioContext` web nativo.
