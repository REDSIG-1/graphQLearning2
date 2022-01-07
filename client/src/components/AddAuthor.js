import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import {flowRight as compose} from 'lodash';
import { addAuthorMutation } from '../queries/queries'

 

const AddAuthor = (props) => {

    const [ authorName, setAuthorName ] = useState()
    const [ authorAge, setAuthorAge ] = useState()  

    function handleSubmit(e){
        e.preventDefault(); 
        props.addAuthorMutation({ 
            variables: {
                name: authorName,
                age: authorAge,
            },
        })
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
    graphql(addAuthorMutation, {name: "addAuthorMutation"}),
)( AddAuthor )
