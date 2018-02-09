exports.config = {
  namespace: 'msrd-wc-range-test',
  generateDistribution: true,
  bundles: [
    { components: ['msrd-range-test'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
