import React from 'react';

function Podsumowanie(props) {

  const rezerwacja = props.rezerwacja;

  const film = props.film;

  const seans = props.seans;

  const nowaRezerwacja = props.nowaRezerwacja;

  console.log("test renderowania podsumowania rezerwacji");

  return (
    <div className="karta-podsumowania">

      <div className="komunikat-sukcesu">
        Rezerwacja została pomyślnie złożona!
      </div>

      <h2 className="tytul-podsumowania">Szczegóły Twojej rezerwacji</h2>

      <div className="zawartosc-podsumowania">

        <div className="kolumna-filmu-podsumowanie">
          <img
            src={film.poster}
            alt={film.title}
            className="mini-plakat-podsumowania"
          />
        </div>

        <div className="kolumna-szczegolow">

          <div className="wiersz-podsumowania">
            <span className="etykieta-podsumowania">Film:</span>
            <span className="wartosc-podsumowania">{film.title} ({film.genre})</span>
          </div>

          <div className="wiersz-podsumowania">
            <span className="etykieta-podsumowania">Godzina seansu:</span>
            <span className="wartosc-podsumowania">{seans}</span>
          </div>

          <div className="wiersz-podsumowania">
            <span className="etykieta-podsumowania">Czas trwania:</span>
            <span className="wartosc-podsumowania">{film.duration} min</span>
          </div>

          <div className="wiersz-podsumowania">
            <span className="etykieta-podsumowania">Wybrane miejsca:</span>
            <span className="wartosc-podsumowania">
              {rezerwacja.miejsca.map((m) => {
                const czesci = m.split("-");
                return "Rząd " + czesci[0] + " Miejsce " + czesci[1];
              }).join(", ")}
            </span>
          </div>

          <div className="wiersz-podsumowania">
            <span className="etykieta-podsumowania">Rodzaj i liczba biletów:</span>
            <span className="wartosc-podsumowania">
              {rezerwacja.liczbaBiletow} x bilet {rezerwacja.rodzajBiletu} ({rezerwacja.cenaJednegoBiletu} zł/szt.)
            </span>
          </div>

          <div className="wiersz-podsumowania cena-wyrozniona">
            <span className="etykieta-podsumowania">Łączna kwota do zapłaty:</span>
            <span className="wartosc-podsumowania mocna-cena">{rezerwacja.cenaCalkowita} zł</span>
          </div>

          <div className="sekcja-danych-klienta">
            <h4 className="podtytul-klienta">Dane osoby rezerwującej:</h4>
            <p className="tekst-klienta">Imię i nazwisko: {rezerwacja.imie} {rezerwacja.nazwisko}</p>
            <p className="tekst-klienta">Adres e-mail: {rezerwacja.email}</p>
          </div>

        </div>

      </div>

      <div className="pasek-przycisku-nowa-rezerwacja">
        <button
          type="button"
          className="przycisk-powrot-glowna"
          onClick={nowaRezerwacja}
        >
          Wróć do repertuaru kina
        </button>
      </div>

    </div>
  );

}

export default Podsumowanie;
