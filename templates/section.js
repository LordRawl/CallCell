module.exports = ( blockName ) => `
mixin ${blockName}()
  <!--begin ${blockName}-->
  +b('section').${blockName}&attributes(attributes)
    .container
      +e.content
        block

  <!--end ${blockName}-->
    
mixin ui-kit-${blockName}()
  +ui-section
    +ui-section-head
      +ui-title Компонент ${blockName}
      +ui-path
        p Компонент: components/${blockName}/${blockName}
      +ui-description
        p Описание компонента
  
    +ui-section-content()
      +${blockName}
      
    //- При +ui-section-content(true) контейнер отсутствует
    //- Для перечисления инлайновых блоков используется миксин +ui-elements-list()
    //- Рамка вокруг особой секции: +ui-special()
`;
