import {useState, useEffect, useRef} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [offset, setOffset] = useState(230);
    const [charEnded, setCharEnded] = useState(true);

    const { error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    },[])

    const onRequest = (offset) => {
        getAllCharacters(offset)
            .then(onCharListLoaded) 
    }

    const onCharListLoaded = (newCharList) => {
        let notOver = true;
        if (newCharList.length < 9) {
            notOver = false
        }

        setCharList(charList => [...charList, ...newCharList]);
        setOffset(offset => offset + 9);
        setCharEnded(notOver);
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
                <CSSTransition key={id} timeout={900} classNames="char__item">
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
                </CSSTransition>
            )
        })
        
        return (
                <ul className="char__grid">
                    <TransitionGroup component={null}>
                        {charElements}
                    </TransitionGroup>
                </ul>
        )
    }

    const items = renderItems(charList);
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
               <InfiniteScroll
                    dataLength={charList.length}
                    next={() => onRequest(offset)}
                    hasMore={charEnded}
                    style={{overflow:'none'}}
                    loader={<Spinner/>}
                    scrollThreshold={0.9}>
                     <div className="char__list">
                        {errorMessage}
                        {items}
                        {/* <button
                            className="button button__main button__long"
                            disabled={newItemLoading}
                            onClick={() => onRequest(offset)}
                            style={{'display': charEnded ? 'none' : 'block'}}>
                            <div className="inner">load more</div>
                        </button> */}
                    </div>
               </InfiniteScroll>
    )
    }
// char__item_selected
CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;