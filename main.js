// <img src="img_orange_flowers.jpg" alt="Flowers" style="width:auto;">

let getChosenFlowers = function () {
	let chosenFlowers = [];
	for (let element of document.getElementsByClassName('flowerCheckbox')) {
		console.log(element, element.checked, element.name);
		if (element.checked) {
			chosenFlowers.push(element.name);
		}
	}
	console.log(chosenFlowers);
	return chosenFlowers;
};

showFlower = function (flower) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			afbeeldingSectie.innerHTML = '';
			let picture = document.createElement('img');
			picture.setAttribute('src', `./resources/photos_big/${flower}1.jpg`);
			afbeeldingSectie.appendChild(picture);
			resolve(`${flower} shown`);
		}, 1000);
	});
};

let flitsFlowers = async function (chosenFlowers) {
	console.log('flitsing flowers', chosenFlowers);
	for (let flower of chosenFlowers) {
		console.log('next flower is ', flower);
		let newVal = await showFlower(flower);
		console.log(newVal);
	}
};
let startFlitsen = function () {
	console.log('huh?');
	let chosenFlowers = getChosenFlowers();
	flitsFlowers(chosenFlowers);
};
