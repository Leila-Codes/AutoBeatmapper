const NOTES = {
	BLOCK_COLOUR: {
		RED: 0,
		BLUE: 1
	},
	CUT_DIRECTION: {
		UP: 0,
		DOWN: 1,
		LEFT: 2,
		RIGHT: 3,
		UP_LEFT: 4,
		UP_RIGHT: 5,
		DOWN_LEFT: 6,
		DOWN_RIGHT: 7,
		NO_ARROW: 8
	},
	BLOCK_HEIGHT: {
		BOTTOM: 0,
		MIDDLE: 1,
		TOP: 2
	},
	BLOCK_INDEX : {
		FAR_LEFT: 0,
		MID_LEFT: 1,
		MID_RIGHT: 2,
		FAR_RIGHT: 3
	},
	MAKE_NOTE: (time, lineIndex, lineLayer, type, cutDirection) => {
		return {
			"_time": UTILS.roundTime(time),
			"_lineIndex": lineIndex,
			"_lineLayer": lineLayer,
			"_type": type,
			"_cutDirection": cutDirection
		}
	}
};

NOTES.MAKE_RANDOM_NOTE = (time) => {
	return NOTES.MAKE_NOTE(time, UTILS.getRandomInt(0, 3), UTILS.getRandomInt(0, 2), UTILS.getRandomInt(0, 1), UTILS.getRandomInt(0, 1));
};

/*LAYER_MATRIX = [
	0x2, 1x2, 2x2, 2x3
	0x0, 1x1, 1x2, 1x3
	0x0, 0x1, 0x2, 0x3
]*/