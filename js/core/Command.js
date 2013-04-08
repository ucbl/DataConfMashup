  /**   
 *   Copyright <c> Claude Bernard - University Lyon 1 -  2013
 *   Author: Lionnel MEDINI(supervisor), Florian BACLE, Fiona LEPEUTREC, Benoît DURANT-DE-LA-PASTELLIERE, NGUYEN Hoang Duy Tan
 *   Description: Interface of a Datasource model
 *   Version: 1
 *   Tags:  
 **/
Command = Backbone.Model.extend({

	defaults: {
		
	},

	initialize: function(options){
		this.method = options.method,
		this.cache = options.cache,
		this.dataType = options.dataType
	},
	
	getQuery: function(options){
	
	
	}
	
	
	
});