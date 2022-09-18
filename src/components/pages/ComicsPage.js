import {Helmet} from "react-helmet";


import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBanner from '../appBanner/AppBanner';
import ComicsList from "../comicsList/ComicsList";

const ComicsPage = () => {
    return(
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with our commics books"
                />
                <title>Comics</title>
            </Helmet>
            <AppBanner/>
            <ErrorBoundary>
                <ComicsList/>
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;