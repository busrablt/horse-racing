import { Round } from "./types/round";

const ordinalNumber = (number: number) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = number % 100;
  return number + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};

const formatTableTitle = (round: Round) => {
  const formatedLap = ordinalNumber(round.lap);
  return `${formatedLap} Lap - ${round.distance}m`;
};

export default { ordinalNumber, formatTableTitle };
