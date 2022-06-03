const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode')
const forecast = require('./utils/weather')

const app = express();

// Defining paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath); // express looks up for hbs(dynamic html) files in views folder (default) from root folder, so if we want to change it we have to set it
hbs.registerPartials(partialsPath);

// setup static dir to serve so that express can use it
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Adarsh Shahi',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About page',
		name: 'Adarsh shahi',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		text: 'this line may help you',
		title: 'Help Page',
		name: 'Adarsh Shahi',
	});
});

app.get('/weather', (req, res) => {
    const address = req.query.address
	if (address) {
		geocode(address, (data, error) => {
			if(error) res.send({error})
			else{
				forecast(data.latitude, data.longitude, (forecastData, error) => {
					if(error) res.send({error}) 
					else{
						res.send({
							location: data.name,
							temperature: forecastData.temperature,
							feelslike: forecastData.feelslike,
							forecast: forecastData.forecast
						})
					}
				})
			}
		})
		
	} else res.send({
        error: "enter proper query with 'address'"});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'About page',
		name: 'Adarsh shahi',
		message: '404 - cannot find help article',
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: 'About page',
		name: 'Adarsh shahi',
		message: '404 - page not found',
	});
});

app.listen(3000, () => {
	console.log('server has started on port 3000');
});
