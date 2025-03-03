import './charList.scss';
import { CharItem } from '../charItem/CharItem';

const CharList = ({charList, setSelectedChar, getNewItems, newItemsLoading, charOver, currentId}) => {
    return (
        <div className="char__list">
            <ul className="char__grid">
              {charList.map(item => <CharItem key={item.id} charItem={item} setSelectedChar={setSelectedChar}
              currentId={currentId}/>)}
            </ul>
            <button className="button button__main button__long"  style={{display: charOver ? "none": "block"}}
            onClick={() => getNewItems()} disabled={newItemsLoading}>
                <div className="inner" >load more</div>
            </button>
        </div>
    )
}

export default CharList;