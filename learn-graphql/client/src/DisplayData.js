import React, { useState } from 'react'
import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";

const QUERY_ALL_USER = gql`
    query GetAllUsers{
      users{
        id
        name
        age
        username
        nationality
      }
    }
`
const QUERY_ALL_MOVIES = gql`
    query QueryMovies {
    movies {
      name
    }
}
`
const GET_MOVIE_BY_NAME = gql `
  query Movie($name: String!) {
    movie(name: $name) {
        name
        yearOfPublication
  }
}
`
const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!){
    createUser(input: $input){
      name
      id
    }
  }
`
const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!){
    deleteUser(id: $id){
      id
    }
  }
`




export default function Displaydata() {

  const [movieSearched, setmovieSearched] = useState("");
  const { data, loading, refetch } = useQuery(QUERY_ALL_USER);
  const { data: movie_data } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, {data: movieSearchedData, error:movieError,loading: movieLoader}] = useLazyQuery(GET_MOVIE_BY_NAME);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");
  const [id, setId] = useState(0);
  
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);

  console.log(movieSearchedData)
  return (
    <div>
      <div>
        <input type='text' placeholder='Name' onChange={(e) => {setName(e.target.value)}}/>
        <input type='text' placeholder='Username' onChange={(e) => {setUsername(e.target.value)}}/>
        <input type='text' placeholder='Age' onChange={(e) => {setAge(Number(e.target.value))}}/>   
        <input type='text' placeholder='Nationality' onChange={(e) => {setNationality(e.target.value.toUpperCase())}}/>     
        <button onClick={() => {
          createUser({variables:{
            input: {name, username, age, nationality}
          }});
          refetch();
        }}>
          Create User
          </button>                
      </div>

      <div>
        <input type='number' placeholder='Put id to be deleted' onChange={(e) => {setId(e.target.value)}}/>
        <button onClick={() => {
          deleteUser({variables:{id}});
          refetch()
        }}>Delete User</button>
      </div>

      {data && data.users.map((user) => {
        return (
        <div>
          <h1>Id: {user.id} </h1>
          <h1>Name: {user.name}</h1>
          <h1>Username: {user.username}</h1>
          <h1>Age: {user.age}</h1>
          <h1>nationality: {user.nationality}</h1>
         </div>
      )})}


      {movie_data && movie_data.movies.map((movie) => {
        return <h1>Movie Name: {movie.name}</h1>;
      })}

      <input placeholder='type your movie...' type='text' onChange={(e) => {setmovieSearched(e.target.value)}}/>

      <button  onClick={() => {
        fetchMovie({
          variables: {
            name: movieSearched.trim(),
          }
        })
      }}>Fetch data</button>
      <div>
        {movieSearchedData && (
          <div>
            <h1>Name:{movieSearchedData.movie.name}</h1>
            <h1>Year Of Publication:{movieSearchedData.movie.yearOfPublication}</h1>

          </div>

        )}
      </div>
    </div>
  )
}

