import Image from "next/image";
import Link from "next/link";

import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CardHeader,
  Typography,
  Card,
  Stack,
  CardContent,
  TextField,
} from "@mui/material";
import { ExpandMore, ArrowBack } from "@mui/icons-material";

import styles from "styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Simulator() {
  const [data, setData] = useState({
    totalYears: 10,
    monthlyInvestment: 0,
    yearlyPricePerBrick: 0,
    increasePercentByYear: 0,
  });
  const [result, setResult] = useState([]);

  useEffect(() => {
    let newResults = [];

    const investissementMensuel = data?.monthlyInvestment;
    const revenuMensuelParBrick = data?.yearlyPricePerBrick / 100;
    const rendementValeurBrickAnnuel = data?.increasePercentByYear; //% pourcent
    const numberOfYears = data?.totalYears;

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

        investissementTotalDeSaPoche += parseInt(investissementMensuel);
      }

      //a la fin de l'année, les bricks gagne en valeur pour la revente
      valeurReventeParBrick =
        valeurReventeParBrick +
        (rendementValeurBrickAnnuel * valeurReventeParBrick) / 100;

      newResults[year] = {
        investissementSortiDeSaPocheDepuisLeDebut:
          investissementTotalDeSaPoche + "€",
        totalBricksActuellement: actualBricks + " Bricks",
        totalDesRevenusDepuisLeDebut: Math.floor(totalRevenu) + "€",
        totalDesRevenuReinvestisDepuisLeDebut: revenuTotalReinvesti + "€",
        prixSiTuRevendsToutesTesBricks:
          Math.floor(actualBricks * valeurReventeParBrick) + "€",
        dernierRevenuMensuelPercu: Math.floor(dernierRevenuMensuelPercu) + "€",
        revenuEnPourcentageParRapportAlAnDernier:
          year === 0
            ? "-"
            : Math.floor(
                (revenuAnneeActuelle /
                  (revenuAnneePassee > 0 ? revenuAnneePassee : 1) -
                  1) *
                  100
              ).toString() + "% de revenus en plus",
      };
    }
    console.log(newResults);

    setResult(newResults);
  }, [data]);

  const handleChange = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };
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
          Entrez simplement les données de la propriété pour calculer les
          revenus potentiels sur les années
        </p>

        <Card sx={{ maxWidth: 900, width: "100%" }}>
          <CardHeader title="Simulateur" />
          <CardContent>
            <Stack alignItems="stretch" direction="column" spacing={2}>
              <TextField
                label="Revenu Annuel Par Brick (%)"
                variant="outlined"
                name="yearlyPricePerBrick"
                placeholder="3.23"
                onChange={handleChange}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  step: "0.01",
                }}
              />
              <TextField
                label="Nombre de Bricks"
                variant="outlined"
                name="bricksTotal"
                placeholder="10"
                onChange={handleChange}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  step: "0.01",
                }}
              />
              <TextField
                label="Plus-value attendue par Année (%)"
                variant="outlined"
                name="increasePercentByYear"
                onChange={handleChange}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  step: "0.01",
                }}
              />
              <TextField
                label="Nombre d'années pour le rapport"
                variant="outlined"
                name="totalYears"
                placeholder="10"
                onChange={handleChange}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  step: "1",
                }}
              />
              <TextField
                label="Investissement mensuel (€)"
                variant="outlined"
                name="monthlyInvestment"
                onChange={handleChange}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  step: "1",
                }}
              />
            </Stack>
          </CardContent>
        </Card>

        {result.length > 0 && (
          <Card sx={{ maxWidth: 900, width: "100%" }}>
            {result.map((yearResult, yearIndex) => {
              return (
                <Accordion key={yearIndex}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{`Rapport année ${yearIndex + 1}`}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {Object.keys(yearResult).map((key, keyIndex) => (
                      <Typography key={keyIndex}>
                        {key} : {yearResult[key]}
                      </Typography>
                    ))}
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Card>
        )}
      </main>
    </div>
  );
}
