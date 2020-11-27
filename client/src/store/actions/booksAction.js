import * as actionTypes from "../actionTypes";
import axios from "axios";

export const getUserBooks = () => (dispatch) => {
  dispatch(setBookLoading());
  axios
    .get("api/books/selfbooks")
    .then((res) =>
      dispatch({
        type: actionTypes.GET_USER_BOOKS,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

export const setBookLoading = () => {
  return {
    type: actionTypes.BOOKS_LOADING,
  };
};

export const updateBooks = (book) => {
  return {
    type: actionTypes.ADD_BOOK,
    payload: book,
  };
};

export const uploadBook = (formData, coverData, details) => (dispatch) => {
  axios.post("api/books/uploadbook", formData, {}).then((res) => {
    axios.post("api/books/uploadbook", coverData, {}).then((res) => {
      axios
        .post("api/books/addDetails", details)
        .then((res) => {
          dispatch(updateBooks(res.data));
        })
        .catch((err) => console.log(err));
    });
  });
};

export const createBook = (coverData, details, newChap, newPage) => (
  dispatch
) => {
  let payload = {};
  axios.post("api/books/sendcover", coverData, {}).then((res) => {
    axios.post("api/books/createbook", details, {}).then((res) => {
      payload.book = res.data;
      newChap.bookId = res.data._id;
      axios
        .post("api/books/addchapter", newChap)
        .then((res) => {
          payload.chaps = res.data;
          newPage.chapterId = res.data._id;
          axios
            .post("api/books/addpage", newPage)
            .then((res) => {
              payload.pages = res.data;
              dispatch(updateBooks(payload));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    });
  });
};

export const removeBook = (bookId) => {
  return {
    type: actionTypes.REMOVE_BOOK,
    payload: bookId,
  };
};

export const setEditBook = (book) => {
  return {
    type: actionTypes.SET_EDIT_BOOK,
    payload: book,
  };
};

export const updateChapters = (chapter) => {
  return {
    type: actionTypes.ADD_CHAPTER,
    payload: chapter,
  };
};

export const addChapter = (chapter) => (dispatch) => {
  console.log(chapter);
  axios
    .post("api/books/addchapter", chapter)
    .then((res) => {
      dispatch(updateChapters(res.data));
    })
    .catch((err) => console.log(err));
};

export const addPage = (page) => {
  return {
    type: actionTypes.ADD_PAGE,
    payload: page,
  };
};

export const createPage = (page) => (dispatch) => {
  axios
    .post("api/books/addpage", page)
    .then((res) => {})
    .catch((err) => console.log(err));
};

export const addLibrary = (payload) => {
  return {
    type: actionTypes.ADD_LIBRARY,
    payload: payload,
  };
};

export const getLibrary = (userId) => (dispatch) => {
  axios
    .get(`api/library/${userId}`)
    .then((res) => dispatch(addLibrary(res.data)))
    .catch((err) => console.log(err));
};

export const set_books = (payload) => {
  return {
    type: actionTypes.SET_BOOKS,
    payload: payload,
  };
};

export const get_books = () => (dispatch) => {
  axios
    .get("api/books/tempget")
    .then((res) => dispatch(set_books(res.data)))
    .catch((err) => console.log(err));
};

export const addBookToLibrary = (book) => {
  return {
    type: actionTypes.ADD_BOOK_TO_LIBRARY,
    payload: book,
  };
};

// export const remove_book = (bookId) => dispatch => {
//   return {
//     type: actionTypes.REMOVE_FROM_DASH
//   }
// }
