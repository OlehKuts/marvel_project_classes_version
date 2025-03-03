
import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import MarvelService from "../../services/MarvelService";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

class App extends Component  {
    state = {
        charList: [],
        selectedCharId: null,
        newItemsLoading: false,
        currentOffset: 100,
        charOver: false
       }
       marvelService = new MarvelService();
       componentDidMount () {
        this.initiateCharList(this.state.currentOffset)
    }
        initiateCharList = (offset) => {
            this.onCharListLoading();
            this.marvelService.getAllCharacters(offset)
            .then(data => this.setState( (prevState) => {
            return  {charList: data, newItemsLoading: false, 
                currentOffset: prevState.currentOffset + 9
            }
        }
           ));
        }
       updateCharList = (offset) => {
        this.onCharListLoading()
        this.marvelService.getAllCharacters(offset)
        .then(data => this.setState( (prevState) => {
            return  {charList: [...prevState.charList, ...data], newItemsLoading: false, 
                currentOffset: prevState.currentOffset + 9, charOver: data.length < 9 ? true: false
            }
        }
           ));
    }
    
    onSetSelectedChar = (charId) => {
        this.setState({
            selectedCharId: charId
        })
    }
    onCharListLoading = () => {
        this.setState({
            newItemsLoading: true
        })
    }
    onGetNewItems = () => {
        this.updateCharList(this.state.currentOffset);
    }
   
    render () {
        const {charList, selectedCharId, newItemsLoading, charOver } = this.state;
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList charList={charList} setSelectedChar={this.onSetSelectedChar}
                        getNewItems={this.onGetNewItems} newItemsLoading={newItemsLoading}
                        charOver={charOver} currentId={selectedCharId}/>
                       <ErrorBoundary>
                       <CharInfo charId={selectedCharId}/>
                       </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
   
}

export default App;

