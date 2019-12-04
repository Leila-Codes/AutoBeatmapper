// wow :D

const BEATSABER_VERSION = "2.0.0";

const BEATMAP_INFO = {
	"_version": BEATSABER_VERSION,
	"_songName": "",
	"_songSubName": "",
	"_songAuthorName": "",
	"_levelAuthorName": "",
	"_beatsPerMinute": 0.0,
	"_songTimeOffset": 0.0,
	"_shuffle": 0.0,
	"_shufflePeriod": 0.5,
	"_previewStartTime": 10.0,
	"_previewDuration": 10.0,
	"_songFilename": "<TRACK_NAME>.wav",
	"_coverImageFilename": "<IMAGE_NAME>",
	"_environmentName": "Origins", // MAP TO USE IN-GAME
	"_difficultyBeatmapSets": [
		{
			"_beatmapCharacteristicName": "Standard", // PRESUMABLE, TYPE OF GAMEPLAY? I.E. Standard, Single-Handed & No-Arrows.
			"_difficultyBeatmaps": [
				{
					"_difficulty": "Expert+",
					"_difficultyRank": 7,
					"_beatmapFilename": "Expert+.dat",
					"_noteJumpMovementSpeed": 0.0,
					"_noteJumpStartBeatOffset": 0.0
				}
			]
		}
	]
}

const BEATMAP_EXPERT_PLUS = {
	"_version": BEATSABER_VERSION,
	"_events": [],
	"_notes": [],
	"_obstacles": []
}

const BEATMAPS = {
	appendNotes: (notes) => {
		// IF ARRAY OF NOTES.
		if (notes.length) {
			BEATMAP_EXPERT_PLUS._notes.push(...notes);
		} else if (typeof notes === "object") {
			// SINGLE NOTE
			BEATMAP_EXPERT_PLUS._notes.push(notes);
		}
	}
}