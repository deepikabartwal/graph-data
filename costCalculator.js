const costCalculator = function(selectedCities, player) {
  const playerCities = player.cityNames;
  const getMinCost = getMinimumCost.bind(null, playerCities);
  const minCosts = selectedCities.map(getMinCost);
  return minCosts.reduce((acc, cost) => (acc = acc + cost), 0);
};

const getMinimumCost = function(playerCities, selectedCity) {
  const allPossiblePaths = playerCities.map(playerCity =>{
    const path  = graph.path(playerCity, selectedCity, { cost: true })
    path.cost = Math.floor(path.cost);
    if(path.cost == 1) path.cost = 0;
    return path;
  });
  return allPossiblePaths.reduce((acc, path) => Math.min(path.cost, acc), 1000);
};