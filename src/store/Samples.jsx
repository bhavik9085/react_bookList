import { createContext, useContext, useReducer } from "react"

const samplesContext = createContext(null);

const initialState = localStorage.getItem("samples")? JSON.parse(localStorage.getItem("samples")) : [
    {
        books:[
            {
              id: 1,
              title: "A Short History of Europe",
              cover:
                "https://printpress.cmsmasters.net/default/wp-content/uploads/sites/11/2019/05/printpress-product-6-540x861.jpg",
              isRead: true,
              author: "Simon Jenkins",
              synopsis: "In this dazzling new history, bestselling author Simon Jenkins grippingly tells the story of its evolution from warring peoples to peace, wealth and freedom - a story that twists and turns from Greece and Rome, through the Dark Ages, the Reformation and the French Revolution, to the Second World War and up to the present day.",
              sample: true,
            },
            {
              id: 2,
              title: "Penguin Classics",
              cover:
                "https://printpress.cmsmasters.net/default/wp-content/uploads/sites/11/2019/05/printpress-product-2-540x861.jpg",
              isRead: false,
              author: "Henry Eliot",
              synopsis: "The Penguin Classics Book covers all the greatest works of fiction, poetry, drama, history, and philosophy in between, this reader's companion encompasses 500 authors, 1,200 books, and 4,000 years of world literature, from ancient Mesopotamia to World War I.",
              sample: true,
            },
            {
              id: 3,
              title: "Becoming",
              cover:
                "https://printpress.cmsmasters.net/default/wp-content/uploads/sites/11/2019/05/printpress-product-7-540x861.jpg",
              isRead: false,
              author: "Michelle Obama",
              synopsis: "“Becoming” is an autobiography detailing the highs and lows of Michelle Obama's incredible journey from humble beginnings in the less glamourous South Side of Chicago, to the grandeur of the White House and life as America's first African-American First Lady.",
              sample: true,
            },
            {
              id: 4,
              title: "Sonnets",
              cover:
                "https://printpress.cmsmasters.net/default/wp-content/uploads/sites/11/2019/05/printpress-product-5-540x861.jpg",
              isRead: false,
              author: "James Anthony",
              synopsis: "Shakespeare wrote 154 sonnets published in his 'quarto' in 1609, covering themes such as the passage of time, mortality, love, beauty, infidelity, and jealousy. The first 126 of Shakespeare's sonnets are addressed to a young man, and the last 28 addressed to a woman – a mysterious 'dark lady'.",
              sample: true,
            }
        ],
        notes:[
            {
            id: 1,
            book_id: 1,
            title:"Page 18 - On Europe's Decline",
            text: "The leading states of the European Union, and in particular of the eurozone, were dogged by a growing sense of decline. Their production systems and their societies that were said to be in decline, rather than Europe as a whole.",
          },
          {
            id: 2,
            book_id: 1,
            title:"Page 55 - Treaty on Friendship and Cooperation",
            text: "The Portuguese and Spanish Governments signed the Treaty on Friendship and Cooperation at the 32nd Luso-Spanish Summit held in Trujillo in October 2021. This followed on from the commitment undertaken at the Guarda Summit in October 2020.",
          },
          {
            id: 3,
            book_id: 2,
            title:"Page 61 - On Mesopotamia",
            text: "Jane R. McIntosh wrote the first general introduction to Mesopotamia that covers all four of the area's major ancient civilizations―Sumer, Akkad, Assyria, and Babylonia.",
          }
        ]
    }
  ]

  console.log()

export function SamplesProvider({children}) {
    const [samples, dispatch] = useReducer(samplesReducer, initialState);

    return <>
      <samplesContext.Provider value={{samples, dispatch}}>
          {children}
      </samplesContext.Provider>
    </>
}

export function useSamples() {
    return useContext(samplesContext);
}

function samplesReducer(state, action){
  switch (action.type){
    case "toggleRead":{
      let newBook = state[0].books.filter(book => book.id === action.payload.id);
      newBook[0].isRead = action.payload.value;
      let newState = [{...state[0], books: state[0].books
        .map(book => book.id === action.payload.id? newBook[0] : book)
      }]
      localStorage.setItem("samples", JSON.stringify(newState));
      return newState
    }
    
    case "eraseBook":{
      let newState = [{...state[0], 
        books: state[0].books.filter(book => book.id != action.payload)
      }] 
      localStorage.setItem("samples", JSON.stringify(newState));
      return newState;
    }

    case "addNote": {
      let id = Math.max(...initialState[0].notes.map(note => note.id )) + 1;
      let newNote = action.payload;
      newNote.id = id;
      let newState = [{...state[0], notes: [...state[0].notes, newNote]}]
      localStorage.setItem("samples", JSON.stringify(newState));
      return newState;
    }

    case "eraseNote":{
      let newState = [{...state[0], 
        notes: state[0].notes.filter(note => note.id != action.payload)
      }] 
      localStorage.setItem("samples", JSON.stringify(newState));
      return newState;
    }
  }
}