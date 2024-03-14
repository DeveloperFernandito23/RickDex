module.exports = function(api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'], // No quotation marks
      plugins: ['nativewind/babel'],                     // No quotation marks
    };
  };