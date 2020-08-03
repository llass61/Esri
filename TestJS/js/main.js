

require([
  "dojo/_base/lang",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/geometry/Extent",
  "esri/geometry/SpatialReference",
  "js/MyPopupTemplate"
], function (lang, Map, MapView, FeatureLayer, Extent, 
             SpatialReference, MyPopupTemplate) {


  var crimeUrl = "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Chicago_Crime_Tracts/FeatureServer/0";
  
    //
    // first do popup templates
    //
    // var myPopup = {
    //   title: "{FID}",
    //   outFields: ["*"],
    //   content: setContentInfo,
    //   // content: "Name: {Name}  CrimeRate: {CrimeRate}  NarcoticsC: {NarcoticsC}",
    // };

    // function setContentInfo(feature){
    //   var attrs = feature.graphic.attributes;
    //   return "Name: {Name}  CrimeRate: " + attrs.CrimeRate + "NarcoticsC: {NarcoticsC}"
    // }
  
  
  
  var crimeLayer = new FeatureLayer({
    url: crimeUrl,
    // outFields: ["*"],
    popupTemplate: MyPopupTemplate.template
    // popupTemplate: myPopup
  });

  // var equipPopupTemplate = {
  var map = new Map({
    basemap: "topo-vector",
  });

  // make it a global for chrome debugger console
  view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-87.66, 41.84],
    zoom: 10
  });

  map.add(crimeLayer);

});