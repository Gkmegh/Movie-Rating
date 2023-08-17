const api =  document.getElementById("Api");
const searchbtn = document.getElementById("searchbtn");
const searchin = document.getElementById("Searchinput");
const moviecard = document.getElementById("moviecards");
const buffer = document.querySelector(".buffer");

async function searchdata(){
    moviecard.innerHtml= '';
    const apikey = api.value.trim();
    const search = searchin.value.trim();
    if(apikey ==='' || search ===''){
        return;
    }
    buffer.classList.remove("hide");
    const url = `https://www.omdbapi.com/?s=${search}&apikey=${apikey}`

    const response = await fetch(url);
    const data = await response.json();
    console.log(data, data.Search);
    if(data.Response === 'True'){
        makeMovieCards(data.Search);}
    else{
        handleError();
    }
}
function makeMovieCards(movies){
    buffer.classList.add("hide");
    const err_con = document.querySelector('.error');
    if(err_con) err_con.innerHTML= "";
    moviecard.innerHTML = '';
    let i = 1;
    movies.forEach(movie => {
        if(i > 9) return;
        const card = document.createElement('a');
        card.target = '_blank';
        card.className = 're-dir';
        card.href = `https://www.imdb.com/title/${movie.imdbID}/`
        let my_Str = `<div class="movie">
        <div class="poster">
        <img src="${movie.Poster === 'N/A' ? `N_A.jpg` : movie.Poster}" alt="movie-poster">
        </div>
        <div class="num">
                ${i}
            </div>
            <div class="title">
            ${movie.Title}
            </div>
            <div class="low">
            <div class="right">
            <div class="year">
            ${movie.Year} |
            </div>
            <div class="type">
            | ${movie.Type}
            </div>
            </div>
            </div>
            </div>`;
            card.innerHTML = my_Str;
            moviecard.appendChild(card);
            i++;
        });
    }



searchbtn.addEventListener("click", searchdata);



//showing image if error comes
function handleError(){
    const err = document.querySelector(".error");
    err.innerHTML = '';
    const img = document.createElement('img');
    img.src = "Error-handle.png";
    img.alt = "Something Went Wrong";
    err.appendChild(img);
    buffer.classList.add('hide');
    document.querySelector('main').appendChild(err);
}
