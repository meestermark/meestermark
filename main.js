let projectsSummary = Array.from(document.getElementsByTagName('summary'));

let toggleProject = function (e) {
	console.log(e.target.style.cursor);
	if (e.target.style.cursor === 'zoom-in' || e.target.style.cursor === '') {
		e.target.style.cursor = 'zoom-out';
	} else {
		e.target.style.cursor = 'zoom-in';
	}
};
projectsSummary.forEach((projectSummary) => {
	projectSummary.onclick = toggleProject;
});
