export const parseNumber = (str?: string) => {
  const trimmed = str?.trim() ?? "";

  return trimmed ? Number(trimmed.replace(/[,-]/g, "")) : undefined;
};

export const formatToNDecimalPlaces = (value?: number, n: number = 2) =>
  value ? value.toFixed(n) : "";
