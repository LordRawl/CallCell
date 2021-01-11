/* eslint-disable no-unused-vars */
import Swiper from 'swiper';

function _swiperInit() {
	const swiper = document.querySelector( '.services-slider' );

	if ( !swiper ) return;

	const swiperOptions = {
		navigation: {
			nextEl: '.services-slider__button-next',
			prevEl: '.services-slider__button-prev',
		},
		pagination: {
			el: '.services-slider__paginations',
			clickable: true,
			type: 'bullets',
			bulletActiveClass: '-active-',
			bulletClass: 'swiper__dot',
		},
		breakpoints: {
			1200: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			640: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			320: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
		},
	};
	const Slider = new Swiper( '.services-slider', swiperOptions );
}

export default function servicesInit() {
	_swiperInit();
}
