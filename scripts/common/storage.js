// let storage = {
//     // используется для удаления события
//     eventIdToDelete: null,
//     // хранит дату понедельника той отображаемой недели
//     displayedWeekStart: null,
//     // хранит массив всех событий
//     events: [],
//     // это все данные, которые вам нужно хранить для работы приложения
// };

// export const setItem = (key, value) => {
//     // ф-ция должна устанавливать значения в объект storage
//     Array.isArray(storage[key]) && !Array.isArray(value) ? storage[key].push(value) :
//     storage[key] = value;
// };
// export const getItem = key => {
//     // ф-ция должна возвращать по ключу значения из объекта storage
//     return storage[key];
// };
export const initLocalStorage = () => {
    localStorage.setItem('eventIdToDelete', JSON.stringify(null));
    localStorage.setItem('displayedWeekStart', JSON.stringify(null));
    localStorage.setItem('events', JSON.stringify([]));
}
export const getItem = key => {
    return JSON.parse(localStorage.getItem(key));
};
export const setItem = (key, value) => {
    let storage = JSON.parse(localStorage.getItem(key));
    Array.isArray(storage) && !Array.isArray(value) ? storage.push(value) :
    storage = value;
    localStorage.setItem(key, JSON.stringify(storage));
};


// пример объекта события
const eventExample = {
    id: 0.7520027086457333, // id понадобится для работы с событиями
    title: 'Title',
    description: 'Some description',
    start: new Date('2020-03-17T01:10:00.000Z'),
    end: new Date('2020-03-17T04:30:00.000Z'),
}