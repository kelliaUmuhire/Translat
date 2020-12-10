import * as actionTypes from "../actionTypes";

const inititalState = {
  books: [],
  loading: false,
  // user: {},
  library: {},
  dashBooks: [],

  // book: {
  //   chapters: [
  //     {
  //       name: "chapter one",
  //       pages: [{ content: "skjsdjkjjdkdsjkd" }],
  //     },
  //   ],
  // },
};

const reducer = (state = inititalState, action) => {
  switch (action.type) {
    case actionTypes.BOOKS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.GET_USER_BOOKS:
      return {
        ...state,
        loading: false,
        books: action.payload,
      };
    case actionTypes.ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case actionTypes.REMOVE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book._id !== action.payload),
        dashBooks: state.dashBooks.filter(
          (book) => book.bookId !== action.payload
        ),
      };
    case actionTypes.UPDATE_BOOK:
      return {
        ...state,
        dashBooks: state.dashBooks.map((book) =>
          book._id === action.payload.bookId
            ? { ...book, [action.payload.field]: action.payload.value }
            : book
        ),
      };
    case actionTypes.ADD_LIBRARY:
      return {
        ...state,
        library: action.payload,
      };
    case actionTypes.ADD_BOOK_TO_LIBRARY:
      return {
        ...state,
        library: {
          ...state.library,
          books: [...state.library.books, action.payload],
        },
      };
    case actionTypes.SET_BOOKS:
      return {
        ...state,
        dashBooks: action.payload,
      };
    case actionTypes.LOG_OUT:
      return {
        state: {},
      };
    default:
      return state;
  }
};

// export const update = (array, payload) =>{
//   let ident = state.editBook.chapters.findIndex(
//     (x) => x.chapterId === action.payload.chapter_id
//   )
//   let temp = Object.assign({}, state.editBook, {
//     //   chapters: [...state.editBook.chapters, action.payload],
//     // })

// }

// {if(book._id===action.payload.bookId){
//   return {...book, [action.payload.field]:action.payload.value}
// }}

export default reducer;
