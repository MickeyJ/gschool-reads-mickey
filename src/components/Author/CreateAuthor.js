import React, { Component } from 'react'
import { render } from 'react-dom'

import authorApi from '../../api/authorAPI'

class CreateAuthor extends Component{
  constructor(){
    super();
    this.state = {
      books: ['book one']
    }
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
    let id = 4,
        name = this.name.value,
        bio = this.bio.value,
        image = this.image.value,
        books = this.state.books;
    if(!image || !bio || !name) return;
    const author = {id, name, bio, image, books};
    authorApi.addAuthor(author);
    this.name.value = '';
    this.bio.value = '';
    this.image.value = '';
  }
  render(){
    const bookList = this.state.books.map((x, i) =>(
      <li className="list-group-item" key={i}>{x}</li>
    ));
    return(
      <div className="jumbotron">
        <form className="form-group" onSubmit={(e) => this.submitAuthor(e)}>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            ref={(ref) => this.nameRef(ref)}
          />
          <textarea
            className="form-control"
            placeholder="Bio"
            ref={(ref) => this.bioRef(ref)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Avatar Image URL"
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
  <CreateAuthor />,
  document.getElementById('create-author')
);