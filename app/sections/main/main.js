/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */

const animationTextFunc = () => {
	const animationText = document.querySelector( '[data-animation-text]' );

	if ( !animationText ) return;

	const textArr = JSON.parse( animationText.getAttribute( 'data-animation-text' ) );

	const LETTER_TYPE_DELAY = 75;
	const WORD_STAY_DELAY = 3000;

	const DIRECTION_FORWARDS = 0;
	const DIRECTION_BACKWARDS = 1;

	let direction = DIRECTION_FORWARDS;
	let wordIndex = 0;
	let letterIndex = 0;

	let wordTypeInterval;

	function nextWord() {
		letterIndex = 0;
		direction = DIRECTION_FORWARDS;
		wordIndex++;

		if ( wordIndex === textArr.length ) {
			wordIndex = 0;
		}
	}

	function startTyping() {
		wordTypeInterval = setInterval( typeLetter, LETTER_TYPE_DELAY );
	}

	function typeLetter() {
		const word = textArr[wordIndex];

		if ( direction === DIRECTION_FORWARDS ) {
			letterIndex++;

			if ( letterIndex === word.length ) {
				direction = DIRECTION_BACKWARDS;
				clearInterval( wordTypeInterval );
				setTimeout( startTyping, WORD_STAY_DELAY );
			}
		} else if ( direction === DIRECTION_BACKWARDS ) {
			letterIndex--;

			if ( letterIndex === 0 ) {
				nextWord();
			}
		}

		const textToType = word.substring( 0, letterIndex );

		animationText.innerHTML = textToType;
	}

	startTyping();
};

export default function mainInit() {
	window.addEventListener( 'load', () => {
		setTimeout( () => {
			animationTextFunc();
		}, 1000 );
	} );
}
