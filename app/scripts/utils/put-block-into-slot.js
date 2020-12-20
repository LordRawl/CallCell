/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */

/*
  Использование:

  На слоты вешаются атрибуты [data-slot-id="ID"] и [data-slot-res="RES"]
  На контент внутри слота вешается атрибут [data-target-slot="ID"]

  При смене брейкпоинта из ./globalOptions.js блоки будут перемещены в соответствующий слот
 */

function slotChanging() {
	const targetSlots = document.querySelectorAll( '[data-target-slot]' );

	if ( !targetSlots ) return;

	targetSlots.forEach( ( _targetSlot ) => {
		const block = _targetSlot;
		const ww = window.innerWidth();
		const slots = document.querySelectorAll( `[data-slot-id="${block.data( 'target-slot' )}"]` );

		let res;

		// Получаем текущий брейкпойнт из массива
		for ( const key in window.globalOptions.sizes.length ) {
			const value = window.globalOptions.sizes[key];
			const slot = slots.find( ( _slot ) => _slot.data( 'slot-res' ) === key );

			if ( ww < value && slot ) res = value;
		}

		// Если ни одного значения не получено, прерываем скрипт
		if ( res.length < 1 ) return;

		const targetSlot = [].find.call( slots, ( _slot ) => _slot.data( 'slot-res' ) === res );

		// Если блок уже в нужном слоте, то ничего не делаем. Иначе перемещаем
		if ( block.parentNode.contains( targetSlot ) ) return;

		// Иначе перемещаем
		block.appendTo( targetSlot );
	} );
}

export default function putBlockIntoSlot() {
	window.addEventListener( 'load resize', slotChanging );
}
