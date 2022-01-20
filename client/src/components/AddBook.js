import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import {flowRight as compose} from 'lodash';
import { getAuthorsQuery, addBookMutation, getBooksQuery, getPublishersQuery } from '../queries/queries'

 

const AddBook = (props) => {

    const [ bookName, setBookName ] = useState()
    const [ genre, setGenre ] = useState()
    const [ authorId, setAuthorId ] = useState()
    const [ publisherId, setPublisherId ] = useState()

    function displayAuthors(){
        var data = props.getAuthorsQuery;
        if (data.loading) {
            return (<option disabled>Loading Authors...</option>)
        } else {
            return data.authors.map(author => {
                return(
                    <option key={author.id} value={author.id}>{ author.name }</option>
                )
            })
        }
    }

    function displayPublishers(){
        var data = props.getPublishersQuery;
        if (data.loading) {
            return (<option disabled>Loading Publishers...</option>)
        } else {
            return data.publishers.map(publisher => {
                return(
                    <option key={publisher.id} value={publisher.id}>{ publisher.name }</option>
                )
            })
        }
    }

    function handleSubmit(e){
        e.preventDefault(); 
        props.addBookMutation({ 
            variables: {
                name: bookName,
                genre: genre,
                authorId: authorId,
                publisherId: publisherId
            },
            refetchQueries: [{ query: getBooksQuery }]
        })
        setGenre('')
        setBookName('')
    }
  

  return (
        <div>
            <form id="add-book" onSubmit={e => { handleSubmit(e) }}>

                <div className="field">
                    <label>Book name:</label>
                    <input 
                        type="text" 
                        onChange={ (e) => setBookName( e.target.value )}
                        value={bookName} 
                    />
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input 
                        type="text" 
                        onChange={ (e) => setGenre( e.target.value )} 
                        value={genre}
                    />
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select  onChange={ (e) => setAuthorId( e.target.value )}  >
                        <option>Select author</option>
                        { displayAuthors() }
                    </select>
                </div>

                <div className="field">
                    <label>Publisher:</label>
                    <select  onChange={ (e) => setPublisherId( e.target.value )}  >
                        <option>Select Publisher</option>
                        { displayPublishers() }
                    </select>
                </div>
                <br/>
                <button>Add Book</button>
            </form>  
        </div>
  );
}

// Here we are binding several different queries to one component
export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"}),
    graphql(getPublishersQuery, {name: "getPublishersQuery"}),

)( AddBook )
