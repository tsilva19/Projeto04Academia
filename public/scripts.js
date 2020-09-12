const currentPage = location.pathname;
const menuItens = document.querySelectorAll("header .links a");

for (item of menuItens) {
    if(currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}



console.log(currentPage);











// codigo do modulo anterior
// const modalOverlay = document.querySelector('.modal-overlay')

// const cards = document.querySelectorAll('.card')

// for ( let card of cards ) {
//     card.addEventListener("click", function() {
//         const videoId = card.getAttribute("id");
//         window.location.href = `/video?id=${videoId}`
//         modalOverlay.classList.add('active') // Adciona uma classe
//         modalOverlay.querySelector("iframe").src = `https://www.youtube.com/embed/${videoId}` 
//     })
// }

// document.querySelector(".close-modal").addEventListener("click", function() {
//     modalOverlay.classList.remove("active")
//     modalOverlay.querySelector("iframe").src = ""
// })

