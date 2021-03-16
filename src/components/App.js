import React from "react";
import MovieList from "./MovieList";
import SearchBar from "./SearchBar";




class App extends React.Component {

  state = {
    movies: [],

    searchQuery: ""
  }

  componentDidMount() {
    const baseURL = "http://localhost:3002/movies" // verilerimiz neredeyse orayı yani neyi fetch etmek istiyoruz. 
    const response = fetch(baseURL)
    console.log(response)
    const data = response.json(); // verileri bize json olarak versin diye bu şekilde yaptık. 
    console.log(data)
  }

  deleteMovie = (movie) => {
    const newMovieList = this.state.movies.filter(
      m => m.id !== movie.id
    );
    // this.setState({
    //   movies: newMovieList
    // })
    this.setState(state => ({
      movies: newMovieList
    }))
  }

  searchMovie = (event) => {
    // console.log(event.target.value)
    // buraya yazacagım şeyin searchQueryi i update etmesini bekliyorum. 
    this.setState({ searchQuery: event.target.value })
  }

  render() {

    let filterdMovies = this.state.movies.filter(
      // stateden gelen filmleri filtreliyecek. 
      (movie) => {
        return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
      }
    )

    return (

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <SearchBar searchMovieProp={this.searchMovie} />
          </div>
        </div>

        <MovieList
          movies={filterdMovies}
          deleteMovieProp={this.deleteMovie} />
      </div>
    )
  }
}

export default App