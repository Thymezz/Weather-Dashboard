// TODO: Define a City class with name and id properties
class City {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
const dbPath = path.join(__dirname, '../db/db.json');
// TODO: Complete the HistoryService class
class HistoryService {
    // TODO: Define a read method that reads from the searchHistory.json file
    async read() {
        try {
            const data = await fs.readFile(dbPath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            console.error('Error reading from searchHistory.json:', error);
            return [];
        }
    }
    // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
    async write(cities) {
        try {
            await fs.writeFile(dbPath, JSON.stringify(cities, null, 2));
        }
        catch (error) {
            console.error('Error writing to searchHistory.json:', error);
        }
    }
    // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
    async getCities() {
        return await this.read();
    }
    // TODO Define an addCity method that adds a city to the searchHistory.json file
    async addCity(cityName) {
        const cities = await this.read();
        const newCity = new City(uuidv4(), cityName);
        cities.push(newCity);
        await this.write(cities);
        return newCity;
    }
    // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
    async removeCity(id) {
        const cities = await this.read();
        const updatedCities = cities.filter((city) => city.id !== id);
        await this.write(updatedCities);
    }
}
export default new HistoryService();
