import Book from '../components/Book.jsx';
import Header from '../components/Header.jsx';
import {useSelector} from 'react-redux';
import {selectBooks} from '../store/booksSlice.js';
import { selectNotes } from '../store/notesSlice.js';
import FullPageLoader from '../components/FullPageLoader.jsx';
import { Link } from 'react-router-dom';
import { useSamples } from '../store/Samples.jsx';

function BooksPage() {

  const books = useSelector(selectBooks).books;
  const booksStatus = useSelector(selectBooks).status;
  const booksLoading = useSelector(selectBooks).loading;
  const notesLoading = useSelector(selectNotes).loading;
  const pageTitle = "📖 Book List with Router, Redux & Firebase";
  const {samples} = useSamples();
  const sampleBooks = samples[0].books;
    
    return (
      <>
      { booksLoading != "loading" && notesLoading != "loading" ? 

        <div className="container">
            <Header pageTitle={pageTitle} />
            <h2>Your Books</h2>
            { booksStatus == "success" && books.length ?

            <div className="books-container">
                <div className="books-list">
                    
                    {books.map(book => 
                    
                    <Book key={book.id} book={book}  />
                    
                    )}

                </div>
            </div>

            : booksStatus == "success" && books.length == 0 ?

            <p>There are no Books added <Link to="/add-book">Click Here</Link> to add Books Now.</p>

            :

            "Shomething happened while fetching the Books, please reload the page..."

            }

            <div className="books-container">
              <h2>Sample Books</h2>
                <div className="books-list">
                    
                    {sampleBooks.map(book => 
                    
                    <Book key={book.id} book={book}  />
                    
                    )}

                </div>
            </div>
        </div>

        :

        <FullPageLoader />
      }
      </>
    )
  }
  
  export default BooksPage
  