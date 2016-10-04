'use strict';
let co = require('co');
let request = require('co-request');
let arcgis = require('terraformer-arcgis-parser');

function* info (url) {
    const res = yield request(url, { qs: { f: 'json' } });
    return JSON.parse(res.body);
}

function* query (url, options) {
    const qs = Object.assign({f: 'json'}, options);
    const res = yield request(`${url}/query`, { qs });
    return JSON.parse(res.body);
}

function quesri (url, options, callback) {
    co(function* () {
        const serviceMeta = yield info(url);
        const layers = serviceMeta.layers.map(layer => `${url}/${layer.id}`);
        const queryResults = yield layers.map(url => query(url, options));

        const featureCollections = serviceMeta.layers.reduce((fc, l, i) => {
            fc[l.name] = {
                type: 'FeatureCollection',
                features: queryResults[i].features.map(f => arcgis.parse(f))
            };
            return fc;
        }, {});

        callback(null, featureCollections);

    }, callback);
}

module.exports = quesri;