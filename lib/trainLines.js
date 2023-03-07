export const train_routes = [
  "red",
  "blue",
  "g",
  "brn",
  "p",
  "pexp",
  "y",
  "pnk",
  "o",
];

export function determineRouteName(route) {
  if (route === "red") return "Red";
  if (route === "blue") return "Blue";
  if (route === "g") return "Green";
  if (route === "brn") return "Brown";
  if (route === "p") return "Purple";
  if (route === "pexp") return "Purple Express";
  if (route === "y") return "Yellow";
  if (route === "pnk") return "Pink";
  if (route === "o") return "Orange";
}
