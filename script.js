// ======= Tema =======
const themeBtn = document.querySelector('.theme-toggle');
const saved = localStorage.getItem('theme');
const defaultTheme = saved || 'dark';
document.documentElement.setAttribute('data-theme', defaultTheme);
updateThemeIcon(defaultTheme);

themeBtn.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeBtn.innerHTML = theme === 'light' ? '<i class="bi bi-moon"></i>' : '<i class="bi bi-sun"></i>';
}

// ======= Projetos =======
const projects = [
  {
    icon: 'bi-check2-square',
    title: 'To-Do List App',
    desc: 'Organizar Tarefas',
    tags: ['HTML', 'CSS', 'JavaScript'],
    links: [{ href: 'https://github.com/xTixa/To-Do-List', label: 'Code', icon: 'bi-github' }, { href: 'https://xtixa.github.io/To-Do-List/', label: 'Demo', icon: 'bi-eye' }],
    cat: 'frontend'
  },
  
];

// ======= Render dinâmico =======
const grid = document.getElementById('project-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search');

let state = { filter: 'all', q: '' };

function render() {
  const q = state.q.trim().toLowerCase();
  const list = projects.filter(p => {
    const byCat = state.filter === 'all' || p.cat === state.filter;
    const hay = [p.title, p.desc, ...(p.tags || [])].join(' ').toLowerCase();
    const bySearch = !q || hay.includes(q);
    return byCat && bySearch;
  });

  grid.innerHTML = list.map(card).join('') || emptyState();
}

function card(p) {
  const tags = (p.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
  const links = (p.links || [])
    .map(l => `<a class="link" href="${l.href}"><i class="bi ${l.icon}"></i> ${l.label}</a>`)
    .join('');
  return `
    <article class="card">
      <div class="icon"><i class="bi ${p.icon}"></i></div>
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
      <p>Tenta outro filtro ou termo de pesquisa.</p>
    </div>
  `;
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.filter = btn.dataset.filter;
    render();
  });
});

searchInput.addEventListener('input', (e) => {
  state.q = e.target.value;
  render();
});

const sections = [...document.querySelectorAll('.section')];
const navLinks = [...document.querySelectorAll('.nav-links a')];
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = '#' + e.target.id;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
    }
  });
}, { threshold: 0.6 });
sections.forEach(s => obs.observe(s));

// Inicia
render();
