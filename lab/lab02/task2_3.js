const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('taskList');
const errorBox = document.getElementById('error');
const count = document.getElementById('count');

function showError(msg) {
  errorBox.textContent = msg;
  errorBox.hidden = false;
  input.classList.add('invalid');
}
function clearError() {
  errorBox.hidden = true;
  input.classList.remove('invalid');
}
function updateCount() {
  const total = list.children.length;
  const done = list.querySelectorAll('li.done').length;
  count.textContent = total ? `${done} of ${total} completed` : 'No tasks yet.';
}

function addTask() {
  const text = input.value.trim();
  if (text === '') return showError('Task cannot be empty.');
  if (text.length < 3) return showError('Task must be at least 3 characters.');
  const duplicate = [...list.querySelectorAll('span')]
    .some(s => s.textContent.toLowerCase() === text.toLowerCase());
  if (duplicate) return showError('This task already exists.');

  clearError();
  const li = document.createElement('li');
  const cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.setAttribute('aria-label', 'Mark done');
  cb.addEventListener('change', () => { li.classList.toggle('done', cb.checked); updateCount(); });

  const span = document.createElement('span');
  span.textContent = text;           // textContent prevents HTML injection

  const del = document.createElement('button');
  del.textContent = 'Delete';
  del.className = 'del';
  del.addEventListener('click', () => { li.remove(); updateCount(); });

  li.append(cb, span, del);
  list.appendChild(li);              // runtime append
  input.value = '';
  input.focus();
  updateCount();
}

addBtn.addEventListener('click', addTask);
input.addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); });
input.addEventListener('input', clearError);
updateCount();
