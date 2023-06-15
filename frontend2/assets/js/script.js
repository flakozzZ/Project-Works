let expandBtn = document.getElementById('expandBtn');
let collapseBtn = document.getElementById('collabseBtn');




function expandAll() {
  let lists = document.getElementsByClassName('list');
  let collapseBtn = document.getElementById('collabseBtn');
  for (let i = 0; i < lists.length; i++) {
    lists[i].classList.remove('hidden');
  }
  collapseBtn.classList.remove('hidden');
}

function collapseAll() {
  let lists = document.getElementsByClassName('list');
  let collapseBtn = document.getElementById('collabseBtn');
  for (let i = 0; i < lists.length; i++) {
    lists[i].classList.add('hidden');
  }
  collapseBtn.classList.add('hidden');
}

// Скрываем списки по умолчанию и кнопку "Свернуть все"
collapseAll();

expandBtn.onclick = expandAll;
collapseBtn.onclick = collapseAll;