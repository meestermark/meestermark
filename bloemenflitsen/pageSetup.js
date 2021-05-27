//create_element -> type, classNames, id, attributes, innertext, children

// setting up config section

body.onload = () => (configSectie.style.left = '65%');

configPuller.onclick = toggleConfigView;

function clearConfigSectie() {}

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
		let newRow = create_element('tr', ['bloemRow'], '', {
			naam: bloem.naam,
		});
		let nameData = create_element('td', ['bloemnaamContainer']);

		let bloemelement = create_element('p', [], '', {}, bloem.naam);
		if (withVinkje) {
			let vinkje = create_element('img', [], '', {
				src: './resources/vinkje.jpeg',
			});
			newRow.onclick = toggleVinkje;
			nameData.appendChild(vinkje);
		} else {
			newRow.onclick = showBloemInfo;
		}
		nameData.appendChild(bloemelement);
		newRow.appendChild(nameData);
		let bloeitijdData = create_element('td', [], '', {}, bloem.bloeitijd);
		newRow.append(bloeitijdData);
		tableBody.append(newRow);
	}
	table.appendChild(tableBody);
	configInhoud.appendChild(table);
}

highlightConfigHeader = function (highLightedElement) {
	let configHeaders = document.getElementById('configTabs');
	console.log(configHeaders);
	for (child of configHeaders.children) {
		console.log(child);
		child.style.opacity = '0.6';
		child.style.fontWeight = 'normal';
	}
	highLightedElement.style.opacity = '1';
	highLightedElement.style.fontWeight = 'bold';
};
function createFlitsConfigSectie() {
	configInhoud.innerHTML = '';
	highlightConfigHeader(flitsConfigHeader);

	configInhoud.appendChild(
		create_element(
			'h3',
			[],
			'',
			{},
			'kies de bloemen waar je mee wilt flitsen.'
		)
	);
	createBloemElementen(true);
	let flitsBtn = create_element('button', [], '', {}, 'begin met flitsen.');
	flitsBtn.onclick = startFlitsen;
	configInhoud.appendChild(flitsBtn);

	flitsSectie.innerHTML = '';
	weergaveSectie.innerHTML = '';
}

function createInfoConfigSectie() {
	configInhoud.innerHTML = '';
	highlightConfigHeader(infoConfigHeader);

	configInhoud.appendChild(
		create_element(
			'h3',
			[],
			'',
			{},
			'kies de bloemen waar je over wilt vertellen.'
		)
	);
	createBloemElementen(false);

	flitsSectie.innerHTML = '';
	weergaveSectie.innerHTML = '';
}

infoConfigHeader.onclick = createInfoConfigSectie;
flitsConfigHeader.onclick = createFlitsConfigSectie;

//createFlitsSectie();
