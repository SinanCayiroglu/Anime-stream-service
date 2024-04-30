const urlsParams = new URLSearchParams(window.location.search)
const searchAnime = async()=>{
    try{
        const query2 = urlsParams.get("query")
        const query = document.querySelector(".search")
        const response = await fetch("https://api3.sinanime.workers.dev/search/"+query.value)
        const data = await response.json()
        console.log(data)
        generateSearchAnime(data)
    }catch(error){
        console.error(error)
    }
}

const generateSearchAnime = async (data)=>{
    const animeCards = document.querySelector(".anime-cards")
    const anime = data.results
    animeCards.innerHTML = anime.map(anime=>{
        return `
        <div class="anime-card">
            <a href="episode.html?anime_id=${anime.id}">
                <div class="anime-image">
                    <img src="${anime.image}" alt="anime">
                </div>
                <div class="anime-detail"
                ${anime.id}
            </a>
            <span>1 hour ago</span>
        </div>
`
    })
}

searchAnime()