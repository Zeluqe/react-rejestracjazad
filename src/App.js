import React, { useState, useEffect } from 'react';
import './App.css';
import KartaFilmu from './components/KartaFilmu';
import SalaKinowa from './components/SalaKinowa';
import FormularzRezerwacji from './components/FormularzRezerwacji';
import Podsumowanie from './components/Podsumowanie';

const filmy = [
  {
    id: 1,
    title: "Interstellar",
    genre: "Sci-Fi",
    duration: 169,
    description: "Gdy Ziemia staje w obliczu katastrofy ekologicznej, grupa astronautów wyrusza w podróż przez tunel czasoprzestrzenny w poszukiwaniu nowego domu dla ludzkości.",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    showtimes: ["16:00", "19:30"]
  },
  {
    id: 2,
    title: "Diuna: Część druga",
    genre: "Sci-Fi",
    duration: 166,
    description: "Paul Atryda zawiera sojusz z Chani i Fremenami, szukając zemsty na spiskowcach, którzy zniszczyli jego rodzinę i przygotowując się na nieuchronną wojnę.",
    poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    showtimes: ["14:30", "17:45", "21:00"]
  },
  {
    id: 3,
    title: "Oppenheimer",
    genre: "Dramat",
    duration: 180,
    description: "Fascynująca historia amerykańskiego fizyka J. Roberta Oppenheimera, dyrektora Projektu Manhattan, który doprowadził do stworzenia pierwszej bomby atomowej.",
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    showtimes: ["15:00", "18:45"]
  },
  {
    id: 4,
    title: "Incepcja",
    genre: "Sci-Fi",
    duration: 148,
    description: "Doświadczony złodziej wyspecjalizowany w technologii wydobywania tajemnic z ludzkiej podświadomości podejmuje się zadania dokonania zaszczepienia idei.",
    poster: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    showtimes: ["17:00", "20:15", "22:30"]
  },
  {
    id: 5,
    title: "Mroczny Rycerz",
    genre: "Akcja",
    duration: 152,
    description: "Batman podejmuje walkę ze zorganizowaną przestępczością w Gotham City, stając do konfrontacji z psychopatycznym geniuszem zbrodni – Jokerem.",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    showtimes: ["18:00", "21:15"]
  },
  {
    id: 6,
    title: "Gladiator",
    genre: "Dramat",
    duration: 155,
    description: "Rzymski generał Maximus zostaje zdradzony i trafia do niewoli jako gladiator, by pomścić śmierć swojej rodziny i cesarza.",
    poster: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    showtimes: ["16:30", "19:45"]
  }
];

function App() {

  const [szukanyTytul, setSzukanyTytul] = useState('');

  const [wybranyGatunek, setWybranyGatunek] = useState('Wszystkie');

  const [wybranyFilm, setWybranyFilm] = useState(null);

  const [wybranySeans, setWybranySeans] = useState(null);

  const [wybraneMiejsca, setWybraneMiejsca] = useState([]);

  const [zajeteMiejsca, setZajeteMiejsca] = useState([]);

  const [zatwierdzonaRezerwacja, setZatwierdzonaRezerwacja] = useState(null);

  console.log("test stanu glownego App, wybrany film:", wybranyFilm ? wybranyFilm.title : "brak");

  useEffect(() => {
    if (wybranyFilm && wybranySeans) {
      console.log("test useEffect zmiana seansu:", wybranySeans);
      const poczatkoweZajete = ["1-3", "2-5", "2-6", "3-4", "4-2", "5-7", "6-4"];
      setZajeteMiejsca(poczatkoweZajete);
      setWybraneMiejsca([]);
    }
  }, [wybranyFilm, wybranySeans]);

  function wybierzFilmSeans(film, godzina) {
    console.log("test wyboru filmu i godziny:", film.title, godzina);
    setWybranyFilm(film);
    setWybranySeans(godzina);
    setZatwierdzonaRezerwacja(null);
  }

  function obsluzKlikniecieMiejsca(identyfikator) {
    console.log("test przelaczenia miejsca:", identyfikator);
    if (zajeteMiejsca.includes(identyfikator)) {
      return;
    }

    if (wybraneMiejsca.includes(identyfikator)) {
      const nowaLista = wybraneMiejsca.filter((m) => m !== identyfikator);
      setWybraneMiejsca(nowaLista);
    } else {
      const nowaLista = [...wybraneMiejsca, identyfikator];
      setWybraneMiejsca(nowaLista);
    }
  }

  function zatwierdzRezerwacje(dane) {
    console.log("test zatwierdzenia rezerwacji:", dane);
    setZatwierdzonaRezerwacja(dane);
  }

  function wrocDoRepertuaru() {
    setWybranyFilm(null);
    setWybranySeans(null);
    setWybraneMiejsca([]);
    setZatwierdzonaRezerwacja(null);
  }

  const przefiltrowaneFilmy = filmy.filter((film) => {
    const pasujeTytul = film.title.toLowerCase().includes(szukanyTytul.toLowerCase());
    let pasujeGatunek = true;

    if (wybranyGatunek !== 'Wszystkie') {
      pasujeGatunek = film.genre === wybranyGatunek;
    }

    return pasujeTytul && pasujeGatunek;
  });

  return (
    <div className="glowna-aplikacja">

      <header className="naglowek-strony">
        <h1 className="tytul-kina">SuperKino</h1>
      </header>

      <main className="glowny-kontener">

        {zatwierdzonaRezerwacja ? (

          <Podsumowanie
            rezerwacja={zatwierdzonaRezerwacja}
            film={wybranyFilm}
            seans={wybranySeans}
            nowaRezerwacja={wrocDoRepertuaru}
          />

        ) : wybranyFilm && wybranySeans ? (

          <div className="panel-rezerwacji-seansu">

            <div className="pasek-nawigacji-seansu">
              <button
                type="button"
                className="przycisk-powrot-maly"
                onClick={wrocDoRepertuaru}
              >
                &larr; Wróć do listy filmów
              </button>
              <h2 className="tytul-wybranego-seansu">
                {wybranyFilm.title} - Seans: {wybranySeans}
              </h2>
            </div>

            <div className="uklad-sali-i-formularza">

              <SalaKinowa
                wybraneMiejsca={wybraneMiejsca}
                zajeteMiejsca={zajeteMiejsca}
                klikniecieMiejsca={obsluzKlikniecieMiejsca}
              />

              <FormularzRezerwacji
                wybraneMiejsca={wybraneMiejsca}
                zatwierdzRezerwacje={zatwierdzRezerwacje}
                anulujWybor={wrocDoRepertuaru}
              />

            </div>

          </div>

        ) : (

          <div className="widok-repertuaru">

            <div className="panel-filtrowania">

              <div className="grupa-filtra">
                <label className="etykieta-filtra">Szukaj filmu po tytule:</label>
                <input
                  type="text"
                  className="pole-szukania"
                  placeholder="Wpisz tytuł..."
                  value={szukanyTytul}
                  onChange={(e) => setSzukanyTytul(e.target.value)}
                />
              </div>

              <div className="grupa-filtra">
                <label className="etykieta-filtra">Filtruj po gatunku:</label>
                <select
                  className="wybor-gatunku"
                  value={wybranyGatunek}
                  onChange={(e) => setWybranyGatunek(e.target.value)}
                >
                  <option value="Wszystkie">Wszystkie gatunki</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Dramat">Dramat</option>
                  <option value="Akcja">Akcja</option>
                </select>
              </div>

            </div>

            {przefiltrowaneFilmy.length === 0 ? (
              <div className="brak-wynikow">
                Nie znaleziono żadnych filmów spełniających podane kryteria.
              </div>
            ) : (
              <div className="lista-filmow">
                {przefiltrowaneFilmy.map((film, index) => (
                  <KartaFilmu
                    key={index}
                    film={film}
                    wybierzFilmSeans={wybierzFilmSeans}
                  />
                ))}
              </div>
            )}

          </div>

        )}

      </main>

    </div>
  );

}

export default App;