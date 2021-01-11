/* eslint-disable no-unused-vars */
import Swiper from 'swiper';

function _swiperInit() {
	const swiper = document.querySelector( '.blog-slider' );

	if ( !swiper ) return;

	const swiperOptions = {
		slidesPerView: 3,
		spaceBetween: 10,
		navigation: {
			nextEl: '.blog-slider__button-next',
			prevEl: '.blog-slider__button-prev',
		},
		pagination: {
			el: '.blog-slider__paginations',
			clickable: true,
			type: 'bullets',
			bulletActiveClass: '-active-',
			bulletClass: 'swiper__dot',
		},
		breakpoints: {
			1200: {
				slidesPerView: 3,
				spaceBetween: 10,
			},
			640: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			480: {
				slidesPerView: 1.5,
				spaceBetween: 10,
			},
			320: {
				slidesPerView: 1,
				spaceBetween: 10,
				slidesPerColumn: 2,
				slidesPerColumnFill: 'row',
			},

		},
	};

	const Slider = new Swiper( '.blog-slider', swiperOptions );
}

export default function blogInit() {
	_swiperInit();
}
