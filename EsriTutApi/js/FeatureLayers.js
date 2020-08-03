

require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer"
], function (Map, MapView, FeatureLayer, UniqueValueRenderer) {

  var trailheadsRenderer = {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
      width: "18px",
      height: "18px"
    }
  };

  var trailheadsLabels = {
    symbol: {
      type: "text",
      color: "#FFFFFF",
      haloColor: "#5E8D74",
      haloSize: "2px",
      font: {
        size: "14px",
        family: "Noto Sans",
        style: "italic",
        weight: "normal"
      }
    },
    labelPlacement: "below-center",
    labelExpressionInfo: {
      expression: "$feature.TRL_NAME"
    }
  };

  var trailheads = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
    renderer: trailheadsRenderer,
    labelingInfo: trailheadsLabels
  })

  var map = new Map({
    basemap: "topo-vector",
  });

  // make it a global for chrome debugger console
  view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.805, 34.027],
    zoom: 13,
  });

  map.add(trailheads);

  // Style trail width by elevation gain
  var trailsRenderer = {
    type: "simple",
    symbol: {
      color: "#BA55D3",
      type: "simple-line",
      style: "solid"
    },
    visualVariables: [
      {
        type: "size",
        field: "ELEV_GAIN",
        minDataValue: 0,
        maxDataValue: 2300,
        minSize: "3px",
        maxSize: "7px"
      }
    ]
  };

  var trails = new FeatureLayer({
    url:
      "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
    renderer: trailsRenderer,
    opacity: .75
  });
  map.add(trails);


  // style bike trails 
  var bikeTrailsRenderer = {
    type: "simple",
    symbol: {
      type: 'simple-line',
      style: "short-dot",
      color: "#FF91FF",
      width: "1px"
    }
  }

  var bikeTrails = new FeatureLayer({
    url:
      "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
    renderer: bikeTrailsRenderer,
    definitionExpression: "USE_BIKE = 'YES'"
  });
  map.add(bikeTrails);

  // style park areas with unique colors

  function createFillSymbol(value, color) {
    return {
      value: value,
      symbol: {
        type: "simple-fill",
        color: color,
        outline: {
          style: "none"
        }
      },
      lable: value
    }
  };

  var openSpacesRenderer = {
    type: "unique-value",
    field: "TYPE",
    uniqueValueInfos: [
      createFillSymbol("Natural Areas", "#9E559C"),
      createFillSymbol("Regional Open Sapce", "#A7C636"),
      createFillSymbol("Local Park", "#149ECE"),
      createFillSymbol("Regional Recreation Park", "#ED5151"),
    ]
  };

  var openspaces = new FeatureLayer({
    url:
      "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0",
    renderer: openSpacesRenderer,
    opacity: 0.20
  });
  map.add(openspaces);
  

  map.on('load', (evt) => { 
    console.log('All LOADED');
  });
  

});