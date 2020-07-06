import { renderTimescale } from './calendar/timescale.js';
import { renderWeek, showTimeLine } from './calendar/calendar.js';
import { renderHeader } from './calendar/header.js';
import { initNavigation } from './header/navigation.js';
import { setItem } from './common/storage.js';
import { getStartOfWeek } from './common/time.utils.js';
import { initEventForm } from './events/createEvent.js';

const calendarWeek = document.querySelector('.calendar__week');
calendarWeek.scrollTop = calendarWeek.scrollHeight;

document.addEventListener('DOMContentLoaded', () => {
    // инициализация всех элементов
    renderTimescale();
    setItem('displayedWeekStart', getStartOfWeek(new Date()));
    renderWeek();
    renderHeader();
    initNavigation();
    initEventForm();
    setInterval(() => showTimeLine(), 60000);
    
});



