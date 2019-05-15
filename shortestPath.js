const data = require("./data.json");

const shortestPath = function(startingPoint, endPoint) {
	if(data[startingPoint].edges.includes(x=>x[endPoint])) {
		return data[startingPoint].edges[endPoint];
	}
};

console.log(shortestPath("A", "B"));
//this is buy resource code

const getStorageCapacity = function(powerPlants) {
  const storageCapacity = {};
  storageCapacity["Coal"] = 0;
  storageCapacity["Oil"] = 0;
  storageCapacity["Garbage"] = 0;
  storageCapacity["Uranium"] = 0;
  storageCapacity["Hybrid"] = 0;
  Object.keys(powerPlants).forEach(powerPlant => {
    storageCapacity[powerPlants[powerPlant].resource.type] +=
      powerPlants[powerPlant].resource.quantity * 2;
  });
  return storageCapacity;
};

const parseResourceDetails = function(selectedResourceDetails) {
  const selectedResources = {};
  const resources = ["Coal", "Oil", "Uranium", "Garbage"];
  resources.filter(resource => {
    if (selectedResourceDetails[resource].length > 2) {
      selectedResources[resource] = selectedResourceDetails[resource].split(
        ","
      ).length;
    }
  });
  return selectedResources;
};

const areValidTypes = function(playerPowerplants, selectedResourceDetails) {
  const storageCapacity = getStorageCapacity(playerPowerplants);
  const selectedResources = parseResourceDetails(selectedResourceDetails);
  const selectedResourceTypes = Object.keys(selectedResources);
  const requiredResTypes = Object.keys(storageCapacity).filter(
    type => storageCapacity[type] != 0
  );
  return selectedResourceTypes.every(
    resourceType =>
      requiredResTypes.includes(resourceType) ||
      requiredResTypes.includes("Hybrid")
  );
};

const hasCapacity = function(playerPowerplants, selectedResourceDetails) {
  const storageCapacity = getStorageCapacity(playerPowerplants);
  const selectedResources = parseResourceDetails(selectedResourceDetails);
  const selectedResourceTypes = Object.keys(selectedResources);
  const requiredResTypes = Object.keys(storageCapacity).filter(
    type => storageCapacity[type] != 0
  );
  return selectedResourceTypes.every(resourceType => {
    if (requiredResTypes.includes("Hybrid")) {
      selectedResources["Coal"] <=
        storageCapacity["Coal"] + storageCapacity["Hybrid"] ||
        selectedResources["Oil"] <=
          storageCapacity["Oil"] + storageCapacity["Hybrid"];
    }
    selectedResources[resourceType] <= storageCapacity[resourceType];
  });
};
