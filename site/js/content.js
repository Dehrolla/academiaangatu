/* ==========================================================================
   Conteúdo editável da landing page.
   Professores e conteúdo programático em preenchimento.
   ========================================================================== */

window.ACADEMIA = {
  // ---- Captura de leads --------------------------------------------------
  // URL /exec do Apps Script (integrations/google-sheets/README.md).
  // Vale para todos os formulários de pré-venda da página.
  leadEndpoint: "https://script.google.com/macros/s/AKfycbyVL1npb0pSv4dugXZSVKmerBUCjocHujsk27XAdxqzkXn1kWGJNtC2NIarx0uM7lPSVg/exec",

  // ---- Professores (grid para 9) ----------------------------------------
  // Fonte: conteudo/professores/Professores-Academia-Angatu.xlsx (fora do repositório).
  // registry: CRM, OAB ou CRF. modules: módulos que a pessoa leciona (não aparece no card; só referência).
  // photo: recorte gerado por tools/crop_faces.swift; vazio mostra o avatar padrão.
  // published: só true depois da autorização de uso de imagem. Para ver todos,
  // inclusive os não publicados, abra a página com ?previa na URL.
  teachers: [
    {
      name: "Dra. Camila Sampaio",
      registry: "CRM-MG 50.070",
      area: "Geriatria",
      modules: [5],
      photo: "img/professores/camila-sampaio.jpg",
      instagram: "dra.camilasamptos",
      published: true,
      bio: "Médica de família e comunidade da prefeitura de Nova Lima desde 2011, Geriatria Feluma 2013, Endocrinologia IPEMED 2017, Cannabis Medicinal SBEC 2024."
    },
    {
      name: "Dr. Felipe Mourão",
      registry: "CRM-SP 221.657",
      area: "Psiquiatria",
      modules: [6],
      photo: "img/professores/felipe-mourao.jpg?v=2",
      instagram: "doutordiamba",
      published: true,
      bio: "Pós-graduado em Psiquiatria pela Santa Casa de São Paulo e pós-graduando em Psicoterapia Assistida por Psicodélicos pelo Instituto Alma Viva. Prescreve cannabis medicinal desde 2021 e acompanha crianças, adolescentes e adultos com TEA, TDAH, epilepsia, ansiedade e insônia."
    },
    {
      name: "Mateus Candini",
      registry: "OAB-MG 167.310",
      area: "Advogado",
      modules: [1],
      photo: "img/professores/mateus-candini.jpg",
      instagram: "mateus_candini",
      published: true,
      bio: "Advogado, graduado em Direito pela PUC Minas e pós-graduado em Ciências Penais. Atualmente, é presidente da ANGATU — Associação de Cannabis Medicinal, sediada em Belo Horizonte, onde atua na promoção do acesso à cannabis para fins terapêuticos e no desenvolvimento institucional da entidade."
    },
    {
      name: "Lucas Candini",
      registry: "OAB-MG 208.026",
      area: "Advogado",
      modules: [1],
      photo: "img/professores/lucas-candini.jpg",
      instagram: "lucascandini",
      published: true,
      bio: "Advogado, graduado em Direito e pós-graduado em Direito Processual Civil. Atualmente, é vice-presidente da ANGATU — Associação de Cannabis Medicinal, sediada em Belo Horizonte, onde atua na promoção do acesso à cannabis para fins terapêuticos, nas relações institucionais e nos aspectos jurídicos e regulatórios relacionados à cannabis medicinal."
    },
    {
      name: "Dra. Sâmara Bastos",
      registry: "CRM-MG 82.433",
      area: "Psiquiatria",
      modules: [4],
      photo: "img/professores/samara-bastos.jpg",
      instagram: "drasamarabastos",
      published: true,
      bio: "Médica de família e comunidade, especializada em psiquiatria pelo Hospital Israelita Albert Einstein e pós graduada em Cannabis Medicinal."
    },
    {
      name: "Dr. Antônio de Oliveira",
      registry: "CRF-MG 00000",
      area: "Farmacêutico",
      modules: [2],
      photo: "img/professores/antonio-oliveira.jpg",
      instagram: "",
      published: true,
      bio: "Professor Associado do Departamento de Farmacologia da UFMG. Farmacêutico pela UFMG, possui mestrado em Farmacologia, doutorado em Neuroquímica pela Universidade de Freiburg (Alemanha) e pós-doutorado em Neurociências pela Universidade da Flórida (EUA) e pela UFMG."
    },
    {
      name: "Dr. Bruno Amato",
      registry: "Registro a confirmar",
      area: "",
      modules: [3],
      photo: "",
      instagram: "",
      published: true,
      bio: "Médico de família e comunidade com pós-graduação em psiquiatria. Docente do curso de Medicina da UFSJ desde 2015, coordenou a implantação da Residência em MFC (2016–2017) e o Programa Mais Médicos pela UFSJ (2019–2024). Em 2024 e 2025, foi professor da pós-graduação em Saúde Mental do Hospital Israelita Albert Einstein."
    },
    {
      name: "Fernando Ávila",
      registry: "OAB-MG 200.927",
      area: "Advogado",
      modules: [1],
      photo: "img/professores/fernando-avila.jpg",
      instagram: "fernando_c_avila",
      published: true,
      bio: "Advogado, mestre em Direito e presidente da Comissão de Cannabis Medicinal da OAB/MG. Consultor jurídico da Associação Angatu, atua na defesa do acesso à cannabis medicinal, na regulamentação do setor e na segurança jurídica das associações e dos pacientes."
    },
    {
      name: "Dr. Alexandre Versiani",
      registry: "Registro a confirmar",
      area: "",
      modules: [7],
      photo: "img/professores/alexandre-versiani.jpg",
      instagram: "",
      published: true,
      bio: "Alexandre Silva Versiani é médico, graduado pela Universidade Estadual de Montes Claros (UNIMONTES). Possui certificação internacional em Cannabis Medicinal pela Wecann Academy e é membro da Associação Médica Brasileira de Endocanabinologia. Atualmente coordena o Núcleo de Cannabis Medicinal e Psicologia da Dor do Hospital Aroldo Tourinho."
    }
  ],

  // ---- Conteúdo programático ---------------------------------------------
  // Só os nomes de módulos e aulas. Duração e quantidade de aulas ficam ocultas
  // até estarem definidas. Numa aula no formato "Título: descrição", o título
  // aparece em destaque e a descrição logo abaixo.
  modules: [
    {
      title: "Introdução e os Aspectos Jurídicos da Cannabis",
      lessons: [
        "Introdução à Academia Angatu",
        "Cannabis, movimentos sociais e Associações",
        "Aspectos Jurídicos"
      ]
    },
    {
      title: "Farmacologia dos canabinoides",
      lessons: [
        "Introdução e tipos de canabinoides",
        "Sistema endocanabinoide e mecanismos de ação",
        "Farmacocinética e vias de administração",
        "Interações medicamentosas",
        "Desenvolvimento e avaliação do potencial terapêutico (estudos in vitro e in vivo)"
      ]
    },
    {
      title: "Introdução à prescrição de Cannabis Medicinal",
      lessons: [
        "Nome da aula",
        "Nome da aula",
        "Nome da aula"
      ]
    },
    {
      title: "Saúde Mental na Prática: ansiedade, insônia, TUC e psicofármacos",
      lessons: [
        "As Três Queixas Mais Frequentes na Prática: Ansiedade, Insônia e Transtorno por Uso de Cannabis (TUC)",
        "Interações Medicamentosas: Como manejar a associação dos extratos de cannabis com psicofármacos convencionais (antidepressivos, antipsicóticos e estabilizadores de humor), entendendo sinergias e ajustes de dose",
        "Segurança e Limites Técnicos: Contraindicações formais e relativas do uso de canabinoides dentro da psiquiatria"
      ]
    },
    {
      title: "Cannabis na Geriatria e no Envelhecimento Saudável",
      lessons: [
        "Cannabis Medicinal e Doenças Neurodegenerativas: Alzheimer e Parkinson",
        "Cannabis Medicinal e Desprescrição na Geriatria",
        "Cannabis Medicinal e Qualidade de Vida após os 50 anos"
      ]
    },
    {
      title: "Cannabis na pediatria: autismo, epilepsias refratárias, TDAH e TOD",
      lessons: [
        "Cannabis medicinal no autismo infantil: evidência e prática segura",
        "Canabidiol nas epilepsias refratárias da infância",
        "TDAH e TOD: quando a cannabis entra, quando não entra e como desprescrever"
      ]
    },
    {
      title: "Cannabis na dor",
      lessons: [
        "Dor crônica e o Sistema Endocanabinoide: do desafio clínico à base fisiológica",
        "Evidências e Seleção de Pacientes: o que a ciência sustenta sobre a cannabis na dor",
        "Da Teoria à Prática: estratégia terapêutica com cannabis medicinal no paciente com dor crônica"
      ]
    }
  ]
};
