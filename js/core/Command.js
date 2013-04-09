 /**   
 *   Copyright <c> Claude Bernard - University Lyon 1 -  2013
 *   Author: Lionnel MEDINI(supervisor), Florian BACLE, Fiona LE PEUTREC, Benoît DURANT-DE-LA-PASTELLIERE, NGUYEN Hoang Duy Tan
 *   Description: Interface of a Datasource model
 *   Version: 1
 *   Tags:  
 **/ 
 
 //Command Class
 
 var Command = Backbone.Model.extend({

        // Default properties
       defaults: {
          name: "",
          dataType: "",
          method: "",
          query : ""
        },
        /*
        // Constructor with options JSON file 
        initialize: {
          name: options.name,
          dataType: options.dataType,
          method : options.method,
          getQuery : options.getQuery
        },
        // Any time a Model attribute is set, this method is called
        validate: function(attrs) {

        },
        
        //ModelCallBack : callback query fonction 
        ModelCallBack : function(){
            
        },
        
        //ViewCallBack : 
        ViewCallBack : function(){
        }
*/
    });

