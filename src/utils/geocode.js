const request = require('request');

const getLatLon = (address, callback) => {
	// encodeURIComponent - ignores special char in a string
	const url =
		'https://api.openweathermap.org/geo/1.0/direct?q=' +
		encodeURIComponent(address) +
		'&limit=5&appid=cc13f5fd4805cab184476c375839d975';
	request({ url: url }, (error, response) => {
		const data = JSON.parse(response.body);
		if (error) callback(undefined, 'unable to connect to the internet');
		else if (data.length === 0) {
			callback(undefined, 'cannot find location');
		} else {
			callback(
				{
					name: data[0].name,
					latitude: data[0].lat,
					longitude: data[0].lon,
				},
				undefined
			);
		}
	});
};

module.exports = getLatLon