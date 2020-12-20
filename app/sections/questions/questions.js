/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin( TextPlugin );


export default function questions() {
	gsap.timeline( {
		scrollTrigger: {
			trigger: '.questions',
		},
	} )
		.to( '.questions__name', {
			text: 'Лера Козлова',
			duration: 1,
			delay: 2,
			ease: 'none',
		} )
		.to( '.questions__descr', {
			text: 'Руководитель CallCell',
			duration: 1,
			ease: 'none',
		} )
		.fromTo( '.questions__arrow-line', {
			strokeDasharray: '0 120',
		}, {
			strokeDasharray: '120 120',
			delay: 0.5,
			duration: 0.5,
			ease: 'power1.out',
		} )
		.fromTo( '.questions__arrow-pike', {
			opacity: 0,
		}, {
			opacity: 1,
		} );
}
