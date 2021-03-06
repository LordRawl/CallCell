/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );

export default function mainAnimation() {
	gsap
		.timeline( {
			repeat: -1,
			delay: 3,
			repeatDelay: 3,
			scrollTrigger: {
				trigger: '.main__infinite',
				toggleActions: 'play pause play pause',
			},
		} )
		.fromTo( '.main__infinite', {
			strokeDasharray: '0 330',
		}, {
			strokeDasharray: '330 330',
			duration: 2.5,
		} )
		.fromTo( '.main__infinite', {
			strokeDashoffset: '1',
		}, {
			strokeDashoffset: '-330',
			delay: 1,
			duration: 2.5,
		} );

	gsap
		.timeline( { } )
		.fromTo( ['.main-offers__item', '.main__title', '.main__block', '.main__present', '.main__bottom'], {
			opacity: 0,
			y: 50,
		}, {
			opacity: 1,
			y: 0,
			stagger: 0.1,
			ease: 'back.out(1.7)',
		}, 'begin' )
		.fromTo( '.main__img-wrapper', {
			opacity: 0,
			y: 50,
		}, {
			opacity: 1,
			y: 0,
			duration: 0.8,
		}, 'begin' )
		.fromTo( '.main-present__arrow-line', {
			strokeDasharray: '0 380',
		}, {
			strokeDasharray: '380 380',
			delay: 0.5,
			duration: 1,
		} )
		.fromTo( '.main-present__arrow-pike', {
			opacity: 0,
		}, {
			opacity: 1,
		} )
		.fromTo( '.main-cloud', {
			opacity: 0,
			x: -50,
		}, {
			opacity: 1,
			x: 0,
			ease: 'back.out(1.7)',
		} );
}
