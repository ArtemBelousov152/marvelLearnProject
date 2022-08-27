import {useState, useEffect, useRef} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../services/MarvelService';
import PropTypes from 'prop-types'

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest()
    }, [])

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true
        }

        setCharList(charList => [...charList, ...newCharList]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService
            .getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError);
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        
        itemRefs.current.forEach(item => {
            item.classList.remove("char__item_selected")
        });
        itemRefs.current[id].classList.add("char__item_selected");
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        const charElements = arr.map((item, i) => {
            const {name, thumbnail, style, id} = item
            return (
                <li
                    className="char__item" 
                    key={id} 
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    onFocus={() => {
                        props.onCharSelected(id)
                        focusOnItem(i)
                    }}>
                    <img 
                        src={thumbnail}
                        alt="thumbnail"
                        style={style}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })
        
        return (
            <ul className="char__grid">
                {charElements}
            </ul>
        )
    }

    const spinner = loading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null
    const items = renderItems(charList)
    const content = !(loading || error) ? items : null

    return (
        <div className="char__list">
            {spinner || errorMessage || content}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{'display': charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
    }
// char__item_selected
CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;