/* eslint-disable no-fallthrough */
import numberFormat from '../../../scripts/utils/numberFormat';

const { STATE } = window;

const man = {};
STATE.man = man;

const data = {
	hours: 0,
	days: 0,
	script: 0,
};
man.data = data;

const recalc = ( ) => {
	const {	hours, days, script	} = data;

	let totalPricePerHour;
	const totalHours = hours * days;

	switch ( true ) {
	case ( totalHours <= 50 ):
		totalPricePerHour = 250;
		break;
	case ( totalHours >= 51 && totalHours <= 89 ):
		totalPricePerHour = 235;
		break;
	case ( totalHours >= 90 && totalHours <= 129 ):
		totalPricePerHour = 220;
		break;
	case ( totalHours >= 130 && totalHours <= 159 ):
		totalPricePerHour = 205;
		break;
	case ( totalHours >= 160 ):
		totalPricePerHour = 190;
		break;
	default:
		totalPricePerHour = 250;
	}

	const output = document.querySelector( '[data-calc-output="man"]' );
	let result = totalHours * totalPricePerHour + script;

	result = result < 10000 ? 10000 : result;
	output.textContent = numberFormat( Math.ceil( +result ) );
};

man.setData = ( { path, value } ) => {
	man.data[path] = +value;

	recalc();
};
