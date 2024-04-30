const urlParams = new URLSearchParams(window.location.search)
const fetchEpisode = async ()=>{
    try{
        const anime_id = urlParams.get("anime_id")
        const response = await fetch("https://api3.sinanime.workers.dev/episode/"+anime_id)
        const data = await response.json()
        generateAnimeEpisode(data)
    }catch(error){
        console.error(error)
    }
}

const generateAnimeEpisode = async (data)=>{
    const animeEpisode = document.querySelector(".anime-episode")
    const anime = data.results
    animeEpisode.innerHTML = `
    <div class="video">
    <iframe src="${anime.stream.Referer}" allow="fullscreen"></iframe>
    </div>
    `
}

fetchEpisode()

const sidebar = async ()=>{
    try{
        let anime_id = urlParams.get("anime_id")
        if (anime_id.includes("-episode-")) {
            anime_id = anime_id.split("-episode-")[0];
        }
        const response = await fetch("https://api3.sinanime.workers.dev/anime/"+anime_id)
        const data = await response.json()
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }console.log(data)
        generateSidebar(data)
    }catch(error){
        console.error(error)
    }
}

const generateSidebar = async (data)=>{
    const sidebar = document.querySelector(".side-bar ol")
    const animes = data.results
    sidebar.innerHTML = animes.map(anime=>{
        return `<a href="${anime.episodes}"><li>${anime.episodes}</li></a>`
    }).join("")
}

sidebar()