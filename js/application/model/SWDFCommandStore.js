  /**   
 *   Copyright <c> Claude Bernard - University Lyon 1 -  2013
 *   Author: Lionnel MEDINI(supervisor), Florian BACLE, Fiona LEPEUTREC, Benoît DURANT-DE-LA-PASTELLIERE, NGUYEN Hoang Duy Tan
 *   Description: Interface of a Datasource model
 *   Version: 1
 *   Tags:  
 **/
//SWDF commands file


var SWDFCommandStore = { 

  getAllAuthors : {
            dataType : "XML",
            method : "GET", 
            getQuery : function(parameters) { 
                var conferenceUri = parameters.conferenceUri;  
                var query =   'PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#> PREFIX foaf: <http://xmlns.com/foaf/0.1/> ' +
									' SELECT DISTINCT ?name  ?uriPaper  WHERE  { '+
									'   ?author foaf:name ?name.         '+
									'   ?author foaf:made ?uriPaper.     '+
									'   ?uriPaper swc:isPartOf  <'+conferenceUri+'/proceedings>.'+ 
									' } ORDER BY ASC(?name) '; 
				var  ajaxData = { query : query };
							return ajaxData;
            },
            ModelCallBack : function(dataXML){
			    ViewAdapter.prependToBackboneView('<h2>Search By Author</h2>');  
                                ViewAdapter.appendFilterList(dataXML,'#proceedings-search/author-','name',{count:true,autodividers:true});

			}
    },
                                        
     //Command getAllTitle       
    getAllTitle : {
        dataType : "XML",
        method : "GET",
        getQuery : function(parameters){ //JSON file parameters 
            var conferenceUri = parameters.conferenceUri; 
            var title = parameters.title;  
            var query =   '  PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#> PREFIX foaf: <http://xmlns.com/foaf/0.1/>   ' +
								'  PREFIX dc: <http://purl.org/dc/elements/1.1/>   ' +
								'  SELECT DISTINCT ?title WHERE {   ' +
								'  	 ?uriPaper swc:isPartOf  <'+conferenceUri+'/proceedings> .' +
								'  	 ?uriPaper dc:title     ?title.         ' + 
								' }  '; 
			var  ajaxData = { query : query };
							return ajaxData;
             },
        ModelCallBack : function(dataXML){ 
			    ViewAdapter.prependToBackboneView('<h2>Search By Title</h2>'); 
			ViewAdapter.appendFilterList(dataXML,'#publication/','title');
		}
	},
        
     //Command getAllKeyword
    getAllKeyword : {
        dataType : "XML",
        method : "GET",
        getQuery : function(parameters){ //JSON file parameters 
            var conferenceUri = parameters.conferenceUri; 
            var title = parameters.title;  
            var query = '  PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#> PREFIX foaf: <http://xmlns.com/foaf/0.1/>   ' +
							  ' PREFIX key:<http://www.w3.org/2004/02/skos/core#> ' +
							  ' PREFIX dc: <http://purl.org/dc/elements/1.1/> ' +
							  '  SELECT DISTINCT ?uriPaper ?keyword  WHERE { ' +
							  '  	 ?uriPaper       swc:isPartOf  <'+ conferenceUri+'/proceedings> .' +
							  '  	 ?uriPaper       dc:subject    ?keyword.         ' +
							  ' }ORDER BY ASC(?keyword) '; 
			var  ajaxData = { query : query };
					return ajaxData;
				     
             },
        ModelCallBack : function(dataXML){ 
			    ViewAdapter.prependToBackboneView('<h2>Search By Keyword</h2>');
			ViewAdapter.appendFilterList(dataXML,'#keyword/','keyword',{count:true,autodividers:true}); 
		}
	},
        
         
    getAuthorsProceedings : {
        dataType : "XML",
        method : "GET",
        getQuery : function(parameters){ //JSON file parameters 
            var conferenceUri = parameters.conferenceUri;  
            var authorName = parameters.id.split('_').join(' ');
            var query = 'PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#> PREFIX foaf: <http://xmlns.com/foaf/0.1/> ' +
							 ' PREFIX dc: <http://purl.org/dc/elements/1.1/> ' +
							' SELECT DISTINCT ?title WHERE  { '+
							'   ?author foaf:name "'+ authorName +'".         '+
							'   ?author foaf:made ?uriPaper.     '+
							'  	 ?uriPaper dc:title     ?title.         ' + 
							'   ?uriPaper swc:isPartOf  <'+conferenceUri+'/proceedings>.'+ 
                        ' }  '; 
			var  ajaxData = { query : query };
					return ajaxData;
             },
        ModelCallBack : function(dataXML){ 
			ViewAdapter.appendFilterList(dataXML,'#publication/','title');  
		}
	},  

	getPublicationsByKeyword : {
        dataType : "XML",
        method : "GET",
        getQuery : function(parameters){ //JSON file parameters 
            var conferenceUri = parameters.conferenceUri;  
            var keyword = parameters.id.split('_').join(' ');
			var query = '  PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#> PREFIX foaf: <http://xmlns.com/foaf/0.1/>   ' +
							 ' PREFIX dc: <http://purl.org/dc/elements/1.1/> ' +
							 '  SELECT DISTINCT ?publiUri ?publiTitle  WHERE { ' +
							 '  	 ?publiUri       swc:isPartOf  <'+ conferenceUri+'/proceedings>       .' +
							 '  	 ?publiUri       dc:subject     "'+keyword+'".' +
							 '  	 ?publiUri       dc:title     ?publiTitle.      ' +
							 ' }ORDER BY ASC(?publiTitle) '; 
			var  ajaxData = { query : query };
					return ajaxData;
		},
        ModelCallBack : function(dataXML, conferenceUri){ 
									var result = $(dataXML).find("sparql > results> result");
									var textResult= result.text();
									if( textResult == "")return;
									var nBresult= result.length;
									 
									ViewAdapter.prependToBackboneView('<h2>Conference publications</h2>');
									
									if(nBresult>5)ViewAdapter.appendFilterList(dataXML,'#publication/','title'); 
									else{
										result.each(function(){                  
											var eventLabel  = $(this).find("[name = title]").text();
											ViewAdapter.appendButton('#publication/'+eventLabel.split(' ').join('_'),eventLabel);  
										});            
									} 
								}
     }  ,

                                      

    getPublicationInfo : {
        dataType : "XML",
        method : "GET",
        getQuery : function(parameters){	
            var publiTitle = parameters.id; 
		    var prefix =	' PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#>' +
						    ' PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>      ' +
						    ' PREFIX dc: <http://purl.org/dc/elements/1.1/>             ' +
						    ' PREFIX swrc: <http://swrc.ontoware.org/ontology#>         ' +
						    ' PREFIX foaf: <http://xmlns.com/foaf/0.1/>            		' ;
						
		    var query =		'SELECT DISTINCT ?publiUri  ?publiTitle ?publiAbstract WHERE  '  +
						    '{ ?publiUri dc:title  "'+publiTitle.split('_').join(' ') +'".' +
						    'OPTIONAL {?publiUri dc:title ?publiTitle .                    }'+ 
						    'OPTIONAL {?publiUri  swrc:abstract ?publiAbstract.            ' +
						    ' }} ' ;
			var  ajaxData = { query : prefix+query };
					return ajaxData;
		},
        ModelCallBack : function(dataXML,conferenceUri){

			var result = $(dataXML).find("sparql > results> result").text();
			if( result != ""){

				$(dataXML).find("sparql > results > result").each(function(){                  
					var publiUri  = $(this).find("[name = publiUri]").text().replace(conferenceUri,"");	
					var publiTitle  = $(this).find("[name = publiTitle]").text();
					var publiAbstract  = $(this).find("[name = publiAbstract]").text();
					
					if(publiAbstract!=""){
						ViewAdapter.prependToBackboneView('<h4>'+publiAbstract+'</h4>'); 
						ViewAdapter.prependToBackboneView('<h2>Abstract</h2>');
					}
					if(publiTitle!=""){
						ViewAdapter.prependToBackboneView('<h4>'+publiTitle+'</h4>');
						ViewAdapter.prependToBackboneView('<h2>Title</h2>');
					}

				});            
			}
		}
	},
     
    getPublicationAuthor : {
        dataType : "XML",
        method : "GET",
        getQuery : function(parameters){
		     
            var publiTitle = parameters.id; 
		    var prefix =	' PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#>' +
						    ' PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>      ' +
						    ' PREFIX dc: <http://purl.org/dc/elements/1.1/>             ' +
						    ' PREFIX swrc: <http://swrc.ontoware.org/ontology#>         ' +
						    ' PREFIX foaf: <http://xmlns.com/foaf/0.1/>            		' ;
						
		    var query =		'SELECT DISTINCT ?publiUri  ?publiAbstract ?authorUri   ?authorName  WHERE  ' +
						    '{ ?publiUri dc:title  "'+ publiTitle.split('_').join(' ') +'".' +
						    ' ?publiUri dc:creator    ?authorUri.                      	 ' +
						    ' ?authorUri   foaf:name     ?authorName   .                 ' +
						    ' } ' ;
		    var  ajaxData ={ query : prefix+query };
					return ajaxData;
		},

        ModelCallBack : function(dataXML,conferenceUri){
									var result = $(dataXML).find("sparql > results> result").text();
									if( result != ""){
										ViewAdapter.appendToBackboneView('<h2>Authors </h2>'); 
										$(dataXML).find("sparql > results > result").each(function(){                  
											var authorUri  = $(this).find("[name = publiAbstract]").text().replace(conferenceUri,"");	
											var authorName  = $(this).find("[name = authorName]").text();
											ViewAdapter.appendButton('#author/'+authorName.split(' ').join('_'),authorName,{tiny:true}); 
										});            
									}
								}
    } , 
    
    ///////////////// BUILD GRAPH VIEW QUERY 
    ///////////////// BUILD GRAPH VIEW QUERY 
    ///////////////// BUILD GRAPH VIEW QUERY 
    ///////////////// BUILD GRAPH VIEW QUERY 
    getRdfGraphFromPublicationTitle : {
        dataType : "XML",
        method : "GET",
        getQuery : function(parameters){
		     
            var publiTitle = parameters.id; 
		    var prefix =	' PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#>' +
						    ' PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>      ' +
						    ' PREFIX dc: <http://purl.org/dc/elements/1.1/>             ' +
						    ' PREFIX swrc: <http://swrc.ontoware.org/ontology#>         ' +
						    ' PREFIX foaf: <http://xmlns.com/foaf/0.1/>            		' ;
						
		    var query =		'SELECT DISTINCT ?publiUri  WHERE   ' +
						    '{ ?publiUri dc:title  "'+ publiTitle.split('_').join(' ') +'".' + 
						    ' } ' ;
		    var  ajaxData ={ query : prefix+query };
			return ajaxData;
		},
      
        ModelCallBack : function(dataXML,conferenceUri,queryUrl){
									var result = $(dataXML).find("sparql > results> result");
									if( result.text() != ""){
	                            ViewAdapter.showAsGraph( result.find("[name = publiUri]").text(), queryUrl,SWDFCommandStore.getRdfLink,conferenceUri );
									}
								}
		                        
    },
	
	
    getRdfLink : {
        dataType : "XML",
        method : "GET",
        getQuery : function(parameters){
		     
            var entity = parameters.entity; 
		    var prefix =	' PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#>' +
						    ' PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>      ' +
						    ' PREFIX dc: <http://purl.org/dc/elements/1.1/>             ' +
						    ' PREFIX swrc: <http://swrc.ontoware.org/ontology#>         ' +
						    ' PREFIX foaf: <http://xmlns.com/foaf/0.1/>            		' ;
						
		    var query =		'SELECT DISTINCT ?link ?to  WHERE  { ' +
						    '<'+entity+'> ?link  ?to.' +  
						    ' } ' ;
				       
		        var  ajaxData = { query : prefix+query };
						return ajaxData;
            },
		                        
    },
    
    ///////////////// END BUILD GRAPH VIEW QUERY 
    ///////////////// END BUILD GRAPH VIEW QUERY 

    
    getSubEvent : {
	    dataType : "XML",
	    method : "GET", 
	    getQuery : function(parameters){ //JSON file parameters 

		    var eventId = parameters.id;  
		    var conferenceUri = parameters.conferenceUri;
		
		    var prefix =	' PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#>' +
						    ' PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>      ' ;
						
						
		    var query = 	'SELECT DISTINCT ?eventUri ?eventLabel  WHERE {'+
						    '<'+conferenceUri+eventId+'> swc:isSuperEventOf  ?eventUri. '+
							'?eventUri  rdf:type 	swc:SessionEvent.            '+
						    'OPTIONAL {'+
						    '?eventUri rdfs:label ?eventLabel.}} '+
							'ORDER BY DESC(?eventLabel)';
		   var  ajaxData = { query : prefix+query };
					return ajaxData;
		
	    },
	    
	    ModelCallBack : function(dataXML, conferenceUri){
	                                         
			var result = $(dataXML).find("sparql > results> result");
			var textResult= result.text();
			if( textResult == "")return;
			var nBresult= result.length;
			
			$("[data-role = page]").find(".content").append($('<h2>SubEvent</h2>'));
			if(nBresult>5)ViewAdapter.appendFilterList(dataXML,'#event/','eventUri',
				{
					show:{"eventLabel":{
							alt:"eventUri",
							parseAlt:function(url){return url.replace(conferenceUri,"")}
					}},
					parseUrl:function(url){return url.replace(conferenceUri,"")}
				});
			else{
				result.each(function(){                  
					var eventLabel  = $(this).find("[name = eventLabel]").text();				
					var eventUri  = $(this).find("[name = eventUri]").text().replace(conferenceUri,"");
					ViewAdapter.appendButton('#event/'+eventUri,eventLabel); 
					 
				});            
			} 
		}
                                         
    },
       
       
    getEvent : {
	    dataType : "XML",
	    method : "GET", 
	    getQuery : function(parameters){ //JSON file parameters 

		    var eventId = parameters.id;  
		    var conferenceUri = parameters.conferenceUri;
		
		    var prefix =	' PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#>' +
						    ' PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>      ' +
						    ' PREFIX ical: <http://www.w3.org/2002/12/cal/ical#>        ' ;
						
		    var query = 	'SELECT DISTINCT ?eventLabel ?eventLocation ?locationName ?eventStart ?eventEnd  WHERE {'+
						    'OPTIONAL { <'+conferenceUri+eventId+'> rdfs:label ?eventLabel.'+'}'+
						    'OPTIONAL { <'+conferenceUri+eventId+'> swc:hasLocation ?eventLocation.'+
						    '?eventLocation  rdfs:label ?locationName.'+'}'+
						    'OPTIONAL { <'+conferenceUri+eventId+'> ical:dtStart ?eventStart.'+'}'+
						    'OPTIONAL { <'+conferenceUri+eventId+'> ical:dtEnd ?eventEnd.'+'}'+
						
						    '}';
		    var  ajaxData = { query : prefix+query };
					return ajaxData;
		
	    },
	    ModelCallBack : function(dataXML, option){

	                        var result = $(dataXML).find("sparql > results> result").text();
	                        if( result != ""){ 
		                        $(dataXML).find("sparql > results > result").each(function(){                  
			                        var eventLabel  = $(this).find("[name = eventLabel]").text();				
			                        var eventLocation  = $(this).find("[name = eventLocation]").text();
			                        var locationName  = $(this).find("[name = locationName]").text();
			                        var eventStart  = $(this).find("[name = eventStart] :first-child").text();
			                        var eventEnd  = $(this).find("[name = eventEnd] :first-child").text();  
			                        if(eventEnd != ""){  
				                        ViewAdapter.prependToBackboneView('<h3>Ends at : '+moment(eventEnd).format('MMMM Do YYYY, h:mm:ss a')+'</h3>');  
			                        } 
			                        if(eventStart != ""){ 
				                        ViewAdapter.prependToBackboneView('<h3>Starts at : '+moment(eventStart).format('MMMM Do YYYY, h:mm:ss a')+'</h3>');
			                        }
			                        if(eventLocation != ""){ 
				                        ViewAdapter.prependToBackboneView('<h3>Location : '+(locationName!=""?locationName:eventLocation)+'</h3>');   
			                        }
			                        if(eventLabel != ""){ 
				                        ViewAdapter.prependToBackboneView('<h2>'+eventLabel+'</h2>');
			                        }
		                        });            
	                        }
                        },
                                         
    },


    getEventPublications : {
	    dataType : "XML",
	    method : "GET", 
	    getQuery : function(parameters){ //JSON file parameters 

		    var eventId = parameters.id;  
		    var conferenceUri = parameters.conferenceUri;
		
		    var prefix =	' PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#>' +
						    ' PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>      ' +
						    ' PREFIX dc: <http://purl.org/dc/elements/1.1/>             ' ;
						
		    var query = 	'SELECT DISTINCT ?publiUri ?publiTitle WHERE {'+
							'<'+conferenceUri+eventId+'> swc:isSuperEventOf  ?eventUri. '+
						    '?eventUri swc:hasRelatedDocument ?publiUri.'+
						    '?publiUri dc:title ?publiTitle.'+
						    '}';
		    var  ajaxData ={ query : prefix+query };
					return ajaxData;
		
	    },
	    ModelCallBack : function(dataXML,option){
		
	                        var result = $(dataXML).find("sparql > results> result");
	                        var textResult= result.text();
	                        if( textResult == "")return;
                            var nBresult= result.length;
                            
                            ViewAdapter.appendToBackboneView('<h2>Publications</h2>'); 
	                        if(nBresult>5)ViewAdapter.appendFilterList(dataXML,'#publication/','publiTitle');
	                        else{
	                            $(dataXML).find("sparql > results > result").each(function(){                  
		                            var publiUri  = $(this).find("[name = publiUri]").text().replace(option.conferenceUri,"");			
		                            var publiTitle  = $(this).find("[name = publiTitle]").text();
			                        ViewAdapter.appendButton('#publication/'+publiTitle.split(' ').join('_'),publiTitle);
	                            });  
	                        }   
                        },
                                         
    },
	
    getConferenceMainEvent : {
	    dataType : "XML",
	    method : "GET", 
	    getQuery : function(parameters){	
		    var conferenceUri = parameters.conferenceUri;
		    var prefix =	' PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#>' +
						    ' PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>      ' ;
					     
		    var query = 'SELECT DISTINCT ?eventUri ?eventLabel WHERE {     '+
						    '<'+conferenceUri+'> swc:isSuperEventOf  ?eventUri. '+
						    '?eventUri rdf:type swc:TrackEvent.            '+
						    '?eventUri rdfs:label ?eventLabel}';
		    var  ajaxData = { query : prefix+query };
					return ajaxData;
	    },
	    ModelCallBack : function(dataXML,conferenceUri){
		
	                        var result = $(dataXML).find("sparql > results> result").text();
	                        if( result != ""){
		                        $(dataXML).find("sparql > results > result").each(function(){                  
			                        var eventLabel  = $(this).find("[name = eventLabel]").text();
			                        var eventUri  = $(this).find("[name = eventUri]").text().replace(conferenceUri,""); 
			
			                        var title = $(this).next().find(":first-child").text();
			
                                    ViewAdapter.appendButton("#event/"+eventUri,eventLabel);
		                        });
	                        }
                        },
		     
    },
 
getPublicationKeywords : {
    dataType : "XML",
    method : "GET",
    getQuery : function(parameters){

            var publiTitle = parameters.id; 
            var prefix = ' PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#>' +
                        ' PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>      ' +
                        ' PREFIX dc: <http://purl.org/dc/elements/1.1/>             ' +
                        ' PREFIX swrc: <http://swrc.ontoware.org/ontology#>         ' +
                        ' PREFIX foaf: <http://xmlns.com/foaf/0.1/>              ' ;

            var query =  'SELECT DISTINCT ?keyword  WHERE  ' +
                        '{ ?publiUri dc:title  "'+ publiTitle.split('_').join(' ') +'".' +
                        '  ?publiUri       dc:subject     ?keyword .                   ' +
                        ' } ' ;

              var  ajaxData = { query : prefix+query };
					return ajaxData;
    },
    ModelCallBack : function(dataXML,conferenceUri){
        var result = $(dataXML).find("sparql > results> result").text();
        if( result != ""){
            $("[data-role = page]").find(".content").append($('<h2>Keywords</h2>')).trigger("create");
            $(dataXML).find("sparql > results > result").each(function(){                  
            var keyword  = $(this).find("[name = keyword]").text(); 

            ViewAdapter.appendButton('#keyword/'+keyword.split(' ').join('_'),keyword,{tiny:true}); 
            });            
        }
    }
} ,
	
getPublicationsByKeyword : {
    dataType : "XML",
    method : "GET",
    getQuery : function(parameters){ //JSON file parameters 
        var conferenceUri = parameters.conferenceUri;  
        var keyword = parameters.id.split('_').join(' ');
		var prefix =   '  PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#> PREFIX foaf: <http://xmlns.com/foaf/0.1/>   ' +
							' PREFIX dc: <http://purl.org/dc/elements/1.1/> ' ;
         var query =   '  SELECT DISTINCT ?publiUri ?publiTitle  WHERE { ' +
							 '    ?publiUri       swc:isPartOf  <'+ conferenceUri+'/proceedings>       .' +
							 '    ?publiUri       dc:subject     "'+keyword+'".' +
							 '    ?publiUri       dc:title     ?publiTitle.      ' +
							 ' }ORDER BY ASC(?publiTitle) ';
				  var  ajaxData = { query : prefix+query };
						return ajaxData;
    },
    ModelCallBack : function(dataXML, conferenceUri){ 
    
        var result = $(dataXML).find("sparql > results> result");
        var textResult= result.text();
        var nBresult= result.length;
        if( textResult < 1)return;
        
        ViewAdapter.appendToBackboneView('<h2>Keyword publication</h2>'); 
        if(nBresult>5)ViewAdapter.appendFilterList(dataXML,'#publication/','publiTitle');
        else{
            $(dataXML).find("sparql > results > result").each(function(){                  
                var publiUri  = $(this).find("[name = publiUri]").text().replace(conferenceUri,"");			
                var publiTitle  = $(this).find("[name = publiTitle]").text();
                ViewAdapter.appendButton('#publication/'+publiTitle.split(' ').join('_'),publiTitle);
            });  
        }  
    }
 }  ,
	
	
 getAuthorOrganization : {
	      dataType : "XML",
	      method : "GET",
	      getQuery : function(parameters){ //JSON file parameters 
				var conferenceUri = parameters.conferenceUri;
				var authorName = parameters.id.split('_').join(' ');   
				
				var prefix =	' PREFIX foaf: <http://xmlns.com/foaf/0.1/> ' ;

				var query =    ' SELECT DISTINCT ?OrganizationName ?OrganizationUri WHERE     ' +
									' { ' +
									'   ?AuthorUri      foaf:name  "'+ authorName +'"  . '  +
									'   ?OrganizationUri       foaf:member ?AuthorUri  . '  +
									'   ?OrganizationUri       foaf:name   ?OrganizationName.     '  +
									' } '
													
				var  ajaxData = { query : prefix+query };
							return ajaxData;
						},

	      ModelCallBack :  function(dataXML,conferenceUri){
											var result = $(dataXML).find("sparql > results> result").text();
											if( result != ""){
												$("[data-role = page]").find(".content").append($('<h2>Organizations </h2>')).trigger("create");
												$(dataXML).find("sparql > results > result").each(function(){                  
													var OrganizationUri  = $(this).find("[name = OrganizationUri]").text().replace(conferenceUri,"");	
													var OrganizationName  = $(this).find("[name = OrganizationName]").text();
													ViewAdapter.appendButton('#organization/'+OrganizationName.split(' ').join('_'),OrganizationName,{tiny:true}); 
												});            
											}
										}

    },
	
	
	  //Command getOrganization                               
getOrganization : {
					  dataType : "XML",
					  method : "GET",
					  getQuery : function(parameters){ //JSON file parameters 
									var prefix =	' PREFIX foaf: <http://xmlns.com/foaf/0.1/> ' ;
									var OrganizationName = parameters.id.split('_').join(' ');
									var query =  ' SELECT DISTINCT ?MemberName ?MemberUri ?OrganizationUri  WHERE     '+
													   ' {   ' +
													   '   ?OrganizationUri   foaf:name   "'+OrganizationName +'".  '+															   
													   '    ?OrganizationUri  foaf:member ?MemberUri.      		     '+
													   '    ?MemberUri         foaf:name   ?MemberName.     	     '+
													   ' }  ';   															 
									var  ajaxData = { query : prefix+query };
													return ajaxData;
										 },
					  ModelCallBack : function(dataXML,conferenceUri){
							var result = $(dataXML).find("sparql > results> result").text();
							if( result != ""){
								$("[data-role = page]").find(".content").append($('<h2>Members</h2>')).trigger("create");
								$(dataXML).find("sparql > results > result").each(function(){                  
									var OrganizationUri  = $(this).find("[name = OrganizationUri]").text().replace(conferenceUri,"");	
									var memberName  = $(this).find("[name = MemberName]").text();
									ViewAdapter.appendButton('#author/'+memberName.split(' ').join('_'),memberName,{tiny:true}); 
								});            
							}
						}
}
   
 };  

                                      
                         
