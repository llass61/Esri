

define(["dojo/_base/declare", "dojo/_base/lang"
], function (declare, lang) {

    return declare("BasePopup", null, {

        constructor: function () {},

        t2n: {
            "residential": "Residential",
            "smallconsumer": "Small Consumer",
            "largeconsumer": "Large Consumer",
            "load": "Load",
            "source": "Bay",
            "transformer": "Transformer",
            "capacitor": "Capacitor",
            "regulator": "Regulator",
            "switch": "Switch",
            "protection": "Protection",
            "wire": "Conductor",
            "oh": "Overhead Conductor",
            "ug": "Underground Conductor",
            "breaker": "Breaker",
            "fuse": "Fuse",
            "recloser": "Recloser",
            "sectionalizer": "Sectionalizer",
            "pole": "Pole",
            "motor": "Motor",
            "generator": "Generator",
        },

        addRow: function(tbl, lbl, value, rowClass = null, cellClass = 'infoPaneLableCell',
            linkify = false, onclickFunc = null, funcParam = null) {
            var row = tbl.insertRow();
            if (rowClass) row.className = rowClass;

            var tdLbl = row.insertCell();
            if (cellClass) tdLbl.className = cellClass;
            tdLbl.innerHTML = lbl;

            var tdValue = row.insertCell();
            if (linkify) {
                anch = document.createElement('a');
                afunc = funcParam ? `${onclickFunc}(${funcParam})` : `${onclickFunc}()`;
                anch.setAttribute('onclick', afunc);
                anch.innerHTML = value;
                tdValue.appendChild(anch);
            }
            else {
                tdValue.innerHTML = value;
            }

            return { lbl: tdLbl, val: tdValue };
        },

        infoWindowRow: function(name, val, onclickFunc, cls, fpar) {
            //onclickFunc = onclickFunc || null;
            cls = cls || null;
            fpar = fpar || null;
            var v = Array.isArray(val) ? val[0] : val;
            return '<tr' + (cls ? (' class="' + cls + '"') : '') + '><td class="infoPaneLabelCell">' +
                linkFunc(name, onclickFunc, val, fpar) + '</td><td>' + linkFunc(v, onclickFunc, val, fpar) + '</td></tr>';
        },

        linkFunc: function (v, onclickFunc, val, fpar) {
            return (onclickFunc && val) ? ('<a onclick="' + onclickFunc + '(\'' + val + (fpar ? ('\', \'' + fpar + '\'') : '\'') + ');">' + v + '</a>') : v;
        },

        type2Name: function(t) {
            
            return t2n[t];
        },

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
        // },

        // selectByAttr: function(a, v, qls, strict= true) {
        //     window.extentquery = false;
        //     var q = new esri.tasks.Query();
        //     q.returnGeometry = true;
        //     q.outSpatialReference = map.spatialReference;
        //     var vs = v instanceof Array ? v: [v]; //v.join("','") : v;
        //     var attrs = a instanceof Array ? a : [a];
        //     q.where = attrs.map(function (attr) {
        //         //return attr + " in ('" + vs + "')";
        //         return vs.map(function(v){return attr + (strict?" = '":" LIKE '%") + v + (strict?"'":"%'")}).join(' OR ');
        //     }).join(' OR ');
    });
    // return EquipPPT;
});