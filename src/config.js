
var config = {
    layout: 'ThreeColum',
    modules: [
        {
            name: 'WeatherBasic',
            position: 'left'
        },
        {
            name: 'BasicTime',
            showSeconds: false,
            use24HourTime: false,
            position: 'center'
        },
        {
            name: 'InspirationalQuote',
            position: 'center'
        },
        {
            name: 'WeatherXDays',
            numDays: 5
        }
    ]
};

console.log(config)

export default config;
