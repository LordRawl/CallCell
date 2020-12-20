/* eslint-disable import/no-unresolved */
/* eslint-disable radix */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-param-reassign */

export function setTabActive( tab ) {
	if ( tab.classList.contains( 'tabs__item--active' ) ) return;

	tab.classList.add( 'tabs__item--active' );

	/* Удаляем активный класс у всех табов */
	for ( let i = 0; i < tab.parentElement.children.length; i++ ) {
		const tabItem = tab.parentElement.children[i];

		if ( tabItem !== tab ) tabItem.classList.remove( 'tabs__item--active' );
	}

	/* Находим нужный блок и ставим ему активный класс, попутно убирая такой у всех остальных */
	const targetTab = tab.getAttribute( 'data-tab-target' );
	const targetContentBlock = document.querySelector( `[data-tab="${targetTab}"]` );
	const tabGroupName = targetContentBlock.getAttribute( 'data-tab-group' );
	const tabGroupBlocks = document.querySelectorAll( `[data-tab-group="${tabGroupName}"]` );

	tabGroupBlocks.forEach( ( contentBlock ) => {
		if ( contentBlock !== targetContentBlock ) contentBlock.classList.remove( 'tabs-content__wrapper--active' );
	} );

	targetContentBlock.classList.add( 'tabs-content__wrapper--active' );
}

export default function tabsBlock( ) {
	document.addEventListener( 'click', ( e ) => {
		if ( !e.target.closest( '[data-tab-target]' ) ) return;

		const tab = e.target.closest( '[data-tab-target]' );
		setTabActive( tab );
	} );
}
