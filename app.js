const views = [...document.querySelectorAll('.view')];
const navItems = [...document.querySelectorAll('.nav-item')];
const breadcrumb = document.getElementById('breadcrumb-current');
const names = {inicio:'Visão geral', aulas:'Minhas aulas', alunos:'Alunos', atividades:'Atividades', materiais:'Materiais musicais'};

function showView(name) {
  views.forEach(view => view.classList.toggle('active', view.id === `view-${name}`));
  navItems.forEach(item => item.classList.toggle('active', item.dataset.view === name));
  breadcrumb.textContent = names[name] || 'Visão geral';
  window.scrollTo({top: 0, behavior: 'smooth'});
}
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => showView(button.dataset.view)));

let toastTimer;
function toast(message) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

const lessonDialog = document.getElementById('lesson-dialog');
document.getElementById('new-lesson').addEventListener('click', () => lessonDialog.showModal());
document.getElementById('close-modal').addEventListener('click', () => lessonDialog.close());

function getSavedLessons() {
  try { return JSON.parse(localStorage.getItem('harmonette_demo_lessons') || '[]'); }
  catch { return []; }
}
function saveLesson(lesson) {
  const lessons = getSavedLessons();
  lessons.unshift(lesson);
  localStorage.setItem('harmonette_demo_lessons', JSON.stringify(lessons));
}
function renderSavedLessons() {
  const container = document.getElementById('lesson-cards');
  const saved = getSavedLessons();
  saved.forEach(lesson => {
    const card = document.createElement('article');
    card.className = 'lesson-card';
    const cover = document.createElement('div');
    cover.className = 'lesson-cover cover-blue';
    const label = document.createElement('span');
    label.textContent = lesson.topic.toUpperCase();
    const note = document.createElement('b');
    note.textContent = '♫';
    const body = document.createElement('div');
    body.className = 'lesson-card-body';
    const tag = document.createElement('span');
    tag.className = 'tag draft';
    tag.textContent = 'Rascunho local';
    const title = document.createElement('h3');
    title.textContent = lesson.title;
    const desc = document.createElement('p');
    desc.textContent = lesson.description || 'Aula criada para visualizar a organização do Harmonette.';
    const meta = document.createElement('div');
    meta.className = 'card-meta';
    meta.textContent = '▤ 0 atividades   ·   ♙ Aula de demonstração';
    const open = document.createElement('button');
    open.className = 'outline-button';
    open.textContent = 'Abrir aula →';
    open.addEventListener('click', () => toast(`Prévia da aula: ${lesson.title}`));
    cover.append(label, note);
    body.append(tag, title, desc, meta, open);
    card.append(cover, body);
    container.prepend(card);
  });
  if (saved.length) document.getElementById('lesson-count').textContent = `${saved.length + 3} aulas (incluindo demonstrações)`;
}
document.getElementById('lesson-form').addEventListener('submit', event => {
  event.preventDefault();
  const lesson = {
    id: (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()),
    title: document.getElementById('lesson-title').value.trim(),
    description: document.getElementById('lesson-description').value.trim(),
    topic: document.getElementById('lesson-topic').value,
    createdAt: new Date().toISOString()
  };
  if (!lesson.title) return;
  saveLesson(lesson);
  lessonDialog.close();
  event.target.reset();
  document.getElementById('lesson-cards').querySelectorAll('[data-saved="true"]').forEach(el => el.remove());
  const card = document.createElement('article');
  card.className = 'lesson-card';
  card.dataset.saved = 'true';
  const cover = document.createElement('div');
  cover.className = 'lesson-cover cover-blue';
  const coverLabel = document.createElement('span');
  coverLabel.textContent = lesson.topic.toUpperCase();
  const note = document.createElement('b');
  note.textContent = '♫';
  cover.append(coverLabel, note);
  const body = document.createElement('div');
  body.className = 'lesson-card-body';
  const tag = document.createElement('span');
  tag.className = 'tag draft';
  tag.textContent = 'Rascunho local';
  const title = document.createElement('h3');
  title.textContent = lesson.title;
  const desc = document.createElement('p');
  desc.textContent = lesson.description || 'Aula criada para visualizar a organização do Harmonette.';
  const meta = document.createElement('div');
  meta.className = 'card-meta';
  meta.textContent = '▤ 0 atividades   ·   ♙ Aula de demonstração';
  const open = document.createElement('button');
  open.className = 'outline-button';
  open.textContent = 'Abrir aula →';
  open.addEventListener('click', () => toast(`Prévia da aula: ${lesson.title}`));
  body.append(tag, title, desc, meta, open);
  card.append(cover, body);
  document.getElementById('lesson-cards').prepend(card);
  document.getElementById('lesson-count').textContent = `${getSavedLessons().length + 3} aulas (incluindo demonstrações)`;
  showView('aulas');
  toast('Aula salva neste navegador.');
});
document.getElementById('lesson-search').addEventListener('input', event => {
  const query = event.target.value.toLocaleLowerCase('pt-BR');
  document.querySelectorAll('#lesson-cards .lesson-card').forEach(card => {
    card.hidden = !card.textContent.toLocaleLowerCase('pt-BR').includes(query);
  });
});
document.getElementById('student-search').addEventListener('input', event => {
  const query = event.target.value.toLocaleLowerCase('pt-BR');
  document.querySelectorAll('.student-row').forEach(row => {
    row.hidden = !row.dataset.name.includes(query);
  });
});
document.querySelectorAll('.lesson-open').forEach(button => button.addEventListener('click', () => toast(`Aula de demonstração: ${button.dataset.title}`)));
document.getElementById('add-student').addEventListener('click', () => toast('Cadastro de alunos será implementado na próxima etapa.'));
document.getElementById('new-activity').addEventListener('click', () => toast('Criação de atividades será implementada na próxima etapa.'));
document.getElementById('add-material').addEventListener('click', () => toast('Cadastro de materiais será implementado na próxima etapa.'));
renderSavedLessons();
