module.exports = ( blockName ) => `
mixin ${blockName}()
  <!--begin ${blockName}-->
  +b('section').${blockName}&attributes(attributes)
    .container
      +e.content
        block

  <!--end ${blockName}-->
    
`;
