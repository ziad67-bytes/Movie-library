//"&apikey=ed6013b8"

const poster = document.querySelector('.image');
const graphique = document.querySelector(".graphique");
const score = document.querySelector(".score");
const info = document.querySelector(".info-precise");
const enregistrer = document.querySelector(".enregistrer");
const search = document.querySelector(".search-button");
const input = document.querySelector(".search-input");





//EVENTS 

search.addEventListener("click", function(e){
    sessionStorage.setItem("header_movie",input.value)
})
getData()



//Function

async function getData(){
    console.log(sessionStorage.getItem("name"))
    const url = await fetch("https://www.omdbapi.com/?t=" + sessionStorage.getItem("name")+"&plot=full&apikey=ed6013b8")
    const response = await url.json();
    getElement(response);
    console.log(response)
}


function getElement(response){
    //ADD
    poster.src = response.Poster;
    document.querySelector(".titre").innerText = response.Title;
    document.querySelector(".annee-type").innerText = response.Type+" / " + response.Year;
    score.innerText = response.imdbRating
    // CREATE
    for (const key in response) {
        if(key==="Year" ||
         key === "Poster" ||
         key ==="Ratings" ||
         key === "Metascore" || 
         key === "imdbRating" || 
         key === "imdbVotes" ||
         key === 'imdbID' ||
         key === "Response"||
         key === "Production"||
         key === "Type" ||
         key === "Rated"){}
        else{
            const infolList = document.createElement("li");
            infolList.classList.add("info-list");
            const cle = document.createElement("strong");
            cle.classList.add("key");
            cle.innerText = key + ":";
            const valeur = document.createElement("p");
            valeur.classList.add("value");
            valeur.innerHTML = '&ensp;'+response[key];
            //APEND
            infolList.appendChild(cle);
            infolList.appendChild(valeur);
            info.appendChild(infolList); 
        }    

    }


}