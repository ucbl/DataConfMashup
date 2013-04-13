  /**   
 *   Copyright <c> Claude Bernard - University Lyon 1 -  2013
 *   Author: Lionnel MEDINI(supervisor), Florian BACLE, Fiona LE PEUTREC, Benoît DURANT-DE-LA-PASTELLIERE, NGUYEN Hoang Duy Tan
 *   Description: Interface of a Datasource model
 *   Version: 1
 *   Tags:  
 **/
 
 var GoogleCommandStore = {
 
 //Command getResult
getAuthorPersonalPage : {
		  dataType : "JSONP",
		  method : "GET",
		  getQuery : function(parameters){ 
								var searchValue = parameters.id.split('_').join(' ');
								var  ajaxData = { q : searchValue, v : "1.0" };
								   return ajaxData ; 
							},
		  ModelCallBack : function (dataJSON){
											
										$("[data-role = page]").find(".content").append('<h2>Personal Page</h2>').trigger("create");	
										$("[data-role = page]").find(".content").append('<a href="'+ dataJSON.responseData.results[0].url+'" >' + dataJSON.responseData.results[0].url+'</a>').trigger("create");	
														
									}
}

};//End GoogleCommandStore file


   
