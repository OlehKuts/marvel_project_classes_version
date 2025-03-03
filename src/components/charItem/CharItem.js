
import '../charList/charList.scss';

export const CharItem = ({charItem, setSelectedChar, currentId}) => {
    const {name = "image", thumbnail, id} = charItem;
    return (
          <li className={`char__item ${id === currentId ? 'char__item_selected' : ""}`} onClick={() => setSelectedChar(id)}>
                            <img src={thumbnail} alt={name} />
                            <div className="char__name">{name}</div>
                        </li>
    )
}