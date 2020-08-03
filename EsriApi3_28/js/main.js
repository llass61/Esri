

require([
    "esri/map",
    "esri/geometry/Extent",
    "esri/SpatialReference",
    "esri/layers/FeatureLayer",
    "dojo/domReady!"
], function (Map, Extent, SpatialReference, FeatureLayer) {

    defaultSpatialRef = new SpatialReference({ wkid: 3857 });
    map_extent = setExtent();
    var map = new Map("map", {
        // center: [-96.725, 36.6],
        // zoom: 7,
        extent: setExtent(),
        basemap: "topo"
    });

    var ops_phase_url = "http://dad-w:6080/arcgis/rest/services/Operations_Phase/MapServer/";
    equip6 = new FeatureLayer( ops_phase_url + "/6");


    function setExtent() {
        let extent = new Extent({
          xmin: -10919311.41681004,
          ymin: 3612806.5850415034,
          xmax: -10625793.228194851,
          ymax: 3748100.125106317,
          "spatialReference": defaultSpatialRef
        });
        return extent;
      }

});