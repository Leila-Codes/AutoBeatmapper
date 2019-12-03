var player = new Audio();
var context = new AudioContext();

var src, analyser;

var loop;

var binCount = 128;

/*var BEATMAP_NOTE = {
	"_time": 0,
	"_lineIndex": 0,
	"_lineLayer": 0,
	"_type": 0,
	"_cutDirection": 0
};*/

var BEATMAP = {
    "_version": "2.0.0",
    "_events": [],
	"_notes": [],
	"_obstacles": []
};

function addNote(time, lineIndex, lineLayer, type, cutDirection) {
	var BEATMAP_NOTE = {
		"_time": timeRound(time),
		"_lineIndex": lineIndex,
		"_lineLayer": lineLayer,
		"_type": type,
		"_cutDirection": cutDirection
	}

	BEATMAP._notes.push(BEATMAP_NOTE);
}

function timeRound(time) {
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
}


//JSON.stringify(BEATMAP);

function loadAudio(e) {
	let files = e.target.files;

	var reader = new FileReader();

	reader.onload = function(e) {
		// Set-up the player to load file data.
		player.src = e.target.result;
		// Adjust volume for comfort
		player.volume = 0.2;
		// Play audio.
		player.play();

		// Set-up the audio player as an audio source.
		src = context.createMediaElementSource(player);

		// Create analyser node to proceed the audio.
		analyser = context.createAnalyser();
		// Connect source of audio to analyser.
		src.connect(analyser);
		// Connect analyser to the output (headphones/speakers)
		analyser.connect(context.destination);

		analyser.fftSize = binCount;

		if (loop) {
			clearInterval(loop);
		}

		loop = setInterval(analyseSample, 250);
		//analyseSample();
		
	}

	// Load the selected file.
	reader.readAsDataURL(files[0]);
}

var THRESHOLD_VALUE = 160;

// MAX is EXCLUSIVE
function getRandomInt(min, max) {
  return Math.floor(Math.random() * Math.floor(max)) + min;
}

function analyseSample() {
	if (!player.paused) {

		//requestAnimationFrame(analyseSample);

		var dataArray = new Uint8Array(binCount / 2);

		analyser.getByteFrequencyData(dataArray);

		for (var i = 0; i < 16; i++) {
			let barVal = dataArray[i];
			let maxVal = 255;

			let percentage = (barVal / maxVal) * 100;

			let el = document.getElementById("bar" + (i + 1));

			el.style.width = percentage.toFixed(2) + "%";
			el.innerHTML = "<p>" + barVal.toString() + "</p>";

			// LENGTH OF SONG = player.duration
			// CURRENT POINT IN PLAYBACK = player.currentTime

			if (i < 4) {
				if (barVal > THRESHOLD_VALUE) {
					addNote(player.currentTime, getRandomInt(0, 4), getRandomInt(0, 3), getRandomInt(0, 2), getRandomInt(0, 9));
				}
			}
		}

	} else {
		let mapData = JSON.stringify(BEATMAP);
		console.log(mapData);
	}
}