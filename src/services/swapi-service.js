class SwapiService {
    _apiBase = "https://www.swapi.tech/api/";

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
        return response.result.properties;
    };

    getAllPlanets = async () => {
        const response = await this.getResource(`${this._apiBase}planets/`);
        return response.results;
    };

    getPlanet = async (id) => {
        const response = await this.getResource(
            `${this._apiBase}planets/${id}/`
        );
        return this._transformPlanet(response.result);
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

    _transformPlanet = ({ uid, properties }) => {
        return {
            id: uid,
            diameter: properties.diameter,
            name: properties.name,
            population: properties.population,
            rotationPeriod: properties.rotation_period,
        };
    };
}

export default SwapiService;
