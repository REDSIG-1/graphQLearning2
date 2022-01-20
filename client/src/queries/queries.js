import { gql } from 'apollo-boost';

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
    getBookQuery,
    getPublishersQuery
}
