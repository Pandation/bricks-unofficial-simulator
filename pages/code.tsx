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
            {`let rapports = [];

let investissementMensuel = 200;
const revenuMensuelParBrick = 0.6; 

//CALCUL PLUS VALUE ANNUELLE
const rendementValeurBrickAnnuel = 2; //%
let valeurReventeParBrick = 10; //€

let revenu = 0;
let totalRevenu = 0;
let investissementTotalDeSaPoche: number = 0;
let revenuTotalReinvesti = 0;

let nombreActuelDeBricks = Math.floor(investissementMensuel / 10);

let revenuAnneeActuelle = 0;
let revenuAnneePassee = 0;
let dernierRevenuMensuelPercu = 0;

const totalAnnees = 10;

for (let anneeEnCours = 0; anneeEnCours < totalAnnees; anneeEnCours++) {
  revenuAnneePassee = revenuAnneeActuelle;
  revenuAnneeActuelle = 0;

  for (let mois = 0; mois < 12; mois++) {
    
    //Fin du mois précédent, on touche les loyers
    const revenuDuMois = actualBricks * revenuMensuelParBrick;
    revenu += revenuDuMois;
    totalRevenu += revenuDuMois;
    dernierRevenuMensuelPercu = revenuDuMois;

    revenuAnneeActuelle += revenuDuMois;

    //on réinvesti mensuellement les loyers percus
    nombreActuelDeBricks += Math.floor(revenu / 10);

    //et de sa poche
    if (!onArreteDinjecter || nbrAnneesAvantArret > anneeEnCours) {
      nombreActuelDeBricks += Math.floor(investissementMensuel / 10);
      investissementTotalDeSaPoche =
        investissementTotalDeSaPoche + investissementMensuel;
    }

    //si les loyers percus sont suffisant pour au moins une brick, on soustraits leur prix des revenus
    revenuTotalReinvesti += Math.floor(revenu / 10) * 10;
    revenu -= Math.floor(revenu / 10) * 10;
  }

  //a la fin de l'année, les bricks gagne en valeur pour la revente
  if (avecPlusValue) {
    valeurReventeParBrick =
      valeurReventeParBrick +
      (rendementValeurBrickAnnuel * valeurReventeParBrick) / 100;
  }

  rapports[anneeEnCours] = {
    investissementSortiDeSaPocheDepuisLeDebut:
      investissementTotalDeSaPoche.toString() + "€",
    totalBricksActuellement: nombreActuelDeBricks + " Bricks",
    totalDesRevenusDepuisLeDebut: Math.floor(totalRevenu) + "€",
    totalDesRevenusReinvestisDepuisLeDebut: revenuTotalReinvesti + "€",
    prixSiTuRevendsToutesTesBricks:
      Math.floor(nombreActuelDeBricks * valeurReventeParBrick) + "€",
    dernierRevenuMensuelPercu: Math.floor(dernierRevenuMensuelPercu) + "€",
    revenuEnPourcentageParRapportAlAnDernier:
      anneeEnCours === 0
        ? "-"
        : Math.floor(
            (revenuAnneeActuelle /
              (revenuAnneePassee > 0 ? revenuAnneePassee : 1) -
              1) *
              100
          ).toString() + "% de revenus en plus",
  };
}`}
          </code>
        </pre>
      </main>
    </div>
  );
}
