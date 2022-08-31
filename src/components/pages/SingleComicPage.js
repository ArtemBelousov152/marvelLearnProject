import { useParams, Link } from 'react-router-dom';
import {useState, useEffect} from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';  
import AppBanner from '../appBanner/AppBanner'; 

import './singleComicPage.scss';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState();

    const {loading, error, getComic} = useMarvelService();

    useEffect(() => {
        loadComic();
    }, [comicId])

    const loadComic = () => {
        getComic(comicId)
            .then(setComic)
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !loading && !error && comic ? <View comic={comic}/> : null;

    console.log(comic)

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {description, title, thumbnail, price, page, language} = comic;
    return(
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{`${page} pages`}</p>
                <p className="single-comic__descr">{`Language: ${language}`}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all comics</Link>
        </div>
    )
}

export default SingleComicPage;