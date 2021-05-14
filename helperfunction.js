function create_element(
	type,
	classNames = [],
	id = '',
	attributes = {},
	innertext = '',
	children = []
) {
	let new_element = document.createElement(type);
	if (classNames) {
		for (let className of classNames) {
			new_element.classList.add(className);
		}
	}
	if (attributes) {
		for (let attribute_type in attributes) {
			new_element.setAttribute(attribute_type, attributes[attribute_type]);
		}
	}
	if (id) {
		new_element.id = id;
	}
	new_element.innerText = innertext;
	if (children) {
		for (child of children) {
			create_element(
				new_element,
				child.type,
				child.classNames,
				child.id,
				child.attributes,
				child.innertext,
				child.children
			);
		}
	}
	return new_element;
}
toggleVinkje = function (e) {
	let bloemetje = e.target;
	bloemetje.style['font-weight'] = 'bold';
	let vinkje = bloemetje.previousElementSibling;
	if (vinkje.style.visibility === 'visible') {
		vinkje.style.visibility = 'hidden';
		bloemetje.style['font-weight'] = 'normal';
		bloemetje.classList.remove('chosen');
	} else {
		vinkje.style.visibility = 'visible';
		bloemetje.style['font-weight'] = 'bold';
		bloemetje.classList.add('chosen');
	}
};
showBloemInfo = function (e) {
	let positioning = ['1/1/6/6', '1/5/6/11', '5/1/11/6', '5/5/11/11'];

	weergaveSectie.innerHTML = '';
	let grid = create_element('div', ['mainGrid']);
	for (let i = 1; i < 5; i++) {
		let bloemAfbeelding = create_element('img', [], '', {
			src: `./resources/photos_big/${e.target.innerText}${i}.jpg`,
		});
		bloemAfbeelding.style['grid-area'] = positioning[i - 1];
		bloemAfbeelding.onclick = () => {
			let sibling = bloemAfbeelding.parentNode.firstElementChild;
			do {
				if (sibling !== bloemAfbeelding) {
					sibling.style['z-index'] = '1';
				}
			} while ((sibling = sibling.nextElementSibling));

			bloemAfbeelding.style['z-index'] = '2';
		};
		grid.appendChild(bloemAfbeelding);
	}

	weergaveSectie.appendChild(grid);
};
let getChosenFlowers = function () {
	let chosenFlowersList = document.getElementsByClassName('chosen');
	let chosenFlowers = [];
	for (let flowerElement of chosenFlowersList) {
		chosenFlowers.push(flowerElement.innerText);
	}
	return chosenFlowers;
};

flowerShowTime = function () {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, 3000);
	});
};
nameShowTime = function () {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, 1000);
	});
};
function getFlitsAfbeelding(chanceTussendoortje, chosenFlowers) {
	let showPicture = Math.random() > chanceTussendoortje;
	if (showPicture) {
		let picture = document.createElement('img');

		let chosenFlower =
			chosenFlowers[Math.floor(Math.random() * chosenFlowers.length)];
		let pictureNumber = Math.floor(Math.random() * 4) + 1;
		picture.setAttribute(
			'src',
			`./resources/photos_big/${chosenFlower}${pictureNumber}.jpg`
		);
		picture.setAttribute('type', chosenFlower);
		return picture;
	} else {
		return tussendoor[Math.floor(Math.random() * tussendoor.length)];
	}
}

let flitsFlowers = async function (chosenFlowers) {
	let chanceTussendoortje = 0.0;
	let showFlits = document.getElementById('showFlits');
	while (flitsende) {
		if (!paused) {
			showFlits.innerHTML = '';
			let newAfbeelding = getFlitsAfbeelding(
				chanceTussendoortje,
				chosenFlowers
			);
			showFlits.appendChild(newAfbeelding);
			await flowerShowTime();
			let textContainer = create_element('div', ['textContainer']);
			let text = create_element(
				'p',
				[],
				'',
				{},
				newAfbeelding.getAttribute('type')
			);
			textContainer.appendChild(text);
			if (flitsende) {
				showFlits.appendChild(textContainer);

				await nameShowTime();
			}
		} else await nameShowTime();
	}
};
let startFlitsen = function () {
	weergaveSectie.innerHTML = '';
	flitsSectie.innerHTML = '';

	let showFlits = create_element('div', [], 'showFlits');

	let stopBtn = create_element(
		'button',
		['stop', 'unclicked'],
		'',
		{},
		'stop.'
	);
	stopBtn.onclick = () => {
		flitsende = false;
		let pauseBtn = document.getElementsByClassName('pause')[0];
		pauseBtn.classList.remove('clicked');
		pauseBtn.innerText = 'pauze';

		flitsSectie.innerHTML = '';
	};
	let pauseBtn = create_element(
		'button',
		['pause', 'unclicked'],
		'',
		{},
		'pauze'
	);
	pauseBtn.onclick = (e) => {
		if (paused) {
			paused = false;
			e.target.classList.remove('clicked');
			e.target.classList.add('unclicked');
			e.target.innerText = 'pauze';
		} else {
			paused = true;
			e.target.classList.add('clicked');
			e.target.classList.remove('unclicked');
			e.target.innerText = 'gepauzeerd';
		}
	};

	flitsSectie.appendChild(showFlits);
	flitsSectie.appendChild(pauseBtn);
	flitsSectie.appendChild(stopBtn);

	flitsende = true;
	paused = false;

	configPull.value = 'in';
	configSectie.style.left = '99%';

	let chosenFlowers = getChosenFlowers();
	flitsFlowers(chosenFlowers);
};

let stopFlitsen = function () {
	flitsende = false;
	console.log('flitsen is gestopt.');
};
