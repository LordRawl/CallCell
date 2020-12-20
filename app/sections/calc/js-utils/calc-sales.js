/* eslint-disable no-fallthrough */
import numberFormat from '../../../scripts/utils/numberFormat';

const { STATE } = window;

const sales = {};
STATE.sales = sales;

const data = {
	contacts: 0,
	script: 0,
	client: 0,
	lpr: 0,
	crm: 0,
	messangers: 0,
	letters: 0,
};
sales.data = data;

const recalc = ( ) => {
	const {
		contacts,
		script,
		client,
		lpr,
		crm,
		messangers,
		letters,
	} = data;


	const output = document.querySelector( '[data-calc-output="sales"]' );
	const result = 0.7 * contacts * ( client + lpr + crm + messangers + letters ) + script;

	output.textContent = numberFormat( Math.ceil( +result ) );
};

sales.setData = ( { path, value } ) => {
	sales.data[path] = +value;

	recalc();
};
