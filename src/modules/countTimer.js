//timer
function countTimer (deadline) {
    let timerHours = document.querySelector('#timer-hours'),
        timerminutes = document.querySelector('#timer-minutes'),
        timerseconds = document.querySelector('#timer-seconds'),
        timerBlock = document.querySelector('#timer');
        
    function getTimeRemaining () {            
        let dateStop = new Date(deadline).getTime(),            
        dateNow = new Date().getTime(),            
        timeRemainning = (dateStop - dateNow)/1000,
        seconds = Math.floor(timeRemainning % 60),
        minuts = Math.floor((timeRemainning / 60) % 60),
        hours = Math.floor(timeRemainning / 60 / 60),
        day = Math.floor(timeRemainning / 60 / 60 / 24); 

        if(hours < 10 && hours >= 0 ) {
            hours = '0' + hours;                
        }
        if(minuts < 10 && minuts >= 0) {
            minuts = '0' + minuts;
        }
        if(seconds < 10 && seconds >= 0) {
            seconds = '0' + seconds;
        }
        
        
        return {timeRemainning, hours, minuts, seconds };
    }

    function updateClock () {
        let timer = getTimeRemaining();
        timerHours.textContent = timer.hours;
        timerminutes.textContent = timer.minuts;
        timerseconds.textContent = timer.seconds; 
       

        if (timer.hours < 0) { 
            timerBlock.style.color = "red";
            timerHours.textContent = '00';
            timerminutes.textContent = '00';
            timerseconds.textContent = '00';  
        }
    }
        
    updateClock ();

};

export default countTimer;