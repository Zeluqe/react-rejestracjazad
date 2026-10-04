import React from 'react';

function SalaKinowa(props) {

  const wybraneMiejsca = props.wybraneMiejsca;
  const zajeteMiejsca = props.zajeteMiejsca;
  const klikniecieMiejsca = props.klikniecieMiejsca;

  const liczbaRzedow = 6;
  const liczbaMiejscWRzedzie = 8;
  const tablicaRzedow = [];

  for (let r = 1; r <= liczbaRzedow; r++) {
    const rzadMiejsc = [];
    for (let m = 1; m <= liczbaMiejscWRzedzie; m++) {
      rzadMiejsc.push({ rzad: r, miejsce: m, identyfikator: r + "-" + m });
    }
    tablicaRzedow.push(rzadMiejsc);
  }

  console.log("-- liczba miejsc wybranych", wybraneMiejsca.length);

  function sprawdzStanMiejsca(identyfikator) {
    if (zajeteMiejsca.includes(identyfikator)) {
      return "zajete";
    }
    if (wybraneMiejsca.includes(identyfikator)) {
      return "wybrane";
    }
    return "wolne";
  }

  return (
    <div className="kontener-sali">
      <h3 className="naglowek-sekcji-sali">Wybór miejsc na sali</h3>

      <div className="ekran-kina">EKRAN</div>

      <div className="siatka-sali">
        {tablicaRzedow.map((rzad, indeksRzedu) => (

          <div key={indeksRzedu} className="wiersz-sali">

            <span className="numer-rzedu">{indeksRzedu + 1}</span>
            <div className="miejsca-w-wierszu">

              {rzad.map((miejsce, indeksMiejsca) => {

                const stan = sprawdzStanMiejsca(miejsce.identyfikator);
                let klasaMiejsca = "miejsce-fotel wolne";

                if (stan === "zajete") {
                  klasaMiejsca = "miejsce-fotel zajete";
                }
                if (stan === "wybrane") {
                  klasaMiejsca = "miejsce-fotel wybrane";
                }

                return (
                  <button type="button" key={indeksMiejsca} className={klasaMiejsca}
                    onClick={() => klikniecieMiejsca(miejsce.identyfikator)}
                    disabled={stan === "zajete"}
                    title={"Rząd " + miejsce.rzad + ", Miejsce " + miejsce.miejsce} >
                  </button>
                );

              })}

            </div>

          </div>

        ))}

      </div>

      <div className="legenda-sali">

        <div className="element-legendy">
          <span className="kropka-legendy wolna"></span>
          <span className="tekst-legendy">Wolne</span>
        </div>

        <div className="element-legendy">
          <span className="kropka-legendy zajeta"></span>
          <span className="tekst-legendy">Zajęte</span>
        </div>

        <div className="element-legendy">
          <span className="kropka-legendy wybrana"></span>
          <span className="tekst-legendy">Wybrane</span>
        </div>

      </div>

      <div className="podsumowanie-wybranych-miejsc">
        <p className="tekst-informacyjny-miejsc">
          Liczba wybranych miejsc: <strong>{wybraneMiejsca.length}</strong>
        </p>

        {wybraneMiejsca.length > 0 && (
          <p className="lista-etykiet-miejsc">
            Wybrane fotele: {wybraneMiejsca.map((m) => {
              const czesci = m.split("-");
              return "Rząd " + czesci[0] + " M." + czesci[1];
            }).join(", ")}
          </p>
        )}

      </div>
    </div>
  );

}

export default SalaKinowa;
