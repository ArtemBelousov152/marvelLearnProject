import {useState, useEffect} from 'react';
import PropTypes from 'prop-types'

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import MarvelService from '../services/MarvelService';
import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
        if(char) {
            setLoading(true);
        }
    }, [props.charId])

    const updateChar = () => {
        setError(false);

        const {charId} = props;

        if(!charId) {
            return;
        }

        marvelService
            .getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError)   
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !loading && !error && char ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}



const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics, style} = char;
    let comicsList = null
        if(comics.length === 0) {
        comicsList =  <li key={0} className="char__comics-item">
                        Comics not found!
                    </li>
        } else {
            comicsList = comics.slice(0,10).map((item, i) => {
                return (
                    <li key={i} className="char__comics-item">
                        {item.name}
                    </li>
                )
            })
        }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={style}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsList}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;