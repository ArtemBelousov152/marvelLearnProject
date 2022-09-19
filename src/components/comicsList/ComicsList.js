import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import scrollHandler from '../../services/MarvelService'

import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(5100);
    const [comicsEnded, setComicsEnded] = useState(true);

    const {error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset) => {
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let notOver = true;
        if (newComicsList < 8) {
            notOver = false;
        }
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setOffset(offset => offset + 8);
        setComicsEnded(notOver);
    }

    const renderItems = (comicsArr) => {
        const elements = comicsArr.map((item) => {
            const {thumbnail, price, title, id} = item
            return (
            <CSSTransition key={id} classNames="comics__item" timeout={900}>
                <li 
                    className="comics__item"
                    tabIndex={0}
                    key={id}>
                    <Link to={`/comics/${id}`}>
                        <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            </CSSTransition>
            )
        })


        return (
            <ul className='comics__grid'>
                <TransitionGroup component={null}>
                    {elements}
                </TransitionGroup>
            </ul>
        )
    }

    const items = renderItems(comicsList)
    const errorMessage = error ? <ErrorMessage/> : null

    return (
        <InfiniteScroll
            dataLength={comicsList.length}
            next={() => onRequest(offset)}
            hasMore={comicsEnded}
            style={{overflow: 'none'}}
            loader={<Spinner/>}>
            <div className="comics__list">
                {items}
                {errorMessage}
                {/* <button 
                    className="button button__main button__long"
                    onClick={() => onRequest(offset)}
                    disabled={newItemLoading}>
                    <div className="inner">load more</div>
                </button> */}
            </div>
        </InfiniteScroll>
    )
}

export default ComicsList;