import {
    createNumbersArray
} from '../common/createNumbersArray.js';

export const renderTimescale = () => {
    // ф-ция должна генерировать разметку для боковой шкалы времени (24 часа)
    // полученную разметку вставьте на страницу с помощью innerHTML в .calendar__time-scale

    const timeScale = document.querySelector('.calendar__time-scale');
    let scaleArr = [];

    for (let i = 1; i <= 24; i++) {
        const amPm = i > 12 ? `${i - 12} PM` : `${i} AM`;

        scaleArr.push(`<div class="time-slot">
         <span class="time-slot__time"> ${amPm} </span>
         </div>`);
    }
//  console.log(scaleArr[0])
    timeScale.innerHTML = scaleArr.join('');
};