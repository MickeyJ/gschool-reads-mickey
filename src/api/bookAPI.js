import axios from 'axios'

const ID = window.location.pathname.split('/')[3];

const bookApi = {
  getBookData: () =>{
    return axios.get(`/books/data/${ID}`)
      .then(data => data);
  },
  addBook: book =>{
    console.log(book);
    return axios.post(`/books/new`, book)
  },
  editBook: book =>{
    console.log(book);
    return axios.post(`/books/edit`, book)
  }
};
export default bookApi


