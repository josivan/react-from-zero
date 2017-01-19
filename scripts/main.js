require.config({
    //By default load any module IDs from js/lib
    baseUrl: '../node_modules',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        'react': 'react/dist/react',
        'react-dom': 'react-dom/dist/react-dom'
    }
});