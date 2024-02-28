import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {toggleRead} from '../store/booksSlice.js';
import { useSamples } from '../store/Samples.jsx';
  
function Book({book}) {
    
    const dispatch = useDispatch();
    const store = useSamples();
    
    function handleToggleRead(e, id, value) {
        e.preventDefault();
        if(book.sample){
            store.dispatch({type: "toggleRead", payload:{id, value}})
        }
        dispatch(toggleRead({id, value}));
    }

    return (
        <>  
            <Link to={'/book/' + book.id}>
                <div className="book">
                    {
                        book.isRead && 
                        <div className="readIt">
                            <i className="fa-solid fa-eye"></i>
                        </div>
                    }
                    
                    <div className="book-cover">
                        <img src={book.cover} />

                        <button onClick={(e)=>{handleToggleRead(e, book.id, !book.isRead)}} className={book.isRead ? 'isRead' : ''}>
                            <i className="fa-solid fa-eye"></i>
                            <span>{ book.isRead ? "Already Read It" : "Haven't Read it yet" }</span>
                        </button>
                    </div>

                    <div className="book-details">
                        <p className="book-author">{ book.author }</p>
                        <h3 className="book-title">{ book.title }</h3>
                    </div>
                </div>
            </Link>

        </>
    )
}

export default Book
