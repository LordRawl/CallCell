/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );

function _footerAnimInit() {
	gsap
		.timeline( {
			scrollTrigger: {
				trigger: '.footer',
				start: 'top bottom',
			},
		} )
		.fromTo( ['.footer__logo', '.footer__item', '.footer__call'], {
			opacity: 0,
			y: 50,
		}, {
			opacity: 1,
			y: 0,
			stagger: 0.1,
			ease: 'back.out(1.7)',
		} );
}

export default function footerInit() {
	_footerAnimInit();
}
