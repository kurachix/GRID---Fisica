# Gestor da Rede Elétrica Nacional - Guia e Regras de Desenvolvimento (.agents)

Este repositório contém o jogo educativo **Gestor da Rede Elétrica Nacional (2026-2056)**, desenvolvido para integrar conceitos interdisciplinares de **Física** e **Geografia** no contexto da transição energética brasileira.

---

## 1. Visão Geral e Objetivos do Jogo

- **Papel do Jogador**: Gestor da Rede Elétrica Nacional.
- **Duração**: 30 turnos (Ano a ano: de 2026 a 2056).
- **Objetivo Principal**: Garantir o abastecimento de energia, manter o equilíbrio econômico-social e alcançar pelo menos **50% de redução nas emissões de $CO_2$** em relação a 2026.
- **Condições de Derrota**: Qualquer um dos 4 indicadores atingir 0% resulta em colapso imediato com cenário e relatório customizado.

---

## 2. Estrutura dos Indicadores Globais (0% a 100%)

1. **$\$$ Economia**: Recursos financeiros públicos para novos investimentos, manutenção e subsídios.
2. **$\heartsuit$ Aceitação Social**: Satisfação da população em relação às tarifas, segurança de suprimento e empregos.
3. **$\mathrm{Tree}$ Meio Ambiente**: Preservação ambiental, índice de descarbonização e impacto nos ecossistemas.
4. **$\text{Zap}$ Estabilidade da Rede**: Capacidade da infraestrutura nacional de atender a demanda com frequência contínua sem apagões.

---

## 3. Diretrizes de UX/UI & Feedback Visual

- **Painel Superior**: 4 cards dos indicadores com barras de progresso circulares/horizontais em tempo real.
- **Área Central**: Baralho interativo de cartas com suporte a botões (Esquerda / Direita) ou gesto de arrastar/swipe.
- **Painel Lateral (Chart.js)**:
  - **Gráfico 1 (Donut/Pizza)**: Composição percentual da Matriz Energética (Hidrelétrica, Solar, Eólica, Termelétrica, Nuclear, Biomassa).
  - **Gráfico 2 (Linhas)**: Evolução histórica de Emissões de $CO_2$ (Geografia) e Perda de Energia por Efeito Joule na Transmissão (Física).
- **Modo Crítico (Emergência - Indicador $< 20\%$)**:
  - Alteração na cor de fundo/borda da UI (pulsar vermelho intermitente).
  - Alerta sonoro / vinheta de emergência via Web Audio API.
  - Ativação do **Efeito Dominó** de Cartas de Crise Recorrentes.

---

## 4. Conteúdo Científico Obrigatório (Física & Geografia)

### Conceitos de Física:
- **Transformação e Conservação de Energia**: Potencial Gravitacional $\rightarrow$ Cinética $\rightarrow$ Elétrica (Hidrelétricas).
- **Efeito Joule na Transmissão**: $P = R \cdot I^2$ — Perda de energia sob a forma de calor devido à alta corrente elétrica nas linhas de alta tensão.
- **Efeito Fotovoltaico**: Conversão direta de fótons (radiação solar) em corrente elétrica nos painéis de silício semiconductor.
- **Termodinâmica e Rendimento Energético**: Eficiência real das termelétricas e ciclo do vapor.

### Conceitos de Geografia:
- **Bacias Hidrográficas e Climatologia**: Vazão de rios de planalto vs. planície, sensibilidade a eventos como *El Niño* e *La Niña*.
- **Impactos Socioambientais da Amazônia**: Alagamento de florestas tropicais, decomposição de matéria orgânica gerando metano ($CH_4$), e deslocamento de comunidades ribeirinhas/indígenas.
- **Geopolítica dos Combustíveis Fósseis**: Dependência do mercado internacional de gás natural/petróleo e volatilidade de preços em conflitos internacionais.
- **Geração Distribuída e Descentralização**: Desafios espaciais da intermitência da energia solar e eólica.

---

## 5. Arquitetura de Código

- **Frontend**: HTML5 Semântico, CSS3 Moderno (Glassmorphic Dark Design System).
- **Engine**: JavaScript ES6 puramente no cliente (Vanilla JS).
- **Visualização**: Chart.js 4.x via CDN ou carregamento local.
- **Persistência / Estado**: Objeto `GameState` gerenciando turnos, histórico e atualização síncrona dos componentes.
