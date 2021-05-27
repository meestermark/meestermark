//create_element -> type, classNames, id, attributes, innertext, children

// setting up config section

configPull.onclick = toggleConfig;
body.onload = pullConfig;
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
	let table = create_element('table');
	let tableHead = create_element('thead');
	let headerRow = create_element('tr');
	let headerName = create_element('th', [], '', {}, 'naam');
	let headerBloeitijd = create_element('th', [], '', {}, 'bloeitijd');
	headerRow.appendChild(headerName);
	headerRow.appendChild(headerBloeitijd);
	tableHead.appendChild(headerRow);
	table.appendChild(tableHead);

	let tableBody = create_element('tbody', [], 'configTableBody');
	for (let bloem of bloemen) {
		let newRow = create_element('tr');
		let nameData = create_element('td', ['bloemnaamContainer']);
		let naam = bloem.naam;
		let bloemelement = create_element(
			'p',
			[bloem.naam, 'choice'],
			'',
			{},
			bloem.naam
		);
		if (withVinkje) {
			let vinkje = create_element('img', [], '', {
				src: './resources/vinkje.jpeg',
			});
			newRow.onclick = toggleVinkje;
			nameData.appendChild(vinkje);
			nameData.appendChild(bloemelement);
			newRow.appendChild(nameData);
		} else {
			newRow.onclick = showBloemInfo;
			newRow.appendChild(bloemelement);
		}
		let bloeitijdData = create_element('td', [], '', {}, bloem.bloeitijd);
		newRow.append(bloeitijdData);
		tableBody.append(newRow);
	}
	table.appendChild(tableBody);
	configInhoud.appendChild(table);
}
function createFlitsConfigSectie() {
	clearConfigSectie();
	weergaveSectie.innerHTML = '';
	configHeader.innerText = 'kies de bloemen waar je mee wilt flitsen.';
	createBloemElementen(true);

	let flitsBtn = create_element('button', [], '', {}, 'begin met flitsen.');
	flitsBtn.onclick = startFlitsen;
	configInhoud.appendChild(flitsBtn);
	flitsSectie.innerHTML = '';
}

function createInfoConfigSectie() {
	clearConfigSectie();
	flitsSectie.innerHTML = '';
	configHeader.innerText = 'kies de bloemen waar je mee wilt flitsen.';
	createBloemElementen(false);
}
infoConfigSectie.onclick = createInfoConfigSectie;
flitsConfigSectie.onclick = createFlitsConfigSectie;

createFlitsSectie();
