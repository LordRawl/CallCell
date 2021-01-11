/* eslint-disable import/no-unresolved */
import './utils/globalOptions';
import dashedLineAnimation from '@blocks/dashed-line/dashed-line';
import trianglesAnimation from '@blocks/triangles/triangles';
import blogAnimation from '@sections/blog/blogAnimation';
import calcAnimation from '@sections/calc/js-utils/calcAnimation';
import footerAnimation from '@sections/footer/footerAnimation';
import headerAnimation from '@sections/header/headerAnimation';
import mainAnimation from '@sections/main/mainAnimation';
import officeAnimation from '@sections/office/officeAnimation';
import questionsAnimation from '@sections/questions/questionsAnimation';
import resultsAnimation from '@sections/results/resultsAnimation';
import stagesAnimation from '@sections/stages/stagesAnimation';
import animationBasic from './utils/animationBasic';

if ( window.innerWidth > window.globalOptions.sizes.md ) {
	trianglesAnimation();
	dashedLineAnimation();

	mainAnimation();
	headerAnimation();
}

animationBasic();

blogAnimation();
calcAnimation();
footerAnimation();
officeAnimation();
questionsAnimation();
resultsAnimation();
stagesAnimation();
