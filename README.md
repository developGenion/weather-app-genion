
# Weather App Documentation

Welcome to the documentation of My React Application. This application serves as a weather forecasting tool, providing information on current weather conditions, hourly forecasts, a full week's forecast, and the ability to maintain a history of queried cities. Additionally, it offers the functionality to save a city as a favorite and automatically check its forecast.

With My React Application, you can:

- **View Current Weather:** Access real-time weather information for your location or any desired city.

- **Check Hourly Forecast:** Obtain detailed forecasts for the upcoming hours, enabling precise daily planning.

- **Explore Weekly Forecast:** Discover the week's weather outlook to prepare for any events.

- **Search History:** Keep a record of previously queried cities, simplifying access to past searches.

- **Favorite City:** Mark a city as a favorite for quick access to its forecast without repeated searches.

This documentation will guide you through the installation of the application and provide insights into its structure and primary dependencies. Enjoy the weather forecasting experience with My Weather App!

**Tools Used:**
- React (^18.2.0): [Official React Website](https://reactjs.org/)
- Node.js (v18): [Official Node.js Website](https://nodejs.org/)
- Chart.js (^4.4.0): [Chart.js Official Website](https://www.chartjs.org/)
- slick-carousel (^1.8.1): [Package Installation](https://www.npmjs.com/package/slick-carousel)

## Installation

To run this application in your local environment, follow these steps:

1. **Clone this repository:**

   ```bash
   $ git clone https://github.com/your-username/my-react-application.git
   ```

2. **Navigate to the project directory:**

   ```bash
   $ cd my-react-application
   ```

3. **Install the dependencies:**

   ```bash
   $ npm install
   ```

## Usage

Once you have installed the dependencies, you can start the application with the following command:

```bash
$ npm start
```

This will launch the application in development mode. Open your browser and go to [http://localhost:3000](http://localhost:3000) to see the application in action.

## Project Structure

The file structure of the application is as follows:

```bash
my-react-application/
  ├── public/
  │   ├── assets/
  │   │   ├── css/
  │   │   ├── js/
  │   │   ├── mail/
  │   │   ├── media/
  │   │   └── sass/
  │   ├── index.html
  │   └── ...
  ├── src/
  │   ├── components/
  │   │   ├── CityWeather.js
  │   │   ├── WeatherHistories.js
  │   │   ├── WeatherHours.js
  │   │   ├── WeatherToday.js
  │   │   └── WeatherDaily.js
  │   ├── App.css
  │   ├── App.js
  │   ├── App.test.js
  │   ├── favicon.js
  │   ├── index.css
  │   ├── index.html
  │   ├── index.js
  │   └── ...
  ├── package.json
  ├── README.md
  └── ...
```

## Contact

If you have questions or encounter issues, feel free to reach out to the development team at [info@genion.com.co](mailto:info@genion.com).
