import React, { Component } from 'react'
import { render } from 'react-dom'

import bookApi from '../../api/bookAPI'

class CreateBook extends Component{
  constructor(){
    super();
    this.state = {
      authors: []
    }
  }
  nameRef(ref){
    this.name = ref;
  }
  genreRef(ref){
    this.genre = ref;
  }
  descriptionRef(ref){
    this.description = ref;
  }
  imageRef(ref){
    this.image = ref;
  }
  authorRef(ref){
    this.author = ref;
  }
  addAuthor(e){
    e.preventDefault();
    this.state.authors.push(this.author.value);
    this.setState({authors: this.state.authors});
    this.author.value = '';
  }
  submitBook(e){
    e.preventDefault();
    let name = this.name.value,
        genre = this.genre.value,
        description = this.description.value,
        image = this.image.value,
        authors = this.state.authors;
    if(!image || !description || !genre || !name) return;
    const book = {name, genre, description, image, authors};
    bookApi.addBook(book);
    this.name.value = '';
    this.description.value = '';
    this.image.value = '';
  }
  render(){
    const authorList = this.state.authors.map((x, i) =>(
      <li className="list-group-item" key={i}>{x}</li>
    ));
    return(
      <div className="jumbotron">
        <form className="form-group" onSubmit={(e) => this.submitBook(e)}>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            ref={(ref) => this.nameRef(ref)}
          />
          <textarea
            className="form-control"
            placeholder="Genre"
            ref={(ref) => this.genreRef(ref)}
          />
          <textarea
            className="form-control"
            placeholder="Description"
            ref={(ref) => this.descriptionRef(ref)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Add Image URL"
            ref={(ref) => this.imageRef(ref)}
          />
          <input
            type="submit"
            value="Create"
            className="btn btn-success"
          />
        </form>

        <h4>Authors of this Books</h4>
        <form onSubmit={this.addAuthor.bind(this)}>
          <input
            type="text"
            className="form-control"
            placeholder="Add Author"
            ref={(ref) => this.authorRef(ref)}
          />
          <input
            type="submit"
            value="Add Author"
          />
        </form>
        <ul className="list-group">
          {authorList}
        </ul>
      </div>
    )
  }
}


render(
  <CreateBook />,
  document.getElementById('create-book')
);