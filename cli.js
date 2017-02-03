var program = require('commander');
var esri2fc = require('./');

let endpoint;

program
  .version('0.0.1')
  .arguments('<url>')
  .option('--where [clause]', 'Where clause [clause]', '1=1')
  .option('--outFields [fields]', 'Out fields [fields]', '*')
  .option('--returnGeometry', 'If true, the result set includes the geometry associated with each result. The default is false.')
  .option('--maxAllowableOffset [offset]', 'This option can be used to specify the maxAllowableOffset to be used for generalizing geometries returned by the query operation.')
  .option('--geometryPrecision [precision]', 'This option can be used to specify the number of decimal places in the response geometries returned by the query operation.')
  .action(function (url) {
     endpoint = url;
  });

program.parse(process.argv);

var options = {
    where: program.where,
    outFields: program.outFields,
    returnGeometry: program.returnGeometry || false
};

if (program.maxAllowableOffset) options.maxAllowableOffset = parseInt(program.maxAllowableOffset);
if (program.geometryPrecision) options.geometryPrecision = parseInt(program.geometryPrecision);

esri2fc(endpoint, options, function (err, result) { 
    if (err) console.error(err);
    console.log(JSON.stringify(result));
});
