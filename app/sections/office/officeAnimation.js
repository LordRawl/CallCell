/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import gsap from 'gsap';

export default function officeAnimation() {
	gsap.timeline( {
		scrollTrigger: {
			trigger: '.office',
			start: 'top bottom',
		},
	} )
		.fromTo( '.office__arrow-line', {
			strokeDasharray: '0 120',
		}, {
			strokeDasharray: '120 120',
			delay: 1.5,
			duration: 0.5,
		} )
		.fromTo( '.office__arrow-pike', {
			opacity: 0,
		}, {
			opacity: 1,
		} );
}
