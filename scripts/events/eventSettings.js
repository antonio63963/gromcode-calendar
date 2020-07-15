
// import { renderEvents } from '../events/events.js';

const colorSettingEvent = document.querySelector('.color-setting');
const eventColorInput = document.getElementsByName('eventsColor')[0];


// export const getColorEventFromLocal = () =>
//     localStorage.getItem('eventColor') ?
//     JSON.parse(localStorage.getItem('eventColor')) :
//     '#447be2';


const onChangeColorEvent = (e) => {
    localStorage.setItem('eventColor', JSON.stringify(eventColorInput.value));
    //    const eventDomElements = [...document.querySelectorAll('.events')];
    //    eventDomElements.forEach(event => {
    //        event.style[background-color] = eventColor;
    //    })
    
};
// const onChangeStorage = (e) => 
// console.log(e)

colorSettingEvent.addEventListener('change', onChangeColorEvent);
// window.addEventListener('storage', onChangeStorage)