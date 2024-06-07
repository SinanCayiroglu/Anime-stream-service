let page = 1;
let isLoading = false;

const fetchRecentAnimes = async () => {
    if (isLoading) return;
    isLoading = true;

    try {
        const response = await fetch(`https://api3.sinanime.workers.dev/recent/${page}`);
        const data = await response.json();
        generateRecentAnime(data);
        page++;
        isLoading = false;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        isLoading = false;
    }
};

const generateRecentAnime = async (data) => {
    const animeCards = document.querySelector(".anime-cards");
    const animes = data.results;
    animeCards.innerHTML += animes.map(anime => {
        return `
        <div class="anime-card">
            <a href="episode.html?anime_id=${anime.id}">
                <div class="anime-image">
                    <img src="${anime.image}" alt="anime">
                </div>
                <div class="anime-detail">
                    ${anime.id}
                </div>
            </a>
            <span></span>
        </div>
        `;
    }).join('');

    // Attach Intersection Observer to the last anime card
    const lastAnimeCard = animeCards.lastElementChild;
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            fetchRecentAnimes();
        }
    }, { threshold: 0.5 });
    observer.observe(lastAnimeCard);
};

fetchRecentAnimes();

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