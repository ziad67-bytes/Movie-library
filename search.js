// apykey = ed6013b8
const contenu = document.querySelector(".list-film");
const search = document.querySelector(".search-button");
const input = document.querySelector(".search-input");
const divChangePage = document.querySelector(".div-change-page");
let varChangePage = 0
//EVENT

search.addEventListener("click", function(){
    sessionStorage.setItem("header_movie",input.value)
})
divChangePage.addEventListener("click",getDataNewpage)
getData();
contenu.addEventListener("click",function(e){
    if(e.target.classList.contains("titre")){
        sessionStorage.setItem("name", e.target.innerText)
    }else{}
})

//FUNCTION

async function getData(){
    const url = await fetch("https://www.omdbapi.com/?s="+sessionStorage.getItem("header_movie")+"&apikey=ed6013b8");
    const response =  await url.json();
    if(response.Response === "False"){
        getError();
    }else{
        getElement(response);  
        getChangePage(response);
    } 

}

function getError(){
    const error = document.createElement("div");
    error.classList.add("error-div");
    const errorIcone = document.createElement("p");
    errorIcone.classList.add("error-icone");
    error.appendChild(errorIcone);
    errorIcone.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
    const errorText = document.createElement("p");
    errorText.classList.add("error-text");
    errorText.innerText = "Sorry we don't found your movie"
    error.appendChild(errorText);
    contenu.appendChild(error);

}
function getElement(response){
    console.log(response);
    response.Search.forEach(element => {
        console.log(element);
        const movie= document.createElement("div");
        movie.classList.add("movie");
        const poster = document.createElement("img");
        poster.classList.add("poster");
        if(element.Poster === "N/A"){
            poster.src =  'image/not-image.jpg'
        }else{
            poster.src = element.Poster;
        }
        movie.appendChild(poster)
        const text = document.createElement("div");
        text.classList.add("text");
        movie.appendChild(text)
        const titre = document.createElement("a");
        titre.href = "info.html"
        titre.classList.add("titre");
        titre.innerText = element.Title
        text.appendChild(titre)
        const sousTitre = document.createElement("p");
        sousTitre.classList.add("sous-titre");
        sousTitre.innerText = element.Year+" / "+element.Type;
        text.appendChild(sousTitre);
        contenu.appendChild(movie)
    });

}

function getChangePage(response){
    const nbrPage = (Math.floor(response.totalResults/10)+1);
    const divNumPage = document.createElement("div");
    divNumPage.classList.add("div-num-page")
    // ARROW
    const arrowLeft = document.createElement("button");
    arrowLeft.classList.add("arow-left");
    arrowLeft.innerHTML = '<i class="fas fa-arrow-circle-left"></i>';
    divChangePage.appendChild(arrowLeft);
    const arrowRight = document.createElement("button");
    arrowRight.classList.add("arow-right");
    arrowRight.innerHTML = '<i class="fas fa-arrow-circle-right"></i>';
    divChangePage.appendChild(arrowRight);
    //Bouton numPage 

    const textNumPage = document.createElement("p");
    textNumPage.classList.add("text-num-page");
    textNumPage.innerText = "Page 1 sur "+nbrPage
    divChangePage.appendChild(textNumPage);
    if(nbrPage <= 5){
        for(let i = 1; i<= nbrPage; i++){
            const buttNbr = document.createElement("button");
            buttNbr.classList.add("button-change-page");
            buttNbr.innerText = i
            divNumPage.appendChild(buttNbr);
        }
    }else{
        for(let i = 1; i<= 5; i++){
            const buttNbr = document.createElement("button");
            buttNbr.classList.add("button-change-page");
            buttNbr.innerText = i+varChangePage;
            divNumPage.appendChild(buttNbr);
        }
        const lastbutt = document.createElement("button");
        lastbutt.classList.add("last-butt");
        lastbutt.innerText = nbrPage;
        divNumPage.appendChild(lastbutt);

    }
    //Append 
    divChangePage.appendChild(divNumPage);
}

async function getDataNewpage(event){
    event.preventDefault();
    console.log(event.target.innerText)
    console.log(event.target)
    if(event.target.classList.contains("fa-arrow-circle-left")|| event.target.classList.contains("arow-left")){
        varChangePage -= 1
        for (let i = 0; i <=5; i++) {
            if(document.querySelector(".div-num-page").childNodes[i].classList.contains('last-butt') === false){
                document.querySelector(".div-num-page").childNodes[i].innerText= i+1+varChangePage;

            }else{
                console.log("ouii")
            }
        }
    }else if (event.target.classList.contains("arow-right")||event.target.classList.contains("fa-arrow-circle-right")){
        varChangePage += 1
        for (let i = 0; i <=5; i++) {
            if(document.querySelector(".div-num-page").childNodes[i].classList.contains('last-butt')){

            }else{
            document.querySelector(".div-num-page").childNodes[i].innerText = i+1+varChangePage;
            }
        }
    }else{
        const url = await fetch("https://www.omdbapi.com/?s="+sessionStorage.getItem("header_movie")+"&page="+event.target.innerText+"&apikey=ed6013b8");
        const response = await url.json();
        getNewPage(response,event.target.innerText);
    }
}

function getNewPage(response, indice){
    while(contenu.firstChild){
        contenu.removeChild(contenu.firstChild);
        console.log(contenu.firstChild)
    }
    document.querySelector(".text-num-page").innerText = "Page "+indice + " sur " + (Math.floor(response.totalResults/10)+1)
    getElement(response);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

}

