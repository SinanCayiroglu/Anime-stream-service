
const urlsParams = new URLSearchParams(window.location.search)
const searchAnime = async()=>{
    try{
        const query = urlsParams.get("search")
        const response = await fetch("https://api3.sinanime.workers.dev/search/"+query)
        const data = await response.json()
        generateSearchAnime(data)
    }catch(error){
        console.error(error)
    }
}

searchAnime()

const generateSearchAnime = async (data)=>{
    const animeCards = document.querySelector(".anime-cards")
    const anime = data.results
    animeCards.innerHTML = anime.map(anime=>{
        return `
        <div class="anime-card">
            <a href="anime.html?anime_id=${anime.id}">
                <div class="anime-image">
                    <img src="${anime.img}" alt="anime">
                </div>
                <div class="anime-detail">
                ${anime.id}
                </div>
            </a>
            <span>1 hour ago</span>
        </div>
`
    }).join('')
}


const fetchSidebar = async()=>{
    try{
        const response = await fetch("https://api3.sinanime.workers.dev/home")
        const data = await response.json()
        console.log(data)
        generateSidebar(data)
    }catch(error){
        console.error(error)
    }
}

const generateSidebar = async (data)=>{
    const sidebar = document.querySelector(".side-bar ol")
    const animes = data.results.anilistTrending
    sidebar.innerHTML = animes.map(anime=>{
        return `
        <a href="anime.html?anime_id=${anime.title.userPreferred}"><li>${anime.title.userPreferred}</li></a>`
    }).join('')

}
fetchSidebar()