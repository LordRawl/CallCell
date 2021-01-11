/* eslint-disable no-unused-vars */
import Swiper from 'swiper';

function _swiperInit() {
	const swiper = document.querySelector( '.results-slider' );

	if ( !swiper ) return;

	const swiperOptions = {
		slidesPerView: 3,
		spaceBetween: 10,
		navigation: {
			nextEl: '.results-slider__button-next',
			prevEl: '.results-slider__button-prev',
		},
		pagination: {
			el: '.results-slider__paginations',
			clickable: true,
			type: 'bullets',
			bulletActiveClass: '-active-',
			bulletClass: 'swiper__dot',
		},
		breakpoints: {
			1200: {
				slidesPerView: 3,
				spaceBetween: 10,
				// autoHeight: false,
			},
			960: {
				slidesPerView: 2,
				spaceBetween: 10,
				// autoHeight: false,
			},
			320: {
				slidesPerView: 1,
				spaceBetween: 20,
				// autoHeight: true,
			},

		},
	};

	const Slider = new Swiper( '.results-slider', swiperOptions );
}

export default function resultsInit() {
	_swiperInit();
}
