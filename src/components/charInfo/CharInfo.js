import {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import useMarvelService from '../../services/MarvelService';
import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [pageLoaded, setPageLoaded] = useState(false);

    const {loading, error, getCharacter} = useMarvelService();

    

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;
        setPageLoaded(false);
        if(!charId) {
            setPageLoaded(true);
            return;
        }

        getCharacter(charId)
            .then((data) => {
                setChar(data)
                setPageLoaded(true)
                })
    }
    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !loading && !error && char ? <View char={char}/> : null;

    return (
        <CSSTransition in={pageLoaded} classNames="char__info" timeout={500}>
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        </CSSTransition>
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
                const comicUrl = item.resourceURI.split('/')
                return (
                    <li key={i} className="char__comics-item">
                        {/* Получаем id из ссылки на комикс и добавляем в Link */}
                        <Link to={`/comics/${comicUrl[comicUrl.length-1]}`}>{item.name}</Link>
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