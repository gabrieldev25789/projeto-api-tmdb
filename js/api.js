const infosContainer = document.querySelector("#infos")
const buttonOverview = document.querySelector("#see-overview")

const selectTv = document.querySelector("#search-select-tv")
const selectMovie = document.querySelector("#search-select-movie")

let movieSelect 

[selectMovie, selectTv].forEach((el) => {
  el.addEventListener("change", () => {
    const value = el.value

    if (el === selectMovie) {
      movieSelect = true
      consumirApi("movie", value)
    } else {
      movieSelect = false
      consumirApi("tv", value)
    }
  })
})

function consumirApi(movieOrSerie, endPoint){
  infosContainer.innerHTML = ""
  let url = `https://api.themoviedb.org/3/${movieOrSerie}/${endPoint}`
fetch(url, {
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

    const titleSerie = result.name 
    const releaseDate = result.release_date
    const avgVote = result.vote_average
    const countVote = result.vote_count
    const adultContent = result.adult
    console.log(result)

    if(movieSelect === true){
    infos(backDropMovie, posterMovie, overViewMovie, titleMovie)
    extraInfos(releaseDate, avgVote, countVote, adultContent)
    } 
    else{
    const releaseDate = result.first_air_date
    infos(backDropMovie, posterMovie, overViewMovie, titleSerie)
    extraInfos(releaseDate, avgVote, countVote, adultContent)
    }
  }))
  .catch(err => console.error(err));
}


function infos(backDropMovie, posterMovie, overViewMovie, titleTvOrMovie){
  const divMovie = document.createElement("div")
  divMovie.id = "div-movie"

  const title = document.createElement("h1")
  title.classList.add("title-movie")
  title.textContent = titleTvOrMovie

  const backDropImg = document.createElement("img")
  backDropImg.alt = "img-backdrop"
  backDropImg.classList.add("img-backdrop")
  backDropImg.src = `https://image.tmdb.org/t/p/w500${backDropMovie}`

  const posterImg = document.createElement("img")
  posterImg.alt = "img-poster"
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
  liAdult.textContent = `${adultContent === false ? "This movie is for everyone" : "This movie is only for adult people"}`

  ulInfos.appendChild(liRelease)
  ulInfos.appendChild(liVote)
  ulInfos.appendChild(liCount)
  ulInfos.appendChild(liAdult)
  infosContainer.appendChild(ulInfos)
}





