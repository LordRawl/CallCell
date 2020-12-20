/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import gsap from 'gsap';

export default function officeInit() {
	gsap.timeline( {
		scrollTrigger: {
			trigger: '.office',
			start: 'top bottom-=30%',
		},
	} )
		.fromTo( ['.office__title ', '.office__text', '.office__item', '.office__bottom'], {
			opacity: 0,
			y: 50,
		}, {
			opacity: 1,
			y: 0,
			stagger: 0.1,
			ease: 'back.out(1.7)',
		}, 1 )
		.fromTo( '.office__monitor', {
			opacity: 0,
			y: 50,
		}, {
			opacity: 1,
			y: 0,
			duration: 0.8,
		}, 1 )
		.fromTo( '.office__arrow-line', {
			strokeDasharray: '0 120',
		}, {
			strokeDasharray: '120 120',
			delay: 0.5,
			duration: 0.5,
		} )
		.fromTo( '.office__arrow-pike', {
			opacity: 0,
		}, {
			opacity: 1,
		} );
}
