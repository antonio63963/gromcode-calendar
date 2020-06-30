import {
    getItem,
    setItem
} from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import {
    openPopup,
    closePopup
} from '../common/popup.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.fa-trash-alt');

function handleEventClick(event) {
    // если произошел клик по событию, то нужно паказать попап с кнопкой удаления
    // установите eventIdToDelete с id события в storage
    if (!event.target.closest('.event')) return;

    const eventElem = event.target.closest('.event');
    const xPos = event.clientX;
    const yPos = event.clientY;
    const id = event.target.dataset;
    openPopup(xPos, yPos, eventElem);
    setItem('eventIdToDelete', id);
}

function removeEventsFromCalendar() {
    // ф-ция для удаления всех событий с календаря
    let arrEvents = getItem('events');
    arrEvents.splice(0, arrEvents.lenhth);
}

const createEventElement = event => {
    // ф-ция создает DOM элемент события
    // событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
    // нужно добавить id события в дата атрибут
    // здесь для создания DOM элемента события используйте document.createElement

    const heightElem = (new Date(event.end).getTime() - new Date(event.start).getTime()) / 60000;
    const topPosition = new Date(event.start).getMinutes();
    const formatter = new Intl.DateTimeFormat ('en', {
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    const getTime = date => formatter.format(date);
    const startTime = getTime(new Date(event.start));
    const endTime = getTime(new Date(event.end));

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
    console.log(eventsArr)
    const monday = getItem('displayedWeekStart');
    const sunday = new Date(new Date(monday).setDate(new Date(monday).getDate() + 7));

    const filteredEvents = eventsArr.filter(event => {
        if (new Date(event.start) >= new Date(monday) && new Date(event.start) <= new Date(sunday)) {
            return event;
        }
    });
    // console.log('filteredEvents:  ', filteredEvents);
    const calendarDaysArr = document.querySelectorAll('.calendar__day');
    const hoursMeshArr = document.querySelectorAll('.calendar__time-slot');
    hoursMeshArr.forEach(hour => hour.textContent = '');
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

function onDeleteEvent() {
    // достаем из storage массив событий и eventIdToDelete
    // удаляем из массива нужное событие и записываем в storage новый массив
    // закрыть попап
    // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
    const eventIdToDelete = getItem('eventIdToDelete');
    let events = getItem('events');
    let clearedEvents = events.filter(event => !event.id == eventIdToDelete);
    setItem('events', clearedEvents);
    closePopup();


    renderEvents();
}

deleteEventBtn.addEventListener('click', onDeleteEvent);

weekElem.addEventListener('click', handleEventClick);