import {useState} from "react";
import {Helmet} from "react-helmet";
import classNames from "classnames";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharFinder from "../charFinder/CharFinder";
import {visibleInfo} from '../../context/context'

const {Provider} = visibleInfo;

const MainPage = () => {

    const [selectedChar, setChar] = useState(null);
    const [infoActive, setInfoActive] = useState(false);

    const onCharSelected = (id) => {
        setChar(id)
    }

    const onToggleActive = () => {
        setInfoActive(!infoActive);
    }

    const wrapperClass = classNames({
                            'active': infoActive,
                            'hidden': !infoActive, 
                            'show': document.documentElement.clientWidth > 993});

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <Provider value={{onToggleActive, infoActive}}>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList 
                            onCharSelected={onCharSelected} 
                            onToggleActive={onToggleActive}
                            infoActive={infoActive}/>
                    </ErrorBoundary>
                    <div className={`char__info-wrapper ${wrapperClass}`}>
                            <ErrorBoundary>
                                <CharInfo charId={selectedChar} onToggleActive={onToggleActive}/>
                            </ErrorBoundary>
                        <ErrorBoundary>
                            <CharFinder/>
                        </ErrorBoundary>
                    </div>
                </div>
            </Provider>
        </>
    )
}

export default MainPage;