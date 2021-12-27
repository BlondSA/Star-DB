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
        return response.results.map(this._transformPeople);
    };

    getPerson = async (id) => {
        const response = await this.getResource(
            `${this._apiBase}people/${id}/`
        );
        // console.log(response);
        return this._transformPeople(response);
    };

    getAllPlanets = async () => {
        const response = await this.getResource(`${this._apiBase}planets/`);
        console.log(response);
        return response.results.map(this._transformPlanet);
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

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)\/$/;
        // console.log(item.url.match(idRegExp));
        return item.url.match(idRegExp)[1];
    };

    _transformPlanet = (planet) => {
        return {
            id: this._extractId(planet),
            diameter: planet.diameter,
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
        };
    };

    _transformPeople = (people) => {
        return {
            id: this._extractId(people),
            name: people.name,
            gender: people.gender,
            birthDate: people.birth_year,
            eyeColor: people.eye_color,
        };
    };
}

export default SwapiService;
