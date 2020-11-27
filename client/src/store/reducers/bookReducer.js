import * as actionTypes from "../actionTypes";

const inititalState = {
  books: [],
  loading: false,
  // user: {},
  editBook: {},
  library: {},
  dashBooks: [],
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
    case actionTypes.SET_EDIT_BOOK:
      return {
        ...state,
        editBook: action.payload,
      };
    case actionTypes.ADD_CHAPTER:
      // Object.assign({}, state.editBook, {
      //   chapters: [...state.editBook.chapters, action.payload],
      // })
      return {
        ...state,
        editBook: {
          ...state.editBook.book,
          chapters: [...state.editBook.book, action.payload],
        },
      };
    case actionTypes.ADD_PAGE:
      // let place = [...state.editBook.chapters[ident].pages];
      return {
        ...state,
        editBook: {
          ...state.editBook.book,
          chapters: [...state.editBook.chapters],
        },
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

export default reducer;
