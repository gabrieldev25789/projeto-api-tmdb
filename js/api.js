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
    const postMovie = result.poster_path
    const overViewMovie = result.overview
    console.log(result)

    const divMovie = document.createElement("div")
    divMovie.id = "div-movie"

    const img = document.createElement("img")
    img.classList.add("img-poster")
    img.src = `https://image.tmdb.org/t/p/w500${postMovie}`
    img.addEventListener("click", () =>{
    overView.classList.remove("hide")
    })

    const overView = document.createElement("p")
    overView.classList.add("overview")
    overView.classList.add("hide")
    overView.textContent = overViewMovie

    divMovie.appendChild(img)
    divMovie.appendChild(overView)
    infosContainer.appendChild(divMovie)
  }))
  .catch(err => console.error(err));
}

consumirApi()






