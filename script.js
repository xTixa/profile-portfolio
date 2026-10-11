const themeBtn = document.querySelector(".theme-toggle");
const menuToggle = document.getElementById("menuToggle");
const navPanel = document.getElementById("navLinks");
const projectGrid = document.getElementById("projectGrid");
const resultsCount = document.getElementById("resultsCount");
const searchInput = document.getElementById("search");
const filterButtons = [...document.querySelectorAll(".filter-btn")];
const noteButtons = [...document.querySelectorAll(".note")];
const workspaceStatus = document.getElementById("workspaceStatus");

const noteCopy = {
  frontend:
    "A afinar detalhes visuais e interações para criar experiências mais simples de usar.",
  backend:
    "A ligar interfaces a dados, validações e regras para que os projetos deixem de ser só ecrã.",
  mobile:
    "A explorar Flutter com foco em layouts limpos, estados claros e navegação previsivel.",
};

const categoryLabels = {
  frontend: "Frontend",
  backend: "Backend",
  fullstack: "Fullstack",
  mobile: "Mobile",
};

const projects = [
  {
    icon: "bi-check2-square",
    title: "To-Do List App",
    desc: "Aplicação simples para organizar tarefas, com foco em interacao direta e estado no browser.",
    tags: ["HTML", "CSS", "JavaScript"],
    links: [
      {
        href: "https://github.com/xTixa/To-Do-List",
        label: "Código",
        icon: "bi-github",
      },
      {
        href: "https://xtixa.github.io/To-Do-List/",
        label: "Demo",
        icon: "bi-box-arrow-up-right",
      },
    ],
    cat: "frontend",
  },
  {
    icon: "bi-stopwatch",
    title: "Pomodoro Timer",
    desc: "Temporizador para estudo e pausas, criado para praticar componentes visuais e controlo de tempo.",
    tags: ["HTML", "CSS", "JavaScript"],
    links: [
      {
        href: "https://github.com/xTixa/pomodoro",
        label: "Código",
        icon: "bi-github",
      },
      {
        href: "https://xtixa.github.io/pomodoro/",
        label: "Demo",
        icon: "bi-box-arrow-up-right",
      },
    ],
    cat: "frontend",
    thumb: "img/pomodoro.png",
  },
  {
    icon: "bi-tv",
    title: "Clone Netflix",
    desc: "Recriação de uma interface de streaming com React, Vite e consumo de dados de filmes.",
    tags: ["React", "Vite", "Tailwind", "JavaScript"],
    links: [
      {
        href: "https://github.com/xTixa/clone-netflix",
        label: "Código",
        icon: "bi-github",
      },
      {
        href: "https://xtixa.github.io/clone-netflix/",
        label: "Demo",
        icon: "bi-box-arrow-up-right",
      },
    ],
    cat: "frontend",
    thumb: "img/clonenetflix.png",
  },
  {
    icon: "bi-wallet2",
    title: "WalletWise",
    desc: "Plataforma de gestão financeira pessoal com dashboards, orçamentos, objetivos de poupança e despesas recorrentes.",
    tags: [
      "React",
      "Vite",
      "Tailwind",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
    ],
    links: [
      {
        href: "https://github.com/xTixa/wallet-wise",
        label: "Código",
        icon: "bi-github",
      },
      {
        href: "https://wallet-wise-topaz.vercel.app/",
        label: "Demo",
        icon: "bi-box-arrow-up-right",
      },
    ],
    cat: "fullstack",
    thumb: "img/wallet.png",
    status: "Em Desenvolvimento",
  },
  {
    icon: "bi-mortarboard",
    title: "SoftSkills",
    desc: "Plataforma de cursos online com frontend em Angular e API REST em Node.js e Express, integrada com MongoDB Atlas.",
    tags: ["Angular", "Angular Material", "Node.js", "Express", "MongoDB Atlas"],
    links: [],
    cat: "fullstack",
    status: "Em Desenvolvimento",
  },
  {
    icon: "bi-bicycle",
    title: "Food Delivery",
    desc: "Plataforma de entrega de comida com aplicações web e mobile, desenvolvida com React, Node.js e React Native.",
    tags: ["React", "React Native", "Node.js", "Express", "MongoDB"],
    links: [],
    cat: "mobile",
    status: "Em Desenvolvimento",
  },
];

let state = {
  filter: "all",
  query: "",
};

function setThemeIcon(theme) {
  themeBtn.innerHTML =
    theme === "dark"
      ? '<i class="bi bi-brightness-high"></i>'
      : '<i class="bi bi-moon-stars"></i>';
}

function renderProjects() {
  const query = state.query.trim().toLowerCase();
  const filtered = projects.filter((project) => {
    const categoryMatch =
      state.filter === "all" || project.cat === state.filter;
    const searchable = [project.title, project.desc, ...project.tags]
      .join(" ")
      .toLowerCase();
    return categoryMatch && (!query || searchable.includes(query));
  });

  projectGrid.innerHTML = filtered.length
    ? filtered.map(createProjectCard).join("")
    : '<div class="empty-state">Não encontrei projetos com esses filtros.</div>';

  resultsCount.textContent = `${filtered.length} de ${projects.length} projetos visíveis`;
}

function createProjectCard(project) {
  const tags = project.tags
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join("");
  const links = project.links
    .map(
      (link) => `
        <a href="${link.href}" target="_blank" rel="noreferrer">
          <i class="bi ${link.icon}"></i>
          ${link.label}
        </a>
      `,
    )
    .join("");
  const media = project.thumb
    ? `<img src="${project.thumb}" alt="Captura do projeto ${project.title}" loading="lazy" />`
    : `<div class="project-placeholder"><i class="bi ${project.icon}"></i></div>`;
  const statusBadge = project.status
    ? `<span class="project-status">${project.status}</span>`
    : "";

  return `
    <article class="project-card reveal">
      <div class="project-media">
        ${media}
        ${statusBadge}
        <span class="project-kind">${categoryLabels[project.cat] || project.cat}</span>
      </div>
      <div class="project-body">
        <h3>${project.title}</h3>
        <p>${project.desc}</p>
        <div class="tags">${tags}</div>
        <div class="project-actions">${links}</div>
      </div>
    </article>
  `;
}

themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  setThemeIcon(next);
});

menuToggle.addEventListener("click", () => {
  const isOpen = navPanel.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.innerHTML = isOpen
    ? '<i class="bi bi-x-lg"></i>'
    : '<i class="bi bi-list"></i>';
});

navPanel.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navPanel.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="bi bi-list"></i>';
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.filter = button.dataset.filter;
    renderProjects();
    observeReveals();
  });
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderProjects();
  observeReveals();
});

noteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    noteButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    workspaceStatus.textContent = noteCopy[button.dataset.note];
  });
});

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const current = `#${entry.target.id}`;
      navPanel
        .querySelectorAll("a")
        .forEach((link) =>
          link.classList.toggle(
            "active",
            link.getAttribute("href") === current,
          ),
        );
    });
  },
  { threshold: 0.48 },
);

document.querySelectorAll(".section[id]").forEach((section) => {
  navObserver.observe(section);
});

let revealObserver;

function observeReveals() {
  if (revealObserver) {
    revealObserver.disconnect();
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 },
  );

  document.querySelectorAll(".reveal").forEach((item) => {
    revealObserver.observe(item);
  });
}

setThemeIcon(document.documentElement.getAttribute("data-theme"));
renderProjects();
observeReveals();
