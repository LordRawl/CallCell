/* eslint-disable no-unused-vars */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );

export default function dashedLineAnimation() {
	gsap.utils.toArray( '.dashed-line' ).forEach( ( wrapper, i ) => {
		const lines = wrapper.querySelectorAll( '.dashed-line__svg *' );
		gsap.timeline( {
			scrollTrigger: {
				trigger: wrapper,
				scrub: true,
				start: 'top bottom-=10%',
				end: 'top 10%',
				toggleActions: 'play pause play pause',
			},
		} )
			.fromTo( lines, {
				strokeDashoffset: '-40',
			}, {
				strokeDashoffset: '-80',
				stagger: 0.2,
			} );
	} );
}
