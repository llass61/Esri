

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
  
    var cust_xfmrs = new FeatureLayer({
      url: cust_xfmrs_url,
      outFields: ['*']
    });
    
    // equipPopTemp = EquipPopupTemplate.equipPopupTemplate;
    // equipPopTemp.content = EquipPopupTemplate.setContentInfo;
    equipPopTemp = new EquipPopupTemplate();
    equipPopTemp.template.content = equipPopTemp.setContentInfo1;
  
    equip6 = new FeatureLayer({
      url: ops_phase_url + '6',
      outFields: ['*'],
      popupTemplate: {
        content: equipPopTemp.setContentInfo1,
        title: "{otype}",
        outFields: ["*"],
      }
      // popupTemplate: equipPopTemp.template
    });
    // equip9 = new FeatureLayer({
    //   url: ops_phase_url + '9',
    //   outFields: ['*'],
    //   popupTemplate: equipPopTemp.template
    // });
    // var pow_lines = new FeatureLayer({
    //   url: pow_lines_url,
    //   outFields: ['*'],
    //   popupTemplate: equipPopTemp.template
    // });
    // var loads = new FeatureLayer({
    //   url: loads_url,
    //   outFields: ['*'],
    //   popupTemplate: equipPopTemp.template
    // });
  
    map.add(equip6);
    // map.add(equip9);
    // map.add(cust_xfmrs);
    // map.add(pow_lines);
    // map.add(loads);
  
  
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