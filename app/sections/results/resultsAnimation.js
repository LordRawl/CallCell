/* eslint-disable no-unused-vars */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );

export default function resultsAnimation() {
	gsap
		.timeline( {
			scrollTrigger: {
				trigger: '.results',
				start: 'top center',
			},
			repeat: -1,
			delay: 3,
			repeatDelay: 3,
		} )
		.fromTo( '.results__ribbon', {
			strokeDasharray: '0 380',
		}, {
			strokeDasharray: '380 380',
			delay: 0.5,
			duration: 2,
		} )
		.fromTo( '.results__ribbon', {
			strokeDashoffset: '1',
		}, {
			strokeDashoffset: '-380',
			delay: 1,
			duration: 2,
		} );

	gsap.utils.toArray( '.results__palm' ).forEach( ( palm, i ) => {
		const anim = gsap.timeline( {
			scrollTrigger: {
				trigger: palm,
				start: 'top center',
			},
		} )
			.fromTo( palm.querySelector( '.results__palm-stem' ), {
				strokeDasharray: '0 440',
			}, {
				strokeDasharray: '440 440',
				duration: 1.2,
			} )
			.fromTo( palm.querySelectorAll( '.results__palm-leaflet' ), {
				strokeDasharray: '0 380',
			}, {
				strokeDasharray: '380 380',
				duration: 1,
				stagger: 0.4,
			} );
	} );
}
