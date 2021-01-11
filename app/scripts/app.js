/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */

import './utils/polyfills';
import './utils/globalOptions';
import svg4everybody from 'svg4everybody';
import objectFitImages from 'object-fit-images';
import form from '@blocks/form/form';
import range from '@blocks/range/range';
import tabs from '@blocks/tabs/tabs';
import modal from '@blocks/modal/modal';
import blog from '@sections/blog/blog';
import calc from '@sections/calc/calc';
import header from '@sections/header/header';
import main from '@sections/main/main';
import office from '@sections/office/office';
import questions from '@sections/questions/questions';
import results from '@sections/results/results';
import services from '@sections/services/services';
import stages from '@sections/stages/stages';
import anchor from './utils/anchor';
import lazy from './utils/lazy';

document.addEventListener( 'DOMContentLoaded', () => {
	svg4everybody();
	objectFitImages();

	lazy;
	anchor();

	form();
	range();
	tabs();
	modal();

	blog();
	calc();
	header();
	main();
	office();
	questions();
	results();
	services();
	stages();
} );
