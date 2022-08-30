import {useHttp} from '../hooks/http.hook'


const useMarvelService = () => {
    const {loading, request, error} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apikey = 'apikey=07b9202af18d8ae36452b1644bcb1354';
    const _baseOffsetChar = 210;
    const _baseOffsetComics = 5100;

    const getAllCharacters = async (offset = _baseOffsetChar) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apikey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apikey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = _baseOffsetComics) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apikey}`);
        return res.data.results.map(_transformComics)
    }

    const _transformCharacter = (char) => {
        let result = {
            name: char.name,
            description: char.description || 'Description not found.',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            style: {"objectFit": "cover"},
            comics: char.comics.items
        }

        if (result.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        result.style = {"objectFit": "fill"}
    }
        return {
            ...result
        }
    }

    const _transformComics = (comics) => {
        let result = {
            title: comics.title,
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            price: comics.prices[0].price ? comics.prices[0].price + "$" : "Not avalivble"
        }

        return {
            ...result
        }
    }

    return {error, loading, getAllCharacters, getCharacter, getAllComics}
}

export default useMarvelService;
