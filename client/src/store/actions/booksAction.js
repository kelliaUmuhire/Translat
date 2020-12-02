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

export const updateBook = (bookId, field, value) => {
  return {
    type: actionTypes.UPDATE_BOOK,
    payload: {
      bookId: bookId,
      field: field,
      value: value,
    },
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

export const removeBook = (bookId) => {
  return {
    type: actionTypes.REMOVE_BOOK,
    payload: bookId,
  };
};

export const addLibrary = (payload) => {
  return {
    type: actionTypes.ADD_LIBRARY,
    payload: payload,
  };
};

export const createLibrary = () => (dispatch) => {
  axios
    .post("api/library/")
    .then((res) => dispatch(addLibrary(res.data)))
    .catch((err) => console.log(err));
};

export const getLibrary = (username) => (dispatch) => {
  axios
    .get(`/api/library/getbyname/${username}`)
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
