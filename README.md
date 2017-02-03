# esri2fc
Queries ArcGIS endpoint and returns GeoJSON Feature Collection for each layer. It will return an object keyed by layer name that will contain a GeoJSON Feature Collection.

###Install
`npm install tesera/esri2fc --global`

###Usage
```terminal
$ esri2fc --help

  Usage: cli [options] <url>

  Options:

    -h, --help                       output usage information
    -V, --version                    output the version number
    --where [clause]                 Where clause [clause]
    --outFields [fields]             Out fields [fields]
    --returnGeometry                 If true, the result set includes the geometry associated with each result. The default is false.
    --maxAllowableOffset [offset]    This option can be used to specify the maxAllowableOffset to be used for generalizing geometries returned by the query operation.
    --geometryPrecision [precision]  This option can be used to specify the number of decimal places in the response geometries returned by the query operation.
```

###Example
```
$ esri2fc http://your-server.com/arcgis/services/rest/your-folder/your-service/MapServer
{
	"your-layer-1":{
		"type":"FeatureCollection",
		"features":[
			{
				"type":"Feature",
				"geometry": null,
				"properties": {}
			}
		]
	}
	...
}
```
