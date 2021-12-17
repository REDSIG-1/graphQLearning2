import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
// import { Switch ,Route, Router } from 'react-router-dom';

// components
import BookList from './components/BookList'
import AddBook from './components/AddBook'
import Books from './components/Books'


// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
})

function App() {
  return (
      <ApolloProvider client={client}>
        <div id="main">
            <h1>Ninja's Reading List</h1>
            <BookList />
            <AddBook />
        </div>
      </ApolloProvider>
    // <ApolloProvider client={client}>
    //   <div id="main">
    //     <BookList  />
    //     <AddBook />
    //     {/* <Router>
    //       <Switch>
    //         <Route path="/books" exact component={Books} client={client} />
    //       </Switch>
    //   </Router> */}
    //   </div>
    // </ApolloProvider>
  );
}

export default App;
