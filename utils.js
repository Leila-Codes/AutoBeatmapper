const UTILS = {
	roundTime: (time) => {
		let dec = time % 1;
			if (dec < 0.1175) {
				dec = 0;
			} else if (dec < 0.375) {
				dec = 0.25;
			} else if (dec < 0.625) {
				dec = 0.5;
			} else if (dec < 0.875) {
				dec = 0.75;
			} else {
				time += 1;
				dec = 0;
			}
			return Math.floor(time) + dec;
	},
	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	} 
}