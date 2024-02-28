import { useParams, Link, useNavigate } from 'react-router-dom';
import Notes from '../components/Notes.jsx';
import {useSelector, useDispatch} from 'react-redux';
import {selectBooks, eraseBook, toggleRead} from '../store/booksSlice.js';
import {eraseBookNotes, selectNotes} from '../store/notesSlice.js';
import FullPageLoader from '../components/FullPageLoader.jsx';
import { useSamples } from '../store/Samples.jsx';

function SingleBookPage() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const books = useSelector(selectBooks).books;
  var allBooks = JSON.parse(JSON.stringify(books));
  const store = useSamples();
  const sampleBooks = store.samples[0].books;
  allBooks.push(...sampleBooks);
  const booksStatus = useSelector(selectBooks).status;
  const notes = useSelector(selectNotes).notes;
  const booksLoading = useSelector(selectBooks).loading;
  const notesLoading = useSelector(selectNotes).loading;
  const book = allBooks.filter(book => book.id == id)[0];

  function handleEraseBook(id) {
    if(confirm('Are you sure you want to erase this book and all notes associated with it?')){
      if (book.sample){
        store.dispatch({type: "eraseBook", payload:id})
      } else {
        dispatch(eraseBook({id}));
        let notesToDel = notes.filter(note => note.book_id == id);
        dispatch(eraseBookNotes({notesToDel, id}));
      }
      navigate("/");
    }
  }

  function handleToggle( id, value) {
    if (book.sample){
      store.dispatch({type: "toggleRead", payload:{id, value}})
    } else {
      dispatch(toggleRead({id, value}));
    }
  }
    
    return (
      <>
      { booksLoading != "loading" && notesLoading != "loading" ?

        <div className="container">
            <Link to="/">
              <button className="btn">
                  ← Back to Books
              </button>
            </Link>

            {book && booksStatus == "success" ?
            
            <div>
              <div className="single-book">
                <div className="book-cover">
                    <img src={book.cover} />
                </div>

                <div className="book-details">
                    <h3 className="book-title">{ book.title }</h3>
                    <h4 className="book-author">{ book.author }</h4>
                    <p>{book.synopsis}</p>
                    <div className="read-checkbox">
                        <input 
                          onClick={() => handleToggle( book.id, !book.isRead)}
                          type="checkbox" 
                          defaultChecked={book.isRead} />
                        <label>{ book.isRead ? "Already Read It" : "Haven't Read it yet" }</label>
                    </div>
                    <div onClick={()=>handleEraseBook(book.id)} className="erase-book">
                        Erase book
                    </div>
                </div>
              </div>

              <Notes bookId={id} sample={book.sample} />
            </div> 

            : booksStatus == "rejected" ?

            "Something happened While fetching Book details, Please reload the page or go back to the Books list."

            :
            
            <div>
              <p>Book not found. Click the button above to go back to the list of books.</p>
            </div>

            }
            

        </div>

        :

        <FullPageLoader />
      }
      </>
    )
  }
  
  export default SingleBookPage
  