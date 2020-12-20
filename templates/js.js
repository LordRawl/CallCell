module.exports = ( blockName ) => `
const { $ } = window;

export default function ${blockName} () {
  console.log('${blockName} Works!');
};

`;
