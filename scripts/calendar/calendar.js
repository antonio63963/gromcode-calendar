import {
    getItem
} from '../common/storage.js';
import {
    generateWeekRange
} from '../common/time.utils.js';
import {
    renderEvents
} from '../events/events.js';
import {
    createNumbersArray
} from '../common/createNumbersArray.js';

const generateDay = () => {
    // функция должна сгенерировать и вернуть разметку дня в виде строки
    // разметка состоит из 24 часовых временных слотов (.calendar__time-slot)
    let hoursColumn = [];
    for (let i = 0; i < 24; i++) {
        const hour = i < 10 ? `0${i}` : i;
        hoursColumn.push(
            `<div class="calendar__time-slot" data-time="${hour}"></div>`
        );
    }
    return hoursColumn.join('');

};

export const renderWeek = () => {
    // функция должна сгенерировать разметку недели в виде строки и вставить ее на страницу (в .calendar__week)
    // разметка недели состоит из 7 дней (.calendar__day) отображаемой недели
    // массив дней, которые нужно отобразить, считаем ф-цией generateWeekRange на основе displayedWeekStart из storage
    // каждый день должен содержать в дата атрибуте порядковый номер дня в месяце
    // после того, как отрисовали всю сетку для отображаемой недели, нужно отобразить события этой недели с помощью renderEvents
  
    const calendarWeek = document.querySelector('.calendar__week');
  
    const monday = getItem('displayedWeekStart');
    const weekDaysArr = generateWeekRange(monday);
   let weekDaysMesh = weekDaysArr.reduce((acc, date) => {
       acc.push(
           `<div class="calendar__day" data-day="${new Date(date).getDate()}" data-date="${new Date(date)}">
           ${generateDay()}
           </div>`
       );
       return acc;
   }, []);
   calendarWeek.innerHTML = weekDaysMesh.join('');
   renderEvents();
};