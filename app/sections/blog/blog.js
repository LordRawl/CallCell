/* eslint-disable no-unused-vars */
import Swiper from 'swiper';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );

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
		breakpoints: {},
	};

	const Slider = new Swiper( '.blog-slider', swiperOptions );
}

export default function blog() {
	_swiperInit();

	gsap.timeline( {
		scrollTrigger: {
			trigger: '.blog__line',
			toggleActions: 'play pause play pause',
		},
		repeat: -1,
		delay: 3,
		repeatDelay: 3,
	} )
		.fromTo( '.blog__line', {
			strokeDashoffset: '-610',
		}, {
			strokeDashoffset: '1',
			duration: 2.5,
			ease: 'power1.out',
		} )


		.fromTo( '.blog__line', {
			strokeDasharray: '610 610',
		}, {
			delay: 1,
			strokeDasharray: '0 610',
			duration: 2.5,
			ease: 'power1.out',
		} );
}
