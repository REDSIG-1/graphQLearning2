import React from 'react'
import { graphql } from 'react-apollo'
import { getBookQuery } from '../queries/queries'

const BookDetails = (props) => {

  function displayBookDetails(){
    const { book } = props.data;

    if (book) {
      console.log( book.author )

      return  (
        <div>
          <h4>{ book.name.toString() }</h4>
          <h4>{ book.genre.toString() }</h4>
          <h4>{ book.author.name.toString() }</h4>
        </div>
      ) 
    } else {
      return "nae book selected"
    }
  }

  return (
        <div id="book-details">
          { displayBookDetails() }
        </div>
  );
}

// Binding getBookQuery to the BookDetails component
export default graphql( getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.selectedBookId
      }
    } 
  }
} )( BookDetails );
// export default BookDetails;
