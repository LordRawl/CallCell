import noUiSlider from 'nouislider';

export default function rangeFunc() {
	const ranges = document.querySelectorAll( '.js-range' );

	ranges.forEach( ( range ) => {
		noUiSlider.create( range, {
			start: range.dataset.start,
			connect: 'lower',
			step: range.dataset.step ? +range.dataset.step : null,
			range: {
				min: +range.dataset.min,
				...JSON.parse( range.dataset.steps ? range.dataset.steps : 0 ),
				max: +range.dataset.max,
			},
		} );

		range.noUiSlider.on( 'update', ( values, handle, unencoded, tap, positions, slider ) => {
			const handler = slider.target.querySelector( '.noUi-handle' );
			let position = positions[0].toFixed( 0 );
			position = position > 80 ? 80 : position;
			handler.style.transform = `translate(-${position}%, -50%)`;
		} );
	} );
}
