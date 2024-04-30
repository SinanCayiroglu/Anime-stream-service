const urlParams = new URLSearchParams(window.location.search)
const animeInfo = async()=>{
    try{
        const anime_id = urlParams.get("anime_id")
        const response = await fetch("https://api3.sinanime.workers.dev/anime/"+anime_id)
        const data = await response.json()
        generateAnimeInfo(data)
    }catch(error){
        console.error(error)
    }
}

const generateAnimeInfo = async (data)=>{
    const animeInfo = document.querySelector(".anime-infos")
    const anime = data.results
    let animeInfoHTML = `<div class="anime-info">
    <div class="anime-image">
    <img  src="${anime.image}"></img>
    </div>
    <div class="anime-details">
    <div class="anime-detail">
    <h3>${anime.name}</h3>
    <span>Anime Type:${anime.type}</span>
    <p>Plot summary:${anime.plot_summary}</p>
    <span>Anime genre:${anime.genre}</span>
    <span>Released:${anime.released}</span>
    <span>Status:${anime.status}</span>
    <span>${anime.ongoing}</span>
    </div>
    </div>
    </div>
    <hr>
    `
    let episodeGridHTML = `
            <div class="episode-head">
            <h3>List Of Episodes</h3>
            </div>
            <div class="anime-episode-grid">
            ${anime.episodes.map(anime => {
            return `<a href="episode.html?anime_id=${anime[1]}">${anime[0]}</a>`
        }).join('')})</div>
        `
    
    animeInfo.innerHTML = animeInfoHTML + episodeGridHTML;
}

animeInfo()

const sidebar = async()=>{
    try{
        const response = await fetch("https://api3.sinanime.workers.dev/gogoPopular/1")
        const data = await response.json()
        generateSideBar(data)
    }catch(error){
        console.error(error)
    }
}

const generateSideBar = async(data)=>{
    const sidebar = document.querySelector(".day ol")
    const anime = data.results
    sidebar.innerHTML = anime.map(anime=>{
        return `<a href="anime.html?anime_id=${anime.id}"><li>${anime.title}</li></a>`
    })
}
sidebar()