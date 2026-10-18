/* ==========================================================================
   Conteúdo editável da landing page.
   Tudo aqui é PLACEHOLDER: troque pelos dados reais antes de publicar.
   ========================================================================== */

window.ACADEMIA = {
  // ---- Captura de leads --------------------------------------------------
  // URL /exec do Apps Script (integrations/google-sheets/README.md).
  // Vale para todos os formulários de pré-venda da página.
  leadEndpoint: "https://script.google.com/macros/s/AKfycbyVL1npb0pSv4dugXZSVKmerBUCjocHujsk27XAdxqzkXn1kWGJNtC2NIarx0uM7lPSVg/exec",

  // ---- Professores (grid para 9) ----------------------------------------
  // photo: caminho da imagem (ex.: "img/professores/nome.jpg"); vazio mostra o avatar padrão.
  teachers: [
    { name: "Nome do(a) Professor(a)", crm: "CRM-MG 00000", photo: "", bio: "Especialidade [placeholder]. Breve bio de um parágrafo com formação, tempo de prática clínica com cannabis medicinal e experiência como docente em cursos, congressos ou residência." },
    { name: "Nome do(a) Professor(a)", crm: "CRM-MG 00000", photo: "", bio: "Especialidade [placeholder]. Breve bio de um parágrafo com formação, tempo de prática clínica com cannabis medicinal e experiência como docente em cursos, congressos ou residência." },
    { name: "Nome do(a) Professor(a)", crm: "CRM-MG 00000", photo: "", bio: "Especialidade [placeholder]. Breve bio de um parágrafo com formação, tempo de prática clínica com cannabis medicinal e experiência como docente em cursos, congressos ou residência." },
    { name: "Nome do(a) Professor(a)", crm: "CRM-SP 00000", photo: "", bio: "Especialidade [placeholder]. Breve bio de um parágrafo com formação, tempo de prática clínica com cannabis medicinal e experiência como docente em cursos, congressos ou residência." },
    { name: "Nome do(a) Professor(a)", crm: "CRM-SP 00000", photo: "", bio: "Especialidade [placeholder]. Breve bio de um parágrafo com formação, tempo de prática clínica com cannabis medicinal e experiência como docente em cursos, congressos ou residência." },
    { name: "Nome do(a) Professor(a)", crm: "CRM-RJ 00000", photo: "", bio: "Especialidade [placeholder]. Breve bio de um parágrafo com formação, tempo de prática clínica com cannabis medicinal e experiência como docente em cursos, congressos ou residência." },
    { name: "Nome do(a) Professor(a)", crm: "CRM-MG 00000", photo: "", bio: "Especialidade [placeholder]. Breve bio de um parágrafo com formação, tempo de prática clínica com cannabis medicinal e experiência como docente em cursos, congressos ou residência." },
    { name: "Nome do(a) Professor(a)", crm: "CRM-MG 00000", photo: "", bio: "Especialidade [placeholder]. Breve bio de um parágrafo com formação, tempo de prática clínica com cannabis medicinal e experiência como docente em cursos, congressos ou residência." },
    { name: "Nome do(a) Professor(a)", crm: "CRM-MG 00000", photo: "", bio: "Especialidade [placeholder]. Breve bio de um parágrafo com formação, tempo de prática clínica com cannabis medicinal e experiência como docente em cursos, congressos ou residência." }
  ],

  // ---- Conteúdo programático (duração em minutos, total ≈ 6h) -----------
  modules: [
    {
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
      title: "As três queixas mais frequentes na prática: Ansiedade, Insônia e Transtorno por Uso de Cannabis",
      lessons: [
        ["Ansiedade: evidências e condutas", 15],
        ["Insônia: CBD, THC e CBN na prática clínica", 15],
        ["Transtorno por Uso de Cannabis: rastreio e manejo", 15],
        ["Casos clínicos comentados", 15]
      ]
    },
    {
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
