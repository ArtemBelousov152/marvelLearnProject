import { Formik, Form, Field, ErrorMessage} from 'formik';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import * as Yup from 'yup'
import useMarvelService from '../../services/MarvelService';
import { CSSTransition } from 'react-transition-group';

import pageLoaded  from '../../context/context'

import './charFinder.scss'


const CharFinder = () => {
    const [char, setChar] = useState({});
    const [prevCharName, setPrevCharName] = useState();
    const {loading, error, findChar} = useMarvelService();

    const context = useContext(pageLoaded);

    const getChar = (name) => {
        if(prevCharName !== name) {
            setChar({});
            setPrevCharName(name)
            findChar(name)
                .then(setChar)
        }
        
    }
    const visitPage = "name" in char ? <VisitPage name="name" id={char.id}/> : null;
    const errorMessage = error ? <div className='error'>{"The character was not found. Check the name and try again"}</div> : null

    return(
        <CSSTransition timeout={500} classNames="char__finder" in={context}>
            <div className="char__finder">
                <h2 className="char__finder-title">
                    Or find a character by name:
                </h2>
                <Formik 
                    initialValues={{name:''}}
                    validationSchema={Yup.object({
                        name: Yup.string().required("This field is required")
                    })}
                    onSubmit={values => getChar(values.name)}
                    >
                    <Form className='char__finder-form'>
                        <div className="char__finder-wrapper">
                            <Field 
                                className='char__finder-input' 
                                type="text"
                                name="name"
                                placeholder="Enter name"/>
                            <button type="submit" className='button button__main' disabled={loading}>
                                <div className="inner">find</div>
                            </button>
                        </div>
                        <ErrorMessage
                            component="div" 
                            name="name"
                            className='error'/>
                        <div className='char__finder-success'>
                            {visitPage}
                        </div>
                        {errorMessage}
                    </Form>
                </Formik>
            </div>
        </CSSTransition>
    )
}


const VisitPage = ({name, id}) => {
    return (
        <>
            <div className='success'>{`There is! Visit ${name} page?`}</div>
            <Link className='button button__secondary' to={`/char/${id}`}>
                <div className='inner'>TO PAGE</div>
            </Link>
        </>
    )
}
export default CharFinder;