const infosContainer = document.querySelector("#infos")

function consumirApi(){
fetch("https://api.themoviedb.org/3/movie/popular", {
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDNiYTA0MmI4MWYzYmI3MzAxNzk2NTA5OGQ4MmE3MSIsIm5iZiI6MTc2MjU3NzQyMy4xNTIsInN1YiI6IjY5MGVjYzBmZTI0ZTM2M2ZmOTg3NDZjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mGs7YuHJled5n4pNlJMw-UPwAQcvbQ_qsEL_zjkbp5M",
    accept: "application/json"
  }
})
  .then(res => res.json())
  .then(data => data.results.forEach((result)=>{
    const backDropMovie = result.backdrop_path
    const overViewMovie = result.overview
    const posterMovie = result.poster_path
    console.log(result)

    infos(backDropMovie, posterMovie, overViewMovie)
    
  }))
  .catch(err => console.error(err));
}
consumirApi()


function infos(backDropMovie, posterMovie, overViewMovie){
  const divMovie = document.createElement("div")
  divMovie.id = "div-movie"

  const backDropImg = document.createElement("img")
  backDropImg.classList.add("img-backdrop")
  backDropImg.src = `https://image.tmdb.org/t/p/w500${backDropMovie}`

  const posterImg = document.createElement("img")
  posterImg.classList.add("img-poster")
  posterImg.src = `https://image.tmdb.org/t/p/w500${posterMovie}`

   posterImg.addEventListener("click", () =>{
    overView.classList.toggle("hide")
  })

  const overView = document.createElement("p")
  overView.classList.add("overview")
  overView.classList.add("hide")
  overView.textContent = overViewMovie

  divMovie.appendChild(backDropImg)
  divMovie.appendChild(posterImg)
  divMovie.appendChild(overView)
  infosContainer.appendChild(divMovie)
}





