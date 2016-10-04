var program = require('commander');
var quesri = require('./');

let endpoint;

program
  .version('0.0.1')
  .arguments('<url>')
  .option('-w, --where [clause]', 'Where clause [clause]', '1=1')
  .option('-f, --outFields [fields]', 'Out fields [fields]')
  .option('-g, --returnGeometry', 'Return geometry')
  .action(function (url) {
     endpoint = url;
  });

program.parse(process.argv);

var options = {
    where: program.where,
    outFields: program.outFields,
    returnGeometry: program.returnGeometry || false
};

// http://gisonline.abmi.ca:6080/arcgis/rest/services/portal_boundaries/admin_boundaries/MapServer

quesri(endpoint, options, function (err, result) { 
    if (err) console.error(err);
    console.log(JSON.stringify(result));
});
