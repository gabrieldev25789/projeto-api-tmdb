const infosContainer = document.querySelector("#infos")
const buttonOverview = document.querySelector("#see-overview")

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
    const titleMovie = result.original_title

    const releaseDate = result.release_date
    const avgVote = result.vote_average
    const countVote = result.vote_count
    const adultContent = result.adult

    console.log(result)

    infos(backDropMovie, posterMovie, overViewMovie, titleMovie)
    extraInfos(releaseDate, avgVote, countVote, adultContent)
    
  }))
  .catch(err => console.error(err));
}
consumirApi()


function infos(backDropMovie, posterMovie, overViewMovie, titleMovie){
  const divMovie = document.createElement("div")
  divMovie.id = "div-movie"

  const title = document.createElement("h1")
  title.classList.add("title-movie")
  title.textContent = titleMovie

  const backDropImg = document.createElement("img")
  backDropImg.classList.add("img-backdrop")
  backDropImg.src = `https://image.tmdb.org/t/p/w500${backDropMovie}`

  const posterImg = document.createElement("img")
  posterImg.classList.add("img-poster")
  posterImg.src = `https://image.tmdb.org/t/p/w500${posterMovie}`

  posterImg.addEventListener("click", () =>{
    overView.classList.toggle("hide")
    backDropImg.classList.toggle("hide")
    overView.classList.add("show-infos")
    posterImg.classList.toggle("box-shadow")
  })

  const overView = document.createElement("p")
  overView.classList.add("overview")
  overView.classList.add("hide")
  overView.textContent = `${overViewMovie}`

  infosContainer.appendChild(title)
  divMovie.appendChild(backDropImg)
  divMovie.appendChild(posterImg)
  divMovie.appendChild(overView)
  infosContainer.appendChild(divMovie)
}


function extraInfos(releaseDate, avgVote, countVote, adultContent){

  const ulInfos = document.createElement("ul")
  ulInfos.id = "ul-infos"

  const liRelease = document.createElement("li")
  liRelease.classList.add("li-info")
  liRelease.textContent = `Release date: ${releaseDate}`

  const liVote = document.createElement("li")
  liVote.classList.add("li-info")
  liVote.textContent = `Average vote: ${avgVote}`

  const liCount = document.createElement("li")
  liCount.classList.add("li-info")
  liCount.textContent = `Count votes: ${countVote}`

  const liAdult = document.createElement("li")
  liAdult.classList.add("li-info")
  liAdult.textContent = `${adultContent === false ? `This movie is for everyone` : `This movie is only for adult people`}`

  ulInfos.appendChild(liRelease)
  ulInfos.appendChild(liVote)
  ulInfos.appendChild(liCount)
  ulInfos.appendChild(liAdult)
  infosContainer.appendChild(ulInfos)
}





