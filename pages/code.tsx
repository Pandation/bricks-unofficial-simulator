import Link from "next/link";
import React from "react";
import styles from "../styles/Home.module.css";
import { ArrowBack } from "@mui/icons-material";
import { Box } from "@mui/material";
import Prism from "prismjs";

export default function CodeSourcePage() {
  React.useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Simulateur Non-Officiel pour Bricks.co</h1>
        <Link href="/">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "2rem",
              "> span": {
                marginLeft: 2,
              },
            }}
            component="a"
          >
            <ArrowBack fontSize="large" />
            <span> Retour </span>
          </Box>
        </Link>

        <p className={styles.description}>
          Source du code employé pour le simulateur
        </p>

        <pre>
          <code className="language-javascript">
            {`const investissementMensuel = 400;
const revenuMensuelParBrick = 0.05;
const rendementValeurBrickAnnuel = 4; //% pourcent
const numberOfYears = 10;

let valeurReventeParBrick = 10;

let revenu = 0;
let totalRevenu = 0;
let investissementTotalDeSaPoche = 0;
let revenuTotalReinvesti = 0;

let actualBricks = Math.floor(investissementMensuel / 10);

let revenuAnneeActuelle = 0;
let revenuAnneePassee = 0;

let dernierRevenuMensuelPercu = 0;


for (let year = 0; year < numberOfYears; year++) {
    revenuAnneePassee = revenuAnneeActuelle;
    revenuAnneeActuelle = 0;
    
    for (let month = 0; month < 12; month++) {
        //Fin du mois précédent, on touche les loyers
        const revenuDuMois = actualBricks * revenuMensuelParBrick;
        revenu += revenuDuMois;
        totalRevenu += revenuDuMois;
        dernierRevenuMensuelPercu = revenuDuMois;
        
        revenuAnneeActuelle += revenuDuMois;
        
        //on réinvesti mensuellement + les loyers percus
        actualBricks +=
        Math.floor(investissementMensuel / 10) + Math.floor(revenu / 10);
        
        //si les loyers percus sont suffisant pour au moins une brick, on soustraits leur prix des revenus
        revenuTotalReinvesti += Math.floor(revenu / 10) * 10;
        revenu -= Math.floor(revenu / 10) * 10;
        
        investissementTotalDeSaPoche += investissementMensuel;
    }
    
    //a la fin de l'année, les bricks gagne en valeur pour la revente
    valeurReventeParBrick =
    valeurReventeParBrick +
    (rendementValeurBrickAnnuel * valeurReventeParBrick) / 100;
    
    console.log("Rapport Année " + (year + 1).toString());
    console.log({
        investissementSortiDeSaPocheDepuisLeDebut:
        investissementTotalDeSaPoche + "€",
        totalBricksActuellement: actualBricks + " Bricks",
        totalDesRevenusDepuisLeDebut: Math.floor(totalRevenu) + "€",
        totalDesRevenuReinvestisDepuisLeDebut: revenuTotalReinvesti + "€",
        prixSiTuRevendsToutesTesBricks:
        Math.round(actualBricks * valeurReventeParBrick) + "€",
        dernierRevenuMensuelPercu: dernierRevenuMensuelPercu + "€",
        revenuEnPourcentageParRapportAlAnDernier:
        year === 0
        ? "-"
        : Math.round(
            (revenuAnneeActuelle / (revenuAnneePassee > 0 ? revenuAnneePassee : 1) -
            1) *
            100
            ).toString() + "% de revenus en plus",
        });
    }`}
          </code>
        </pre>
      </main>
    </div>
  );
}
