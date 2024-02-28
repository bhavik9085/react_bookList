import {useSelector, useDispatch} from 'react-redux';
import {selectNotes, eraseNote, addNote} from '../store/notesSlice.js';
import { useSamples } from '../store/Samples.jsx';

function Notes({bookId, sample}) {
    
    const dispatch = useDispatch();
    const userNotes = JSON.parse(JSON.stringify(useSelector(selectNotes).notes));
    const store = useSamples()
    const sampleNotes = store.samples[0].notes;
    userNotes.push(...sampleNotes);
    const notes = userNotes.filter(note => note.book_id == bookId);
    const notesStatus = useSelector(selectNotes).status;
    
    function handleEraseNote(id) {
      if(confirm('Are you sure you want to erase this note?')) {
        if(sample){
          store.dispatch({type: "eraseNote", payload:id})
        } else {
          dispatch(eraseNote({id}));
        }
      }
    }

    function handleAddNote(e) {
      e.preventDefault();

      const newNote = {
        book_id: bookId,
        title: document.querySelector('input[name=title]').value,
        text: document.querySelector('textarea[name=note]').value
      }
      if (newNote.title && newNote.text) {
        if(sample){
          store.dispatch({type: "addNote", payload: newNote});
        } else {
          dispatch(addNote(newNote));
        }
          document.querySelector('input[name=title]').value = "";
          document.querySelector('textarea[name=note]').value = "";
      } else {
          alert('Please fill the mandatory fields.');
      }

    }
    
    return (
      <>

        <div className="notes-wrapper">

            <h2>Reader's Notes</h2>

            {notes.length && notesStatus == "success" ?

              <div className="notes">
              {notes.map(note => 
                  <div key={note.id} className="note">
                      <div onClick={()=>handleEraseNote(note.id)} className="erase-note">Erase note</div>
                      <h3>{note.title}</h3>
                      <p>{note.text}</p>
                  </div>
                  )}
              </div>

              : notes.length == 0 && notesStatus == "success" ?

              <p>This books doesn't have notes yet. Use the form below to add a note.</p>

              :

              "Something happened while fetching Notes, please reload the page..."
            }
            

            <details>
                <summary>Add a note</summary>
                <form className="add-note">
                    <div className="form-control">
                        <label>Title *</label>
                        <input type="text" name="title" placeholder="Add a note title" />
                    </div>
                    <div className="form-control">
                        <label>Note *</label>
                        <textarea type="text" name="note" placeholder="Add note" />
                    </div>
                    
                    <button onClick={(e)=>{handleAddNote(e)}}className="btn btn-block">Add Note</button>
                </form>
            </details>

        </div>

      </>
    )
  }
  
  export default Notes
  