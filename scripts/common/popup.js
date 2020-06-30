import { setItem } from "./storage";

const popupElem = document.querySelector('.popup');
const popupContentElem = document.querySelector('.popup__content');
const popupTitle = document.querySelector('.popup__title');
const popupStartTime = document.querySelector('.popup__start-time');
const popupEndTime = document.querySelector('.popup__end-time');
const popupDescripion = document.querySelector('.popup__description');

// в попап нужно передавать координаты, в которых показать попап
export function openPopup(x, y, eventElem) {
  popupElem.classList.remove('hidden');
  popupContentElem.style.top = `${y}px`;
  popupContentElem.style.left = `${x}px`;

  const [title, time, description] = eventElem.children;
  const startTime = time.textContent.split(' - ')[0];
  const endTime = time.textContent.split(' - ')[1];
 
  popupTitle.value = title.textContent;
  popupStartTime.value = startTime;
  popupEndTime.value = endTime;
  popupDescripion.value = description.textContent;

}

export function closePopup() {
  popupElem.classList.add('hidden');
}

function onClickInsidePopup(event) {
  event.stopPropagation();
  // if(event.target.classList.contains('fas fa-save')){
  //   setItem('title', popupTitle.value);
  //   setItem('start', popupStartTime.value);
  //   setItem('end', popupEndTime.value);
  //   setItem('description', popupDescripion.value);
  // }
  // else if(event.target.classList.contains('fa-sign-out-alt')) {

  // }
  // if(event.target.classList.contains('fa-trash-alt'))
}

// popupContentElem.addEventListener('click', onClickInsidePopup);
popupElem.addEventListener('click', closePopup);