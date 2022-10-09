import {useState, useEffect, useContext, useMemo} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group';

import setContent from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';
import {pageLoaded} from '../../context/context';
import {visibleInfo} from '../../context/context'
import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {getCharacter, process, setProcess} = useMarvelService();

    const context = useContext(pageLoaded)
    const contextVisibleInfo = useContext(visibleInfo)

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;

        if(!charId) {
            return;
        }

        getCharacter(charId)
            .then((data) => {
                setChar(data)
                })
            .then(() => setProcess('confirmed'))
    }

    return (
        <CSSTransition in={document.documentElement.clientWidth > 992 ? context : contextVisibleInfo.infoActive} classNames="char__info" timeout={500}>
            <div className="char__info">
                {setContent(process, View, char)}
            </div>
        </CSSTransition>
    )
}



const View = ({data}) => {
    
    const contextVisibleInfo = useContext(visibleInfo)

    const {name, description, thumbnail, homepage, wiki, comics, style} = data;
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
                    <div 
                        className="char__close"
                        onClick={contextVisibleInfo.onToggleActive}>&#10006;</div>
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