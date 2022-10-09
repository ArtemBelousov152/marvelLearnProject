import {useState, useEffect, useContext} from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';

import mjolnir from '../../resources/img/mjolnir.png';
import {pageLoaded} from '../../context/context';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './randomChar.scss';

const RandomChar = () => {

    const [char, setChar] = useState({});
    const {getCharacter, process, setProcess} = useMarvelService();
    const [charLoaded, setCharLoaded] = useState(false);

    const context = useContext(pageLoaded);

    useEffect(() => {
        updateChar();
    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
        setCharLoaded(true)
    }

    const updateChar = () => {
        setCharLoaded(false);
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
        ;
    }

    return (
        <CSSTransition in={context} timeout={1000} classNames="randomchar">
            <div className="randomchar">
                <CSSTransition in={charLoaded} timeout={500} classNames="randomchar__block">
                    {setContent(process, View, char)}
                </CSSTransition>
                
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner"
                                onClick={updateChar}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        </CSSTransition>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, style, id} = data
    return (
                <div className="randomchar__block">
                    <Link to={`/char/${id}`}>
                        <img 
                            src={thumbnail}
                            alt="Random character"
                            tabIndex={0} 
                            className="randomchar__img" style={style}/>
                    </Link>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {description}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
            )
}

export default RandomChar;