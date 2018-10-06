(function () {
	
	var buttons = document.querySelectorAll('.btn');
	console.log(buttons);
	for (let i=0; i < buttons.length; i++){
		let button = buttons[i];
		button.addEventListener('click', function (e) {
			button.classList.toggle('active');
		});
	}
})()