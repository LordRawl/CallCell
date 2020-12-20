/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );

export default function mainInit() {
	gsap.utils.toArray( '.triangles' ).forEach( ( block, i ) => {
		gsap.timeline( {
			scrollTrigger: {
				trigger: block,
				start: 'top bottom-=100px',
				toggleActions: 'play pause play pause',
			},
		} )
			.fromTo( block.querySelectorAll( '.triangles__icon' ), {
				opacity: 0,
				scale: 0.5,
				transformOrigin: '50% 50%',
			}, {
				scale: 1,
				opacity: 1,
				duration: 1,
				stagger: 0.5,
				ease: 'back.out(1.7)',
				repeat: -1,
				yoyo: true,
			} )
			.fromTo( block.querySelectorAll( '.triangles__icon' ), {
				scale: 0.5,
				opacity: 0,
				transformOrigin: '50% 50%',
			}, {
				scale: 1,
				opacity: 1,
				duration: 1,
				stagger: 0.5,
				ease: 'back.out(1.7)',
				repeat: -1,
				yoyo: true,
			}, '-=0.5' );
	} );
}
