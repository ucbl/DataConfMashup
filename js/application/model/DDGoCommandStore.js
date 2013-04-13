  /**   
 *   Copyright <c> Claude Bernard - University Lyon 1 -  2013
 *   Author: Lionnel MEDINI(supervisor), Florian BACLE, Fiona LEPEUTREC, Benoît DURANT-DE-LA-PASTELLIERE, NGUYEN Hoang Duy Tan
 *   Description: Interface of a Datasource model
 *   Version: 1
 *   Tags:  
 **/
 

//Web Service REST
 var DDGoCommandStore = {
 
 //Command getResult
getResultOrganization : {
		  dataType : "JSONP",
		  method : "GET",
		  getQuery : function(parameters){ 
						var searchValue = parameters.id.split('_').join(' ');
						var  ajaxData = { q : searchValue, format : "json",pretty : 1, no_redirect : 1  , output : "json"};
						   return ajaxData ; 
				   },
		  ModelCallBack : function (dataJSON){
		
														
				if(dataJSON.Heading !== undefined)			    $("[data-role = page]").find(".content").prepend('<h3>'+dataJSON.Heading+' Organization</h3>').trigger("create");	
				if(dataJSON.Image !== undefined)			        $("[data-role = page]").find(".content").prepend('<img src="'+ dataJSON.Image+'" alt="OrganizationLogo" height="60" width="60" style={ box-shadow: 8px 8px 12px #aaa;}>').trigger("create");	
																			        $("[data-role = page]").find(".content").append('<h2>Abstract Text</h2>').trigger("create");	
				if(dataJSON.AbstractText !== undefined)	        $("[data-role = page]").find(".content").append('<h4>'+dataJSON.AbstractText+'</h4>').trigger("create");	
																				    $("[data-role = page]").find(".content").append('<h2>Official Site</h2>').trigger("create");	
				if(dataJSON.Results[0] !== undefined) {									
					if(dataJSON.Results[0].FirstURL !== undefined)    $("[data-role = page]").find(".content").append('<a href="'+ dataJSON.Results[0].FirstURL+'" >' + dataJSON.Results[0].FirstURL+'</a>').trigger("create");	
				}
			}
},

 //Command getResult
getResultAuthor : {
		  dataType : "JSONP",
		  method : "GET",
		  getQuery : function(parameters){ 
						var searchValue = parameters.id.split('_').join(' ');
						var query = searchValue+'&format=json&pretty=1&no_redirect=1';//Put in URL (method get)
						var  ajaxData = { q : searchValue, format : "json",pretty : 1, no_redirect : 1  , output : "json"};
						   return ajaxData ; 
				   },
		  ModelCallBack : function (dataJSON){
											 $("[data-role = page]").find(".content").append('<h2>Site</h2>').trigger("create");	
											 $("[data-role = page]").find(".content").append('<span><a href="'+ dataJSON.Redirect +'" >' + dataJSON.Redirect +'</a></span>').trigger("create");	
			}
}




                               

};//End DDGoCommandStore file


   
