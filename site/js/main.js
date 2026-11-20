/* Academia Angatu — renderização do conteúdo */
(function () {
  const data = window.ACADEMIA;

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

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
          ${t.registry ? `<span class="crm">${esc(t.registry)}</span>` : ""}
          <p class="teacher__bio">${esc(t.bio)}</p>
          ${t.instagram ? `<a class="teacher__ig" href="https://instagram.com/${encodeURIComponent(t.instagram)}" target="_blank" rel="noopener">${igIcon}@${esc(t.instagram)}</a>` : ""}
        </div>
      </article>`).join("");
  }

  // ---- Módulos ----------------------------------------------------------
  // Aula no formato "Título: descrição" vira título em destaque + descrição.
  const lesson = (text) => {
    const i = text.indexOf(": ");
    if (i < 0) return `<span class="lesson__title">${esc(text)}</span>`;
    return `<span class="lesson__title">${esc(text.slice(0, i))}</span><span class="lesson__desc">${esc(text.slice(i + 2))}</span>`;
  };
  const modulesEl = document.getElementById("modules");
  if (modulesEl) {
    modulesEl.innerHTML = data.modules.map((m, i) => `
      <details class="module"${i === 0 ? " open" : ""}>
        <summary>
          <span class="module__num">${String(i + 1).padStart(2, "0")}</span>
          <span class="module__title"><b>${esc(m.title)}</b></span>
          <span class="module__toggle" aria-hidden="true"></span>
        </summary>
        <ol class="lessons">
          ${m.lessons.map((l, j) => `<li><span>${i + 1}.${j + 1}</span><span class="lesson">${lesson(l)}</span></li>`).join("")}
        </ol>
      </details>`).join("");
    document.querySelectorAll("[data-total-modules]").forEach((el) => { el.textContent = data.modules.length; });
  }

})();
