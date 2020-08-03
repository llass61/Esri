

require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/renderers/UniqueValueRenderer"
], function (Map, MapView, FeatureLayer, UniqueValueRenderer) {

  const sizeVisualVariable = {
    type: 'size',
    field: 'WIND_SPEED',
    minDataValue: 0,
    maxDataValue: 60,
    minSize: 8,
    maxSize: 40
  }

  renderer = new UniqueValueRenderer();
  renderer.visualVariables = [sizeVisualVariable];

  const chicagoCrime = new FeatureLayer({
    url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Chicago_Crime_Tracts/FeatureServer/0",
    // renderer: renderer
  })
  var map = new Map({
    basemap: "gray-vector",
  });

  // make it a global for chrome debugger console
  view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-87.66, 41.84],
    zoom: 10,
    rotation: 30,
  });

  view.when( () => {
    map.add(chicagoCrime);
  });

});