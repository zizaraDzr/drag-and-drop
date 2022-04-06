const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
];

const listItems = []

let dragStartIndex;

createList()

function createList() {
    [...richestPeople]
    .map(person => ({value: person, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(person => person.value)
    .forEach((person,index) => {
       const listItem = document.createElement('li')

      //  listItem.classList.add('over')
       listItem.setAttribute('data-index', index)
       listItem.innerHTML = `
       <span class="number">${index + 1}</span>
       <div class="draggable" draggable="true">
            <p class="person-name">${person}</p>
            <i class="fas fa-grip-lines"></i>
        </div>
       `
       listItems.push(listItem)
       draggable_list.appendChild(listItem)

   })

   addEventListeners()
}
// Запускается, когда пользователь начал перетаскивать элемент
function dragStart() {
  // console.log('Event: ', this, 'dragstart');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}
// перетаскиваемый элемент попадает в допустимую цель сброс
function dragEnter() {
  // console.log('Event: ', this, 'dragenter');
  this.classList.add('over');
}
// перетаскиваемый элемент покидает допустимую цель сброса
function dragLeave() {
  // console.log('Event: ', this,  'dragleave');
  this.classList.remove('over');
}
// элемент перетаскивается над допустимой целью сброса каждые несколько сотен миллисекунд 
function dragOver(e) {
  // console.log('Event: ', this, 'dragover');
  // preventDefault нужен для активации drop события 
  e.preventDefault();
}

function dragDrop() {
  // console.log('Event: ', this, 'drop');
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}
function swapItems(fromIndex, toIndex) {
  // console.log(listItems[fromIndex])
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo)
  listItems[toIndex].appendChild(itemOne)
}
function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}
check.addEventListener('click', checkOrder);