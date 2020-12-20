/* eslint-disable no-unused-vars */
import Swiper from 'swiper';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function _swiperInit() {
	const swiper = document.querySelector( '.services-slider' );

	if ( !swiper ) return;

	const swiperOptions = {
		slidesPerView: 3,
		spaceBetween: 20,
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
			// 641: {
			// 	slidesPerView: 3,
			// 	spaceBetween: 20,
			// 	// autoHeight: false,
			// },
			// 320: {
			// 	slidesPerView: 1,
			// 	spaceBetween: 20,
			// 	// autoHeight: true,
			// },
		},
	};
	const Slider = new Swiper( '.services-slider', swiperOptions );
}

export default function services() {
	_swiperInit();

	gsap.registerPlugin( ScrollTrigger );

	gsap.timeline( {
		scrollTrigger: {
			trigger: '.services__hand',
			start: 'top bottom-=20%',
		},
	} )
		.fromTo( '.services__hand-line', {
			strokeDasharray: '0 900',
		}, {
			strokeDasharray: '900 900',
			delay: 0.5,
			duration: 2,
			stagger: 0.2,
		} );
}
