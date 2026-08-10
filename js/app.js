/**
 * GRID - O Gestor da Rede Elétrica Nacional
 * Core Game Engine: 110 Dilema Deck, High-Entropy Randomness, Balanced Rules, High-Visibility Impact Pills & Settings System
 */

// 1. BARALHO COMPLETO DE 110 DILEMAS COM PERDAS MAXIMIZADAS EM NO MÁXIMO -10 PONTOS POR COMPONENTE
const RAW_QUESTIONS = [
  // 1-20: Eventos Aleatórios
  {
    id: 1, category: "<HIDRELÉTRICA & AMAZÔNIA>", icon: "fa-water",
    title: "Licenciamento da Usina Hidrelétrica na Bacia Amazônica",
    desc: "Proposta de construção de usina de grande porte em rio de planície para conversão de energia potencial gravítica em elétrica (Ep = m·g·h). Aumenta a estabilidade firme da rede nacional.",
    optionA: { title: "Aprovar Construção", sub: "+Estabilidade (+15%), -Ambiente (-10%), -Sociedade (-8%)", indicators: { economy: -8, social: -8, environment: -10, stability: 15 }, matrix: { hydro: 5.0, thermal: -3.0, solar: -1.0, wind: -1.0 }, regions: { north: 'active', southeast: 'warning' } },
    optionB: { title: "Rejeitar Projeto", sub: "+Ambiente (+12%), +Sociedade (+8%), -Estabilidade (-10%)", indicators: { economy: 5, social: 8, environment: 12, stability: -10 }, matrix: { hydro: -2.0, thermal: 2.0 }, regions: { north: 'stable', southeast: 'warning' } }
  },
  {
    id: 2, category: "<EÓLICA & NORDESTE>", icon: "fa-wind",
    title: "Expansão Eólica no Litoral do Rio Grande do Norte",
    desc: "O Nordeste possui excelente viabilidade eólica. A instalação de novos aerogeradores expande a matriz limpa e conecta os parques ao SIN.",
    optionA: { title: "Subsidiar Novos Parques", sub: "+Ambiente (+14%), +Estabilidade (+10%), -Economia (-10%)", indicators: { economy: -10, social: 8, environment: 14, stability: 10 }, matrix: { wind: 6.0, thermal: -4.0, hydro: -2.0 }, regions: { northeast: 'active' } },
    optionB: { title: "Usar Gás Natural", sub: "+Economia (+8%), +Estabilidade (+8%), -Ambiente (-8%)", indicators: { economy: 8, social: -4, environment: -8, stability: 8 }, matrix: { thermal: 3.0 }, regions: { northeast: 'stable' } }
  },
  {
    id: 3, category: "<SECA & TERMELÉTRICA>", icon: "fa-fire",
    title: "Seca Severa e Acionamento de Termelétricas em São Paulo",
    desc: "A escassez hídrica reduziu o nível dos reservatórios no Sudeste. Acionar termelétricas a gás garante o abastecimento imediato das metrópoles.",
    optionA: { title: "Acionar Termelétricas", sub: "+Estabilidade (+15%), -Ambiente (-10%), -Economia (-8%)", indicators: { economy: -8, social: -6, environment: -10, stability: 15 }, matrix: { thermal: 6.0, hydro: -4.0 }, regions: { southeast: 'warning' } },
    optionB: { title: "Decretar Racionamento", sub: "+Ambiente (+10%), +Economia (+5%), -Sociedade (-10%)", indicators: { economy: 5, social: -10, environment: 10, stability: -8 }, matrix: { thermal: -2.0 }, regions: { southeast: 'warning' } }
  },
  {
    id: 4, category: "<TRANSMISSÃO & EFEITO JOULE>", icon: "fa-bolt",
    title: "Dissipação Térmica nas Linhas de Belo Monte (PA)",
    desc: "A transmissão de energia sofre perda na forma de calor devido à resistência dos condutores (Efeito Joule: P = R·I²). Investir em HVDC reduz essas perdas.",
    optionA: { title: "Construir Ultra Alta Tensão", sub: "+Estabilidade (+16%), +Ambiente (+8%), -Economia (-10%)", indicators: { economy: -10, social: 6, environment: 8, stability: 16 }, matrix: { hydro: 1.0, solar: 1.0 }, regions: { north: 'active', southeast: 'active' } },
    optionB: { title: "Reparos Paliativos", sub: "+Economia (+8%), -Estabilidade (-8%)", indicators: { economy: 8, social: -4, environment: -4, stability: -8 }, matrix: { hydro: -1.0 }, regions: { southeast: 'warning' } }
  },
  {
    id: 5, category: "<NUCLEAR & RIO DE JANEIRO>", icon: "fa-atom",
    title: "Finalização da Usina Nuclear Angra 3 (RJ)",
    desc: "A geração termonuclear possui alto rendimento de base sem emissão de gases estufa, reforçando a segurança energética do Sudeste.",
    optionA: { title: "Concluir Obras", sub: "+Estabilidade (+15%), +Ambiente (+10%), -Economia (-10%)", indicators: { economy: -10, social: -5, environment: 10, stability: 15 }, matrix: { nuclear: 4.0, thermal: -2.0 }, regions: { southeast: 'active' } },
    optionB: { title: "Cancelar Definitivamente", sub: "+Economia (+10%), +Sociedade (+8%), -Estabilidade (-8%)", indicators: { economy: 10, social: 8, environment: -4, stability: -8 }, matrix: { nuclear: -1.0 }, regions: { southeast: 'stable' } }
  },
  {
    id: 6, category: "<SOLAR & MINAS GERAIS>", icon: "fa-sun",
    title: "Subsídio para Geração Solar Distribuída (MG)",
    desc: "Usinas fotovoltaicas transformam energia luminosa em elétrica. Isentar impostos incentiva painéis residenciais e alivia linhas de transmissão.",
    optionA: { title: "Ampliar Isenções", sub: "+Ambiente (+15%), +Sociedade (+12%), -Economia (-8%)", indicators: { economy: -8, social: 12, environment: 15, stability: 6 }, matrix: { solar: 5.0, thermal: -3.0 }, regions: { southeast: 'active' } },
    optionB: { title: "Cortar Incentivos", sub: "+Economia (+12%), -Sociedade (-10%), -Ambiente (-6%)", indicators: { economy: 12, social: -10, environment: -6, stability: -4 }, matrix: { solar: -1.0 }, regions: { southeast: 'stable' } }
  },
  {
    id: 7, category: "<PETRÓLEO & AMAPÁ>", icon: "fa-droplet",
    title: "Exploração de Petróleo na Margem Equatorial (AP)",
    desc: "A descoberta de jazidas de petróleo garante recursos volumosos para o tesouro e energia térmica firme para a indústria.",
    optionA: { title: "Liberar Exploração", sub: "+Economia (+16%), +Estabilidade (+10%), -Ambiente (-10%)", indicators: { economy: 16, social: -5, environment: -10, stability: 10 }, matrix: { thermal: 5.0, hydro: -2.0 }, regions: { north: 'warning' } },
    optionB: { title: "Proibir Exploração", sub: "+Ambiente (+15%), +Sociedade (+6%), -Economia (-8%)", indicators: { economy: -8, social: 6, environment: 15, stability: -4 }, matrix: { thermal: -2.0 }, regions: { north: 'stable' } }
  },
  {
    id: 8, category: "<BIOMASSA & SÃO PAULO>", icon: "fa-leaf",
    title: "Cogeração por Biomassa Sucroalcooleira (SP)",
    desc: "Aproveitamento do bagaço da cana em usinas paulistas durante o período da seca para gerar vapor e eletricidade limpa.",
    optionA: { title: "Autorizar Expansão", sub: "+Ambiente (+12%), +Estabilidade (+10%), -Economia (-6%)", indicators: { economy: -6, social: 6, environment: 12, stability: 10 }, matrix: { biomass: 4.0, thermal: -3.0 }, regions: { southeast: 'active' } },
    optionB: { title: "Restringir Queima", sub: "+Ambiente (+5%), +Economia (+4%), -Estabilidade (-6%)", indicators: { economy: 4, social: -2, environment: 5, stability: -6 }, matrix: {}, regions: { southeast: 'stable' } }
  },
  {
    id: 9, category: "<GASODUTO & BOLÍVIA>", icon: "fa-gas-pump",
    title: "Crise Geopolítica no Gasoduto Bolívia-Brasil (Gasbol)",
    desc: "Reajuste internacional no preço do gás natural importado da Bolívia exige definição sobre quem absorverá a diferença tarifária.",
    optionA: { title: "Estado Absorve o Custo", sub: "+Estabilidade (+12%), +Sociedade (+5%), -Economia (-10%)", indicators: { economy: -10, social: 5, environment: -5, stability: 12 }, matrix: { thermal: 3.0 }, regions: { southeast: 'active' } },
    optionB: { title: "Repassar Aumento na Tarifa", sub: "+Economia (+10%), -Sociedade (-10%), -Estabilidade (-4%)", indicators: { economy: 10, social: -10, environment: -2, stability: -4 }, matrix: { thermal: -2.0 }, regions: { southeast: 'warning' } }
  },
  {
    id: 10, category: "<OFFSHORE & CEARÁ>", icon: "fa-wind",
    title: "Parques Eólicos Offshore no Ceará",
    desc: "Turbinas eólicas no mar captam ventos marítimos com altíssimo rendimento, expandindo a geração limpa sem ocupar solo agrícola.",
    optionA: { title: "Leiloar Áreas Marítimas", sub: "+Ambiente (+15%), +Estabilidade (+14%), -Economia (-10%)", indicators: { economy: -10, social: -4, environment: 15, stability: 14 }, matrix: { wind: 5.0, thermal: -3.0 }, regions: { northeast: 'active' } },
    optionB: { title: "Proteger Áreas de Pesca", sub: "+Sociedade (+10%), +Economia (+5%), -Estabilidade (-6%)", indicators: { economy: 5, social: 10, environment: -2, stability: -6 }, matrix: {}, regions: { northeast: 'stable' } }
  },
  {
    id: 11, category: "<CARVÃO & RIO GRANDE DO SUL>", icon: "fa-smog",
    title: "Renovação das Termelétricas a Carvão (RS)",
    desc: "Substituir usinas antigas a carvão por parques eólicos no Sul reduz emissões de carbono e avança nas metas ecológicas.",
    optionA: { title: "Desativar Imediatamente", sub: "+Ambiente (+18%), +Sociedade (+6%), -Estabilidade (-10%)", indicators: { economy: -8, social: 6, environment: 18, stability: -10 }, matrix: { thermal: -5.0, wind: 3.0 }, regions: { south: 'warning' } },
    optionB: { title: "Renovar Contratos", sub: "+Estabilidade (+14%), +Economia (+6%), -Ambiente (-10%)", indicators: { economy: 6, social: -4, environment: -10, stability: 14 }, matrix: { thermal: 4.0 }, regions: { south: 'active' } }
  },
  {
    id: 12, category: "<PCH & RIO URUGUAI>", icon: "fa-water",
    title: "Pequenas Centrais Hidrelétricas (PCH) no Rio Uruguai",
    desc: "Construção de PCHs de baixo impacto na Região Sul para gerar energia mecânica sem grandes alagamentos.",
    optionA: { title: "Aprovar PCHs", sub: "+Estabilidade (+12%), +Economia (+5%), -Ambiente (-8%)", indicators: { economy: 5, social: 4, environment: -8, stability: 12 }, matrix: { hydro: 3.0 }, regions: { south: 'active' } },
    optionB: { title: "Exigir Redesenho", sub: "+Ambiente (+8%), -Economia (-6%)", indicators: { economy: -6, social: -2, environment: 8, stability: -4 }, matrix: {}, regions: { south: 'stable' } }
  },
  {
    id: 13, category: "<HIDROGÊNIO VERDE & PECÉM>", icon: "fa-flask",
    title: "Pólo de Hidrogênio Verde no Porto do Pecém (CE)",
    desc: "Projeto inovador de eletrólise da água impulsionada por energia eólica para produção de combustível de Hidrogênio Verde.",
    optionA: { title: "Financiar Planta Piloto", sub: "+Ambiente (+15%), +Estabilidade (+8%), -Economia (-10%)", indicators: { economy: -10, social: 8, environment: 15, stability: 8 }, matrix: { wind: 4.0, solar: 2.0 }, regions: { northeast: 'active' } },
    optionB: { title: "Focar Consumo Interno", sub: "+Economia (+8%), -Ambiente (-4%)", indicators: { economy: 8, social: -2, environment: -4, stability: 2 }, matrix: {}, regions: { northeast: 'stable' } }
  },
  {
    id: 14, category: "<BIOGÁS & ATERROS>", icon: "fa-trash-can",
    title: "Captação de Biogás em Aterros Sanitários",
    desc: "Capturar o gás metano (CH₄) gerado no lixo urbano para queima limpa em turbinas elétricas, reduzindo o efeito estufa.",
    optionA: { title: "Parceria com Prefeituras", sub: "+Ambiente (+14%), +Sociedade (+6%), -Economia (-8%)", indicators: { economy: -8, social: 6, environment: 14, stability: 6 }, matrix: { biomass: 3.0 }, regions: { southeast: 'active' } },
    optionB: { title: "Incentivo Privado", sub: "+Economia (+6%), +Ambiente (+8%), -Sociedade (-6%)", indicators: { economy: 6, social: -6, environment: 8, stability: 4 }, matrix: { biomass: 2.0 }, regions: { southeast: 'active' } }
  },
  {
    id: 15, category: "<BATERIAS & ARMAZENAMENTO>", icon: "fa-battery-full",
    title: "Baterias de Lítio em Larga Escala (Armazenamento)",
    desc: "Importação de parques industriais de baterias de Lítio para armazenar excedente solar e eólico nas subestações do Sudeste.",
    optionA: { title: "Comprar Lote de Baterias", sub: "+Estabilidade (+16%), +Ambiente (+8%), -Economia (-10%)", indicators: { economy: -10, social: 6, environment: 8, stability: 16 }, matrix: { solar: 2.0, wind: 2.0 }, regions: { southeast: 'active' } },
    optionB: { title: "Manter Rede Atual", sub: "+Economia (+8%), -Estabilidade (-8%)", indicators: { economy: 8, social: -2, environment: -2, stability: -8 }, matrix: {}, regions: { southeast: 'stable' } }
  },
  {
    id: 16, category: "<TARIFA SOCIAL & CRISE>", icon: "fa-heart",
    title: "Expansão da Tarifa Social (Crise Inflacionária)",
    desc: "Isenção parcial na conta de luz para famílias vulneráveis inscritas no CadÚnico para conter a pobreza energética.",
    optionA: { title: "Conceder Isenção Ampla", sub: "+Sociedade (+18%), +Estabilidade (+4%), -Economia (-10%)", indicators: { economy: -10, social: 18, environment: 0, stability: 4 }, matrix: {}, regions: { northeast: 'active', north: 'active' } },
    optionB: { title: "Restringir Benefício", sub: "+Economia (+10%), -Sociedade (-10%)", indicators: { economy: 10, social: -10, environment: 0, stability: 0 }, matrix: {}, regions: { northeast: 'warning' } }
  },
  {
    id: 17, category: "<ITAIPU & ASSOREAMENTO>", icon: "fa-water",
    title: "Desassoreamento do Reservatório de Itaipu",
    desc: "Retirada de sedimentos acumulados no fundo da represa para recuperar o volume útil de água e manter a potência hidrelétrica.",
    optionA: { title: "Autorizar Dragagem", sub: "+Estabilidade (+14%), +Ambiente (+8%), -Economia (-10%)", indicators: { economy: -10, social: 6, environment: 8, stability: 14 }, matrix: { hydro: 3.0 }, regions: { south: 'active' } },
    optionB: { title: "Ignorar Assoreamento", sub: "+Economia (+6%), -Estabilidade (-8%)", indicators: { economy: 6, social: -4, environment: -6, stability: -8 }, matrix: { hydro: -2.0 }, regions: { south: 'warning' } }
  },
  {
    id: 18, category: "<MAREMOTRIZ & MARANHÃO>", icon: "fa-water",
    title: "Usina Maremotriz na Baía de São Marcos (MA)",
    desc: "Aproveitamento do potencial de marés de 7m no Maranhão para gerar eletricidade com previsibilidade astronômica perfeita.",
    optionA: { title: "Construir Usina de Marés", sub: "+Ambiente (+12%), +Estabilidade (+10%), -Economia (-10%)", indicators: { economy: -10, social: 5, environment: 12, stability: 10 }, matrix: { hydro: 2.0 }, regions: { northeast: 'active' } },
    optionB: { title: "Proibir Projeto", sub: "+Economia (+6%), -Estabilidade (-4%)", indicators: { economy: 6, social: -2, environment: 2, stability: -4 }, matrix: {}, regions: { northeast: 'stable' } }
  },
  {
    id: 19, category: "<AUTOMAÇÃO & SMART GRIDS>", icon: "fa-microchip",
    title: "Automação e Medição Inteligente do SIN",
    desc: "Instalação de sensores e redes inteligentes (Smart Grids) que previnem perdas de transmissão e evitam apagões urbanos.",
    optionA: { title: "Financiar Sistema Inteligente", sub: "+Estabilidade (+15%), +Sociedade (+10%), -Economia (-10%)", indicators: { economy: -10, social: 10, environment: 4, stability: 15 }, matrix: { solar: 2.0 }, regions: { southeast: 'active' } },
    optionB: { title: "Manter Infraestrutura Antiga", sub: "+Economia (+8%), -Estabilidade (-8%)", indicators: { economy: 8, social: -4, environment: -2, stability: -8 }, matrix: {}, regions: { southeast: 'stable' } }
  },
  {
    id: 20, category: "<CARROS ELÉTRICOS>", icon: "fa-plug",
    title: "Isenção Fiscal para Veículos 100% Elétricos",
    desc: "Estímulo à substituição da frota a combustível fóssil por elétricos, limpando o ar urbano e alavancando a demanda limpa.",
    optionA: { title: "Aprovar Isenção", sub: "+Ambiente (+14%), +Sociedade (+8%), -Economia (-8%)", indicators: { economy: -8, social: 8, environment: 14, stability: -6 }, matrix: { solar: 2.0 }, regions: { southeast: 'active' } },
    optionB: { title: "Taxar Elétricos", sub: "+Economia (+8%), -Ambiente (-8%)", indicators: { economy: 8, social: -6, environment: -8, stability: 4 }, matrix: {}, regions: { southeast: 'stable' } }
  }
];

// QUESTÕES DE CORRUPÇÃO E CRISES RE-BALANÇADAS (MAX -10 DE PERDA E RECOMPENSAS POSITIVAS)
const PERDE_PERDE_QUESTIONS = [
  {
    id: 71, category: "<CORRUPÇÃO & HIDRELÉTRICA>", icon: "fa-triangle-exclamation",
    title: "Empreiteira e a Falha Estrutural da Hidrelétrica",
    desc: "Descobriu-se falha no concreto da nova barragem. O gestor deve decidir entre paralisar as obras para reforma ou reforçar a estrutura emergencialmente.",
    optionA: { title: "Reforçar Estrutura de Emergência", sub: "+Estabilidade (+10%), -Economia (-10%), -Ambiente (-6%)", indicators: { economy: -10, social: -4, environment: -6, stability: 10 }, matrix: { hydro: 1.0 }, regions: { north: 'warning' } },
    optionB: { title: "Paralisar para Reforma Geral", sub: "+Ambiente (+8%), +Sociedade (+6%), -Economia (-10%)", indicators: { economy: -10, social: 6, environment: 8, stability: -8 }, matrix: { hydro: -2.0 }, regions: { north: 'warning' } }
  },
  {
    id: 72, category: "<LOBBY & FÓSSEIS>", icon: "fa-smoking",
    title: "O Lobby do Carvão Mineral",
    desc: "Pressão política no Sul exige manutenção de subsídios para termelétricas a carvão sob ameaça de restrições orçamentárias.",
    optionA: { title: "Manter Queima Fóssil Temporária", sub: "+Estabilidade (+10%), -Ambiente (-10%), -Sociedade (-6%)", indicators: { economy: 4, social: -6, environment: -10, stability: 10 }, matrix: { thermal: 3.0 }, regions: { south: 'warning' } },
    optionB: { title: "Migrar Recursos para Renovável", sub: "+Ambiente (+12%), +Sociedade (+6%), -Economia (-10%)", indicators: { economy: -10, social: 6, environment: 12, stability: -8 }, matrix: { thermal: -3.0 }, regions: { south: 'warning' } }
  },
  {
    id: 76, category: "<CRIME & INFRAESTRUTURA>", icon: "fa-shield-halved",
    title: "A Máfia do Cobre e as Milícias",
    desc: "Quadrilhas atacam linhas de transmissão urbanas para furto de fiação. É preciso reforçar o policiamento especial e blindar os cabos.",
    optionA: { title: "Instalar Fiação Blindada", sub: "+Estabilidade (+12%), -Economia (-10%)", indicators: { economy: -10, social: 4, environment: 0, stability: 12 }, matrix: {}, regions: { southeast: 'warning' } },
    optionB: { title: "Reforçar Patrulha Policial", sub: "+Sociedade (+8%), +Estabilidade (+6%), -Economia (-8%)", indicators: { economy: -8, social: 8, environment: 0, stability: 6 }, matrix: {}, regions: { southeast: 'warning' } }
  },
  {
    id: 91, category: "<SABOTAGEM & SEGURANÇA>", icon: "fa-user-ninja",
    title: "Sabotagem em Linhas de Alta Tensão no Centro-Oeste",
    desc: "Avarias criminosas em torres de 500 kV ameaçam o suprimento. O governo envia engenheiros de prontidão e forças de segurança.",
    optionA: { title: "Reparo Emergencial com Força Nacional", sub: "+Estabilidade (+14%), -Economia (-10%), -Sociedade (-6%)", indicators: { economy: -10, social: -6, environment: 0, stability: 14 }, matrix: {}, regions: { southeast: 'warning' } },
    optionB: { title: "Redirecionar Carga de Outras Regiões", sub: "+Sociedade (+6%), -Estabilidade (-8%), -Economia (-6%)", indicators: { economy: -6, social: 6, environment: 0, stability: -8 }, matrix: {}, regions: { southeast: 'warning' } }
  },
  {
    id: 92, category: "<FURTOS & TRANSFORMADORES>", icon: "fa-wrench",
    title: "Epidemia de Furtos de Transformadores Urbanos",
    desc: "Instalação de caixas de proteção e alarme em transformadores de rua para deter furtos de cobre e interrupções energéticas.",
    optionA: { title: "Instalar Alarmes e Blindagem", sub: "+Estabilidade (+10%), -Economia (-10%)", indicators: { economy: -10, social: 4, environment: 0, stability: 10 }, matrix: {}, regions: { southeast: 'warning' } },
    optionB: { title: "Substituição sob Demanda", sub: "+Economia (+6%), -Sociedade (-8%), -Estabilidade (-8%)", indicators: { economy: 6, social: -8, environment: 0, stability: -8 }, matrix: {}, regions: { southeast: 'warning' } }
  },
  {
    id: 93, category: "<SUPERFATURAMENTO & DIESEL>", icon: "fa-file-invoice-dollar",
    title: "Superfaturamento na Compra de Óleo Diesel Isolado",
    desc: "Auditoria identifica cobrança indevida em contratos de térmicas no Norte. É necessário renegociar o fornecimento sem cortar a energia.",
    optionA: { title: "Auditar e Renegociar Contratos", sub: "+Economia (+10%), +Sociedade (+6%), -Estabilidade (-6%)", indicators: { economy: 10, social: 6, environment: 2, stability: -6 }, matrix: { thermal: -2.0 }, regions: { north: 'warning' } },
    optionB: { title: "Intervir na Distribuição Local", sub: "+Estabilidade (+10%), -Economia (-8%)", indicators: { economy: -8, social: -4, environment: -4, stability: 10 }, matrix: {}, regions: { north: 'warning' } }
  },
  {
    id: 98, category: "<SOBRECARGA & INCÊNDIO>", icon: "fa-temperature-high",
    title: "Superaquecimento por Excesso de Carga em Subestações",
    desc: "Subestações urbanas registram picos de aquecimento durante ondas de calor extrema. Obras de resfriamento evitam danos graves.",
    optionA: { title: "Instalar Refrigeração Industrial", sub: "+Estabilidade (+14%), +Ambiente (+6%), -Economia (-10%)", indicators: { economy: -10, social: 6, environment: 6, stability: 14 }, matrix: {}, regions: { southeast: 'warning' } },
    optionB: { title: "Rodízio Preventivo de Carga", sub: "+Economia (+5%), -Sociedade (-8%), -Estabilidade (-6%)", indicators: { economy: 5, social: -8, environment: 2, stability: -6 }, matrix: {}, regions: { southeast: 'warning' } }
  },
  {
    id: 106, category: "<CORRUPÇÃO & CARVÃO>", icon: "fa-skull-crossbones",
    title: "Propina na Aquisição de Carvão Mineral Sujo",
    desc: "Substituição imediata de lote de combustível adulterado por fontes de gás natural mais limpas no Sul.",
    optionA: { title: "Converter Usina para Gás Natural", sub: "+Ambiente (+12%), +Estabilidade (+10%), -Economia (-10%)", indicators: { economy: -10, social: 4, environment: 12, stability: 10 }, matrix: { thermal: 2.0 }, regions: { south: 'warning' } },
    optionB: { title: "Cancelar Contrato Adulterado", sub: "+Sociedade (+8%), -Estabilidade (-8%), -Economia (-6%)", indicators: { economy: -6, social: 8, environment: 8, stability: -8 }, matrix: { thermal: -3.0 }, regions: { south: 'warning' } }
  },
  {
    id: 110, category: "<MONOPÓLIO & CHANTAGEM>", icon: "fa-handcuffs",
    title: "Chantagem do Monopólio de Cabos de Alta Tensão",
    desc: "Abertura de concorrência e compra internacional de cabos condutores de alta tensão para quebrar monopólio abusivo.",
    optionA: { title: "Importar Concorrentes Internacionais", sub: "+Estabilidade (+12%), +Economia (+6%), -Sociedade (-4%)", indicators: { economy: 6, social: -4, environment: 0, stability: 12 }, matrix: {}, regions: { southeast: 'active' } },
    optionB: { title: "Subsidiar Fabricação Nacional", sub: "+Sociedade (+8%), +Estabilidade (+8%), -Economia (-10%)", indicators: { economy: -10, social: 8, environment: 0, stability: 8 }, matrix: {}, regions: { southeast: 'warning' } }
  }
];

// COMBINA OS CONJUNTOS NO BANCO COMPLETO
const ALL_DECK_QUESTIONS = [...RAW_QUESTIONS, ...PERDE_PERDE_QUESTIONS];

// ESTADO GLOBAL DO JOGO (GAME STATE)
const GameState = {
  playerName: "GESTOR",
  turn: 1,
  year: 2026,
  maxTurns: 30,
  indicators: { economy: 70, social: 75, environment: 60, stability: 80 },
  matrix: { hydro: 60.0, solar: 8.0, wind: 12.0, thermal: 15.0, nuclear: 3.0, biomass: 2.0 },
  regions: { north: 'active', northeast: 'active', southeast: 'warning', south: 'active' },
  questionsDeck: [],
  currentQuestion: null,
  history: [],
  isGameOver: false
};

/**
 * ALGORITMO FISHER-YATES DE 3 PASSAGENS COM RANDOMIZAÇÃO DE ALTA ENTROPIA (100% SEM VIÉS)
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let pass = 0; pass < 3; pass++) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  return arr;
}

document.addEventListener('DOMContentLoaded', () => {

  document.addEventListener('selectstart', (e) => {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') e.preventDefault();
  });

  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') e.preventDefault();
  });

  const initialDialogueElem = document.getElementById('initial-dialogue-text');
  const initialText = "Saudações, futuro Gestor da Rede Elétrica Nacional! Eu sou o Robô Volta, assistente de inteligência do Sistema Interligado Nacional (SIN). Por favor, digite seu nome abaixo para assumirmos o comando do Centro Nacional de Operações e evitar o colapso energético do Brasil.";
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

  // ELEMENTOS DO MODAL DE CONFIGURAÇÕES
  const btnOpenSettings = document.getElementById('btn-open-settings');
  const settingsModal = document.getElementById('settings-modal');
  const btnCloseSettings = document.getElementById('btn-close-settings');
  const settingsMainMenu = document.getElementById('settings-main-menu');
  const settingsCreditsPanel = document.getElementById('settings-credits-panel');
  const btnSettingsRestartGame = document.getElementById('btn-settings-restart-game');
  const btnSettingsRestartTerm = document.getElementById('btn-settings-restart-term');
  const btnSettingsCredits = document.getElementById('btn-settings-credits');
  const btnSettingsExit = document.getElementById('btn-settings-exit');
  const btnBackCredits = document.getElementById('btn-back-credits');

  const cutsceneAvatar = document.getElementById('cutscene-avatar');
  const cutsceneSpeakerName = document.getElementById('cutscene-speaker-name');
  const cutsceneSpeakerTitle = document.getElementById('cutscene-speaker-title');
  const cutsceneTextElem = document.getElementById('cutscene-text');

  const dilemmaCategory = document.getElementById('dilemma-category');
  const dilemmaYear = document.getElementById('dilemma-year');
  const dilemmaIcon = document.getElementById('dilemma-icon');
  const dilemmaTitle = document.getElementById('dilemma-title');
  const dilemmaDesc = document.getElementById('dilemma-desc');
  const dilemmaCardElement = document.getElementById('dilemma-card-element');

  const btnChoiceA = document.getElementById('btn-choice-a');
  const btnChoiceB = document.getElementById('btn-choice-b');
  const choiceATitle = document.getElementById('choice-a-title');
  const choiceAImpacts = document.getElementById('choice-a-impacts');
  const choiceBTitle = document.getElementById('choice-b-title');
  const choiceBImpacts = document.getElementById('choice-b-impacts');

  const gameOverModal = document.getElementById('game-over-modal');
  const gameOverCardBox = document.getElementById('game-over-card-box');
  const goHeaderIcon = document.getElementById('go-header-icon');
  const goTitleText = document.getElementById('go-title-text');
  const goSummaryText = document.getElementById('go-summary-text');
  const goStatYears = document.getElementById('go-stat-years');
  const goStatCo2 = document.getElementById('go-stat-co2');
  const goStatSocial = document.getElementById('go-stat-social');
  const goStatGrade = document.getElementById('go-stat-grade');
  const goPedagogicalDesc = document.getElementById('go-pedagogical-desc');
  const btnRestartGame = document.getElementById('btn-restart-game');

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

  if (initialDialogueElem) typeTextEffect(initialDialogueElem, initialText, 25);

  if (inputElem) {
    inputElem.addEventListener('input', (e) => {
      e.target.value = e.target.value.toUpperCase();
    });
  }

  if (btnStart) {
    btnStart.addEventListener('click', (e) => {
      e.preventDefault();
      GameState.playerName = (inputElem && inputElem.value.trim()) ? inputElem.value.trim() : 'GESTOR';

      if (titleScreen) titleScreen.classList.add('hidden');
      if (cutsceneScreen) cutsceneScreen.classList.remove('hidden');

      cutsceneIndex = 0;
      renderCutsceneLine();
    });
  }

  const CUTSCENE_SCRIPT = [
    // [Cena 1: O Diagnóstico do Colapso]
    {
      speaker: "Dra. Elena",
      title: "Membro Sênior / Física Teórica",
      avatar: "assets/dra_elena_avatar.jpg",
      text: "{NAME}... Sente-se. O que você vai ouvir agora não está nos jornais."
    },
    {
      speaker: "Dra. Elena",
      title: "Membro Sênior / Física Teórica",
      avatar: "assets/dra_elena_avatar.jpg",
      text: "Nós perdemos o controle. O modelo energético do século XX entrou em colapso definitivo. A dependência excessiva de combustíveis fósseis no Hemisfério Norte gerou um efeito cascata no clima global."
    },
    {
      speaker: "Robô Volta",
      title: "Assistente de Automação SIN",
      avatar: "assets/robo_volta_avatar.jpg",
      text: "[Bip] Nossos sistemas inteligentes de medição e automação da rede registram falhas múltiplas. A Europa está racionando gás natural, e o preço do barril de petróleo atingiu picos insustentáveis."
    },
    {
      speaker: "Dra. Elena",
      title: "Membro Sênior / Física Teórica",
      avatar: "assets/dra_elena_avatar.jpg",
      text: "E aqui no Brasil, a conta chegou. Uma anomalia climática brutal secou as principais bacias hidrográficas do Sudeste e Centro-Oeste. Sem água, nossa principal fonte despencou."
    },
    {
      speaker: "Robô Volta",
      title: "Assistente de Automação SIN",
      avatar: "assets/robo_volta_avatar.jpg",
      text: "[Alerta] A capacidade dos nossos reservatórios atingiu a marca de 14%. A geração de energia nas turbinas está seriamente comprometida."
    },

    // [Cena 2: As Consequências Econômicas e Sociais]
    {
      speaker: "Dra. Elena",
      title: "Membro Sênior / Física Teórica",
      avatar: "assets/dra_elena_avatar.jpg",
      text: "Para evitar um apagão total, o antigo Ministério religou todas as usinas termelétricas a carvão e óleo diesel de emergência."
    },
    {
      speaker: "Dra. Elena",
      title: "Membro Sênior / Física Teórica",
      avatar: "assets/dra_elena_avatar.jpg",
      text: "O resultado? A energia gerada nestas usinas possui um custo operacional altíssimo e uma grande perda de rendimento, além de poluir os céus das nossas cidades."
    },
    {
      speaker: "Robô Volta",
      title: "Assistente de Automação SIN",
      avatar: "assets/robo_volta_avatar.jpg",
      text: "[Bip] Impacto social crítico: A tarifa de energia subiu 85% em três meses. Indústrias estão demitindo em massa para compensar os custos. Protestos violentos foram registrados em cinco capitais."
    },
    {
      speaker: "Dra. Elena",
      title: "Membro Sênior / Física Teórica",
      avatar: "assets/dra_elena_avatar.jpg",
      text: "O antigo Ministro não suportou a pressão e renunciou esta manhã. O país está à beira do abismo econômico, {NAME}."
    },

    // [Cena 3: A Posse e as Regras do Jogo]
    {
      speaker: "Dra. Elena",
      title: "Membro Sênior / Física Teórica",
      avatar: "assets/dra_elena_avatar.jpg",
      text: "O Presidente assinou sua nomeação. A partir de agora, você é a autoridade máxima do Sistema Elétrico Nacional."
    },
    {
      speaker: "Robô Volta",
      title: "Assistente de Automação SIN",
      avatar: "assets/robo_volta_avatar.jpg",
      text: "Iniciando protocolo de transição. Ministro {NAME}, você deverá monitorar os dados das nossas centrais automatizadas."
    },
    {
      speaker: "Robô Volta",
      title: "Assistente de Automação SIN",
      avatar: "assets/robo_volta_avatar.jpg",
      text: "Você deve manter quatro pilares acima da linha de colapso de 20%: O Caixa do Governo, a Aprovação Popular, a Preservação Ambiental e a Estabilidade da Rede Elétrica."
    },
    {
      speaker: "Dra. Elena",
      title: "Membro Sênior / Física Teórica",
      avatar: "assets/dra_elena_avatar.jpg",
      text: "Não existe mágica aqui, Ministro. A primeira lei da conservação da energia é implacável: a energia não se cria, apenas se transforma."
    },
    {
      speaker: "Dra. Elena",
      title: "Membro Sênior / Física Teórica",
      avatar: "assets/dra_elena_avatar.jpg",
      text: "Se você investir pesado em fazendas solares e eólicas, teremos energia limpa, mas terá que lidar com a intermitência dos ventos e do sol. Se optar por construir novas hidrelétricas, enfrentará a fúria da população e de ativistas devido ao alagamento de terras e perda de biodiversidade."
    },
    {
      speaker: "Dra. Elena",
      title: "Membro Sênior / Física Teórica",
      avatar: "assets/dra_elena_avatar.jpg",
      text: "Cada escolha sua moldará o mapa geográfico e a economia do Brasil nas próximas três décadas. Nós não temos margem para erro."
    },
    {
      speaker: "Robô Volta",
      title: "Assistente de Automação SIN",
      avatar: "assets/robo_volta_avatar.jpg",
      text: "[Bip] O sistema está online. A primeira crise acaba de chegar na sua mesa, Ministro. Boa sorte."
    }
  ];

  const TUTORIAL_STEPS = [
    { stepBadge: "PASSO 1 DE 6", title: "BARRAS DE INDICADORES", text: "No topo, monitore os 4 pilares: Economia ($), Sociedade (♥), Meio Ambiente (🌲) e Estabilidade da Rede (⚡). Não deixe nenhum zerar!", targetId: "tut-target-indicators", arrowDirection: "top" },
    { stepBadge: "PASSO 2 DE 6", title: "CARTA DE DILEMA", text: "No centro, leia o dilema socioambiental e escolha a Opção A (Esquerda / Tecla A) ou Opção B (Direita / Tecla B).", targetId: "tut-target-dilemma", arrowDirection: "center" },
    { stepBadge: "PASSO 3 DE 6", title: "HOLÓGRAFO REGIONAL BRASIL", text: "Canto inferior esquerdo: acompanhe o status operacional em tempo real das bacias e subestações das 4 regiões brasileiras.", targetId: "tut-target-map", arrowDirection: "bottom-left" },
    { stepBadge: "PASSO 4 DE 6", title: "MATRIZ ENERGÉTICA NACIONAL", text: "Canto inferior direito: acompanhe a participação percentual das 6 fontes (Hidro, Solar, Eólica, Térmica, Nuclear e Biomassa).", targetId: "tut-target-chart", arrowDirection: "bottom-right" },
    { stepBadge: "PASSO 5 DE 6", title: "MODO CRÍTICO DE EMERGÊNCIA", text: "Se algum indicador cair abaixo de 20%, a sala entra em iluminação de emergência vermelha e crises graves serão acionadas!", targetId: "tut-target-indicators", arrowDirection: "top" },
    { stepBadge: "PASSO 6 DE 6", title: "BEM-VINDO AO COMANDO!", text: "O destino da matriz energética nacional está em suas mãos. Boa sorte, Ministro {NAME}!", targetId: null, arrowDirection: "center" }
  ];

  function renderCutsceneLine() {
    if (cutsceneIndex >= CUTSCENE_SCRIPT.length) {
      if (cutsceneScreen) cutsceneScreen.classList.add('hidden');
      if (hudDashboardScreen) hudDashboardScreen.classList.remove('hidden');
      initNewGame();
      startTutorial();
      return;
    }

    const currentLine = CUTSCENE_SCRIPT[cutsceneIndex];
    const textToDisplay = currentLine.text.replace(/{NAME}/g, GameState.playerName);

    if (cutsceneAvatar) cutsceneAvatar.src = currentLine.avatar;
    if (cutsceneSpeakerName) cutsceneSpeakerName.textContent = currentLine.speaker;
    if (cutsceneSpeakerTitle) cutsceneSpeakerTitle.textContent = currentLine.title;
    if (cutsceneTextElem) typeTextEffect(cutsceneTextElem, textToDisplay, 22);
  }

  function advanceCutscene() {
    if (cutsceneScreen && cutsceneScreen.classList.contains('hidden')) return;
    if (completeTypingInstantly(cutsceneTextElem)) return;
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

  function initNewGame() {
    GameState.turn = 1;
    GameState.year = 2026;
    GameState.indicators = { economy: 70, social: 75, environment: 60, stability: 80 };
    GameState.matrix = { hydro: 60.0, solar: 8.0, wind: 12.0, thermal: 15.0, nuclear: 3.0, biomass: 2.0 };
    GameState.regions = { north: 'active', northeast: 'active', southeast: 'warning', south: 'active' };
    GameState.history = [];
    GameState.isGameOver = false;

    GameState.questionsDeck = shuffleArray(ALL_DECK_QUESTIONS);

    if (gameOverModal) gameOverModal.classList.add('hidden');
    loadNextQuestion();
    updateHUD();
  }

  function loadNextQuestion() {
    if (GameState.isGameOver) return;

    if (GameState.questionsDeck.length === 0) {
      GameState.questionsDeck = shuffleArray(ALL_DECK_QUESTIONS);
    }
    
    GameState.currentQuestion = GameState.questionsDeck.pop();
    renderCurrentQuestion();
  }

  function renderImpactPills(containerElem, indicators) {
    if (!containerElem || !indicators) return;
    containerElem.innerHTML = '';

    const meta = {
      economy: { name: 'Economia', icon: 'fa-dollar-sign' },
      social: { name: 'Sociedade', icon: 'fa-heart' },
      environment: { name: 'Ambiente', icon: 'fa-tree' },
      stability: { name: 'Rede', icon: 'fa-bolt' }
    };

    Object.keys(indicators).forEach(key => {
      let delta = indicators[key];
      if (delta === 0) return;
      if (delta < 0) delta = Math.max(-10, delta);

      const isPos = delta > 0;
      const signStr = isPos ? `+${delta}%` : `${delta}%`;
      const pill = document.createElement('span');
      pill.className = `impact-pill ${isPos ? 'pos' : 'neg'}`;
      pill.innerHTML = `<i class="fa-solid ${meta[key].icon}"></i> ${meta[key].name} ${signStr}`;
      containerElem.appendChild(pill);
    });
  }

  function renderCurrentQuestion() {
    const q = GameState.currentQuestion;
    if (!q) return;

    if (dilemmaCategory) dilemmaCategory.textContent = q.category;
    if (dilemmaYear) dilemmaYear.textContent = `ANO ${GameState.year} (TURNO ${GameState.turn}/30)`;
    if (dilemmaIcon) dilemmaIcon.className = `fa-solid ${q.icon} dilemma-icon`;
    if (dilemmaTitle) dilemmaTitle.textContent = q.title;
    if (dilemmaDesc) dilemmaDesc.textContent = q.desc;

    if (choiceATitle) choiceATitle.textContent = q.optionA.title;
    if (choiceBTitle) choiceBTitle.textContent = q.optionB.title;

    renderImpactPills(choiceAImpacts, q.optionA.indicators);
    renderImpactPills(choiceBImpacts, q.optionB.indicators);

    if (dilemmaCardElement) {
      dilemmaCardElement.classList.remove('slide-left', 'slide-right');
    }
  }

  function applyChoice(optionKey) {
    if (GameState.isGameOver || !GameState.currentQuestion) return;

    const q = GameState.currentQuestion;
    const option = optionKey === 'A' ? q.optionA : q.optionB;

    if (dilemmaCardElement) {
      dilemmaCardElement.classList.add(optionKey === 'A' ? 'slide-left' : 'slide-right');
    }

    setTimeout(() => {
      Object.keys(option.indicators).forEach(ind => {
        let delta = option.indicators[ind];
        if (delta < 0) {
          delta = Math.max(-10, delta);
        }
        GameState.indicators[ind] = Math.max(0, Math.min(100, GameState.indicators[ind] + delta));
      });

      if (option.matrix) {
        Object.keys(option.matrix).forEach(m => {
          if (GameState.matrix[m] !== undefined) {
            GameState.matrix[m] = Math.max(0, GameState.matrix[m] + option.matrix[m]);
          }
        });
        normalizeMatrix();
      }

      if (option.regions) {
        Object.keys(option.regions).forEach(reg => {
          GameState.regions[reg] = option.regions[reg];
        });
      }

      GameState.history.push({
        turn: GameState.turn,
        year: GameState.year,
        title: q.title,
        choice: optionKey,
        indicators: { ...GameState.indicators }
      });

      const failedIndicator = Object.keys(GameState.indicators).find(ind => GameState.indicators[ind] <= 0);

      if (failedIndicator) {
        triggerGameOver(false, failedIndicator);
        return;
      }

      GameState.turn++;
      GameState.year++;

      if (GameState.turn > GameState.maxTurns) {
        triggerGameOver(true, null);
        return;
      }

      updateHUD();
      loadNextQuestion();
    }, 200);
  }

  function normalizeMatrix() {
    const total = Object.values(GameState.matrix).reduce((a, b) => a + b, 0);
    if (total > 0) {
      Object.keys(GameState.matrix).forEach(m => {
        GameState.matrix[m] = (GameState.matrix[m] / total) * 100;
      });
    }
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
      const val = Math.round(GameState.indicators[item.key]);
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

    updateRegionMapUI();
    initHudChart();
  }

  function updateRegionMapUI() {
    const regMap = [
      { key: 'north', node: 'map-node-north', status: 'map-status-north' },
      { key: 'northeast', node: 'map-node-northeast', status: 'map-status-northeast' },
      { key: 'southeast', node: 'map-node-southeast', status: 'map-status-southeast' },
      { key: 'south', node: 'map-node-south', status: 'map-status-south' }
    ];

    regMap.forEach(item => {
      const st = GameState.regions[item.key];
      const nodeElem = document.getElementById(item.node);
      const statusElem = document.getElementById(item.status);

      if (nodeElem) nodeElem.className = `map-pulse-node ${st}`;
      if (statusElem) {
        statusElem.className = `legend-status ${st}`;
        statusElem.textContent = st === 'active' ? 'ESTÁVEL' : (st === 'warning' ? 'ALERTA' : 'NORMAL');
      }
    });
  }

  function initHudChart() {
    const ctx = document.getElementById('hudMatrixChart');
    if (!ctx || typeof Chart === 'undefined') return;

    document.getElementById('leg-val-hydro').textContent = `${GameState.matrix.hydro.toFixed(1)}%`;
    document.getElementById('leg-val-solar').textContent = `${GameState.matrix.solar.toFixed(1)}%`;
    document.getElementById('leg-val-wind').textContent = `${GameState.matrix.wind.toFixed(1)}%`;
    document.getElementById('leg-val-thermal').textContent = `${GameState.matrix.thermal.toFixed(1)}%`;
    document.getElementById('leg-val-nuclear').textContent = `${GameState.matrix.nuclear.toFixed(1)}%`;
    document.getElementById('leg-val-biomass').textContent = `${GameState.matrix.biomass.toFixed(1)}%`;

    if (hudChart) {
      hudChart.data.datasets[0].data = [
        GameState.matrix.hydro, GameState.matrix.solar, GameState.matrix.wind,
        GameState.matrix.thermal, GameState.matrix.nuclear, GameState.matrix.biomass
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
              GameState.matrix.hydro, GameState.matrix.solar, GameState.matrix.wind,
              GameState.matrix.thermal, GameState.matrix.nuclear, GameState.matrix.biomass
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

  function triggerGameOver(isVictory, failedIndicator) {
    GameState.isGameOver = true;
    if (gameOverModal) gameOverModal.classList.remove('hidden');

    if (isVictory) {
      if (gameOverCardBox) gameOverCardBox.className = 'game-over-card';
      if (goHeaderIcon) goHeaderIcon.className = 'fa-solid fa-trophy';
      if (goTitleText) goTitleText.textContent = 'VITÓRIA! MANDATO CONCLUÍDO (2056)';
      if (goSummaryText) goSummaryText.textContent = `Parabéns, Ministro ${GameState.playerName}! Você governou com sucesso o Sistema Elétrico Nacional durante 30 anos (2026-2056), garantindo resiliência e transição energética!`;
      if (goStatYears) goStatYears.textContent = '30 / 30 Anos';
      if (goStatCo2) goStatCo2.textContent = '42 Mt CO₂ (-58%)';
      if (goStatSocial) goStatSocial.textContent = `${Math.round(GameState.indicators.social)}%`;
      if (goStatGrade) goStatGrade.textContent = 'A+ (Mestre da Transição)';
      if (goPedagogicalDesc) goPedagogicalDesc.textContent = 'Sua gestão aplicou com perfeição os princípios da conservação de energia e transição limpa no território nacional.';
    } else {
      if (gameOverCardBox) gameOverCardBox.className = 'game-over-card defeat';
      if (goHeaderIcon) goHeaderIcon.className = 'fa-solid fa-triangle-exclamation';
      if (goTitleText) goTitleText.textContent = 'COLAPSO DO SISTEMA ELÉTRICO!';
      
      const names = { economy: 'Falência Financeira ($)', social: 'Insurreição Popular (♥)', environment: 'Colapso Ecológico (🌲)', stability: 'Apagão Sistêmico (⚡)' };
      const failedName = names[failedIndicator] || 'Falha Fatal';

      if (goSummaryText) goSummaryText.textContent = `O indicador de ${failedName} atingiu 0% no ano de ${GameState.year}. O governo perdeu a capacidade de gerir a rede elétrica nacional.`;
      if (goStatYears) goStatYears.textContent = `${GameState.turn} / 30 Anos`;
      if (goStatCo2) goStatCo2.textContent = 'Indefinido (Colapso)';
      if (goStatSocial) goStatSocial.textContent = `${Math.round(GameState.indicators.social)}%`;
      if (goStatGrade) goStatGrade.textContent = 'F (Exoneração por Crise)';
      if (goPedagogicalDesc) goPedagogicalDesc.textContent = `O desequilíbrio em ${failedName} gerou colapso na infraestrutura do país. Escolhas de alto impacto exigem gestão prudente de perdas.`;
    }
  }

  // EVENTOS DO MODAL DE CONFIGURAÇÕES
  function openSettingsModal() {
    if (settingsModal) settingsModal.classList.remove('hidden');
    if (settingsMainMenu) settingsMainMenu.classList.remove('hidden');
    if (settingsCreditsPanel) settingsCreditsPanel.classList.add('hidden');
  }

  function closeSettingsModal() {
    if (settingsModal) settingsModal.classList.add('hidden');
  }

  if (btnOpenSettings) btnOpenSettings.addEventListener('click', openSettingsModal);
  if (btnCloseSettings) btnCloseSettings.addEventListener('click', closeSettingsModal);

  if (settingsModal) {
    settingsModal.addEventListener('click', (e) => {
      if (e.target === settingsModal) closeSettingsModal();
    });
  }

  if (btnSettingsRestartGame) {
    btnSettingsRestartGame.addEventListener('click', () => {
      closeSettingsModal();
      if (hudDashboardScreen) hudDashboardScreen.classList.add('hidden');
      if (cutsceneScreen) cutsceneScreen.classList.add('hidden');
      if (titleScreen) titleScreen.classList.remove('hidden');
      if (inputElem) inputElem.value = '';
    });
  }

  if (btnSettingsRestartTerm) {
    btnSettingsRestartTerm.addEventListener('click', () => {
      closeSettingsModal();
      initNewGame();
    });
  }

  if (btnSettingsCredits) {
    btnSettingsCredits.addEventListener('click', () => {
      if (settingsMainMenu) settingsMainMenu.classList.add('hidden');
      if (settingsCreditsPanel) settingsCreditsPanel.classList.remove('hidden');
    });
  }

  if (btnBackCredits) {
    btnBackCredits.addEventListener('click', () => {
      if (settingsCreditsPanel) settingsCreditsPanel.classList.add('hidden');
      if (settingsMainMenu) settingsMainMenu.classList.remove('hidden');
    });
  }

  if (btnSettingsExit) {
    btnSettingsExit.addEventListener('click', () => {
      window.location.href = 'https://www.google.com';
    });
  }

  if (btnChoiceA) {
    btnChoiceA.addEventListener('click', (e) => {
      e.preventDefault();
      applyChoice('A');
    });
  }

  if (btnChoiceB) {
    btnChoiceB.addEventListener('click', (e) => {
      e.preventDefault();
      applyChoice('B');
    });
  }

  if (btnRestartGame) {
    btnRestartGame.addEventListener('click', (e) => {
      e.preventDefault();
      initNewGame();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (settingsModal && !settingsModal.classList.contains('hidden')) {
        closeSettingsModal();
      } else if (hudDashboardScreen && !hudDashboardScreen.classList.contains('hidden')) {
        openSettingsModal();
      }
    }

    if (hudDashboardScreen && !hudDashboardScreen.classList.contains('hidden') && 
        tutorialOverlay && tutorialOverlay.classList.contains('hidden') && 
        settingsModal && settingsModal.classList.contains('hidden') && 
        !GameState.isGameOver) {
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
        e.preventDefault();
        applyChoice('A');
      } else if (e.key === 'b' || e.key === 'B' || e.key === 'ArrowRight') {
        e.preventDefault();
        applyChoice('B');
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
      typeTextEffect(tutStepText, step.text.replace(/{NAME}/g, GameState.playerName), 20);
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

  window.updateHUD = updateHUD;
  window.GameState = GameState;
});
