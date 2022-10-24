export const checkLevel = (postCount,reviewCount) =>{
  if (
    0 < postCount &&
    0 < reviewCount
  ) {
    if (
      2 < postCount &&
      2 < reviewCount
    ) {
      if (
        10 < postCount &&
        10 < reviewCount
      ) {
        if (
          20 < postCount &&
          20 < reviewCount
        ) {
          return 5;
        }
        return 4;
      }
      return 3;
    }
    return 2;
  }else{
    return 1;
  }
}