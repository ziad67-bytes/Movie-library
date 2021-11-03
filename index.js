// apykey = ed6013b8
const search_index= document.querySelector(".search-main-button");
const input_index = document.querySelector(".search-main-input");
const search = document.querySelector(".search-button");
const input = document.querySelector(".search-input");


search_index.addEventListener("click", function(){
    console.log(input_index)
    sessionStorage.setItem("header_movie",input_index.value)
})
search.addEventListener("click", function(e){
    sessionStorage.setItem("header_movie",input.value)
})