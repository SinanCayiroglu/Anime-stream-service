
const fetchRecentAnimes = async () => {
    try {
        const response = await fetch("https://api3.sinanime.workers.dev/recent/1");
        const data = await response.json();
        generateRecentAnime(data)
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

const generateRecentAnime = async (data ) =>{
    const animeCards = document.querySelector(".anime-cards")
    const animes = data.results
    animeCards.innerHTML = animes.map(anime=>{
        return `
        <div class="anime-card">
            <a href="episode.html?anime_id=${anime.id}">
                <div class="anime-image">
                    <img src="${anime.image}" alt="anime">
                </div>
                <div class="anime-detail">
                ${anime.id}</div>
            </a>
            <span>1 hour ago</span>
        </div>
`
    }).join('')
}
fetchRecentAnimes()

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