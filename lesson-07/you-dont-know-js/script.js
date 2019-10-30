'use strict';

function addId() {    
    let books = document.querySelectorAll('.book');
    books.forEach(function(item) {
        let title = item.firstElementChild;
        let titleLink = title.firstElementChild.textContent.trim();
        let bookNumber = titleLink[6];

        item.setAttribute('id','book_'+bookNumber);
    });
}

function booksSort() {
    let books = document.querySelectorAll('.books'); 
    let book = document.querySelectorAll('.book');     

    books[0].insertBefore(book[1],book[0]);
    books[0].insertBefore(book[4],book[2]);
    books[0].insertBefore(book[3],book[2]);
    books[0].insertBefore(book[5],book[2]);    
}


function changeBackground() {
    let fonContainer = document.body;
    fonContainer.setAttribute('style','background: url(./image/you-dont-know-js.jpg);')
}

function changeTitle(id) {
    let book = document.querySelector('#book_'+id);
    let title = book.firstElementChild;
    let titleLink = title.firstElementChild;
    titleLink.textContent = "Книга 3. this и Прототипы Объектов";
}

function removeAdv() {
    let adv = document.querySelector('.adv');
    adv.remove();
}

function addChapter() {
    let list = document.querySelector('#book_6');
    list = list.childNodes[3];
    let li = list.childNodes[17];  
    let liClone = li.cloneNode(true);
    liClone.textContent = "Глава 8: За пределами ES6";  
    list.appendChild(liClone);
    list.insertBefore(list.childNodes[21],list.childNodes[19]);
}

function sortChapter() {
    let book = document.querySelectorAll('.book');
    let list1 = book[1].childNodes[3];
    let li1 = list1.childNodes;
    list1.insertBefore(li1[15],li1[19]);
    list1.insertBefore(li1[5],li1[21]); 
    list1.insertBefore(li1[12],li1[8]);
    list1.insertBefore(li1[15],li1[9]);

    let list2 = book[4].childNodes[3];
    let li2 = list2.childNodes;
    list2.insertBefore(li2[19],li2[5]);
    list2.insertBefore(li2[6],li2[14]);
    list2.insertBefore(li2[11],li2[18]);
}

addId(); //добавить id
booksSort(); //порядок книг
changeBackground(); //заменить фон
changeTitle(3); //заменить текст заголовка
removeAdv(); //удалить рекламу
addChapter(); //добавить главу
sortChapter();
