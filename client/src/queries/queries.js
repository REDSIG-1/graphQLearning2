import { gql } from 'apollo-boost';
// This code actually lets us interact with GQl from the from end
// These are the queries we build in Graphiql 
// So this allows us to now have to write these queries and just interact with the web page!

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`

const getPublishersQuery = gql`
    {
        publishers {
            name
            id
        }
    }
`

const addBookMutation = gql`
   mutation( $name: String!, $genre: String!,  $authorId: ID!, $publisherId: ID! ) {
   addBook( name: $name, genre: $genre, authorId: $authorId, publisherId: $publisherId ) {
        name
        id
    }
   }
`

const addAuthorMutation = gql`
    mutation( $name: String!, $age: Int! ) {
        addAuthor( name: $name, age: $age ) {
            name
            age
        }
    }
`

const addPublisherMutation = gql`
    mutation( $name: String!, $location: String! ) {
        addPublisher( name: $name, location: $location ) {
            name
            location
        }
    }
`


const getBookQuery = gql`
    query( $id: ID ) {
        book( id: $id ) {
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`

export { 
    getAuthorsQuery, 
    getBooksQuery, 
    addBookMutation, 
    addAuthorMutation,
    addPublisherMutation,
    getBookQuery,
    getPublishersQuery
}
