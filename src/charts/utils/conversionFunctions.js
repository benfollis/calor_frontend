const converters = {
    'C': {
        'C': (t) => t,
        'K': (t) => t + 273.15,
        'F': (t) => (t * 1.8) + 32

    },
    'F': {
        'F': (t) => t,
        'C': (t) => (t - 32) / 1.8,
        'K': (t) => ((t - 32) / 1.8) + 273.15
    },
    'K': {
        'K': (t) => t,
        'C': (t) => t - 273.15,
        'F': (t) => ((t - 273.15) * 1.8) + 32
    }
};


export function convertUnit(reading, outputUnit) {
    const converter = converters[reading.Unit][outputUnit];
    const newTemp = converter(reading.Temp);
    return {
        ...reading,
        Temp: newTemp,
        Unit: outputUnit,
    };
}
