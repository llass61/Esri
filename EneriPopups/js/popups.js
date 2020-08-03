

require([
  "dojo/_base/lang",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/geometry/Extent",
  "esri/geometry/SpatialReference",
  "js/EquipPopupTemplate3"
], function (lang, Map, MapView, FeatureLayer, Extent,
  SpatialReference, EquipPopupTemplate) {


  let defaultSpatialRef = new SpatialReference({ wkid: 3857 });
  let map_extent = setExtent();
  // let t2n = type2Name();

  var ops_phase_url = "http://dad-w:6080/arcgis/rest/services/Operations_Phase/MapServer/";

  var cust_xfmrs_url = ops_phase_url + "8";
  var equip_url = ops_phase_url + "6";
  var pow_lines_url = ops_phase_url + "12";
  var loads_url = ops_phase_url + "14";

  // var equipPopupTemplate = {
  //   title: "{otype}",
  //   outFields: ["*"],
  //   content: setContentInfo,
  // };

  var map = new Map({
    basemap: "topo-vector",
  });

  // make it a global for chrome debugger console
  view = new MapView({
    container: "viewDiv",
    map: map,
    extent: map_extent
  });

  // var cust_xfmrs = new FeatureLayer({
  //   url: cust_xfmrs_url,
  //   outFields: ['*']
  // });

  
  equipPopTemp = new EquipPopupTemplate();
  // equipPopTemp.template.content = equipPopTemp.setContentInfo1;

  equip6 = new FeatureLayer({
    url: ops_phase_url + '6',
    outFields: ['*'],

    popupTemplate: {
      content: lang.hitch(equipPopTemp, equipPopTemp.setContentInfo),
      title: "{otype}",
      outFields: ["*"],
    },
  });

  view.when(() => {
    map.add(equip6);
  })

  function setContentInfo(feature) {
    var attrs = feature.graphic.attributes;
    var out = '<table>';
    out += '<tr><td class="infoPaneLabelCell">Type</td><td>' + attrs.otype + '</td></tr>';
    out += '<tr><td class="infoPaneLabelCell">ID</td><td>' + attrs.secname + '</td></tr>';
    out += '<tr><td class="infoPaneLabelCell">Phasecode</td><td>' + attrs.phasecode + '</td></tr>';
    out += '<table>';

    return out;
  }

  function formatString(val) { return val ? val : '' }

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