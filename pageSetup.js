//create_element -> type, classNames, id, attributes, innertext, children

// setting up config section
let configSectie = document.getElementById('config');
let configPull = document.getElementById('configPull');
configPull.onclick = function () {
	if (configPull.value == 'in') {
		configPull.value = 'out';
		configSectie.style.left = '66%';
	} else {
		configPull.value = 'in';
		configSectie.style.left = '33%';
	}
};

function toggle(elements = [], aspect = [], values = []) {
	// takes two elements with the aspect that's toggled and two values that they toggle with, both provided in a list.
	if (elements[0][aspect[0]][aspect[1]] == values[0]) {
		elements[0][aspect[0]][aspect[1]] = values[1];
		elements[1][aspect[0]][aspect[1]] = values[0];
	} else {
		elements[0][aspect[0]][aspect[1]] = values[0];
		elements[1][aspect[0]][aspect[1]] = values[1];
	}
}

function clearConfigSectie() {
	toggle(
		[infoConfigSectie, flitsConfigSectie],
		['style', 'opacity'],
		['0.6', '1']
	);
	toggle(
		[infoConfigSectie, flitsConfigSectie],
		['style', 'fontWeight'],
		['normal', 'bold']
	);
	configInhoud.innerHTML = '';
}

function createBloemElementen(withVinkje = true) {
	for (let bloemnaam of bloemen) {
		let bloemelement = create_element(
			'p',
			[bloemnaam, 'choice'],
			'',
			{},
			bloemnaam
		);
		if (withVinkje) {
			let vinkje = create_element('img', [], '', {
				src: './resources/vinkje.jpeg',
			});
			bloemelement.onclick = toggleVinkje;
			let containerDiv = create_element('div', ['bloemnaamContainer']);
			containerDiv.appendChild(vinkje);
			containerDiv.appendChild(bloemelement);
			configInhoud.appendChild(containerDiv);
		} else {
			bloemelement.onclick = showBloemInfo;
			configInhoud.appendChild(bloemelement);
		}
	}
}
function createFlitsSectie() {
	clearConfigSectie();
	weergaveSectie.innerHTML = '';
	configHeader.innerText = 'kies de bloemen waar je mee wilt flitsen.';
	createBloemElementen(true);

	let flitsBtn = create_element('button', [], '', {}, 'begin met flitsen.');
	flitsBtn.onclick = startFlitsen;
	configInhoud.appendChild(flitsBtn);
	let stopBtn = create_element('button', [], '', {}, 'stop.');
	stopBtn.onclick = () => {
		flitsende = false;
	};
	let pauseBtn = create_element('button', [], '', {}, 'pauzeer.');
	pauseBtn.onclick = () => {
		paused ? (paused = false) : (paused = true);
	};
	flitsSectie.innerHTML = '';
	flitsSectie.appendChild(pauseBtn);
	flitsSectie.appendChild(stopBtn);
}

function createInfoSectie() {
	clearConfigSectie();
	flitsSectie.innerHTML = '';
	configHeader.innerText = 'kies de bloemen waar je mee wilt flitsen.';
	createBloemElementen(false);
}
infoConfigSectie.onclick = createInfoSectie;
flitsConfigSectie.onclick = createFlitsSectie;

createFlitsSectie();
