import './App.css';
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from "@apollo/client/react";
import DisplayData  from './DisplayData';

function App() {
  const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
});


  return (
    <ApolloProvider client={client}>
      <div className="App">
       <DisplayData/>
      </div>
    </ApolloProvider>
    
  );
}

export default App;
