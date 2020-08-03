

define(["dojo/base_/lang"], function (lang) {
  
  function setContentInfo(f) {
    var attrs = feature.graphic.attributes;
    return "Name: {Name}  CrimeRate: " + attrs.CrimeRate + "NarcoticsC: {NarcoticsC}"
  }
  
  return {
 
    template: {
      title: "{FID}",
      outFields: ["*"],
      content: this.setContentInfo,
      // content: "Name: {Name}  CrimeRate: {CrimeRate}  NarcoticsC: {NarcoticsC}",
    },
  }
})