/* ==========================================================================
   Conteúdo editável da landing page.
   Professores em preenchimento; módulos e aulas ainda são placeholders.
   ========================================================================== */

window.ACADEMIA = {
  // ---- Captura de leads --------------------------------------------------
  // URL /exec do Apps Script (integrations/google-sheets/README.md).
  // Vale para todos os formulários de pré-venda da página.
  leadEndpoint: "https://script.google.com/macros/s/AKfycbyVL1npb0pSv4dugXZSVKmerBUCjocHujsk27XAdxqzkXn1kWGJNtC2NIarx0uM7lPSVg/exec",

  // ---- Professores (grid para 9) ----------------------------------------
  // Fonte: conteudo/professores/Professores-Academia-Angatu.xlsx (fora do repositório).
  // registry: CRM, OAB ou CRF. modules: números dos módulos que a pessoa leciona.
  // photo: recorte gerado por tools/crop_faces.swift; vazio mostra o avatar padrão.
  // published: só true depois da autorização de uso de imagem. Para ver todos,
  // inclusive os não publicados, abra a página com ?previa na URL.
  teachers: [
    {
      name: "Dra. Camila Sampaio",
      registry: "CRM-MG 50.070",
      area: "Geriatria",
      modules: [4],
      photo: "img/professores/camila-sampaio.jpg",
      instagram: "dra.camilasamptos",
      published: true,
      bio: "Médica de família e comunidade da prefeitura de Nova Lima desde 2011, Geriatria Feluma 2013, Endocrinologia IPEMED 2017, Cannabis Medicinal SBEC 2024."
    },
    {
      name: "Dr. Felipe Mourão",
      registry: "CRM-SP 221.657",
      area: "Psiquiatria",
      modules: [5],
      photo: "",
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
      registry: "OAB-MG 208.02",
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
      modules: [3],
      photo: "img/professores/samara-bastos.jpg",
      instagram: "drasamarabastos",
      published: true,
      bio: "Médica de família e comunidade, especializada em psiquiatria pelo Hospital Israelita Albert Einstein e pós graduada em Cannabis Medicinal."
    },
    {
      name: "Dr. Antônio de Oliveira",
      registry: "CRF-MG 00000",
      area: "Farmacêutico",
      modules: [1],
      photo: "img/professores/antonio-oliveira.jpg",
      instagram: "",
      published: false,
      bio: "Professor Associado do Departamento de Farmacologia da UFMG. Farmacêutico pela UFMG, possui mestrado em Farmacologia, doutorado em Neuroquímica pela Universidade de Freiburg (Alemanha) e pós-doutorado em Neurociências pela Universidade da Flórida (EUA) e pela UFMG."
    },
    {
      name: "Dr. Bruno Amato",
      registry: "Registro a confirmar",
      area: "",
      modules: [],
      photo: "",
      instagram: "",
      published: false,
      bio: "Bio a confirmar: formação, tempo de prática com cannabis medicinal e experiência como docente."
    },
    {
      name: "Fernando Ávila",
      registry: "OAB-MG 200.927",
      area: "Advogado",
      modules: [1],
      photo: "img/professores/fernando-avila.jpg",
      instagram: "fernando_c_avila",
      published: false,
      bio: "Advogado, mestre em Direito e presidente da Comissão de Cannabis Medicinal da OAB/MG. Consultor jurídico da Associação Angatu, atua na defesa do acesso à cannabis medicinal, na regulamentação do setor e na segurança jurídica das associações e dos pacientes."
    },
    {
      name: "Dr. Alexandre Versiani",
      registry: "Registro a confirmar",
      area: "",
      modules: [],
      photo: "",
      instagram: "",
      published: false,
      bio: "Bio a confirmar: formação, tempo de prática com cannabis medicinal e experiência como docente."
    }
  ],

  // ---- Conteúdo programático (duração em minutos, total ≈ 6h) -----------
  modules: [
    {
      short: "Jurídico e farmacologia",
      title: "Introdução, aspectos jurídicos e farmacologia da cannabis medicinal",
      lessons: [
        ["Boas-vindas e como aproveitar o curso", 5],
        ["Panorama da cannabis medicinal no Brasil e no mundo", 10],
        ["Aspectos jurídicos: regulamentação da Anvisa e responsabilidades do prescritor", 15],
        ["Fitocanabinoides, terpenos e efeito entourage", 12],
        ["Farmacocinética, farmacodinâmica e vias de administração", 13],
        ["Tipos de produtos: full spectrum, broad spectrum e isolados", 8]
      ]
    },
    {
      short: "Sistema endocanabinoide",
      title: "Sistema endocanabinoide e prescrição geral",
      lessons: [
        ["Receptores CB1 e CB2, endocanabinoides e enzimas", 12],
        ["Tônus endocanabinoide e deficiência endocanabinoide clínica", 8],
        ["Avaliação do paciente e anamnese canábica", 12],
        ["Escolha do produto e titulação de dose", 15],
        ["Receituário, documentação e caminhos de acesso do paciente", 10],
        ["Efeitos adversos e interações medicamentosas", 10]
      ]
    },
    {
      short: "Ansiedade, insônia e TUC",
      title: "As três queixas mais frequentes na prática: Ansiedade, Insônia e Transtorno por Uso de Cannabis",
      lessons: [
        ["Ansiedade: evidências e condutas", 15],
        ["Insônia: CBD, THC e CBN na prática clínica", 15],
        ["Transtorno por Uso de Cannabis: rastreio e manejo", 15],
        ["Casos clínicos comentados", 15]
      ]
    },
    {
      short: "Terceira idade",
      title: "Cannabis para a terceira idade e doenças neurodegenerativas",
      lessons: [
        ["O paciente idoso: polifarmácia, fragilidade e segurança", 12],
        ["Doença de Alzheimer e sintomas comportamentais", 14],
        ["Doença de Parkinson", 12],
        ["Cuidados paliativos e qualidade de vida", 10],
        ["Casos clínicos comentados", 12]
      ]
    },
    {
      short: "Pediatria",
      title: "Neurodivergências na pediatria: Epilepsia, Autismo, TDAH e TOD",
      lessons: [
        ["Prescrição em pediatria: ética, consentimento e segurança", 10],
        ["Epilepsias refratárias e evidências com canabidiol", 14],
        ["Transtorno do Espectro Autista", 14],
        ["TDAH e Transtorno Opositor Desafiador", 12],
        ["Casos clínicos comentados", 10]
      ]
    },
    {
      short: "Cannabis na dor",
      title: "Cannabis na dor",
      lessons: [
        ["Fisiopatologia da dor e o sistema endocanabinoide", 12],
        ["Dor crônica, neuropática e fibromialgia", 15],
        ["Dor oncológica e associação com opioides", 12],
        ["Casos clínicos comentados", 12],
        ["Encerramento e próximos passos", 5]
      ]
    }
  ]
};
