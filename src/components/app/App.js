import { lazy, Suspense, useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import { MainPage, ComicsPage, SinglePageModel, SingleComicPage, SingleCharPage } from "../pages";
import {pageLoaded} from "../../context/context"

const Page404 = lazy(() => import('../pages/404'));

const {Provider} = pageLoaded;

const App = () => {

    const [pageLoad, setPageLoaded] = useState(false);

    useEffect(() => {
        setPageLoaded(true);
    },[])

    return (
        <Provider value={pageLoad}>
            <Router>
                <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route 
                                path="/comics/:id" 
                                element={<SinglePageModel Component={SingleComicPage} type="comic"/>}/>
                            <Route 
                                path="/char/:id" 
                                element={<SinglePageModel Component={SingleCharPage} type="character"/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
                </div>
            </Router>
        </Provider>
    )
    }

export default App;