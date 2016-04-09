import axios from 'axios'

const authorID = window.location.pathname.split('/')[3];

const authorApi = {
  getAuthorData: () =>{
    return axios.get(`/authors/data/${authorID}`)
      .then(data => data);
  },
  addAuthor: author =>{
    console.log(author);
    return axios.post('', author)
  },
  editAuthor: author =>{
    console.log(author);
    return axios.post(`/authors/edit`, author)
  }
};
export default authorApi


