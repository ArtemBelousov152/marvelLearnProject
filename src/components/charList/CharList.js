import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../services/MarvelService';
import PropTypes from 'prop-types'

import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest()
    }
    componentDidUpdate() {
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true
        }

        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended 
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref)
    }

    focusOnItem = (id) => {
        this.itemRefs.forEach(item => {
            item.classList.remove("char__item_selected")
            this.itemRefs[id].classList.add("char__item_selected")
        });
    }

    renderItems(arr) {
        const charElements = arr.map((item, i) => {
            const {name, thumbnail, style, id} = item
            return (
                <li
                    className="char__item" 
                    key={id} 
                    tabIndex={0}
                    ref={this.setRef}
                    onFocus={() => {
                        this.props.onCharSelected(id)
                        this.focusOnItem(i)
                    }}>
                    <img 
                        src={thumbnail}
                        alt="thumbnail"
                        style={style}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })
        
        return (
            <ul className="char__grid">
                {charElements}
            </ul>
        )
    }

    render() {
        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state
        const spinner = loading ? <Spinner/> : null
        const errorMessage = error ? <ErrorMessage/> : null
        const items = this.renderItems(charList)
        const content = !(loading || error) ? items : null

        return (
            <div className="char__list">
                {spinner || errorMessage || content}
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}
                    style={{'display': charEnded ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}
// char__item_selected
CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;