const fs = require('fs');
const path = require('path');

// ----------------------------------------------------------------------

// 1. Спробуйте створити якийсь файл txt,
// прочитайте з нього дані і одразу, дані які ви отримали запишіть їх в інший файл,
// в вас вийде невеликий callback hell, пізніше я вам покажу
// як можна це обійти, але поки зробіть так


// fs.writeFile(path.join(__dirname, 'text.txt'), 'some data, some data, some data', (err)=>{
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//     console.log('Создали текстовый документ с произволным текстом')
//
//     fs.readFile(path.join(__dirname, 'text.txt'), "utf-8", (err, data) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//         console.log('Считали данные с text.txt ');
//
//         fs.writeFile(path.join(__dirname, 'newText.txt'), data, (err) => {
//             if (err) {
//                 console.log(err);
//                 throw err;
//             }
//             console.log('Записали данные с text.txt в newText.txt ');
//         })
//     })
// })

// ----------------------------------------------------------------------
// 2. Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його,
//     скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній,
//     старий файл видаліть після того як все завершиться.
//     Також вийде callback hell

// fs.writeFile(path.join(__dirname, 'textTask2.txt'), 'some data, some data, some data', (err) => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//     console.log('Создали textTask2 с произволным текстом')
//
//     fs.readFile(path.join(__dirname, 'textTask2.txt'), "utf-8", (err, data) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//         console.log('Считали данные с textTask2 ');
//
//         fs.mkdir(path.join(__dirname, 'task2'), (err) => {
//             if (err) {
//                 console.log(err);
//                 throw err;
//             }
//             console.log('Создали папку task2');
//
//             fs.writeFile(path.join(__dirname, 'task2', 'newTextTask2.txt'), data, (err) => {
//                 if (err) {
//                     console.log(err);
//                     throw err;
//                 }
//                 console.log('Записали данные  ');
//
//                 fs.unlink(path.join(__dirname, 'textTask2.txt'), (err) => {
//                     if (err) {
//                         console.log(err);
//                         throw err;
//                     }
//                     console.log('Удалили файл textTask2');
//                 })
//             })
//         })
//     })
// })

// ----------------------------------------------------------------------

// 3. Створіть папку (можете вручну)
// напишіть скріпт який створить в ній якись дані (можуть бути нові папки і файли(в файли запишіть якусь дату) )

// fs.mkdir(path.join(__dirname, 'task3'), (err) => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//     console.log('Создали папку task3');
//
//     for (let i = 0; i<10; i++){
//         fs.mkdir(path.join(__dirname, 'task3', `folder ${i}`), {recursive:true},(err) => {
//             if (err) {
//                 console.log(err);
//                 throw err;
//             }
//             console.log(`Создаем папку ${i} `);
//
//             fs.writeFile(path.join(__dirname, 'task3', `folder ${i}`,  `text${i}.txt`),`Some Data folder ${i}`, (err) => {
//                 if (err) {
//                     console.log(err);
//                     throw err;
//                 }
//                 console.log('Создали `text${i}.txt` и записали данные');
//             })
//         })
//     }
// })

// і напишіть функцію яка буде зчитувати папку і перевіряти
// якщо дані які в ній лежать - це файли тоді вам потрібно їх очистити,
//     але не видаляти, якщо дані - це папки, вам потрібно їх перейменувати і додати до назви префікс _new

const multi = () =>{
    fs.readdir(path.join(__dirname, 'task3'), {recursive:true},(err, data) =>{
        if (err) {
            console.log(err);
            throw err;
        }
        fs.stat("txt", function(err, stats) {
            console.log(stats)
        });
       // data.map( value => {
       //     const valueStatus = value.endsWith('txt')
       //     if(valueStatus){
       //         console.log('true')
       //     }else{
       //         console.log('false')
       //     }
       // })
    })

}

multi()