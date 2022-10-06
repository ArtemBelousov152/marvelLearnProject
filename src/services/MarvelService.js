import {useHttp} from '../hooks/http.hook'


const useMarvelService = () => {
    const {loading, request, error, setError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apikey = 'apikey=07b9202af18d8ae36452b1644bcb1354';
    const _baseOffsetChar = 230;
    const _baseOffsetComics = 5100;
    const _baseLimit = 1;

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

    const getComic = async (id, url = `${_apiBase}comics/${id}`) => {
    const res = await request(`${url}?${_apikey}`);
    return _transformComics(res.data.results[0]);
    }

    const findChar = async (name) => {
        const modName = name.replace(/ /g, "%20")
        const res = await request(`${_apiBase}characters?nameStartsWith=${modName}&limit=${_baseLimit}&${_apikey}`);
        return _transformCharacter(res.data.results[0])
    }

    const _transformCharacter = (char) => {
        try {
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
        } catch (e) {
            setError(e);
        }
        return {};
    }

    const _transformComics = (comics) => {
        let result = {
            id: comics.id,
            description: comics.description || "There is no desctiption",
            title: comics.title,
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            price: comics.prices[0].price ? comics.prices[0].price + "$" : "Not avalivble",
            page: comics.pageCount || "No information",
            language: comics.textObjects.language || "en-us"
        }

        return {
            ...result
        }
    }

    return {error,
            loading, 
            getAllCharacters, 
            getCharacter, 
            getAllComics, 
            getComic, 
            findChar,
            process,
            setProcess}
}

export default useMarvelService;

