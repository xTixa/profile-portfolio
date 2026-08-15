// ======= Tema =======
const themeBtn = document.querySelector(".theme-toggle");
const saved = localStorage.getItem("theme");
const defaultTheme = saved || "dark";
document.documentElement.setAttribute("data-theme", defaultTheme);
updateThemeIcon(defaultTheme);
themeBtn.addEventListener("click", () => {
  const cur = document.documentElement.getAttribute("data-theme");
  const next = cur === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeIcon(next);
});
function updateThemeIcon(theme) {
  themeBtn.innerHTML =
    theme === "light"
      ? '<i class="bi bi-moon"></i>'
      : '<i class="bi bi-sun"></i>';
}

// ======= Menu mobile =======
const menuToggle = document.getElementById("menuToggle");
const navLinksEl = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinksEl.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.innerHTML = isOpen
    ? '<i class="bi bi-x-lg"></i>'
    : '<i class="bi bi-list"></i>';
});
navLinksEl.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    navLinksEl.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="bi bi-list"></i>';
  });
});

// ======= Projetos =======
const CAT_LABELS = {
  frontend: "Frontend",
  backend: "Backend",
  fullstack: "Fullstack",
  mobile: "Mobile",
};

// Para adicionar uma captura de ecrã a um projeto, acrescenta thumb: 'caminho/imagem.png'
// (ex: 'assets/todo-list.png'). Sem thumb, mostra-se um placeholder com o ícone.
const projects = [
  {
    icon: "bi-check2-square",
    title: "To-Do List App",
    desc: "Organizar Tarefas",
    tags: ["HTML", "CSS", "JavaScript"],
    links: [
      {
        href: "https://github.com/xTixa/To-Do-List",
        label: "Code",
        icon: "bi-github",
      },
      {
        href: "https://xtixa.github.io/To-Do-List/",
        label: "Demo",
        icon: "bi-eye",
      },
    ],
    cat: "frontend",
  },
  {
    icon: "bi-alarm",
    title: "Pomodoro Timer App",
    desc: "Gestao do tempo de trabalho/estudo e pausas",
    tags: ["HTML", "CSS", "JavaScript"],
    links: [
      {
        href: "https://github.com/xTixa/pomodoro",
        label: "Code",
        icon: "bi-github",
      },
      {
        href: "https://xtixa.github.io/pomodoro/",
        label: "Demo",
        icon: "bi-eye",
      },
    ],
    cat: "frontend",
  },
  {
    icon: "bi-tv",
    title: "Clone Netflix",
    desc: "Clone da interface da Netflix com API de filmes",
    tags: ["React", "Vite", "Tailwind", "JavaScript"],
    links: [
      {
        href: "https://github.com/xTixa/clone-netflix",
        label: "Code",
        icon: "bi-github",
      },
      {
        href: "https://xtixa.github.io/clone-netflix/",
        label: "Demo",
        icon: "bi-eye",
      },
    ],
    cat: "frontend",
  },
];

// ======= Render dinâmico =======
const grid = document.getElementById("project-grid");
const resultsCount = document.getElementById("resultsCount");
const filterBtns = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("search");
let state = { filter: "all", q: "" };

function render() {
  const q = state.q.trim().toLowerCase();
  const list = projects.filter((p) => {
    const byCat = state.filter === "all" || p.cat === state.filter;
    const hay = [p.title, p.desc, ...(p.tags || [])].join(" ").toLowerCase();
    const bySearch = !q || hay.includes(q);
    return byCat && bySearch;
  });
  grid.innerHTML = list.map(card).join("") || emptyState();
  resultsCount.textContent = `// a mostrar ${list.length} de ${projects.length} projeto${projects.length === 1 ? "" : "s"}`;
}

function card(p) {
  const tags = (p.tags || [])
    .map((t) => `<span class="tag">${t}</span>`)
    .join("");
  const links = (p.links || [])
    .map(
      (l) =>
        `<a class="link" href="${l.href}"><i class="bi ${l.icon}"></i> ${l.label}</a>`,
    )
    .join("");
  const catLabel = CAT_LABELS[p.cat] || p.cat;
  const thumbSrc = p.thumb;
  const thumb = thumbSrc
    ? `<img class="thumb" src="${thumbSrc}" alt="Captura de ecrã de ${p.title}" loading="lazy" />`
    : `<div class="thumb thumb-placeholder"><i class="bi ${p.icon}"></i></div>`;
  return `
    <article class="card" style="--cat-color: var(--cat-${p.cat})">
      ${thumb}
      <div class="card-top">
        <div class="icon"><i class="bi ${p.icon}"></i></div>
        <span class="cat-label">${catLabel}</span>
      </div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="tags">${tags}</div>
      <div class="actions">${links}</div>
    </article>
  `;
}

function emptyState() {
  return `
    <div class="card">
      <h3>Sem resultados</h3>
      <p>Tenta outro termo de pesquisa ou filtro.</p>
    </div>
  `;
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    state.filter = btn.dataset.filter;
    render();
  });
});

searchInput.addEventListener("input", (e) => {
  state.q = e.target.value;
  render();
});

const sections = [...document.querySelectorAll(".section")];
const navLinks = [...document.querySelectorAll(".nav-links a")];
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const id = "#" + e.target.id;
        navLinks.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === id),
        );
      }
    });
  },
  { threshold: 0.6 },
);
sections.forEach((s) => obs.observe(s));

// Inicia
render();
