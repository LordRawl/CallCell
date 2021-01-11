/* eslint-disable import/prefer-default-export */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );

export default function calcAnimation() {
	gsap.to( '.calc__phone', {
		scrollTrigger: {
			trigger: '.calc__phone-beeps',
			start: 'top center',
		},
		opacity: 1,
		delay: 1.5,
	} );
	gsap.timeline( {
		scrollTrigger: {
			trigger: '.calc__phone-beeps',
			start: 'top center',
			toggleActions: 'play pause play pause',
		},
		repeat: -1,
		repeatDelay: 2,
		delay: 2,
	} )
		.fromTo( '.calc__phone-beep', {
			strokeDasharray: '0 170',
		}, {
			strokeDasharray: '170 170',
			duration: 0.5,
			stagger: 0.4,
		} )
		.fromTo( '.calc__phone-beep', {
			strokeDashoffset: '1',
		}, {
			strokeDashoffset: '-170',
			duration: 0.4,
			stagger: 0.3,
		} );
}
