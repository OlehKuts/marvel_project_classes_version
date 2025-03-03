import { Component } from 'react';

import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import { ErrorMessage } from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component  {

    state = {
        char: {name: "", thumbnail: "", description: "", homepage: "", wiki: "", comics: []},
        loading: false, 
        error: false
       }
       marvelService = new MarvelService();
       
       
       componentDidMount () {
        this.updateChar()
    }
    componentDidUpdate (prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }
    componentDidCatch (err, info) {
        this.setState({error: true})
    }

       onError = () => {
           this.setState({error: true, loading: false})
       }
   
       onCharLoaded = (char) => {
           this.setState({char, loading: false});
       }
   
       onCharStartLoading = () => {
           this.setState({loading: true});
       }
   
       updateChar = () => {
            const {charId}= this.props;
            if (!charId) return;
           this.onCharStartLoading();
           this.marvelService.getCharacter(charId)
           .then(this.onCharLoaded).catch(this.onError);
       }
       getRightComics = (comicsList) => {
           if(!comicsList.length) return [];
           let finalComics = comicsList.length < 11 ? comicsList : [...comicsList].slice(0,10)
           return finalComics
       }

    render () {
        const {char: {name = "name", description, thumbnail, homepage, wiki, comics}, loading, error} = this.state;
        const {char} = this.state;
        const skeleton = char.name || error || loading ? null : <Skeleton />;
        const finalComics = this.getRightComics(comics)
        return (
            <>
            {skeleton ? skeleton : 
            <>
            { error ? <ErrorMessage/> : (!loading ? 
                <>
            <div className="char__info">
               
                <div className="char__basics">
                    <img src={thumbnail} alt={name}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">{description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {finalComics.length ?   <>{finalComics.map((item, idx) => 
                         <li key={idx} className="char__comics-item">
                         {item.name}
                     </li>
                    )}</> : `No comics related with this hero.`}
                  
                   
                   
                </ul>
            </div> </> 
            : <Spinner />)}
            </> }
            </>
        )
    }
 
}

export default CharInfo;
