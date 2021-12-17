import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'

// components
import BookDetails from './BookDetails'

const BookList = (props) => {
    const [ selectedBook, setSelectedBook ] = useState()

    function displayBooks() {
        if ( props.data.loading ) {
            return ( <div>Loading Books....</div>)
        } else {
            return props.data.books.map( book => {
                return <li
                    key={book.id} 
                    onClick={ (e) => { setSelectedBook(book.id) }}
                >{book.name}</li>

            })
        }
    }
  

  return (
        <div>
           <ul>
                { displayBooks() }
            </ul>
            <BookDetails selectedBookId={selectedBook}/>
        </div>
  );
}

export default graphql( getBooksQuery )( BookList );
