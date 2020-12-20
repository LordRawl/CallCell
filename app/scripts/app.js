/* eslint-disable import/no-unresolved */

import './polyfills';
import './globalOptions';
import svg4everybody from 'svg4everybody';
import objectFitImages from 'object-fit-images';
import dashedLine from '@blocks/dashed-line/dashed-line';
import form from '@blocks/form/form';
import range from '@blocks/range/range';
import tabs from '@blocks/tabs/tabs';
import triangles from '@blocks/triangles/triangles';
import modal from '@blocks/modal/modal';
import blog from '@sections/blog/blog';
import calc from '@sections/calc/calc';
import header from '@sections/header/header';
import main from '@sections/main/main';
import questions from '@sections/questions/questions';
import office from '@sections/office/office';
import results from '@sections/results/results';
import services from '@sections/services/services';
import stages from '@sections/stages/stages';
import footer from '@sections/footer/footer';
import anchor from './utils/anchor';
import animation from './utils/animation';

document.addEventListener( 'DOMContentLoaded', () => {
	svg4everybody();
	objectFitImages();

	anchor();
	animation();

	dashedLine();
	form();
	range();
	tabs();
	triangles();
	modal();

	blog();
	calc();
	header();
	main();
	questions();
	office();
	results();
	services();
	stages();
	footer();
} );
