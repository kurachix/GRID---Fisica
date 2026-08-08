---
name: game-mechanics
description: >-
  Instruções e especificações das mecânicas do jogo Gestor da Rede Elétrica Nacional:
  gerenciamento de estado, loop de 30 turnos, 30% de modificadores aleatórios, sistema de colapso
  e efeito dominó para indicadores abaixo de 20%.
---

# Skill: Game Mechanics & Engine Logic

Esta skill documenta o funcionamento e regras do ciclo de jogo para a engine em JavaScript.

## 1. Variáveis de Estado Globais (`GameState`)

- `turn` (int): De 1 a 30 (Mapeado nos anos de 2026 a 2056).
- `indicators`:
  - `economy` (float: 0-100, Inicial: 70)
  - `social` (float: 0-100, Inicial: 75)
  - `environment` (float: 0-100, Inicial: 60)
  - `stability` (float: 0-100, Inicial: 80)
- `matrix` (% da geração):
  - `hydro`: 60%
  - `solar`: 8%
  - `wind`: 12%
  - `thermal`: 15%
  - `nuclear`: 3%
  - `biomass`: 2%
- `emissions` (Mt $CO_2$/ano): Inicial 100 Mt.
- `jouleLoss` (% perdas na rede): Inicial 8.5%.
- `history`: Array com o histórico de cada turno para renderização de relatórios.

## 2. Modificadores Aleatórios (30% de chance no início do turno)

A cada turno $T \ge 2$, calcula-se `Math.random() < 0.3`. Se ativado:
1. Seleciona um modificador climático ou geopolítico:
   - **El Niño Severo**: Reduz reservatórios em 30%. Rendimento hidrelétrico despenca. Reduz Estabilidade em -15% e Economia em -10%.
   - **Conflito Geopolítico Internacional**: Preço do gás/petróleo aumenta 50%. Aumenta custo das termelétricas. Reduz Economia em -15% e Aceitação Social em -10%.
   - **Onda de Calor Extrema**: Demanda por ar-condicionado sobe +25%. Aumenta a corrente elétrica e perdas por Efeito Joule ($P = R \cdot I^2$). Reduz Estabilidade em -12% e Economia em -8%.
2. Notifica o jogador antes de exibir a carta de decisão regular.

## 3. Sistema de Colapso (<20%) & Efeito Dominó

Se qualquer indicador cair abaixo de 20%:
- O jogo entra no **Modo Crítico (Zona Vermelha)**.
- Injeta cartas de crise de alta severidade no topo do baralho.
- Exige escolhas extremas que penalizam severamente outros indicadores.

## 4. Condições de Fim de Jogo

- **Vitória**: Alcançar o Turno 30 (Ano 2056) com todos os indicadores $> 0\%$ e emissões de $CO_2 \le 50\%$ do valor inicial de 2026.
- **Derrota por Colapso**: Qualquer indicador atingir 0%. Apresenta o cenário de colapso correspondente (Apagão Sistêmico, Crise Socioambiental, Falência Financeira, Insurreição Popular).
