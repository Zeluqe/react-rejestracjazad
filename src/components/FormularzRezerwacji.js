import React, { useState } from 'react';

function FormularzRezerwacji(props) {

  const wybraneMiejsca = props.wybraneMiejsca;
  const zatwierdzRezerwacje = props.zatwierdzRezerwacje;
  const anulujWybor = props.anulujWybor;

  const [rodzajBiletu, setRodzajBiletu] = useState('normalny');
  const [imie, setImie] = useState('');
  const [nazwisko, setNazwisko] = useState('');
  const [email, setEmail] = useState('');
  const [bledy, setBledy] = useState({});

  let cenaJednegoBiletu = 25;

  if (rodzajBiletu === 'ulgowy') {
    cenaJednegoBiletu = 18;
  }

  const cenaLaczna = wybraneMiejsca.length * cenaJednegoBiletu;
  console.log("cenaWformularzu", cenaLaczna);

  function walidujFormularz() {
    const noweBledy = {};

    if (!imie.trim()) {
      noweBledy.imie = "Imię jest wymagane.";
    }

    if (!nazwisko.trim()) {
      noweBledy.nazwisko = "Nazwisko jest wymagane.";
    }

    if (!email.trim()) {
      noweBledy.email = "Adres e-mail jest wymagany.";
    } else {
      const wzorEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!wzorEmail.test(email)) {
        noweBledy.email = "Podaj poprawny adres e-mail (np. andrzejduda@pocztaonet.com).";
      }
    }

    if (wybraneMiejsca.length === 0) {
      noweBledy.miejsca = "Musisz wybrać przynajmniej jedno miejsce na sali.";
    }

    return noweBledy;
  }

  function obsluzWyslanie(e) {
    e.preventDefault();

    console.log("formularz zatwierdzony");

    const znalezioneBledy = walidujFormularz();

    if (Object.keys(znalezioneBledy).length > 0) {
      console.log(" ------------- \n walidacja \n --------------- \n ", znalezioneBledy);
      setBledy(znalezioneBledy);
      return;
    }

    setBledy({});

    const daneRezerwacji = {
      imie: imie,
      nazwisko: nazwisko,
      email: email,
      rodzajBiletu: rodzajBiletu,
      cenaJednegoBiletu: cenaJednegoBiletu,
      liczbaBiletow: wybraneMiejsca.length,
      cenaCalkowita: cenaLaczna,
      miejsca: wybraneMiejsca
    };

    zatwierdzRezerwacje(daneRezerwacji);
  }

  return (
    <form className="formularz-rezerwacji" onSubmit={obsluzWyslanie}>

      <h3 className="naglowek-sekcji-formularza">Dane rezerwacji i płatność</h3>

      {bledy.miejsca && (
        <div className="komunikat-bledu-ogolny">
          {bledy.miejsca}
        </div>
      )}

      <div className="pole-formularza">
        <label className="napis-pola">Rodzaj biletu:</label>
        <select className="wybor-select"
          value={rodzajBiletu} onChange={(e) => setRodzajBiletu(e.target.value)}>

          <option value="normalny">Normalny (25 zł)</option>
          <option value="ulgowy">Ulgowy (18 zł)</option>

        </select>
      </div>

      <div className="podsumowanie-ceny-pasek">

        <span className="etykieta-ceny">Cena rezerwacji:</span>
        <span className="wartosc-ceny">

          {wybraneMiejsca.length} × {cenaJednegoBiletu} zł = <strong>{cenaLaczna} zł</strong>

        </span>
      </div>

      <div className="pole-formularza">
        <label className="napis-pola">Imię:</label>

        <input type="text" className="pole-tekstowe" placeholder="Wpisz imię..."
          value={imie} onChange={(e) => setImie(e.target.value)} />

        {bledy.imie && (
          <span className="tekst-bledu">{bledy.imie}</span>
        )}
      </div>

      <div className="pole-formularza">
        <label className="napis-pola">Nazwisko:</label>
        <input type="text" className="pole-tekstowe" placeholder="Wpisz nazwisko..."
          value={nazwisko} onChange={(e) => setNazwisko(e.target.value)} />

        {bledy.nazwisko && (
          <span className="tekst-bledu">{bledy.nazwisko}</span>
        )}

      </div>

      <div className="pole-formularza">
        <label className="napis-pola">Adres e-mail:</label>
        <input type="email" className="pole-tekstowe" placeholder="np. jan.kowalski@wp.pl"
          value={email} onChange={(e) => setEmail(e.target.value)} />

        {bledy.email && (
          <span className="tekst-bledu">{bledy.email}</span>
        )}

      </div>

      <div className="przyciski-akcji">

        <button type="button" className="przycisk-anuluj" onClick={anulujWybor} >
          Powrót do filmów
        </button>

        <button type="submit" className="przycisk-zatwierdz" >
          Zatwierdź rezerwację
        </button>

      </div>

    </form>
  );

}

export default FormularzRezerwacji;
