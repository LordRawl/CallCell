/* eslint-disable no-unused-vars */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );

export default function stagesAnimation() {
	gsap
		.timeline( {
			repeat: -1,
			delay: 5,
			repeatDelay: 3,
			scrollTrigger: {
				trigger: '.stages__infinite',
				toggleActions: 'play pause play pause',
			},
		} )
		.fromTo( '.stages__infinite', {
			strokeDasharray: '0 390',
		}, {
			strokeDasharray: '390 390',
			duration: 2.5,
		} )
		.fromTo( '.stages__infinite', {
			strokeDashoffset: '1',
		}, {
			strokeDashoffset: '-390',
			delay: 1,
			duration: 2.5,
		} );

	gsap.timeline( {
		scrollTrigger: {
			trigger: '.stages',
			start: 'top bottom+=10%',
		},
	} )
		.to( '.stages__line line', {
			strokeDasharray: '20 20',
			stagger: 0.03,
		}, 1 )
		.fromTo( '.stages__item', {
			opacity: 0,
			y: 50,
		}, {
			opacity: 1,
			y: 0,
			stagger: 0.4,
		}, 1 );
}
