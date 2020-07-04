import {
    getItem,
    setItem
} from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import {
    openPopup,
    closePopup
} from '../common/popup.js';
import { getDateTime, formatingYear, getTime } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.fa-trash-alt');
const popupContentElem = document.querySelector('.popup__content');
const popupTitle = document.querySelector('.popup__title');
const popupDate = document.querySelector('.popup__date');
const popupStartTime = document.querySelector('.popup__start-time');
const popupEndTime = document.querySelector('.popup__end-time');
const popupDescripion = document.querySelector('.popup__description');
let actualEvent;



function handleEventClick(event) {
    // если произошел клик по событию, то нужно паказать попап с кнопкой удаления
    // установите eventIdToDelete с id события в storage

    if (!event.target.closest('.event')) return;
    const xPos = event.clientX;
    const yPos = event.clientY;
    const id = event.target.dataset.eventId;
  
    actualEvent = getItem('events').find(event => event.id == id);
    // const yearInString = new Date(actualEvent.start).toLocaleString('ru', optionsForYear);
    // const yearFormated = yearInString.split('.').reverse().join('-');
    const yearFormated = formatingYear(actualEvent.start);
    popupTitle.value = actualEvent.title;
    popupDate.value = yearFormated;
    popupStartTime.value = getTime(new Date(actualEvent.start));
    popupEndTime.value = getTime(new Date(actualEvent.end));

    openPopup(xPos, yPos);
    setItem('eventIdToDelete', id);
}

function removeEventsFromCalendar() {
    // ф-ция для удаления всех событий с календаря
    const hoursMeshArr = document.querySelectorAll('.calendar__time-slot');
    hoursMeshArr.forEach(hour => hour.textContent = '');
}

const createEventElement = event => {
    // ф-ция создает DOM элемент события
    // событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
    // нужно добавить id события в дата атрибут
    // здесь для создания DOM элемента события используйте document.createElement

    const heightElem = (new Date(event.end).getTime() - new Date(event.start).getTime()) / 60000;
    console.log(`height  ${heightElem}`);
    const topPosition = new Date(event.start).getMinutes();
    const startTime = getTime(new Date(event.start));
    console.log(`start  ${startTime}`);
    const endTime = getTime(new Date(event.end));
    console.log(`start  ${endTime}`);
    const eventDom = document.createElement('div');
    eventDom.classList.add('event');
    eventDom.dataset.eventId = event.id;
    eventDom.style.height = `${heightElem}px`;
    eventDom.style.top = `${topPosition}px`;


    const eventTitle = document.createElement('div');
    eventTitle.classList.add('event__title');
    eventTitle.textContent = event.title;
    eventDom.append(eventTitle);

    const eventTime = document.createElement('div');
    eventTime.classList.add('event__time');
    eventTime.textContent = `${startTime} - ${endTime}`;
    eventDom.append(eventTime);

    const eventDate = document.createElement('div');
    eventDate.classList.add('event__date');
    eventDate.style.display = 'none';
    eventDate.textContent = event.start;
    // console.log(event.start)
    eventDom.append(eventDate);

    const eventDescription = document.createElement('div');
    eventDescription.classList.add('event__description');
    // eventDescription.classList.add('hidden');
    eventDescription.style.display = 'none';
    eventDescription.textContent = event.description;
    eventDom.append(eventDescription);

    // console.log('dom Event  ', eventDom);
    return eventDom;
};

export const renderEvents = () => {
    // достаем из storage все события и дату понедельника отображаемой недели
    // фильтруем события, оставляем только те, что входят в текущую неделю
    // создаем для них DOM элементы с помощью createEventElement
    // для каждого события находим на странице временную ячейку (.calendar__time-slot)
    // и вставляем туда событие
    // каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
    // не забудьте удалить с календаря старые события перед добавлением новых
    const eventsArr = [...getItem('events')];
    const monday = getItem('displayedWeekStart');
    const sunday = new Date(new Date(monday).setDate(new Date(monday).getDate() + 7));

    const filteredEvents = eventsArr.filter(event => {
        if (new Date(event.start) >= new Date(monday) && new Date(event.start) <= new Date(sunday)) {
            return event;
        }
    });
    // console.log('filteredEvents:  ', filteredEvents);
    const calendarDaysArr = document.querySelectorAll('.calendar__day');
   
    removeEventsFromCalendar();
    filteredEvents.forEach(event => {
        const eventDate = new Date(event.start).getDate();
        const eventHour = new Date(event.start).getHours();

        for (let i of calendarDaysArr) {
            if (i.getAttribute('data-day') == eventDate) {
                i.children[eventHour].textContent
                i.children[eventHour].append(createEventElement(event));

            }
        }

    });
};
const validationForDelete = (event) => {
    const deleteTime = new Date().getTime();
    const startEvent = new Date(event.start).getTime();
    const difference = (startEvent - deleteTime) / 60000;
    if(difference > 15) {
        alert(`Вы не можете удалить событие раньше чем за 15мин до его начала!`)
        return false;
    } else { return true;}
}
function onDeleteEvent() {
    // достаем из storage массив событий и eventIdToDelete
    // удаляем из массива нужное событие и записываем в storage новый массив
    // закрыть попап
    // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
    const eventIdToDelete = getItem('eventIdToDelete');
    let events = getItem('events');
    const actualEvent = events.find(event => event.id == eventIdToDelete);
    if(validationForDelete(actualEvent)) {
        let clearedEvents = events.filter(event => !event.id == eventIdToDelete);
        setItem('events', clearedEvents);
        closePopup();
        renderEvents();
    }
}
const executePopupActions = (event) => {

    if (event.target.classList.contains('fa-save')) {
 
        actualEvent.title = popupTitle.value;
        actualEvent.start = getDateTime(popupDate.value, popupStartTime.value);
        actualEvent.end = getDateTime(popupDate.value, popupEndTime.value);
        actualEvent.description = popupDescripion.value;
        console.log(getItem('events'))
        closePopup()
        renderEvents();
    } else if (event.target.classList.contains('fa-sign-out-alt')) {
        closePopup();
    }
    if (event.target.classList.contains('fa-trash-alt')) {
        onDeleteEvent();
    }
}

const getEventFromField = (e) => {
    if(!e.target.classList.contains('calendar__time-slot')) return;

    let hour = e.target.dataset.time;
    
    const dateInWeek = new Date(e.target.closest('.calendar__day').dataset.date);
    const date = formatingYear(dateInWeek)
    let startTime = e.target.dataset.time;
    const endTime = +startTime < 10 ? `0${+startTime + 1}` : +startTime + 1;

    openModal();
    const dateEvent = document.getElementsByName('date')[0];
    const startTimeEvent = document.getElementsByName('startTime')[0];
    const endTimeEvent = document.getElementsByName('endTime')[0];
    dateEvent.value = date;
    startTimeEvent.value = `${startTime}:00`;
    endTimeEvent.value = `${endTime}:00`;
    console.log(startTime.value)
}

weekElem.addEventListener('click', handleEventClick);
weekElem.addEventListener('click', getEventFromField);
popupContentElem.addEventListener('click', executePopupActions)