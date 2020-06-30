import {
    getItem,
    setItem
} from '../common/storage.js';
import {
    renderWeek
} from '../calendar/calendar.js';
import {
    renderHeader
} from '../calendar/header.js';
import {
    getStartOfWeek,
    getDisplayedMonth
} from '../common/time.utils.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector('.navigation__displayed-month');

function renderCurrentMonth() {
    // отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
    // вставить в .navigation__displayed-month
    const dateStart = new Date(getItem('displayedWeekStart'));
   const displayedMonth = getDisplayedMonth(dateStart);
   displayedMonthElem.textContent = displayedMonth;
}

const onChangeWeek = event => {
    // при переключении недели обновите displayedWeekStart в storage
    // и перерисуйте все необходимые элементы страницы (renderHeader, renderWeek, renderCurrentMonth)
    let nextWeekStartDay;
    const startDay = getItem('displayedWeekStart');

    if (event.target.classList.contains('fa-chevron-right')) {
        nextWeekStartDay = new Date(startDay.setDate(new Date(startDay).getDate() + 7));
    }
    else if(event.target.classList.contains('fa-chevron-left')) {
        nextWeekStartDay = new Date(startDay.setDate(new Date(startDay).getDate() - 7));
    } else { return;}
    setItem('displayedWeekStart', nextWeekStartDay);
    renderHeader();
    renderWeek();
    renderCurrentMonth();

};

export const initNavigation = () => {
    renderCurrentMonth();
    navElem.addEventListener('click', onChangeWeek);
};