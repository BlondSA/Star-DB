import { extractId } from "../utils/utils";
class SwapiService {
    _apiBase = "https://swapi.dev/api/";

    getResource = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `Could not get resource ${url}, received ${response.status}`
            );
        }
        return await response.json();
    };

    getAllPeople = async () => {
        const response = await this.getResource(`${this._apiBase}people/`);
        return response.results;
    };

    getPerson = async (id) => {
        const response = await this.getResource(
            `${this._apiBase}people/${id}/`
        );
        return this._transformPeople(response);
    };

    getAllPlanets = async () => {
        const response = await this.getResource(`${this._apiBase}planets/`);
        return response.results;
    };

    getPlanet = async (id) => {
        const response = await this.getResource(
            `${this._apiBase}planets/${id}/`
        );
        return this._transformPlanet(response);
    };

    getAllStarships = async () => {
        const response = await this.getResource(`${this._apiBase}starships/`);
        return response.results;
    };

    getStarship = async (id) => {
        const response = await this.getResource(
            `${this._apiBase}starships/${id}/`
        );
        return response.result.properties;
    };

    _transformPlanet = (planet) => {
        return {
            id: extractId(planet),
            diameter: planet.diameter,
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
        };
    };

    _transformPeople = (people) => {
        return {
            id: extractId(people),
            diameter: people.diameter,
            name: people.name,
            population: people.population,
            rotationPeriod: people.rotation_period,
        };
    };
}

export default SwapiService;
