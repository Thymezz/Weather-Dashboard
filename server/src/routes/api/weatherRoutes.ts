import { Router, Request, Response } from 'express';
import HistoryService from '../../service/historyService';
import WeatherService from '../../service/weatherService';

const router = Router();

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    const { cityName } = req.body;
    if (!cityName) {
      // TODO: Return an error if city name is not provided
      return res.status(400).json({ error: 'City name is required' });
    }

    // TODO: GET weather data from city name
    const weatherData = await WeatherService.getWeatherForCity(cityName);

    // TODO: Save city to search history
    await HistoryService.addCity(cityName);

    // TODO: Return the weather data as a JSON response
    return res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // TODO: Handle server error when fetching weather data
    return res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    // TODO: Retrieve search history from the database
    const history = await HistoryService.getCities();

    // TODO: Return the search history as a JSON response
    return res.json(history);
  } catch (error) {
    console.error('Error fetching search history:', error);
    // TODO: Handle server error when fetching search history
    return res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // TODO: Remove city from search history using its ID
    await HistoryService.removeCity(id);

    // TODO: Return success message after deleting city
    return res.status(200).json({ message: 'City removed from history' });
  } catch (error) {
    console.error('Error deleting city:', error);
    // TODO: Handle server error when deleting a city from history
    return res.status(500).json({ error: 'Failed to delete city from history' });
  }
});

export default router;
