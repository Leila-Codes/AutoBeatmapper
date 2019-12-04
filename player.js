var player = new Audio();
var context;

var src, analyser, filter, filter2;

var loop;

var binCount = 1024;

//JSON.stringify(BEATMAP);

function loadAudio(e) {
	let files = e.target.files;

	var reader = new FileReader();

	reader.onload = function(e) {
		context = new AudioContext();

		// Set-up the player to load file data.
		player.src = e.target.result;
		// Adjust volume for comfort
		player.volume = 0.6;
		// Play audio.
		player.play();

		// Set-up the audio player as an audio source.
		src = context.createMediaElementSource(player);

		// Create analyser node to proceed the audio.
		//analyser = context.createAnalyser();
		filter = context.createBiquadFilter();
		filter.type = 'lowpass';
		filter.frequency.value = 320;
		
		/*filter2 = context.createBiquadFilter();
		filter2.type = 'highpass';*/
		analyser = context.createAnalyser();


		src.connect(filter);
		filter.connect(analyser);
		analyser.connect(context.destination);


		//src.connect(filter);
		//src.connect(filter2);
		
		/*analyser = context.createAnalyser();
		filter.connect(analyser);
		analyser.connect(context.destination);*/
		//filter2.connect(context.destination);


		// Connect source of audio to analyser.
		//src.connect(analyser);
		// Connect analyser to the output (headphones/speakers)
		//analyser.connect(context.destination);

		//analyser.fftSize = binCount;

		if (loop) {
			clearInterval(loop);
		}

		initialiseVisualizer();
		//loop = setInterval(analyseSample, 250);
		analyseSample();
		
	}

	// Load the selected file.
	reader.readAsDataURL(files[0]);
}

var THRESHOLD_VALUE = 160;



function getBarPercent(value) {
	return getPercent(value, 255);
}
function getPercent(value, max) {
	return (value / max) * 100;
}

var vizContainer;
var vizBars = {};

function createBar(instrumentName, cutoff) {
	// Div - Container.
	var container = document.createElement("div");
	container.className = "instrument-container";

	// Div - instrument's current volume bar.
	var instrumentBar = document.createElement("div");
	instrumentBar.className = "instrument-current";
	container.appendChild(instrumentBar);

	// Div - marker for where we're configured to create a note at.
	/*var threshold = document.createElement("div");
	threshold.className = "instrument-threshold";
	// Set-up threshold position to represent the current configuration.
	threshold.style.left = (CONFIG.INSTRUMENT_SENSITIVITY[type][instrument]).toFixed(2) + "%";

	container.appendChild(threshold);*/

	// Em - the name of the instrument to display.
	var name = document.createElement("em");
	name.innerHTML = instrumentName.substring(0, 1).toUpperCase() + instrumentName.toLowerCase().substring(1);
	container.appendChild(name);

	// Finally, add the set of elements to the visualizer
	vizBars[instrumentName] = instrumentBar;
	return container;
	//vizContainer.appendChild(container);
}

function initialiseVisualizer() {
	// Get and Clear the container.
	vizContainer = document.getElementById("visualizer");
	vizContainer.innerHTML = "";

	for (var i = 0; i < binCount / 2; i++ ) {
		vizContainer.appendChild(createBar("bar" + i.toString()));
	}

	/* EXAMPLE INSTRUMENT BAR ELEMENT(S)
	<!--div class="instrument-container">
		<div class="instrument-current"></div>
		<div class="instrument-threshold"></div>
	</div><em>INSTRUMENT_NAME</em-->
	*/

	// Create a bar for each instrument
	/*for (var type of Object.keys(INSTRUMENTS)) {
		for (var instrument of Object.keys(INSTRUMENTS[type])) {
			
		}
	}*/
}

var cooldown = 0;


function analyseSample() {
	if (!player.paused) {

		requestAnimationFrame(analyseSample);

		var dataArray = new Uint8Array(binCount / 2);

		analyser.getByteFrequencyData(dataArray);
		//analyser.getByteTimeDomainData(dataArray);

		//console.log(player.currentTime, dataArray.slice(0, 24));

		for (var type of Object.keys(INSTRUMENTS)) {
			for (var instrument of Object.keys(INSTRUMENTS[type])) {
				let val = INSTRUMENTS.PERCUSSION[instrument];
				let barVal = dataArray[val];

				let percent = getBarPercent(barVal);
				
				// Get the HTML bar element for this instrument.
				//let barEl = vizBars[instrument];
				// Check it exists before trying to work on it.
				/*if (barEl) {
					// Update it's width to be the current volume at this frequency.
					barEl.style.width = percent + "%";
				}*/

				if (percent >= CONFIG.INSTRUMENT_SENSITIVITY[type][instrument]) {
          			if (player.currentTime >= cooldown) {
						console.log(`INSTRUMENT ${instrument} CREATED NEW NOTE.`)
						// TODO: PLACE NOTE(s)
						BEATMAPS.appendNotes(NOTES.MAKE_RANDOM_NOTE(player.currentTime));

						cooldown = player.currentTime + CONFIG.COOLDOWN_PERIOD;
					  }
				}
			}
		}

		for (var i = 0; i < dataArray.length; i++) {
			let percent = getBarPercent(dataArray[i]);
			vizBars["bar" + i.toString()].style.width = percent.toFixed(3) + "%";

			let green = 255 * (100 - percent);
			let red = 255 * percent;
			
			vizBars["bar" + i.toString()].style.backgroundColor = `rgb(${red}, ${green}, 0)`;
			
			/*if (percent > 20 && percent < 40) {
				vizBars["bar" + i.toString()].style.backgroundColor = "gold";
			} else if (percent > 70) {
				vizBars["bar" + i.toString()].style.backgroundColor = "red";
			} else {
				vizBars["bar" + i.toString()].style.backgroundColor = "green";
			}*/
		}

		/*for (var i = 0; i < 16; i++) {
			let barVal = dataArray[i];

			let percentage = getBarPercent(barVal);

			let el = document.getElementById("bar" + (i + 1));

			el.style.width = percentage.toFixed(2) + "%";
			el.innerHTML = "<p>" + percentage.toFixed(2) + "</p>";

			// LENGTH OF SONG = player.duration
			// CURRENT POINT IN PLAYBACK = player.currentTime

			if (i < 4) {
				if (barVal > THRESHOLD_VALUE) {
					addNote(player.currentTime, getRandomInt(0, 4), getRandomInt(0, 3), getRandomInt(0, 2), getRandomInt(0, 9));
				}
			}
		}*/

	} else {


		let mapInfo = JSON.stringify(BEATMAP_INFO);
		let mapData = JSON.stringify(BEATMAP_EXPERT_PLUS);

		var a = document.createElement("a");
		var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(mapInfo);
		//var dlAnchorElem = document.getElementById('downloadAnchorElem');
		a.setAttribute("href",     dataStr     );
		a.setAttribute("download", "Info.dat");
		a.click();

		var dataStr2 = "data:text/json;charset=utf-8," + encodeURIComponent(mapData);
		a.setAttribute("href",     dataStr2     );
		a.setAttribute("download", "Expert+.dat");
		a.click();


		console.log(mapData);
		if (loop) {
			clearInterval(loop);
		}
	}
}