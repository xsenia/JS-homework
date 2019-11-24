'use strict';

const output = document.getElementById('output');

const getData = (url) => {

	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();
		request.open('GET', url);
		request.addEventListener('readystatechange', () => {
			if (request.readyState !== 4) {
				return;
			}
			if (request.status === 200) {
				const response = JSON.parse(request.responseText);
				resolve(response);
			} else {
				reject(request.statusText);
			}
		});
		request.send();
	});	
};

const outpuPhotos = (data) => {	
	output.insertAdjacentHTML('beforebegin',
	`<h4>${data.title}</h4>
	<img src="${data.thumbnailUrl}" alt="${data.title}">`);
};

const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';

const oneImg = getData('https://jsonplaceholder.typicode.com/photos/1'),
	  twoImg = getData('https://jsonplaceholder.typicode.com/photos/2');

Promise.race([oneImg, twoImg])
	.then(outpuPhotos)
	.catch(error => console.log(error));

