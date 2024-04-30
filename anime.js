const urlParams = new URLSearchParams(window.location.search);

const animeInfo = async () => {
    try {
        const anime_id = urlParams.get("anime_id");
        const response = await fetch("https://api3.sinanime.workers.dev/anime/" + anime_id);
        const data = await response.json();
        generateAnimeInfo(data);
        recommendedAnimes(); // Call recommendedAnimes after generating anime details
    } catch (error) {
        console.error(error);
    }
}

const generateAnimeInfo = async (data) => {
    const animeInfo = document.querySelector(".anime-infos");
    const anime = data.results;
    let animeInfoHTML = `<div class="anime-info">
        <div class="anime-image">
            <img src="${anime.image}" alt="Anime Image">
        </div>
        <div class="anime-details">
            <div class="anime-detail">
                <h3>${anime.name}</h3>
                <span>Anime Type: ${anime.type}</span>
                <p>Plot summary: ${anime.plot_summary}</p>
                <span>Anime genre: ${anime.genre}</span>
                <span>Released: ${anime.released}</span>
                <span>Status: ${anime.status}</span>
            </div>
        </div>
    </div>
    <hr>`;

    let episodeGridHTML = `<div class="episode-head">
        <h3>List Of Episodes</h3>
    </div>
    <div class="grid-container">
        <div class="anime-episode-grid">
            ${anime.episodes.map(anime => {
                return `<a href="episode.html?anime_id=${anime[1]}">${anime[0]}</a>`;
            }).join('')}
        </div>
    </div>`;

    animeInfo.innerHTML = animeInfoHTML + episodeGridHTML;
}

const recommendedAnimes = async () => {
    try {
        const anime_id = urlParams.get("anime_id");
        const response = await fetch("https://api3.sinanime.workers.dev/recommendations/" + anime_id);
        const data = await response.json();
        generateRecommendedAnimes(data);
    } catch (error) {
        console.error(error);
    }
}

const generateRecommendedAnimes = async (data) => {
    const animeInfo = document.querySelector(".anime-infos");
    const animes = data.results;
    let recommendedHTML = animes.map(anime => {
        return `
        <div class="anime-card">
            <a href="anime.html?anime_id=${anime.title.userPreferred}">
                <div class="anime-image">
                    <img src="${anime.coverImage.extraLarge}" alt="anime">
                </div>
                <div class="anime-detail">
                    ${anime.title.userPreferred}
                </div>
            </a>
            <span></span>
        </div>`;
    }).join('');

    animeInfo.innerHTML += `<h3 class="heading">Similiar Animes</h3><div class="anime-cards">${recommendedHTML}</div>`; // Append recommendedHTML to animeInfo
}

animeInfo();



const sideBar = async()=>{
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
    }).join("")
}
sideBar()