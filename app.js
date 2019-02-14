
// Storage.
let DATA = [];
const STORAGE = window.localStorage;
const STORAGE_DATA_STRUCT = 'ironhackTodoAppData';
const removeBtnClassName = 'remove-button';
const removeBtnLabel = 'Remove';
const inputPlaceHolderAlertTxt = 'You must type something';

const loadData = () => {
  const loadedData = JSON.parse(STORAGE.getItem(STORAGE_DATA_STRUCT));
  if (loadedData.length) {
    DATA = loadedData;
  }
};

const saveData = () => {
  STORAGE.setItem(STORAGE_DATA_STRUCT, JSON.stringify(DATA));
}

const renderData = () => {
  const dataContainer = document.getElementById('toDoList');
  dataContainer.innerHTML = '';
  DATA.forEach((text, idx) => {
    const newElem = createElement(idx, text);
    dataContainer.appendChild(newElem);
  });
};

const createElement = (id, itemText) => {
  const li = document.createElement('li');
  li.setAttribute('id', id);
  li.innerText = itemText;
  const removeButton = document.createElement('button');
  removeButton.setAttribute('class', removeBtnClassName);
  removeButton.innerText = removeBtnLabel;
  li.appendChild(removeButton);
  li.addEventListener('click', function(e) {
    const clickedIdx = parseInt(e.currentTarget.getAttribute('id'));
    console.log('clickedIdx', clickedIdx);
    DATA.splice(clickedIdx, 1);
    saveData();
    renderData();
  });
  return li;
};

const prependItem = item => {
  DATA.unshift(item);
};

// Add button.
document.getElementById('add').addEventListener('click', function() {
  const inputTextElem = document.getElementById('newTodoText');
  const inputTextValue = inputTextElem.value;
  inputTextElem.value = '';
  if (!inputTextValue.length) {
    alert(inputPlaceHolderTxt);
  } else {
    prependItem(inputTextValue);
    saveData();
    renderData();
  }
});

loadData();
renderData();

