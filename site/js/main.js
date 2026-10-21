/* Academia Angatu — renderização do conteúdo e formulário de pré-venda */
(function () {
  const data = window.ACADEMIA;

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmtMin = (m) => (m >= 60 ? `${Math.floor(m / 60)}h${String(m % 60).padStart(2, "0")}` : `${m} min`);

  // ---- Professores ------------------------------------------------------
  const avatar = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>';
  const igIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>';
  const teachersEl = document.getElementById("teachers-grid");
  if (teachersEl) {
    // ?previa na URL mostra também quem ainda não autorizou o uso de imagem.
    const preview = new URLSearchParams(location.search).has("previa");
    teachersEl.innerHTML = data.teachers.filter((t) => t.published || preview).map((t) => `
      <article class="teacher${t.published ? "" : " teacher--draft"}">
        <div class="teacher__photo">${t.photo ? `<img src="${esc(t.photo)}" alt="${esc(t.name)}" loading="lazy" width="800" height="680">` : avatar}
          ${t.published ? "" : '<span class="teacher__draft">Prévia: não publicado</span>'}
        </div>
        <div class="teacher__body">
          <div class="teacher__head">
            <h3 class="teacher__name">${esc(t.name)}</h3>
            ${t.area ? `<span class="teacher__area">${esc(t.area)}</span>` : ""}
          </div>
          <span class="crm">${esc(t.registry)}</span>
          <p class="teacher__bio">${esc(t.bio)}</p>
          ${t.instagram ? `<a class="teacher__ig" href="https://instagram.com/${encodeURIComponent(t.instagram)}" target="_blank" rel="noopener">${igIcon}@${esc(t.instagram)}</a>` : ""}
        </div>
      </article>`).join("");
  }

  // ---- Módulos ----------------------------------------------------------
  const modulesEl = document.getElementById("modules");
  if (modulesEl) {
    let total = 0;
    modulesEl.innerHTML = data.modules.map((m, i) => {
      const minutes = m.lessons.reduce((sum, l) => sum + l[1], 0);
      total += minutes;
      return `
      <details class="module"${i === 0 ? " open" : ""}>
        <summary>
          <span class="module__num">${String(i + 1).padStart(2, "0")}</span>
          <span class="module__title"><b>${esc(m.title)}</b><small>${m.lessons.length} aulas · ${fmtMin(minutes)}</small></span>
          <span class="module__toggle" aria-hidden="true"></span>
        </summary>
        <ol class="lessons">
          ${m.lessons.map((l, j) => `<li><span>${i + 1}.${j + 1}</span><span>${esc(l[0])}</span><span>${l[1]} min</span></li>`).join("")}
        </ol>
      </details>`;
    }).join("");
    document.querySelectorAll("[data-total-hours]").forEach((el) => { el.textContent = `≈ ${Math.round(total / 60)}h`; });
    document.querySelectorAll("[data-total-lessons]").forEach((el) => {
      el.textContent = data.modules.reduce((s, m) => s + m.lessons.length, 0);
    });
  }

  // ---- Formulários de pré-venda ---------------------------------------
  // Os leads vão para a planilha do Google via Apps Script
  // (integrations/google-sheets). A URL /exec fica em leadEndpoint (js/content.js).
  // Cada <form class="lead-form"> tem data-origem para saber de qual card veio o lead.
  const rules = {
    nome: (v) => (v.trim().split(/\s+/).length >= 2 ? "" : "Informe nome e sobrenome."),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Informe um e-mail válido."),
    whatsapp: (v) => (v.replace(/\D/g, "").length >= 10 ? "" : "Informe o WhatsApp com DDD.")
  };

  document.querySelectorAll("form.lead-form").forEach((form) => {
    const phone = form.elements.whatsapp;
    phone.addEventListener("input", () => {
      const d = phone.value.replace(/\D/g, "").slice(0, 11);
      let out = d;
      if (d.length > 2) out = `(${d.slice(0, 2)}) ${d.slice(2)}`;
      if (d.length > 7) out = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
      phone.value = out;
    });

    const btn = form.querySelector("button[type=submit]");
    const btnLabel = btn.textContent;
    const success = form.parentElement.querySelector(".lead-success");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let firstInvalid = null;
      Object.keys(rules).forEach((name) => {
        const input = form.elements[name];
        const msg = rules[name](input.value);
        input.setAttribute("aria-invalid", msg ? "true" : "false");
        form.querySelector(`[data-error-for="${name}"]`).textContent = msg;
        if (msg && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      btn.disabled = true; btn.textContent = "Enviando…";
      form.querySelector("[data-error-for=form]").textContent = "";
      const payload = {
        nome: form.elements.nome.value.trim(),
        email: form.elements.email.value.trim(),
        whatsapp: form.elements.whatsapp.value.replace(/\D/g, ""),
        origem: form.dataset.origem || "pre-venda-497",
        pagina: location.href.split("#")[0],
        website: form.elements.website.value // honeypot anti-spam
      };

      try {
        const endpoint = data.leadEndpoint || form.dataset.endpoint;
        if (!endpoint) throw new Error("leadEndpoint não configurado em js/content.js");
        // text/plain evita a requisição de preflight (CORS), que o Apps Script não responde.
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload)
        });
        const result = await res.json();
        if (!res.ok || !result.ok) throw new Error(result.error || res.status);
        form.hidden = true;
        if (success) success.hidden = false;
      } catch (err) {
        console.error("Falha ao enviar lead:", err);
        btn.disabled = false; btn.textContent = btnLabel;
        form.querySelector("[data-error-for=form]").textContent = "Não foi possível enviar agora. Tente novamente em instantes.";
      }
    });
  });
})();
