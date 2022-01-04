import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import {flowRight as compose} from 'lodash';
// import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

 

const AddAuthor = (props) => {

    const [ authorName, setAuthorName ] = useState()
    const [ authorAge, setAuthorAge ] = useState()


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
        setAuthorName('');
        setAuthorAge('')
    }
  

  return (
        <form id="add-author" onSubmit={e => { handleSubmit(e) }}>

            <div className="field">
                <label>Author's Name:</label>
                <input 
                    type="text" 
                    onChange={ (e) => setAuthorName( e.target.value )} 
                    value={authorName}
                />
            </div>

            <div className="field">
                <label>Author's Age:</label>
                <input 
                    type="text" 
                    onChange={ (e) => setAuthorAge( e.target.value )} 
                    value={authorAge}
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
    // graphql(addAuthorMutation, {name: "addAuthorMutation"}),

)( AddAuthor )
