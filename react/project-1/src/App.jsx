import './App.css';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'https://api.spacex.land/graphql/',
    }),
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <main className="app">
                <h1>SpaceX Launches</h1>
                <p>App is wired to the GraphQL client and ready for queries.</p>
            </main>
        </ApolloProvider>
    );
}

export default App;