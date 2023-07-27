export const checkLevel = (placeCount: number, reviewCount: number): number => {
  if (0 < placeCount && 0 < reviewCount) {
    if (2 < placeCount && 2 < reviewCount) {
      if (10 < placeCount && 10 < reviewCount) {
        if (20 < placeCount && 20 < reviewCount) {
          return 5;
        }
        return 4;
      }
      return 3;
    }
    return 2;
  } else {
    return 1;
  }
};

export const round = (number: number): number => {
  if (number == 10) return 10;
  if (number == 0) return 0;
  else return parseFloat((Math.round(number * 100) / 100).toFixed(1));
};
