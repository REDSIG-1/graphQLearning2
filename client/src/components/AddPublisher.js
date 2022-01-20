import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import {flowRight as compose} from 'lodash';
import { addPublisherMutation } from '../queries/queries'

const AddPublisher = (props) => {
    
    const [ publisherName, setPublisherName ] = useState();
    const [ publisherLocation, setPublisherLocation ] = useState()

    function handleSubmit(){
        // e.preventDefault()
        props.addPublisherMutation({ 
            variables: {
                name: publisherName,
                location: publisherLocation,
            },
        })
        setPublisherName('');
        setPublisherName('')
    }


    return (
        <form id="add-publisher" onSubmit={e => { handleSubmit(e) }}>
            <div className="field">
                <label>Publisher's Name:</label>
                <input 
                    type="text" 
                    onChange={ (e) => setPublisherName( e.target.value )} 
                    value={publisherName}
                />
            </div>

            <div className="field">
                <label>Publisher's Location</label>
                <input 
                    type="text" 
                    onChange={ (e) => setPublisherLocation( e.target.value )} 
                    value={publisherLocation}
                />
            </div>
            <br/>
            <button>Add Publisher</button>
        </form>
      
    )
    
}

export default compose(
    graphql(addPublisherMutation, {name: "addPublisherMutation"}),
)( AddPublisher );
