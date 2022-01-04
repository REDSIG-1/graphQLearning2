import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import {flowRight as compose} from 'lodash';
// import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

 

const AddAuthor = (props) => {

    const [ authorName, setAuthorName ] = useState()

    // function displayAuthors(){
    //     var data = props.getAuthorsQuery;
    //     if (data.loading) {
    //         return (<option disabled>Loading Authors...</option>)
    //     } else {
    //         return data.authors.map(author => {
    //             return(
    //                 <option key={author.id} value={author.id}>{ author.name }</option>
    //             )
    //         })
    //     }
    // }

    function handleSubmit(e){
        e.preventDefault(); 
        // props.addBookMutation({ 
        //     variables: {
        //         name: bookName,
        //         genre: genre,
        //         authorId: authorId,
        //     },
        //     refetchQueries: [{ query: getBooksQuery }]
        // })
        setAuthorName('')
    }
  

  return (
        <form id="add-author" onSubmit={e => { handleSubmit(e) }}>

            <div className="field">
                <label>Authors Name:</label>
                <input 
                    type="text" 
                    onChange={ (e) => setAuthorName( e.target.value )} 
                    value={authorName}
                />
            </div>

            <br/>
            <button>Add Author</button>

        </form>
          
  );
}

// Here we are binding several different queries to one component
export default compose(
    // graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    // graphql(addBookMutation, {name: "addBookMutation"}),

)( AddAuthor )
