import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const btnCreate = document.querySelector('.create-event-btn');

export const renderHeader = () => {
    // на основе displayedWeekStart из storage с помощью generateWeekRange сформируйте массив дней текущей недели
    // на основе полученного массива сформируйте разметку в виде строки - 7 дней (день недели и число в месяце)
    // полученную разметку вставить на страницу с помощью innerHTML в .calendar__header
    // в дата атрибуте каждой ячейки должно хранить для какого часа эта ячейка
   
    const monday = getItem('displayedWeekStart');
    const weekDaysArr = generateWeekRange(monday);

    const calendarHeader = document.querySelector('.calendar__header');

    let headerDaysArr = weekDaysArr.map( day => {
        return ` <div class="calendar__day-lable day-lable">
                    <span class="day-lable__day-name">${daysOfWeek[day.getDay()].toUpperCase()}</span>
                    <span class="day-lable__day-number">${day.getDate()}</span>
                </div>`
    });
    calendarHeader.innerHTML = headerDaysArr.join('');
    
};

// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик 
btnCreate.addEventListener('click', openModal);


