/* eslint-disable no-unused-vars */
/* eslint-disable no-fallthrough */
import numberFormat from '../../../scripts/utils/numberFormat';

const { STATE } = window;

const leads = {};
STATE.leads = leads;

const data = {
	calls: 0,
	hours: 0,
	days: 0,
	script: 0,
	time: 0,
	crm: 0,
	messangers: 0,
	letters: 0,
};
leads.data = data;

const recalc = ( ) => {
	const {
		calls,
		hours,
		days,
		script,
		time,
		crm,
		messangers,
		letters,
	} = data;

	const output = document.querySelector( '[data-calc-output="leads"]' );
	const result = calls * time * 7 + script + crm + messangers + letters;

	output.textContent = numberFormat( Math.ceil( +result ) );
};

leads.setData = ( { path, value } ) => {
	leads.data[path] = +value;

	recalc();
};
