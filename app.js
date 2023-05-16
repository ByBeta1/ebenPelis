let pagina = 1;
let movieNameRef = document.getElementById("movie-name");

let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');


btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarPeliculas();
	}
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas();
	}
});

const cargarPeliculas = async() => {
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`);
	
		console.log(respuesta);
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			
			let peliculas = '';
			datos.results.forEach(pelicula => {
				peliculas += `
					<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<div class="tooltip">
						
    					<h1>${pelicula.original_title}</h1>
    					
    					<p class="añoPelicula">   ${pelicula.release_date}</p>
    					<p class="añoPeliculaa"> ⭐${pelicula.vote_average} </p>
						<br>
						<br>
    					<p>${pelicula.overview}</p>
                        <h3>Genreros=${pelicula.genre_ids}</h3>
  						</div>
                          
						<h3 class="titulo">${pelicula.title}</h3>
					</div>
				`;
			});

			document.getElementById('contenedor').innerHTML = peliculas;

		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			console.log('La película que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch(error){
		console.log(error);
	}

}

cargarPeliculas();

let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=afb3a1c5`;
    

    if (movieName.length <= 0) {
        result.innerHTML = ``;
    }

    else {
        fetch(url).then((resp) => resp.json()).then((data) => {
            
            if (data.Response == "True") {
                result.innerHTML = `
                    <div class="info">
                        <img  src=${data.Poster} class="poster" id="posterimg" >
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <p>⭐</p>
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Resumen:</h3>
                    <p>${data.Plot}</p>
                    <h3>Actores:</h3>
                    <p>${data.Actors}</p>
                    <button class="btnTrailer">Trailer</button>
                    `;
            }
            else {
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })

            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
            });
    }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);


const enlacesGenero = document.querySelectorAll('a');
const divDatosApi = document.getElementById('datos-api');

enlacesGenero.forEach(enlace => {
  enlace.addEventListener('click', e => {
    e.preventDefault();
    const genero = enlace.id;

    const apiKey = '192e0b9821564f26f52949758ea3c473';
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es&with_genres=${genero}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        mostrarDatos(data.results);
      })
      .catch(error => {
        console.log('Ha ocurrido un error:', error);
      });
  });
});

function mostrarDatos(data) {
  divDatosApi.innerHTML = '';

  data.forEach(item => {
    const titulo = item.title;
    const elemento = document.createElement('p');
    elemento.textContent = titulo;
    divDatosApi.appendChild(elemento);
  });
}
