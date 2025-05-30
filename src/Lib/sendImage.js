export const getGridClass = (count) => {
  if (count === 1) return "grid-cols-1 w-[200px] h-[200px]";
  if (count === 2) return "grid-cols-2 w-[250px] h-[200px]";
  if (count === 3) return "grid-cols-2 grid-rows-2 w-[250px] h-[250px]";
  if (count >= 4) return "grid-cols-2 grid-rows-2 w-[250px] h-[250px]";
};