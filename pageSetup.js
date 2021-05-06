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

let configInhoud = create_element('div', ['containerConfig']);
configSectie.appendChild(configInhoud);

function createFlitsSectie() {
	infoConfigSectie.style.opacity = '0.6';
	flitsConfigSectie.style.opacity = '1';
	infoConfigSectie.style.fontWeight = 'normal';
	flitsConfigSectie.style.fontWeight = 'bold';
	configInhoud.innerHTML = '';
	let ConfigHeader = create_element(
		'h3',
		'',
		'',
		{},
		'kies de bloemen waar je mee wilt flitsen.'
	);
	configInhoud.appendChild(ConfigHeader);

	for (let bloemnaam of bloemen) {
		let bloemelement = create_element(
			'p',
			[bloemnaam, 'choice'],
			'',
			{},
			bloemnaam
		);
		let vinkje = create_element('img', [], '', {
			src: './resources/vinkje.jpeg',
		});
		bloemelement.onclick = toggleVinkje;
		let containerDiv = create_element('div', ['containerBloemnaam']);
		containerDiv.appendChild(vinkje);
		containerDiv.appendChild(bloemelement);
		configInhoud.appendChild(containerDiv);
	}
	let flitsBtn = create_element('button', [], '', {}, 'begin met flitsen.');
	flitsBtn.onclick = startFlitsen;
	configInhoud.appendChild(flitsBtn);
	let stopBtn = create_element('button', [], '', {}, 'stop.');
	stopBtn.onclick = () => {
		flitsende = false;
	};
	flitsSectie.append(stopBtn);
}

function createInfoSectie() {
	infoConfigSectie.style.opacity = '1';
	flitsConfigSectie.style.opacity = '0.6';
	infoConfigSectie.style.fontWeight = 'bold';
	flitsConfigSectie.style.fontWeight = 'normal';
	configInhoud.innerHTML = '';

	let ConfigHeader = create_element(
		'h3',
		'',
		'',
		{},
		'kies de bloem waar je over wilt vertellen.'
	);
	configInhoud.appendChild(ConfigHeader);

	for (let bloemnaam of bloemen) {
		let bloemelement = create_element(
			'p',
			[bloemnaam, 'choice'],
			'',
			{ value: 'false' },
			bloemnaam
		);
		bloemelement.onclick = showBloemInfo;
		configInhoud.appendChild(bloemelement);
	}
}
infoConfigSectie.onclick = createInfoSectie;
flitsConfigSectie.onclick = createFlitsSectie;

createFlitsSectie();
