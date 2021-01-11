import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );

export default function blogAnimation() {
	gsap
		.timeline( {
			scrollTrigger: {
				trigger: '.blog__line',
				toggleActions: 'play pause play pause',
			},
			repeat: -1,
			delay: 2,
			repeatDelay: 3,
		} )
		.fromTo( '.blog__line', {
			strokeDashoffset: '-610',
		}, {
			strokeDashoffset: '1',
			duration: 2,
			ease: 'power1.out',
		} )
		.fromTo( '.blog__line', {
			strokeDasharray: '610 610',
		}, {
			strokeDasharray: '0 610',
			duration: 2,
			ease: 'power1.in',
		} );
}
