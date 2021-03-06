const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author')
const Publisher = require('../models/publisher')

// This is the important file that will interact with the DB and actually get it saved there
// It of course needs to import the models to get the data structure

// Once this is done you will be able to load up Graphiql and get request working / things saved to db etc. 


const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;


// =========================================
//               GQL Objects  
// =========================================
// Type relations!  SHowing GQL that books have authors


const BookType  = new GraphQLObjectType({
    name: 'Book',
    // The reason that we have the fields as a function is because we want to load ALL the types before doing relations
    // Will not work otherwise
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve( parent, args ){
               console.log(parent);
            //    Here we are looking through the list of authors for one who has an authorId which matches the ID of the parent.aurthorId 
            //    return _.find(authors, { id: parent.authorId }) 
                return Author.findById(parent.authorId)
            }
        }
    })
})

// Authors have books
const AuthorType  = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve( parent, args ){
                // Looking in the books array for any book which has an authorId of 2 for example and will return all of them as a list
                // return _.filter(books, {authorId: parent.id })
                return Book.find({
                    authorId: parent.id
                })
            }
        }
    })
})

// Publishers have books
// Maybe publishers have authors too??
const PublisherType = new GraphQLObjectType({
    name: 'Publisher',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            resolve( parent, args ){
                return Book.find ({
                    publisherId:parent.id
                })
            }
        }
    })
})

// =========================================
//               ROOT QUERIES 
// =========================================
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // args.id,
                // _.find is a lodash method
                // return _.find(books, { id: args.id })
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // args.id,
                // return _.find(authors, { id: args.id })
                return Author.findById(args.id)
            }
        },
        publisher: {
            type: PublisherType,
            args: { id: {type: GraphQLID } },
            resolve( parent, args){
                return Publisher.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve( parent,args ){
                // return books
                //  when you passs in an empty object it will return all the books as they will all match cause you are not setting any criteria
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                // return authors;
                return Author.find({})
            }
        },
        publishers: {
            type: new GraphQLList(PublisherType),
            resolve(parent, args){
                // return authors;
                return Publisher.find({})
            }
        }
    }
})


// const Mutation = newGraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//         type: AuthorType,
//         args: {
//             name: { type: GraphQLString },
//             age: { type: GraphQLInt }
//         },
//         resolve( parent, args){
//             let author = new Author
//         }
//     }
// })

// =========================================
//               Mutations 
// =========================================

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type:  new GraphQLNonNull( GraphQLString ) },
                age: { type:  new GraphQLNonNull( GraphQLInt ) }
            },
            resolve( parent, args ){
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull( GraphQLString ) },
                genre: { type:  new GraphQLNonNull( GraphQLString ) },
                authorId: { type:  new GraphQLNonNull( GraphQLID ) },
                publisherId: { type:  new GraphQLNonNull( GraphQLID ) }
            }, 
            resolve ( parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId,
                    publisherId: args.publisherId
                })
                return book.save();
            }
        },
        addPublisher: {
            type: PublisherType,
            args: {
                name: { type:  new GraphQLNonNull( GraphQLString ) },
                location: { type:  new GraphQLNonNull( GraphQLString ) } 
            },
            resolve ( parent, args){
                let publisher = new Publisher({
                    name: args.name,
                    location: args.location
                })
                return publisher.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
