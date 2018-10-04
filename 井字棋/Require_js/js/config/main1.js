require.config({
    baseUrl: 'lib/',
    paths: {
        m1: 'js/m1',
        jquery: ['https://code.jquery.com/jquery-3.3.1'],
        background: 'css/style',
        button: 'css/button',
        test: '../js/test',
    },
    map: {
        '*': {
            css: 'require-css',
        }
    },
})


require(['css!background', 'css!button', 'test', ])