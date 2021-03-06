import {
    getItem,
    setItem
} from '../common/storage.js';
import {
    renderEvents
} from './events.js';
import {
    getDateTime
} from '../common/time.utils.js';
import {
    closeModal
} from '../common/modal.js';
import { getMultipleFifteeen } from '../common/time.utils.js';

const eventFormElem = document.querySelector('.event-form');
const submitBtn = document.querySelector('.event-form__submit-btn');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');

function clearEventForm() {
    // ф-ция должна очистить поля формы от значений
    // const inputArr = eventFormElem.querySelectorAll('input');
    // console.log(inputArr);
    // inputArr.forEach(dom => dom.textContent = '');
    // console.log(inputArr)
    eventFormElem.reset();
}
const eventValidator = (startTime, endTime) => {
    const rangeTime = (new Date(endTime).getTime() - new Date(startTime).getTime()) / 3600000;
    const eventsArr = getItem('events');
  


    if(eventsArr.length > 0) {
        for(let key of eventsArr) {
            if((startTime > new Date(key.start) && startTime < new Date(key.end)) || (endTime > new Date(key.start) && startTime <= new Date(key.start))
            || new Date(key.start) > startTime && new Date(key.start) < endTime) {
                alert(`У вас уже есть событие ${key.title} в это время!`);
                return false;
            } else{
              return true;
            }
        }
    } else if(rangeTime > 6) {
        alert (`Событие не может длиться больше 6-ти часов!`);
        return false;
    } else if(new Date(startTime).getDate() !== new Date(endTime).getDate()) {
        alert(`Событие должно начинаться и заканчиваться в один день!`);
        return false;
    } else {
       return true;
    }
}
function onCloseEventForm() {
    // здесь нужно закрыть модальное окно и очистить форму
    const inputArr = eventFormElem.querySelectorAll('input');
    inputArr.forEach(dom => dom.textContent = '');
    closeModal();
    // clearEventForm();
}

function onCreateEvent(event) {
    // задача этой ф-ции только добавить новое событие в массив событий, что хранится в storage
    // создавать или менять DOM элементы здесь не нужно. Этим займутся другие ф-ции

    // при подтверждении формы нужно считать данные с формы
    // с формы вы получите поля date, startTime, endTime, title, description
    // на основе полей date, startTime, endTime нужно посчитать дату начала и окончания события
    // date, startTime, endTime - строки. Вам нужно с помощью getDateTime из утилит посчитать start и end объекта события
    // полученное событие добавляем в массив событий, что хранится в storage
    // закрываем форму
    // и запускаем перерисовку событий с помощью renderEvents
    event.preventDefault();
   
    const titleEvent = document.getElementsByName('title')[0].value;
    const dateEvent = document.getElementsByName('date')[0].value;
    const startTimeEvent = document.getElementsByName('startTime')[0].value;
    const endTimeEvent = document.getElementsByName('endTime')[0].value;
    const descriptionEvent = document.getElementsByName('description')[0].value;
// кратность события 15-ти
    const rotundStart = getMultipleFifteeen(startTimeEvent);
    const rotundEnd = getMultipleFifteeen(endTimeEvent);
    const startTime = getDateTime(dateEvent, rotundStart);
    const endTime = getDateTime(dateEvent, rotundEnd);
   
    const definisionId = `0.${new Date().getTime()}`;

    const eventToArr = {
        id: definisionId, // id понадобится для работы с событиями
        title: titleEvent,
        description: descriptionEvent,
        start: startTime,
        end: endTime,
    };
    // console.log(startTime, '  ', endTime)
// проверка пересечения событий
    if(eventValidator(startTime, endTime)) {
        setItem('events', eventToArr);
        onCloseEventForm();
        renderEvents();
    }

}


export function initEventForm() {
    // подпишитесь на сабмит формы и на закрытие формы
    submitBtn.addEventListener('click', onCreateEvent);
    closeEventFormBtn.addEventListener('click', onCloseEventForm);

}