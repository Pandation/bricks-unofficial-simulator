import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CardHeader,
  Typography,
  Card,
  FormGroup,
  FormControlLabel,
  Stack,
  CardContent,
  TextField,
  Switch,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

import styles from "styles/Home.module.css";
import { useEffect, useState } from "react";

const keyToSentence = {
  investissementSortiDeSaPocheDepuisLeDebut:
  "Investissement personnel depuis le début: ",
totalBricksActuellement: "Nombre de bricks possédé: ",
totalDesRevenusDepuisLeDebut: "Total des revenus (loyers) depuis le début: ",
totalDesRevenusReinvestisDepuisLeDebut: "Revenus réinvestis depuis le début: ",
prixSiTuRevendsToutesTesBricks:
"Prix de revente de la totalité des bricks: ",
dernierRevenuMensuelPercu: "Dernier loyer mensuel perçu: ",
revenuEnPourcentageParRapportAlAnDernier: "Revenu en pourcentage par rapport à l'an dernier: "
}


export default function Simulator() {
  const [data, setData] = useState({
    totalYears: 10,
    monthlyInvestment: 0,
    yearlyPricePerBrick: 0,
    increasePercentByYear: 0,
    withIncreasment: true,
    yearsBeforeStopInjecting: 0,
    withStopInject: false,
  });
  const [result, setResult] = useState([]);

  useEffect(() => {
    let newResults = computeSimulationResult(data);

    setResult(newResults);
  }, [data]);

  const handleChange = (evt) => {
    setData((data) => ({
      ...data,
      [evt.target.name]: parseInt(evt.target.value),
    }));
  };

  const handleSwitchChange = (evt) => {
    setData((data) => ({ ...data, [evt.target.name]: evt.target.checked }));
  };
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Simulateur Non-Officiel pour Bricks.co</h1>

        <p className={styles.description}>
          Entrez simplement les données de la propriété pour calculer les
          revenus potentiels sur les années
        </p>

        <Card sx={{ maxWidth: 900, width: "100%", marginBottom: 3 }}>
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
              <Stack
                spacing={2}
                direction="row"
                justifyContent={"space-evenly"}
                alignContent="center"
              >
                <FormControlLabel
                  sx={{ flex: 1 }}
                  control={
                    <Switch
                      name="withIncreasment"
                      onChange={handleSwitchChange}
                      checked={data.withIncreasment}
                      inputProps={{ "aria-label": "Switch demo" }}
                    />
                  }
                  label="Prise en compte de la plus value annuelle"
                />

                <TextField
                  sx={{ flex: 1 }}
                  disabled={!data.withIncreasment}
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
              </Stack>
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
              <Stack
                spacing={2}
                direction="row"
                justifyContent={"space-evenly"}
                alignContent="center"
              >
                <FormControlLabel
                  sx={{ flex: 1 }}
                  control={
                    <Switch
                      name="withStopInject"
                      onChange={handleSwitchChange}
                      checked={data.withStopInject}
                      inputProps={{ "aria-label": "Switch demo" }}
                    />
                  }
                  label="Arrêter d'investir après X années (sauf les revenus)"
                />
                <TextField
                  sx={{ flex: 1 }}
                  disabled={!data.withStopInject}
                  label="Nombre d'années à investir mensuellement"
                  variant="outlined"
                  name="yearsBeforeStopInjecting"
                  onChange={handleChange}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    step: "1",
                  }}
                />
              </Stack>
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
                        {keyToSentence[key]} : {yearResult[key]}
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

function computeSimulationResult(data) {
  let newResults = [];

  let investissementMensuel: number = data.monthlyInvestment;
  const revenuMensuelParBrick = data.yearlyPricePerBrick / 100;

  //CALCUL PLUS VALUE ANNUELLE
  const rendementValeurBrickAnnuel = data.increasePercentByYear; //% pourcent
  let valeurReventeParBrick = 10;

  let revenu = 0;
  let totalRevenu = 0;
  let investissementTotalDeSaPoche: number = 0;
  let revenuTotalReinvesti = 0;

  let actualBricks = Math.floor(investissementMensuel / 10);

  let revenuAnneeActuelle = 0;
  let revenuAnneePassee = 0;
  let dernierRevenuMensuelPercu = 0;

  const numberOfYears = data?.totalYears;

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
      actualBricks += Math.floor(revenu / 10);
      if (!data.withStopInject || data.yearsBeforeStopInjecting > year) {
        actualBricks += Math.floor(investissementMensuel / 10);
        investissementTotalDeSaPoche =
          investissementTotalDeSaPoche + investissementMensuel;
      }

      //si les loyers percus sont suffisant pour au moins une brick, on soustraits leur prix des revenus
      revenuTotalReinvesti += Math.floor(revenu / 10) * 10;
      revenu -= Math.floor(revenu / 10) * 10;
    }

    //a la fin de l'année, les bricks gagne en valeur pour la revente
    if (data.withIncreasment) {
      valeurReventeParBrick =
        valeurReventeParBrick +
        (rendementValeurBrickAnnuel * valeurReventeParBrick) / 100;
    }

    newResults[year] = {
      investissementSortiDeSaPocheDepuisLeDebut:
        investissementTotalDeSaPoche.toString() + "€",
      totalBricksActuellement: actualBricks + " Bricks",
      totalDesRevenusDepuisLeDebut: Math.floor(totalRevenu) + "€",
      totalDesRevenusReinvestisDepuisLeDebut: revenuTotalReinvesti + "€",
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
  return newResults;
}
