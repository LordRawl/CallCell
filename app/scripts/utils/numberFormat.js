export default function numberFormat( value ) {
	const parts = value.toString().split( '.' );

	parts[0] = parts[0].replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1 ' );

	return parts.join( '.' );
}
