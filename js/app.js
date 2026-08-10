/**
 * GRID - O Gestor da Rede Elétrica Nacional
 * Core Game Engine: 110 Dilema Deck, Unbiased Fisher-Yates & Perde-Perde Mechanics
 */

// 1. BARALHO COMPLETO DE 110 DILEMAS (1 A 110)
const RAW_QUESTIONS = [
  // 1-20: Eventos Aleatórios
  {
    id: 1, category: "<HIDRELÉTRICA & AMAZÔNIA>", icon: "fa-water",
    title: "Licenciamento da Usina Hidrelétrica na Bacia Amazônica",
    desc: "Proposta de construção de usina de grande porte para conversão de energia potencial gravítica em elétrica (Ep = m·g·h). Causa alagamento florestal, emissão de metano (CH₄) e deslocamento de ribeirinhos.",
    optionA: { title: "Aprovar Construção", sub: "+Estabilidade (+20%), -Ambiente (-18%), -Sociedade (-12%)", indicators: { economy: -10, social: -12, environment: -18, stability: 20 }, matrix: { hydro: 5.0, thermal: -3.0, solar: -1.0, wind: -1.0 }, regions: { north: 'active', southeast: 'warning' } },
    optionB: { title: "Rejeitar Projeto", sub: "+Ambiente (+15%), -Estabilidade (-15%), +Sociedade (+10%)", indicators: { economy: 5, social: 10, environment: 15, stability: -15 }, matrix: { hydro: -2.0, thermal: 2.0 }, regions: { north: 'stable', southeast: 'warning' } }
  },
  {
    id: 2, category: "<EÓLICA & NORDESTE>", icon: "fa-wind",
    title: "Expansão Eólica no Litoral do Rio Grande do Norte",
    desc: "O Nordeste possui alta viabilidade eólica. A instalação de aerogeradores (cinética para elétrica) exige pesados investimentos federais para conectar os parques ao SIN.",
    optionA: { title: "Subsidiar Novos Parques", sub: "+Ambiente (+14%), +Estabilidade (+8%), -Economia (-15%)", indicators: { economy: -15, social: 8, environment: 14, stability: 8 }, matrix: { wind: 6.0, thermal: -4.0, hydro: -2.0 }, regions: { northeast: 'active' } },
    optionB: { title: "Ignorar o Potencial", sub: "+Economia (+10%), -Estabilidade (-10%), -Ambiente (-8%)", indicators: { economy: 10, social: -4, environment: -8, stability: -10 }, matrix: { thermal: 3.0 }, regions: { northeast: 'stable' } }
  },
  {
    id: 3, category: "<SECA & TERMELÉTRICA>", icon: "fa-fire",
    title: "Seca Severa e Acionamento de Termelétricas em São Paulo",
    desc: "A escassez hídrica reduziu as represas a 14%. Ligar termelétricas a gás converte energia química em térmica com alto custo e muita poluição.",
    optionA: { title: "Acionar Termelétricas", sub: "+Estabilidade (+18%), -Ambiente (-20%), -Economia (-12%)", indicators: { economy: -12, social: -10, environment: -20, stability: 18 }, matrix: { thermal: 7.0, hydro: -4.0 }, regions: { southeast: 'warning' } },
    optionB: { title: "Decretar Racionamento", sub: "+Ambiente (+10%), -Sociedade (-16%), -Economia (-14%)", indicators: { economy: -14, social: -16, environment: 10, stability: -12 }, matrix: { thermal: -2.0 }, regions: { southeast: 'warning' } }
  },
  {
    id: 4, category: "<TRANSMISSÃO & EFEITO JOULE>", icon: "fa-bolt",
    title: "Dissipação Térmica nas Linhas de Belo Monte (PA)",
    desc: "A transmissão de energia sofre alta perda na forma de calor devido à resistência dos cabos (Efeito Joule: P = R·I²).",
    optionA: { title: "Construir Ultra Alta Tensão", sub: "+Estabilidade (+16%), +Ambiente (+8%), -Economia (-14%)", indicators: { economy: -14, social: 6, environment: 8, stability: 16 }, matrix: { hydro: 1.0, solar: 1.0 }, regions: { north: 'active', southeast: 'active' } },
    optionB: { title: "Reparos Paliativos", sub: "+Economia (+10%), -Estabilidade (-10%)", indicators: { economy: 10, social: -4, environment: -4, stability: -10 }, matrix: { hydro: -1.0 }, regions: { southeast: 'warning' } }
  },
  {
    id: 5, category: "<NUCLEAR & RIO DE JANEIRO>", icon: "fa-atom",
    title: "Finalização da Usina Nuclear Angra 3 (RJ)",
    desc: "A termodinâmica nuclear tem alto rendimento, mas as obras estão superfaturadas há décadas e a população teme a falta de plano para rejeitos radioativos.",
    optionA: { title: "Concluir Obras", sub: "+Estabilidade (+15%), +Ambiente (+10%), -Economia (-18%)", indicators: { economy: -18, social: -6, environment: 10, stability: 15 }, matrix: { nuclear: 4.0, thermal: -2.0 }, regions: { southeast: 'active' } },
    optionB: { title: "Cancelar Definitivamente", sub: "+Economia (+12%), +Sociedade (+8%), -Estabilidade (-10%)", indicators: { economy: 12, social: 8, environment: -5, stability: -10 }, matrix: { nuclear: -1.0 }, regions: { southeast: 'stable' } }
  },
  {
    id: 6, category: "<SOLAR & MINAS GERAIS>", icon: "fa-sun",
    title: "Subsídio para Geração Solar Distribuída (MG)",
    desc: "Usinas fotovoltaicas transformam energia luminosa em elétrica. Isentar impostos dessas placas incentiva matrizes limpas, mas reduz a arrecadação do Estado.",
    optionA: { title: "Ampliar Isenções", sub: "+Ambiente (+16%), +Sociedade (+12%), -Economia (-12%)", indicators: { economy: -12, social: 12, environment: 16, stability: 6 }, matrix: { solar: 5.0, thermal: -3.0 }, regions: { southeast: 'active' } },
    optionB: { title: "Cortar Incentivos", sub: "+Economia (+14%), -Sociedade (-15%), -Ambiente (-8%)", indicators: { economy: 14, social: -15, environment: -8, stability: -4 }, matrix: { solar: -1.0 }, regions: { southeast: 'stable' } }
  },
  {
    id: 7, category: "<PETRÓLEO & AMAPÁ>", icon: "fa-droplet",
    title: "Exploração de Petróleo na Margem Equatorial (AP)",
    desc: "A descoberta de petróleo (fonte não renovável) promete alta arrecadação e energia térmica firme. Ambientalistas alertam sobre o risco de vazamentos em corais.",
    optionA: { title: "Liberar Exploração", sub: "+Economia (+18%), +Estabilidade (+10%), -Ambiente (-20%)", indicators: { economy: 18, social: -8, environment: -20, stability: 10 }, matrix: { thermal: 5.0, hydro: -2.0 }, regions: { north: 'warning' } },
    optionB: { title: "Proibir Exploração", sub: "+Ambiente (+18%), -Economia (-12%)", indicators: { economy: -12, social: 8, environment: 18, stability: -5 }, matrix: { thermal: -2.0 }, regions: { north: 'stable' } }
  },
  {
    id: 8, category: "<BIOMASSA & SÃO PAULO>", icon: "fa-leaf",
    title: "Cogeração por Biomassa Sucroalcooleira (SP)",
    desc: "Usinas querem expandir a queima do bagaço da cana (energia química). É renovável e ajuda a manter a rede estável sem precisar de altos investimentos do governo.",
    optionA: { title: "Autorizar Expansão", sub: "+Estabilidade (+10%), +Ambiente (+12%), -Economia (-8%)", indicators: { economy: -8, social: 6, environment: 12, stability: 10 }, matrix: { biomass: 4.0, thermal: -3.0 }, regions: { southeast: 'active' } },
    optionB: { title: "Restringir Queima", sub: "+Ambiente (+6%), -Estabilidade (-6%)", indicators: { economy: 5, social: -2, environment: 6, stability: -6 }, matrix: {}, regions: { southeast: 'stable' } }
  },
  {
    id: 9, category: "<GASODUTO & BOLÍVIA>", icon: "fa-gas-pump",
    title: "Crise Geopolítica no Gasoduto Bolívia-Brasil (Gasbol)",
    desc: "Conflitos diplomáticos elevaram o preço do gás natural importado da Bolívia. As termelétricas precisam dele para os horários de pico.",
    optionA: { title: "Estado Absorve o Custo", sub: "+Estabilidade (+12%), -Economia (-16%)", indicators: { economy: -16, social: 4, environment: -8, stability: 12 }, matrix: { thermal: 3.0 }, regions: { southeast: 'active' } },
    optionB: { title: "Repassar Aumento na Tarifa", sub: "+Economia (+10%), -Sociedade (-18%)", indicators: { economy: 10, social: -18, environment: -4, stability: -6 }, matrix: { thermal: -2.0 }, regions: { southeast: 'warning' } }
  },
  {
    id: 10, category: "<OFFSHORE & CEARÁ>", icon: "fa-wind",
    title: "Parques Eólicos Offshore no Ceará",
    desc: "Turbinas no mar captam energia dos ventos com maior eficiência, sem ocupar solo produtivo. Apenas a zona de pesca local seria bloqueada.",
    optionA: { title: "Leiloar Áreas Marítimas", sub: "+Estabilidade (+14%), +Ambiente (+15%), -Economia (-14%)", indicators: { economy: -14, social: -6, environment: 15, stability: 14 }, matrix: { wind: 5.0, thermal: -3.0 }, regions: { northeast: 'active' } },
    optionB: { title: "Proteger Áreas de Pesca", sub: "+Sociedade (+10%), -Estabilidade (-8%)", indicators: { economy: 6, social: 10, environment: -4, stability: -8 }, matrix: {}, regions: { northeast: 'stable' } }
  },
  // 11-20: Continuação Dilemas
  {
    id: 11, category: "<CARVÃO & RIO GRANDE DO SUL>", icon: "fa-smog",
    title: "Renovação das Termelétricas a Carvão (RS)",
    desc: "O carvão mineral de Candiota (RS) é a fonte com maior emissão de CO₂. Desativá-las cumpre metas climáticas, mas causa apagões e falência local.",
    optionA: { title: "Desativar Imediatamente", sub: "+Ambiente (+22%), -Estabilidade (-16%), -Sociedade (-14%)", indicators: { economy: -10, social: -14, environment: 22, stability: -16 }, matrix: { thermal: -6.0, wind: 3.0 }, regions: { south: 'warning' } },
    optionB: { title: "Renovar Contratos", sub: "+Estabilidade (+15%), -Ambiente (-20%)", indicators: { economy: 8, social: -6, environment: -20, stability: 15 }, matrix: { thermal: 4.0 }, regions: { south: 'active' } }
  },
  {
    id: 12, category: "<PCH & RIO URUGUAI>", icon: "fa-water",
    title: "Pequenas Centrais Hidrelétricas (PCH) no Rio Uruguai",
    desc: "PCHs convertem energia mecânica com menor alagamento, mas dezenas delas em cascata impedem a reprodução dos peixes.",
    optionA: { title: "Aprovar Cascata", sub: "+Estabilidade (+12%), -Ambiente (-12%)", indicators: { economy: -6, social: 4, environment: -12, stability: 12 }, matrix: { hydro: 3.0 }, regions: { south: 'active' } },
    optionB: { title: "Exigir Redesenho", sub: "+Ambiente (+8%), -Economia (-8%)", indicators: { economy: -8, social: -2, environment: 8, stability: -6 }, matrix: {}, regions: { south: 'stable' } }
  },
  {
    id: 13, category: "<HIDROGÊNIO VERDE & PECÉM>", icon: "fa-flask",
    title: "Pólo de Hidrogênio Verde no Porto do Pecém (CE)",
    desc: "Uso de eólica para eletrólise da água, gerando combustível químico limpo. Exige aporte financeiro colossal que o governo precisa financiar.",
    optionA: { title: "Financiar Planta Piloto", sub: "+Ambiente (+15%), +Estabilidade (+8%), -Economia (-16%)", indicators: { economy: -16, social: 8, environment: 15, stability: 8 }, matrix: { wind: 4.0, solar: 2.0 }, regions: { northeast: 'active' } },
    optionB: { title: "Abandonar a Vanguarda", sub: "+Economia (+8%), -Ambiente (-6%)", indicators: { economy: 8, social: -4, environment: -6, stability: 2 }, matrix: {}, regions: { northeast: 'stable' } }
  },
  {
    id: 14, category: "<BIOGÁS & ATERROS>", icon: "fa-trash-can",
    title: "Captação de Biogás em Aterros Sanitários",
    desc: "Converter metano (CH₄) do lixo urbano em eletricidade diminui o efeito estufa. O impasse é quem pagará pelas pesadas obras civis.",
    optionA: { title: "Prefeituras Pagam (Aumenta IPTU)", sub: "+Ambiente (+14%), -Sociedade (-14%)", indicators: { economy: 4, social: -14, environment: 14, stability: 6 }, matrix: { biomass: 3.0 }, regions: { southeast: 'active' } },
    optionB: { title: "Governo Federal Subsidia", sub: "+Ambiente (+14%), -Economia (-14%)", indicators: { economy: -14, social: 8, environment: 14, stability: 6 }, matrix: { biomass: 3.0 }, regions: { southeast: 'active' } }
  },
  {
    id: 15, category: "<BATERIAS & ARMAZENAMENTO>", icon: "fa-battery-full",
    title: "Baterias de Lítio em Larga Escala (Armazenamento)",
    desc: "Para resolver a intermitência de fontes solares e eólicas, importa-se mega-baterias industriais caríssimas para armazenamento químico.",
    optionA: { title: "Comprar Lote Internacional", sub: "+Estabilidade (+18%), +Ambiente (+8%), -Economia (-16%)", indicators: { economy: -16, social: 6, environment: 8, stability: 18 }, matrix: { solar: 2.0, wind: 2.0 }, regions: { southeast: 'active' } },
    optionB: { title: "Confiar na Rede Atual", sub: "+Economia (+10%), -Estabilidade (-10%)", indicators: { economy: 10, social: -4, environment: -4, stability: -10 }, matrix: {}, regions: { southeast: 'stable' } }
  },
  {
    id: 16, category: "<TARIFA SOCIAL & CRISE>", icon: "fa-heart",
    title: "Expansão da Tarifa Social (Crise Inflacionária)",
    desc: "Após aumentos na tarifa, a população exige isenção de conta de luz para famílias de baixa renda inscritas no Cadastro Único.",
    optionA: { title: "Conceder Isenção Ampla", sub: "+Sociedade (+20%), -Economia (-14%)", indicators: { economy: -14, social: 20, environment: 0, stability: -2 }, matrix: {}, regions: { northeast: 'active', north: 'active' } },
    optionB: { title: "Manter Cobrança Rígida", sub: "+Economia (+12%), -Sociedade (-18%)", indicators: { economy: 12, social: -18, environment: 0, stability: 0 }, matrix: {}, regions: { northeast: 'warning' } }
  },
  {
    id: 17, category: "<ITAIPU & ASSOREAMENTO>", icon: "fa-water",
    title: "Desassoreamento do Reservatório de Itaipu",
    desc: "O acúmulo de terra reduziu a massa de água (Ep = mgh). Obras de dragagem retiram o sedimento mas custam bilhões.",
    optionA: { title: "Autorizar Dragagem Bilionária", sub: "+Estabilidade (+15%), -Economia (-16%)", indicators: { economy: -16, social: 6, environment: 10, stability: 15 }, matrix: { hydro: 3.0 }, regions: { south: 'active' } },
    optionB: { title: "Ignorar Assoreamento", sub: "+Economia (+8%), -Estabilidade (-12%)", indicators: { economy: 8, social: -4, environment: -8, stability: -12 }, matrix: { hydro: -2.0 }, regions: { south: 'warning' } }
  },
  {
    id: 18, category: "<MAREMOTRIZ & MARANHÃO>", icon: "fa-water",
    title: "Usina Maremotriz na Baía de São Marcos (MA)",
    desc: "Aproveitar o desnível de 7m das marés maranhenses (energia mecânica). O projeto piloto é caro e biólogos alertam sobre impacto em manguezais.",
    optionA: { title: "Construir Usina Piloto", sub: "+Estabilidade (+10%), -Ambiente (-12%), -Economia (-14%)", indicators: { economy: -14, social: 4, environment: -12, stability: 10 }, matrix: { hydro: 2.0 }, regions: { northeast: 'active' } },
    optionB: { title: "Proibir o Projeto", sub: "+Economia (+6%), -Estabilidade (-6%)", indicators: { economy: 6, social: -2, environment: 4, stability: -6 }, matrix: {}, regions: { northeast: 'stable' } }
  },
  {
    id: 19, category: "<AUTOMAÇÃO & SMART GRIDS>", icon: "fa-microchip",
    title: "Automação e Medição Inteligente do SIN",
    desc: "A modernização exige instalação de medidores inteligentes e automação de ponta que previnem perdas, mas exige aporte importado.",
    optionA: { title: "Financiar Sistema Inteligente", sub: "+Estabilidade (+15%), +Sociedade (+12%), -Economia (-12%)", indicators: { economy: -12, social: 12, environment: 6, stability: 15 }, matrix: { solar: 2.0 }, regions: { southeast: 'active' } },
    optionB: { title: "Manter Infraestrutura Obsoleta", sub: "+Economia (+8%), -Estabilidade (-10%)", indicators: { economy: 8, social: -6, environment: -2, stability: -10 }, matrix: {}, regions: { southeast: 'stable' } }
  },
  {
    id: 20, category: "<CARROS ELÉTRICOS>", icon: "fa-plug",
    title: "Isenção Fiscal para Veículos 100% Elétricos",
    desc: "Trocar energia fóssil pela elétrica limpa as cidades. Porém, recarga noturna em massa gera sobrecarga severa nos transformadores.",
    optionA: { title: "Aprovar Isenção", sub: "+Ambiente (+15%), -Estabilidade (-10%), -Economia (-12%)", indicators: { economy: -12, social: 8, environment: 15, stability: -10 }, matrix: { solar: 2.0 }, regions: { southeast: 'active' } },
    optionB: { title: "Taxar Elétricos", sub: "+Economia (+8%), -Ambiente (-12%)", indicators: { economy: 8, social: -10, environment: -12, stability: 4 }, matrix: {}, regions: { southeast: 'stable' } }
  }
];

// QUESTÕES DE CORRUPÇÃO E CRISES PERDE-PERDE (IDs 71 A 110)
const PERDE_PERDE_QUESTIONS = [
  {
    id: 71, category: "<CORRUPÇÃO & HIDRELÉTRICA>", icon: "fa-triangle-exclamation",
    title: "Empreiteira e a Falha Estrutural da Hidrelétrica",
    desc: "Uma empreiteira subornou laudos para ignorar trincas no concreto da nova barragem. Elevar o nível de água para gerar mais energia pode romper a represa.",
    optionA: { title: "Acumular Água e Arriscar Rompimento", sub: "-Ambiente (-20%), -Sociedade (-18%), -Estabilidade (-12%)", indicators: { economy: 5, social: -18, environment: -20, stability: -12 }, matrix: { hydro: 2.0 }, regions: { north: 'warning' } },
    optionB: { title: "Denunciar e Paralisar por 10 Anos", sub: "-Economia (-20%), -Estabilidade (-18%)", indicators: { economy: -20, social: -8, environment: 5, stability: -18 }, matrix: { hydro: -4.0 }, regions: { north: 'warning' } }
  },
  {
    id: 72, category: "<LOBBY & FÓSSEIS>", icon: "fa-smoking",
    title: "O Lobby do Carvão Mineral",
    desc: "Políticos financiados por mineradoras exigem que usinas ineficientes e poluidoras continuem abertas, ameaçando travar o orçamento do Ministério.",
    optionA: { title: "Ceder ao Lobby Fóssil", sub: "-Ambiente (-22%), -Sociedade (-14%)", indicators: { economy: 6, social: -14, environment: -22, stability: 8 }, matrix: { thermal: 4.0 }, regions: { south: 'warning' } },
    optionB: { title: "Cortar Subsídios e Sofrer Boicote", sub: "-Economia (-18%), -Estabilidade (-16%)", indicators: { economy: -18, social: -8, environment: 12, stability: -16 }, matrix: { thermal: -3.0 }, regions: { south: 'warning' } }
  },
  {
    id: 76, category: "<CRIME & INFRAESTRUTURA>", icon: "fa-shield-halved",
    title: "A Máfia do Cobre e as Milícias",
    desc: "Milícias com proteção política furtam cabos de transmissão, gerando apagões e perdas por Efeito Joule na fiação remendada. Eles cobram propina.",
    optionA: { title: "Pagar Propina à Milícia", sub: "-Economia (-18%), -Sociedade (-16%)", indicators: { economy: -18, social: -16, environment: 0, stability: 8 }, matrix: {}, regions: { southeast: 'warning' } },
    optionB: { title: "Enfrentar Máfia e Sofrer Sabotagem", sub: "-Estabilidade (-20%), -Sociedade (-12%)", indicators: { economy: -8, social: -12, environment: 0, stability: -20 }, matrix: {}, regions: { southeast: 'warning' } }
  },
  {
    id: 91, category: "<SABOTAGEM & SEGURANÇA>", icon: "fa-user-ninja",
    title: "Sabotagem em Linhas de Alta Tensão no Centro-Oeste",
    desc: "Facções criminosas derrubaram torres de 500 kV, exigindo a transferência de lideranças prisionais para evitar novos atentados à rede.",
    optionA: { title: "Ceder às Exigências dos Criminosos", sub: "-Sociedade (-22%), -Economia (-14%)", indicators: { economy: -14, social: -22, environment: 0, stability: 6 }, matrix: {}, regions: { southeast: 'warning' } },
    optionB: { title: "Enviar Força de Elite e Aceitar Apagão", sub: "-Estabilidade (-24%), -Sociedade (-14%)", indicators: { economy: -8, social: -14, environment: 0, stability: -24 }, matrix: {}, regions: { southeast: 'warning' } }
  },
  {
    id: 92, category: "<FURTOS & TRANSFORMADORES>", icon: "fa-wrench",
    title: "Epidemia de Furtos de Transformadores Urbanos",
    desc: "Quadrilhas furta transformadores de rua para extrair cobre e óleo dielétrico. A reposição consome todo o orçamento emergencial do Estado.",
    optionA: { title: "Racionar Trocas de Transformadores", sub: "-Estabilidade (-18%), -Sociedade (-18%)", indicators: { economy: 4, social: -18, environment: 0, stability: -18 }, matrix: {}, regions: { southeast: 'warning' } },
    optionB: { title: "Remanejar Verba da Manutenção Usinas", sub: "-Economia (-18%), -Estabilidade (-15%)", indicators: { economy: -18, social: -8, environment: -4, stability: -15 }, matrix: {}, regions: { southeast: 'warning' } }
  },
  {
    id: 93, category: "<SUPERFATURAMENTO & DIESEL>", icon: "fa-file-invoice-dollar",
    title: "Superfaturamento na Compra de Óleo Diesel Isolado",
    desc: "A compra de combustível para térmicas do Norte teve valor inflacionado em 400% por esquema de notas frias operado por políticos locais.",
    optionA: { title: "Manter Abastecimento Inflacionado", sub: "-Economia (-20%), -Sociedade (-14%)", indicators: { economy: -20, social: -14, environment: -8, stability: 8 }, matrix: { thermal: 2.0 }, regions: { north: 'warning' } },
    optionB: { title: "Cortar Fornecimento Suspeito", sub: "-Estabilidade (-22%), -Sociedade (-18%)", indicators: { economy: 5, social: -18, environment: 6, stability: -22 }, matrix: { thermal: -4.0 }, regions: { north: 'warning' } }
  },
  {
    id: 98, category: "<SOBRECARGA & INCÊNDIO>", icon: "fa-temperature-high",
    title: "Superaquecimento por Excesso de Carga em Subestações",
    desc: "Subestações operam com 140% da capacidade nominal no verão escaldante. Risco iminente de explosão e incêndio químico em transformadores.",
    optionA: { title: "Desligar Subestações no Pico", sub: "-Sociedade (-20%), -Estabilidade (-18%)", indicators: { economy: -6, social: -20, environment: 4, stability: -18 }, matrix: {}, regions: { southeast: 'warning' } },
    optionB: { title: "Forçar Operação em Overload", sub: "-Estabilidade (-22%), -Ambiente (-16%)", indicators: { economy: -10, social: -8, environment: -16, stability: -22 }, matrix: {}, regions: { southeast: 'warning' } }
  },
  {
    id: 106, category: "<CORRUPÇÃO & CARVÃO>", icon: "fa-skull-crossbones",
    title: "Propina na Aquisição de Carvão Mineral Sujo",
    desc: "Esquema corrupto comprou carvão mineral de péssima qualidade com alto teor de enxofre que entope turbinas e triplica a emissão de fuligem.",
    optionA: { title: "Cancelar Contrato e Sofrer Apagão", sub: "-Estabilidade (-24%), -Economia (-14%)", indicators: { economy: -14, social: -10, environment: 10, stability: -24 }, matrix: { thermal: -5.0 }, regions: { south: 'warning' } },
    optionB: { title: "Queimar Carvão Tóxico", sub: "-Ambiente (-26%), -Sociedade (-16%)", indicators: { economy: 4, social: -16, environment: -26, stability: 10 }, matrix: { thermal: 4.0 }, regions: { south: 'warning' } }
  },
  {
    id: 110, category: "<MONOPÓLIO & CHANTAGEM>", icon: "fa-handcuffs",
    title: "Chantagem do Monopólio de Cabos de Alta Tensão",
    desc: "O único fabricante nacional de condutores de alta tensão paralisou as entregas exigindo isenção fiscal perpétua do Governo.",
    optionA: { title: "Conceder Isenção Fiscal Perpétua", sub: "-Economia (-20%), -Sociedade (-14%)", indicators: { economy: -20, social: -14, environment: 0, stability: 10 }, matrix: {}, regions: { southeast: 'active' } },
    optionB: { title: "Importar Condutores a Custo Triplo", sub: "-Economia (-24%), -Estabilidade (-15%)", indicators: { economy: -24, social: -6, environment: 0, stability: -15 }, matrix: {}, regions: { southeast: 'warning' } }
  }
];

// COMBINA OS DOIS CONJUNTOS NO BANCO COMPLETO
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

// ALGORITMO FISHER-YATES: EMBARALHAMENTO 100% ALEATÓRIO E UNBIASED
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
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
  const choiceASub = document.getElementById('choice-a-sub');
  const choiceBTitle = document.getElementById('choice-b-title');
  const choiceBSub = document.getElementById('choice-b-sub');

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

    // EMBARALHAMENTO 100% ALEATÓRIO (Fisher-Yates) DOS 110 DILEMAS
    GameState.questionsDeck = shuffleArray(ALL_DECK_QUESTIONS);

    if (gameOverModal) gameOverModal.classList.add('hidden');
    loadNextQuestion();
    updateHUD();
  }

  function loadNextQuestion() {
    if (GameState.isGameOver) return;

    const isCritical = Object.values(GameState.indicators).some(val => val < 20);

    if (isCritical) {
      // Injeta dilemas de crise / perde-perde prioritários no modo emergência
      const perdePerdeDeck = ALL_DECK_QUESTIONS.filter(q => q.id >= 71);
      const crisisIndex = Math.floor(Math.random() * perdePerdeDeck.length);
      GameState.currentQuestion = perdePerdeDeck[crisisIndex];
    } else {
      if (GameState.questionsDeck.length === 0) {
        GameState.questionsDeck = shuffleArray(ALL_DECK_QUESTIONS);
      }
      GameState.currentQuestion = GameState.questionsDeck.pop();
    }

    renderCurrentQuestion();
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
    if (choiceASub) choiceASub.textContent = q.optionA.sub;

    if (choiceBTitle) choiceBTitle.textContent = q.optionB.title;
    if (choiceBSub) choiceBSub.textContent = q.optionB.sub;

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
      // Atualiza Indicadores Globais
      Object.keys(option.indicators).forEach(ind => {
        GameState.indicators[ind] = Math.max(0, Math.min(100, GameState.indicators[ind] + option.indicators[ind]));
      });

      // Atualiza Matriz Energética e Normaliza
      if (option.matrix) {
        Object.keys(option.matrix).forEach(m => {
          if (GameState.matrix[m] !== undefined) {
            GameState.matrix[m] = Math.max(0, GameState.matrix[m] + option.matrix[m]);
          }
        });
        normalizeMatrix();
      }

      // Atualiza Regiões
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
    if (hudDashboardScreen && !hudDashboardScreen.classList.contains('hidden') && tutorialOverlay && tutorialOverlay.classList.contains('hidden') && !GameState.isGameOver) {
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
