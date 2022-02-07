class SwapiService {
    _apiBase = "https://swapi.dev/api/";
    _imageBase = "https://starwars-visualguide.com/assets/img";

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
        return this._transformPeople(response);
    };

    getAllPlanets = async () => {
        const response = await this.getResource(`${this._apiBase}planets/`);
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
        return response.results.map(this._transformStarship);
    };

    getStarship = async (id) => {
        const response = await this.getResource(
            `${this._apiBase}starships/${id}/`
        );
        return this._transformStarship(response);
    };

    _extractId = (item) => {
        const idRegExp = /\/(\d+)*\/$/;
        return item.url.match(idRegExp)[1];
    };

    _transformPlanet = (planet) => {
        const id = this._extractId(planet);
        return {
            id: id,
            imageUrl: `${this._imageBase}/planets/${id}.jpg`,
            diameter: planet.diameter,
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
        };
    };

    _transformPeople = (people) => {
        const id = this._extractId(people);
        return {
            id: id,
            imageUrl: `${this._imageBase}/characters/${id}.jpg`,
            name: people.name,
            gender: people.gender,
            birthDate: people.birth_year,
            eyeColor: people.eye_color,
        };
    };

    _transformStarship = (starship) => {
        const id = this._extractId(starship);
        return {
            id: id,
            imageUrl: `${this._imageBase}/starships/${id}.jpg`,
            name: starship.name,
            model: starship.crew,
            cargo: starship.cargo_capacity,
            cost: starship.cost_in_credits,
        };
    };
}

export default SwapiService;
