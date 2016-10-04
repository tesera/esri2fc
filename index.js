'use strict';
let co = require('co');
let request = require('co-request');
let arcgis = require('terraformer-arcgis-parser');

function* info (url) {
    const res = yield request(url, { qs: { f: 'json' } });
    return JSON.parse(res.body);
}

function* query (url) {
    const res = yield request(`${url}/query`, { 
        qs: { 
            f: 'json',
            returnGeometry: true,
            outFields: 'NAME',
            where: '1=1'
        } 
    });
    return JSON.parse(res.body);
}

// esri2fc http://gisonline.abmi.ca:6080/arcgis/rest/services/portal_boundaries/admin_boundaries/MapServer

co(function* () {
    const url = 'http://gisonline.abmi.ca:6080/arcgis/rest/services/portal_boundaries/admin_boundaries/MapServer';
    const serviceMeta = yield info(url);

    const layersUrls = serviceMeta.layers.map(layer => `${url}/${layer.id}`);
    const queryResults = yield layersUrls.map(url => query(url));

    const featureCollections = serviceMeta.layers.reduce((fc, l, i) => {
        fc[l.name] = {
            type: 'FeatureCollection',
            features: queryResults[i].features.map(f => arcgis.parse(f))
        };
        return fc;
    }, {})

    console.log(JSON.stringify(featureCollections));

}, function (err) {
  console.error(err);
});