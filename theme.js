const themeIcon = document.querySelector(".theme i");

const container = document.querySelector(".container");
const sidebar = document.querySelector(".side-bar");
const header = document.querySelector(".header");
const containerBody = document.querySelector(".container-body");

const applyTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        container.classList.add("light-theme1");
        sidebar.classList.add("light-theme");
        header.classList.add("light-theme");
        containerBody.classList.add("light-theme");
    } else {
        container.classList.remove("light-theme1");
        sidebar.classList.remove("light-theme");
        header.classList.remove("light-theme");
        containerBody.classList.remove("light-theme");
    }
}

const toggleTheme = () => {
    if (container.classList.contains("light-theme1")) {
        container.classList.remove("light-theme1");
        sidebar.classList.remove("light-theme");
        header.classList.remove("light-theme");
        containerBody.classList.remove("light-theme");
        localStorage.setItem("theme", "dark");
    } else {
        container.classList.add("light-theme1");
        sidebar.classList.add("light-theme");
        header.classList.add("light-theme");
        containerBody.classList.add("light-theme");
        localStorage.setItem("theme", "light");
    }
}

themeIcon.addEventListener("click", toggleTheme);

applyTheme(); // Call applyTheme function when the script is executed