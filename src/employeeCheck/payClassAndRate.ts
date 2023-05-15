export const parsePayClassAndRate = (allLines: string[]) => {
  const payClassAndRateLine = allLines[0];
  const payClass = payClassAndRateLine
    .slice(15, payClassAndRateLine.indexOf("PAY RATE") - 2)
    .trim();
  const payRate = payClassAndRateLine
    .slice(payClassAndRateLine.indexOf("PAY RATE") + 10)
    .replace(" **", "")
    .trim();

  return {
    payClass,
    payRate,
  };
};
