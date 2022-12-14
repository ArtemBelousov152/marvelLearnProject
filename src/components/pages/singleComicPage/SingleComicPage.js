import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";


import './singleComicPage.scss';

const SingleComicPage = ({data}) => {
    const {description, title, thumbnail, price, page, language} = data;
    return(
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${title} book`}
                />
                <title>{title}</title>
            </Helmet>
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
        </>
    )
}

export default SingleComicPage;