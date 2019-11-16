window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let goodDay = document.querySelector('#goodDay');
    let day = document.querySelector('#day');
    let now = document.querySelector('#now');
    let time = document.querySelector('#time');
    let counter = document.querySelector('#counter');

    function getNow() {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let ampm = hours >= 12 ? 'pm' : 'am';        
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+ minutes : minutes;
        seconds = seconds < 10 ? '0'+ seconds : seconds;  

        let timeStr = `${hours}:${minutes}:${seconds} ${ampm}`;

        time.innerHTML = timeStr;
        
    }   
    setInterval(getNow, 1000);

    function getDay () {
        let date = new Date();
        let day = date.getDay();
        let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];        
        now.innerHTML = days[day];
    }
    getDay();

    function getHello () {
        let date = new Date();
        let hours = date.getHours();
        let day, hello;
        
        if (hours > 6 && hours < 12 ) {            
            day = 'утро';
        } else if (hours >= 12 && hours < 17) {
            day = 'день';
        } else if (hours >= 17 && hours < 23) {
            day = 'вечер';
        } else if (hours >= 23 && hours < 0) {
            day = '';
        }  else if (hours >= 0 && hours < 6) {
            day = '';
        } 
        if (day == 'день' || day == 'вечер') {
            hello = 'Добрый ';
        } else if (day == 'утро') {
            hello = 'Доброе ';
        } else {
            hello = 'Здравствуйте!';
        }        
        goodDay.innerHTML = ` ${hello} ${day}`;
        console.log('day, hello: ', day, hello);

    }
    getHello();

    function newYears (NYday) {        
        let end = new Date(NYday);         
        let second = 1000;
        let minute = second * 60;
        let hour = minute * 60;
        let day = hour * 24;
        let timer;
        
        
        function showRemaining () {
            let now = new Date();
            let distance = end - now;
            console.log('now: ', now);
            console.log('end: ', end);
            console.log('distance: ', distance);
            if (distance < 0) {
                clearInterval(timer);
                return;
            }
            let days = Math.floor(distance / day);

            let dayName, wording;
            
            switch (true) {
                case (2 <= days &&  days <= 4):
                dayName = 'дня';
                wording = 'осталось';
                break;
                case (days === 1):
                dayName = 'день';
                wording = 'остался';
                break;
                default:
                dayName = 'дней';            
                wording = 'осталось';
                break;
            };

            console.log('days: ', days);
            

            if(days < 10) {
                days = '0' + days;
            }


            document.getElementById('count_NY').innerHTML = days;
            document.getElementById('day_NY').innerHTML = dayName;
            document.getElementById('wording_NY').innerHTML = wording;

        }

        timer = setInterval(showRemaining, 1000);
    }
    newYears('2020, 1, 1');
});