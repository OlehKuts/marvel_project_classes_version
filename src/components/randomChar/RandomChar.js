import {Component} from 'react'

import './randomChar.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import { ErrorMessage } from '../errorMessage/ErrorMessage';
import mjolnir from '../../resources/img/mjolnir.png';


class RandomChar extends Component {

    state = {
     char: {},
     loading: true,
     error: false
    }
    marvelService = new MarvelService();

    onError = () => {
        this.setState({error: true, loading: false})
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false});
    }

    onCharStartLoading = (char) => {
        this.setState({loading: true});
    }

    updateChar = () => {
        this.onCharStartLoading();
        const randomId = Math.floor(Math.random() * (1011400 - 1011000) + 1011000) ;
        this.marvelService.getCharacter(randomId)
        .then(this.onCharLoaded).catch(this.onError);
    }
    getValidName = (charName) => {
        if(!charName) return "Character was not found";
        if(charName.length > 20) return `${charName.slice(0,19)}...`
        return charName
    }

    componentDidMount () {
        this.updateChar()
    }


    render() {
        const {char: {name, description, thumbnail, homepage, wiki}, loading, error} = this.state;
        return (
            <div className="randomchar">
                { error ? <ErrorMessage/> : (!loading ? 
                <>  <div className="randomchar__block">
                <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{this.getValidName(name)}</p>
                    <p className="randomchar__descr">
                    {description}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div></>
                : <Spinner />)}
              
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
   
}


export default RandomChar;