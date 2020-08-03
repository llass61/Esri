

define(["dojo/_base/declare", "js/BasePopup", "dojo/_base/lang"
], function (declare, BasePopup, lang) {

    return declare(BasePopup, {

        constructor: function (args) {
            this.templateType = "equipment";
            this.title = "{otype}";
            this.template = {
                content: this.setContentInfo,
                title: "{otype}",
                outFields: ["*"],
            };
        },

        setContentInfo: function(f) {
            var attrs = f.graphic.attributes;

            var tbl = document.createElement('table');
            tbl.className = "popupTable infoPaneContet";

            this.addRow(tbl, 'Type', this.t2n[attrs.otype], rowClass = null, cellClass = 'infoPaneLableCell');

            this.addRow(tbl, 'ID', attrs.secname, rowClass = null, cellClass = 'infoPaneLableCell',
                linkify = true, onclickFunc = 'focusOn');
            this.addRow(tbl, 'Parent', attrs.parentsec, rowClass = null, cellClass = 'infoPaneLableCell',
                linkify = true, onclickFunc = 'focusOn');
            this.addRow(tbl, 'Feeder', attrs.circuit, rowClass = 'subBayInfoPane', cellClass = 'infoPaneLableCell',
                linkify = true, onclickFunc = 'focusOnBay');

            var modelEditing = true;
            var onClickFunc = modelEditing ? 'updateEquipmentModel' : null;
            this.addRow(tbl, 'Equip. Ref.', attrs.equipref, rowClass = null, cellClass = 'infoPaneLableCell',
                linkify = true, onclickFunc = onClickFunc);


            this.addRow(tbl, 'Phase', attrs.phasecode, rowClass = null, cellClass = 'infoPaneLableCell');
            this.addRow(tbl, 'Status', attrs.status, rowClass = null, cellClass = 'infoPaneLableCell');

            return tbl.outerHTML;
        },

        // setContentInfo1: lang.hitch(EquipPPT, function(f) {
        //     var attrs = f.graphic.attributes;

        //     var tbl = document.createElement('table');
        //     tbl.className = "popupTable infoPaneContet";

        //     this.addRow(tbl, 'Type', this.type2Name(attrs.otype), rowClass = null, cellClass = 'infoPaneLableCell');

        //     this.addRow(tbl, 'ID', attrs.secname, rowClass = null, cellClass = 'infoPaneLableCell',
        //         linkify = true, onclickFunc = 'focusOn');
        //     this.addRow(tbl, 'Parent', attrs.parentsec, rowClass = null, cellClass = 'infoPaneLableCell',
        //         linkify = true, onclickFunc = 'focusOn');
        //     this.addRow(tbl, 'Feeder', attrs.circuit, rowClass = 'subBayInfoPane', cellClass = 'infoPaneLableCell',
        //         linkify = true, onclickFunc = 'focusOnBay');

        //     var modelEditing = true;
        //     var onClickFunc = modelEditing ? 'updateEquipmentModel' : null;
        //     this.addRow(tbl, 'Equip. Ref.', attrs.equipref, rowClass = null, cellClass = 'infoPaneLableCell',
        //         linkify = true, onclickFunc = onClickFunc);


        //     this.addRow(tbl, 'Phase', attrs.phasecode, rowClass = null, cellClass = 'infoPaneLableCell');
        //     this.addRow(tbl, 'Status', attrs.status, rowClass = null, cellClass = 'infoPaneLableCell');

        //     return tbl.outerHTML;
        // }),

        // addRow: function(tbl, lbl, value, rowClass, cellClass,
        //     linkify, onclickFunc, funcParam) {
        //     var row = tbl.insertRow();
        //     if (rowClass) row.className = rowClass;

        //     var tdLbl = row.insertCell();
        //     if (cellClass) tdLbl.className = cellClass;
        //     tdLbl.innerHTML = lbl;

        //     var tdValue = row.insertCell();
        //     if (linkify) {
        //         anch = document.createElement('a');
        //         afunc = funcParam ? `${onclickFunc}(${funcParam})` : `${onclickFunc}()`;
        //         anch.setAttribute('onclick', afunc);
        //         anch.innerHTML = value;
        //         tdValue.appendChild(anch);
        //     }
        //     else {
        //         tdValue.innerHTML = value;
        //     }

        //     return { lbl: tdLbl, val: tdValue };
        // },

        // infoWindowRow: function(name, val, onclickFunc, cls, fpar) {
        //     //onclickFunc = onclickFunc || null;
        //     cls = cls || null;
        //     fpar = fpar || null;
        //     var v = Array.isArray(val) ? val[0] : val;
        //     return '<tr' + (cls ? (' class="' + cls + '"') : '') + '><td class="infoPaneLabelCell">' +
        //         linkFunc(name, onclickFunc, val, fpar) + '</td><td>' + linkFunc(v, onclickFunc, val, fpar) + '</td></tr>';
        // },

        // linkFunc: function (v, onclickFunc, val, fpar) {
        //     return (onclickFunc && val) ? ('<a onclick="' + onclickFunc + '(\'' + val + (fpar ? ('\', \'' + fpar + '\'') : '\'') + ');">' + v + '</a>') : v;
        // },

        // type2Name: function(t) {
        //     var t2n = {
        //         "residential": "Residential",
        //         "smallconsumer": "Small Consumer",
        //         "largeconsumer": "Large Consumer",
        //         "load": "Load",
        //         "source": "Bay",
        //         "transformer": "Transformer",
        //         "capacitor": "Capacitor",
        //         "regulator": "Regulator",
        //         "switch": "Switch",
        //         "protection": "Protection",
        //         "wire": "Conductor",
        //         "oh": "Overhead Conductor",
        //         "ug": "Underground Conductor",
        //         "breaker": "Breaker",
        //         "fuse": "Fuse",
        //         "recloser": "Recloser",
        //         "sectionalizer": "Sectionalizer",
        //         "pole": "Pole",
        //         "motor": "Motor",
        //         "generator": "Generator",
        //     }
        //     return t2n[t];
        // },


        // focusOn: function(secname, refocus = 'move') {
        //     var p = null;
        //     if (secname) {
        //         p = selectByAttr(['secname'], secname, ['Power Lines', 'Equipment', 'Loads', 'Equipment OFF', 'Loads OFF', 'Customer Transformers']).then(function (qr) { focusToSelection(qr, refocus); });
        //         /*
        //         if(refocus=='full'){
        //             p= p.then(function(qr){qr && esri.graphicsExtent(qr) && gs.map.setExtent(esri.graphicsExtent(qr).expand(gs.conf.view.extFactor));});
        //         }else if(refocus=='move'){
        //             p= p.then(function(qr){qr && esri.graphicsExtent(qr) && gs.map.centerAt(esri.graphicsExtent(qr).getCenter());});
        //         }
        //         */
        //     }
        //     return Promise.resolve(p);
        // }
    });

});