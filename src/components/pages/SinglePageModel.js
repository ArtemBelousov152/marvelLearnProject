import { useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';  

import AppBanner from '../appBanner/AppBanner';

const SinglePageModel = ({Component, type}) => {
    const {id} = useParams();
    const [data, setData] = useState({});
    const {getComic, getCharacter, process, setProcess} = useMarvelService();

    useEffect(() => {
        getData();
    }, [id])

    const getData = () => {
        switch(type) {
            case "comic":
                getComic(id)
                .then(setData)
                .then(() => setProcess('confirmed'))
                break;
            case "character":
                getCharacter(id)
                .then(setData)
                .then(() => setProcess('confirmed'))
                break;
        }  
    }

    return (
        <>
            <AppBanner/>
            {setContent(process, Component, data)}
        </>
    )
}

export default SinglePageModel;