class MarvelService {
    _basicUrl = 'http://gateway.marvel.com/v1/public/'
    _apiKey = 'apikey=012e739fbc32d2282572501b8aa33385'
    _baseOffset = Math.floor(Math.random() * 390)

    getResource = async (url) => {
        let result = await fetch(url);
        if (!result.ok) {
            throw new Error (`Couldn't fetch ${url}, status - ${result.status}`)
        }
        return await result.json()
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        // const randomOffset = Math.floor(Math.random() * 390) ;

        const res = await this.getResource(`${this._basicUrl}characters?limit=9&offset=${offset}&${this._apiKey}`);
        let characters = res.data.results.map(item => this._transformCharacter(item))
        return characters
    }

    getCharacter = async (characterId) => {
        const res = await this.getResource(`${this._basicUrl}characters/${characterId}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelService;