import React, { Component } from 'react'
import { render } from 'react-dom'

import authorApi from '../../api/authorAPI'

class EditAuthor extends Component{
  constructor(){
    super();
    this.state = {
      author: [],
      books: []
    }
  }
  componentDidMount(){
    authorApi.getAuthorData().then(data =>{
      this.setState({
        author: data.data.author,
        books: data.data.books
      });
      console.log(this.state.author);
    })
  }
  nameRef(ref){
    this.name = ref;
  }
  bioRef(ref){
    this.bio = ref;
  }
  imageRef(ref){
    this.image = ref;
  }
  bookRef(ref){
    this.book = ref;
  }
  addBook(e){
    e.preventDefault();
    this.state.books.push(this.book.value);
    this.setState({books: this.state.books});
    this.book.value = '';
  }
  submitAuthor(e){
    e.preventDefault();
    let name = this.name.value,
        bio = this.bio.value,
        image = this.image.value,
        books = this.state.books;
    if(!image || !bio || !name) return;
    const author = {name, bio, image, books};
    authorApi.editAuthor(author);
    this.name.value = '';
    this.bio.value = '';
    this.image.value = '';
  }
  render(){
    const bookList = this.state.books.map((x, i) =>(
      <li className="list-group-item" key={i}>{x.book_name}</li>
    ));
    console.log(this.state.author.books);
    return(
      <div className="jumbotron">
        <form className="form-group" onSubmit={(e) => this.submitAuthor(e)}>
          <input
            type="text"
            className="form-control"
            placeholder={this.state.author.author_name}
            ref={(ref) => this.nameRef(ref)}
          />
          <textarea
            className="form-control"
            placeholder={this.state.author.author_info}
            ref={(ref) => this.bioRef(ref)}
          />
          <input
            type="text"
            className="form-control"
            placeholder={this.state.author.author_image_url}
            ref={(ref) => this.imageRef(ref)}
          />
          <input
            type="submit"
            value="Create"
            className="btn btn-success"
          />
        </form>

        <h4>Books by this Author</h4>
        <form onSubmit={this.addBook.bind(this)}>
          <input
            type="text"
            className="form-control"
            placeholder="Add Book"
            ref={(ref) => this.bookRef(ref)}
          />
          <input
            type="submit"
            value="Add Book"
          />
        </form>
        <ul className="list-group">
          {bookList}
        </ul>
      </div>
    )
  }
}

render(
  <EditAuthor />,
  document.getElementById('edit-author')
);