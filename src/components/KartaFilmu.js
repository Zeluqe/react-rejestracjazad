import React from 'react';

function KartaFilmu(props) {

  const film = props.film;

  const wybierzFilmSeans = props.wybierzFilmSeans;

  console.log("---- \n Karty filmu", film.title);

  function obsluzWybor(godzina) {
    console.log("-------  \n wybor: ", film.title, godzina);
    wybierzFilmSeans(film, godzina);
  }

  return (
    <div className="karta-filmu">
      <div className="kontener-plakatu">
        <img src={film.poster} alt={film.title} className="plakat-filmu" />
      </div>

      <div className="tresc-karty">

        <div className="meta-filmu">
          <span className="gatunek-filmu">{film.genre}</span>
          <span className="czas-filmu">{film.duration} min</span>
        </div>

        <h2 className="tytul-filmu">{film.title}</h2>

        <p className="opis-filmu">{film.description}</p>

        <div className="sekcja-seansow">
          <div className="etykieta-sekcji">Dostępne godziny seansu:</div>

          <div className="lista-godzin">

            {film.showtimes.map((godzina, index) => (
              <button type="button" key={index} className="przycisk-godzina"
                onClick={() => obsluzWybor(godzina)}>

                {godzina}
              </button>

            ))}
          </div>
        </div>

      </div>

    </div>
  );

}

export default KartaFilmu;
