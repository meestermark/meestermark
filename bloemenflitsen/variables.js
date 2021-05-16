let bloemen = ['boterbloem', 'narcis', 'roos', 'tulp', 'viooltje'];

let body = document.getElementsByTagName('body')[0];
let weergaveSectie = document.getElementById('weergaveSectie');
let flitsSectie = document.getElementById('flitsSectie');

let configSectie = document.getElementById('config');
let configPull = document.getElementById('configPull');
let flitsConfigSectie = document.getElementById('flitsConfig');
let infoConfigSectie = document.getElementById('tonenConfig');
let configHeader = document.getElementsByTagName('h3')[0];
let configInhoud = document.getElementById('configInhoud');

//flitsende is een boolean die true is tijdens het flitsen en door de stopknop op false gaat.
let flitsende = false;
let paused = true;

let flitsTime = 4000;
let showNameTime = 1000;
