import { useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';  

import AppBanner from '../appBanner/AppBanner';

const SinglePageModel = ({Component, type}) => {
    const {id} = useParams();
    const [data, setData] = useState({});
    const {loading, error, getComic, getCharacter} = useMarvelService();

    useEffect(() => {
        getData();
    }, [id])

    const getData = () => {
        switch(type) {
            case "comic":
                getComic(id)
                .then(setData)
                break;
            case "character":
                getCharacter(id)
                .then(setData)
                break;
        }  
    }
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !loading && !error && data ? <Component data={data}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePageModel;