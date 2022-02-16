const fs = require('fs');
const path = require('path');

const onlineUsers = [
    {name: 'Alena', age: 39, city: 'Kodima'},
    {name: 'Sergey', age: 38, city: 'Odessa'},
    {name: 'Evgen', age: 8, city: 'Odessa-Kodima'},
];

const inPersonUsers = [
    {name: 'Sasha', age: 61, city: 'Vradievka'},
    {name: 'Luda', age: 59, city: 'Cherkassi'},
    {name: 'Petya', age: 63, city: 'Kodima'},
];


// --------------------------------------------------------------------------------

// 1 - Створити основну папку (main), в яку покласти дві інші папки: перша - online, друга - inPerson

// --------------------------------------------------------------------------------

// 2 - Потім створити в вашому головному файлі (для прикладу app.js) два масиви з обєктами user
// ({. name: "Andrii", age: 22, city: "Lviv" }),  відповідно перший - onlineUsers, другий - inPersonUsers;
// і створити файли txt в папках (online, inPerson) в яких як дату покласти юзерів з ваших масивів,
//     але щоб ваш файл виглядав як NAME: ім'я з обєкту і т.д і всі пункти з нового рядка.

// --------------------------------------------------------------------------------

fs.mkdir(path.join(__dirname, 'main'), (err) => {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log('Создали основную папку main');

    fs.mkdir(path.join(__dirname, 'main', 'online'), (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log('Создали папку online в основной папке main');

        fs.mkdir(path.join(__dirname, 'main', 'inPerson'), (err) => {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log('Создали папку inPerson в основной папке main');

            onlineUsers.forEach(user =>{
                fs.appendFile(path.join(__dirname, 'main', 'online', 'onlineUsers.txt'), `\n${JSON.stringify(user, null, `\t`)}`, (err =>{
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    console.log(`Создали ${user.name} в onlineUsers.txt`);

                } ))
            })
            inPersonUsers.forEach(user =>{
                fs.appendFile(path.join(__dirname, 'main', 'inPerson', 'inPersonUsers.txt'), `\n${JSON.stringify(user, null, `\t`)}`, (err =>{
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    console.log(`Создали ${user.name} в inPersonUsers.txt`);

                } ))
            })
        });
    });
});

// --------------------------------------------------------------------------------
// 3 - Коли ви це виконаєте напишіть функцію яка буде міняти місцями юзерів з одного файлу і папки в іншу.
// (ті, що були в папці inPerson будуть в папці online)

//
// const replace = ()=> {
//     fs.readFile(path.join(__dirname, 'main', 'inPerson', 'inPersonUsers.txt'), "utf-8", (err, data) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//         console.log('Считали данные с inPersonUsers.txt ');
//
//         fs.writeFile(path.join(__dirname, 'main', 'online', 'onlineUsers.txt'), data, (err) => {
//             if (err) {
//                 console.log(err);
//                 throw err;
//             }
//             console.log('Записали данные с inPersonUsers.txt в onlineUsers.txt ');
//         })
//     });
//     fs.readFile(path.join(__dirname, 'main', 'online', 'onlineUsers.txt'), "utf-8", (err, data) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//         console.log('Считали данные с onlineUsers.txt ');
//
//         fs.writeFile(path.join(__dirname, 'main', 'inPerson', 'inPersonUsers.txt'), data, (err) => {
//             if (err) {
//                 console.log(err);
//                 throw err;
//             }
//             console.log('Записали данные с onlineUsers.txt в inPersonUsers.txt ');
//         })
//     })
// }
// replace()