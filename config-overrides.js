const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    config = injectBabelPlugin(
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], // change importing css to less
        config,
    );
    config = rewireLess.withLoaderOptions({
        modifyVars: {
            "@primary-color": "#1D3557",
            "@link-color": "#247BA0",
            "@success-color": "#70C1B3",
            "@warning-color": "#FF1654",
            "@error-color": "#FF1654",
            "@font-size-base": "13px",
            "@heading-color": "#2c2c3d",
            "@text-color": "#2c2c3d",
            "@text-color-secondary ": "rgba(0, 0, 0, .45)",
            "@disabled-color ": "rgba(0, 0, 0, .25)",
            "@border-radius-base": "5px",
            "@border-color-base": "#d9d9d9",
            "@box-shadow-base": "0 2px 8px rgba(0, 0, 0, .15)",

        },
        javascriptEnabled: true,
    })(config, env);
    return config;
};