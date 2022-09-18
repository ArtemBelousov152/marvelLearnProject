import {Helmet} from "react-helmet";

import "./singleCharPage.scss"

const SingleCharPage = ({data}) => {
    const {description, name, thumbnail} = data;
    console.log(name);
    return(
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${name} page`}
                />
                <title>{name}</title>
            </Helmet>
            <div className="single-char">
                <img src={thumbnail} alt={name} className="single-char__img"/>
                <div className="single-char__info">
                    <h2 className="single-char__name">{name}</h2>
                    <p className="single-char__descr">{description}</p>
                </div>
            </div>
        </>
    )
}

export default SingleCharPage