import * as actionTypes from "../actionTypes";
import { isEmpty } from "lodash";

const inititalState = {
  books: [],
  loading: false,
  isAuthenticated: false,
  user: {},
  editBook: {},
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
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
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
