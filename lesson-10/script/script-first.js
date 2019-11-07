'use strict';

let btn = document.getElementById('btn');
    
function DomElement(selector, height, width, bg, fontSize) {    
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

DomElement.prototype.createTag = function() {    
    let str = this.selector;
    console.log('str: ', str);
    switch(str[0]) {
        case '.':
            this.createDiv(str);
            break;        
        case '#': 
            this.createP(str);
            break;
        default:
            alert('Начни с точки или решетки');
    }
};

DomElement.prototype.createDiv = function() {
    let div = document.createElement('div');
    div.className = this.selector.slice(1);
    div.innerHTML = this.selector.slice(1) + ' <b>Был создан див.</b>';
    document.body.append(div);    
    div.style.cssText='height:' + this.height + 'px;background-color: ' + this.bg +';width:' + this.width + 'px;font-size:'+ this.fontSize +'px;';
};

DomElement.prototype.createP = function() {
    let paragraf = document.createElement('p');
    paragraf.innerHTML = this.selector.slice(1) + ' <b>Был создан параграф.</b>';
    document.body.append(paragraf);
    paragraf.style.cssText='height:' + this.height + 'px;background-color: ' + this.bg +';width:' + this.width + 'px;font-size:'+ this.fontSize +'px;';
};


let newElement = prompt('Введите селектор, начинающийся с "." или с "#"');
let domElement = new DomElement(newElement, 400, 200, 'silver', 24);
let domElement2 = new DomElement(newElement, 400, 300, 'red', 24);

domElement.createTag();
domElement2.createTag();