/**   
*	Copyright <c> Claude Bernard - University Lyon 1 -  2013
* 	License : This file is part of the DataConf application, which is licensed under a Creative Commons Attribution-NonCommercial 3.0 Unported License. See details at : http://liris.cnrs.fr/lionel.medini/wiki/doku.php?id=dataconf&#licensing 
*   Author: Lionel MEDINI(supervisor), Florian BACLE, Fiona LEPEUTREC, Benoît DURANT-DE-LA-PASTELLIERE, NGUYEN Hoang Duy Tan
*   Description: This object contains a json definition of all the commands that will prepare all the queries we want to send on the SemanticWebDogFood sparql endpoint.
*				 Each one of those commands declare the datatype, the method, the query string it is supposed to use on the endpoint and provide the Callback function used to parse the results.		
*				 To declare a request, each commands can use the parameters declared for the route they are called in (see Configuration.js). This parameter can be a name or an uri and represents
*				 the entity which we want informations on. After calling a command, the results are parsed with it own callback function. It is the role of the router to call those commands according to the configuration file.
*   Version: 0.8
*   Tags:  JSON, SPARQL, AJAX
**/
var SWDFCommandStore = { 

	/** Command used to get and display  all the authors that have a publication in the conference's proceedings using the conference uri **/
		getAllAuthors : {
		//Declaration of the datatype to use when sending the query
		dataType : "XML",
		//Declaration of the method to use when sending the query
		method : "GET", 
		//Declaring the function that will build the query using the parameters (the conference informations or a specific part of the url declared in configuration.js), encapsulate it in a JSON and returns it
		getQuery : function(parameters) { 
			//Catching the uri of the conference given by
			var conferenceUri = parameters.conferenceUri;  
			
			var proceedingsUri = parameters.uri;
			//Building sparql query with prefix
			var query =   'PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#> PREFIX foaf: <http://xmlns.com/foaf/0.1/> ' +
								'SELECT DISTINCT ?authorName  ?authorUri  WHERE  {                                                         ' +
								'   ?uriPubli swc:isPartOf  <'+conferenceUri+proceedingsUri+'>.										       ' + 
								'   ?authorUri foaf:made ?uriPubli.                           											   ' +
								'   ?authorUri foaf:name ?authorName.                               										   ' +
								'} ORDER BY ASC(?name) '; 
			//Encapsulating query in json object to return it
			var  ajaxData = { query : query };
			return ajaxData;
		},
		//Declaring the callback function to use when sending the command
		ModelCallBack : function(dataXML,conferenceUri,datasourceUri, currentUri){
			
			var result = $(dataXML).find("sparql > results > result").text();
			if( result != ""){
				var JSONfile = {};
				$(dataXML).find("sparql > results > result").each(function(i){  
					var JSONToken = {};
					JSONToken.authorUri =  $(this).find("[name = authorUri]").text();
					JSONToken.authorName =  $(this).find("[name = authorName]").text(); 	
					JSONfile[i] = JSONToken;
				});
				StorageManager.pushToStorage(currentUri,"getAllAuthors",JSONfile);
			} 
		},
		
		ViewCallBack : function(parameters){
			var JSONdata = parameters.JSONdata;
			var conferenceUri = parameters.conferenceUri;
	
			if(JSONdata.hasOwnProperty("getAllAuthors")){
				var authorList = JSONdata.getAllAuthors;
				if(_.size(authorList) > 0 ){
					$.each(authorList, function(i,author){
					console.log(author);
				
					$("[data-role = page]").find(".content").append($('<a href="#author/'+author.authorUri+'" data-role="button">'+author.authorName+'</a>'));
						//ViewAdapter.appendButton('#author/'+author.authorUri.replace(conferenceUri,""),author.authorName);
					});
					
					
				}
			}
		}
		
    },
                                        
    /** Command used to get and display the title of the conference's publications **/
    getAllTitle : {
        dataType : "XML",
        method : "GET",
        getQuery : function(parameters){
            var conferenceUri = parameters.conferenceUri; 
            var proceedingsUri = parameters.uri; 
            var query =   'PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#> PREFIX foaf: <http://xmlns.com/foaf/0.1/>   ' +
								'PREFIX dc: <http://purl.org/dc/elements/1.1/>                                                          ' +
								'SELECT DISTINCT ?publiTitle ?publiUri WHERE {                                                                         ' +
								'  	 ?publiUri swc:isPartOf  <'+conferenceUri+proceedingsUri+'> .                                          ' +
								'  	 ?publiUri dc:title     ?publiTitle.                                                                     ' + 
								'}'; 
			var  ajaxData = { query : query };
			return ajaxData;
		},
        ModelCallBack : function(dataXML,conferenceUri,datasourceUri, currentUri){ 
			var result = $(dataXML).find("sparql > results > result").text();
			if( result != ""){
				var JSONfile = {};
				$(dataXML).find("sparql > results > result").each(function(i){  
					var JSONToken = {};
					JSONToken.publiUri =  $(this).find("[name = publiUri]").text();
					JSONToken.publiTitle =  $(this).find("[name = publiTitle]").text(); 	
					JSONfile[i] = JSONToken;
				});
				StorageManager.pushToStorage(currentUri,"getAllTitle",JSONfile);
			} 
		},
		
		ViewCallBack : function(parameters){
			var JSONdata = parameters.JSONdata;
			var conferenceUri = parameters.conferenceUri;
			
			if(JSONdata.hasOwnProperty("getAllTitle")){
				var publicationList= JSONdata.getAllTitle;
				if(_.size(publicationList) > 0 ){
					$.each(publicationList, function(i,publication){
						console.log(publication);
						$("[data-role = page]").find(".content").append($('<a href="#publication/'+publication.publiUri+'" data-role="button">'+publication.publiTitle+'</a>'));
						//ViewAdapter.appendButton('#event/'+publication.publiUri.replace(conferenceUri,""),publication.publiTitle);
					});
				}
			}
		}
	},
        
    /** Command used to get and display all keywords of the conference's publications **/
    getAllKeyword : {
        dataType : "XML",
        method : "GET",
        getQuery : function(parameters){
            var conferenceUri = parameters.conferenceUri; 
			var proceedingsUri = parameters.uri;   
            var query = 	'PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#> PREFIX foaf: <http://xmlns.com/foaf/0.1/>   ' +
							'PREFIX key:<http://www.w3.org/2004/02/skos/core#>                                                      ' +
							'PREFIX dc: <http://purl.org/dc/elements/1.1/>                                                          ' +
							'SELECT DISTINCT  ?keyword  WHERE {                                                            ' +
							'  	 ?publiUri       swc:isPartOf  <'+conferenceUri+proceedingsUri+'> .                                   ' +
							'  	 ?publiUri       dc:subject    ?keyword.                                                            ' +
							'}ORDER BY ASC(?keyword) '; 
							
			var  ajaxData = { query : query };
			return ajaxData;
				     
		},
        ModelCallBack : function(dataXML,conferenceUri,datasourceUri, currentUri){ 
			var result = $(dataXML).find("sparql > results > result").text();
			if( result != ""){
				var JSONfile = {};
				$(dataXML).find("sparql > results > result").each(function(i){  
					var JSONToken = {};
					JSONToken.keyword =  $(this).find("[name = keyword]").text();	
					JSONfile[i] = JSONToken;
				});
				StorageManager.pushToStorage(currentUri,"getAllKeyword",JSONfile);
			} 
		},
		
		ViewCallBack : function(parameters){
			var JSONdata = parameters.JSONdata;
			var conferenceUri = parameters.conferenceUri;
		
			if(JSONdata.hasOwnProperty("getAllKeyword")){
				
				var keywordList = JSONdata.getAllKeyword;
				if(_.size(keywordList) > 0 ){
					$.each(keywordList, function(i,keyword){
							$("[data-role = page]").find(".content").append($('<a href="#keyword/'+keyword.keyword+'" data-role="button">'+keyword.keyword+'</a>'));
					});
				}
			}
		}
	},
        
    /** Command used to get and display all keywords of the conference's publications **/     
    getAuthorsProceedings : {
        dataType : "XML",
        method : "GET",
        getQuery : function(parameters){
            var conferenceUri = parameters.conferenceUri;  
            var authorUri = parameters.uri;
            var query = 	'PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#> PREFIX foaf: <http://xmlns.com/foaf/0.1/> ' +
							'PREFIX dc: <http://purl.org/dc/elements/1.1/>                                                        ' +
							'SELECT DISTINCT ?publiTitle ?publiUri WHERE  { 					                                  ' + 
							'   ?publiUri swc:isPartOf  <'+conferenceUri+'/proceedings>.										  ' + 
							'    <'+authorUri+'> foaf:made ?publiUri.    														  ' +
							'  	?publiUri dc:title     ?publiTitle.        													      ' + 
							
							'}'; 
			var  ajaxData = { query : query };
			return ajaxData;
		},
        ModelCallBack : function(dataXML,conferenceUri,datasourceUri, currentUri){ 
			var result = $(dataXML).find("sparql > results > result").text();
			if( result != ""){
				var JSONfile = {};
				$(dataXML).find("sparql > results > result").each(function(i){  
					var JSONToken = {};
					JSONToken.publiTitle =  $(this).find("[name = publiTitle]").text();
					JSONToken.publiUri =  $(this).find("[name = publiUri]").text();				
					JSONfile[i] = JSONToken;
				});
				StorageManager.pushToStorage(currentUri,"getAuthorsProceedings",JSONfile);
			} 
		},
		ViewCallBack : function(parameters){
			var JSONdata = parameters.JSONdata;
			var conferenceUri = parameters.conferenceUri;
		
			if(JSONdata.hasOwnProperty("getAuthorsProceedings")){
				
				var publiList = JSONdata.getAuthorsProceedings;
				if(_.size(publiList) > 0 ){
					ViewAdapter.appendToBackboneView('<h2>Conference publications</h2>');
					$.each(publiList, function(i,publication){
						$("[data-role = page]").find(".content").append($('<a href="#publication/'+publication.publiUri+'" data-role="button">'+publication.publiTitle+'</a>'));
					});
				}
			}	
		}
		
		
	},  
	
	/** Command used to get and display all publications linked to a specific keyword **/     
	getPublicationsByKeyword : {
        dataType : "XML",
        method : "GET",
        getQuery : function(parameters){ 
            var conferenceUri = parameters.conferenceUri;  
            var keyword = parameters.id.split('_').join(' ');
			var query = 	'PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#> PREFIX foaf: <http://xmlns.com/foaf/0.1/> ' +
							'PREFIX dc: <http://purl.org/dc/elements/1.1/>                                                        ' +
							'SELECT DISTINCT ?publiUri ?publiTitle  WHERE {                                                       ' +
							'  	 ?publiUri       swc:isPartOf  <'+ conferenceUri+'/proceedings>.                                  ' +
							'  	 ?publiUri       dc:subject     "'+keyword+'".                                                    ' +
							'  	 ?publiUri       dc:title     ?publiTitle.                                                        ' +
							'}ORDER BY ASC(?publiTitle) '; 
			var  ajaxData = { query : query };
			return ajaxData;
		},
        ModelCallBack : function(dataXML,conferenceUri,datasourceUri, currentUri){ 
			
		},
		
		ViewCallBack : function(id,conferenceUri){
		
			var JSONdata = parameters.JSONdata;
			var conferenceUri = parameters.conferenceUri;
			
			var result = $(JSONdata).find("sparql > results> result");
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
     },

                                      
	/** Command used to get and display the title and the abstract of a publication  **/
    getPublicationInfo : {
        dataType : "XML",
        method : "GET",
        getQuery : function(parameters){
			var conferenceUri = parameters.conferenceUri;
		    var prefix =	'PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#>         ' +
						    'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>               ' +
						    'PREFIX dc: <http://purl.org/dc/elements/1.1/>                      ' +
						    'PREFIX swrc: <http://swrc.ontoware.org/ontology#>                  ' +
						    'PREFIX foaf: <http://xmlns.com/foaf/0.1/>            		        ' ;
						
		    var query  =	'SELECT DISTINCT   ?publiTitle ?publiAbstract WHERE  {              ' +
						    '   <'+parameters.uri+'>  dc:title ?publiTitle.                           ' +
						    '	OPTIONAL {<'+parameters.uri+'>  swrc:abstract ?publiAbstract.   }     ' +
						    '}';
							
			var  ajaxData = { query : prefix+query };
			return ajaxData;
		},
        ModelCallBack : function(dataXML,conferenceUri,datasourceUri, currentUri){
			var result = $(dataXML).find("sparql > results > result").text();
			if( result != ""){
				var JSONfile = {};
				$(dataXML).find("sparql > results > result").each(function(i){  
					var JSONToken = {};
					JSONToken.publiTitle =  $(this).find("[name = publiTitle]").text();
					JSONToken.publiAbstract =  $(this).find("[name = publiAbstract]").text(); 	
					JSONfile[i] = JSONToken;
				});
				StorageManager.pushToStorage(currentUri,"getPublicationInfo",JSONfile);
			} 
			
		},
		
		ViewCallBack : function(parameters){
			
			var JSONdata = parameters.JSONdata;
			var conferenceUri = parameters.conferenceUri;
			var publicationInfo = JSONdata.getPublicationInfo;
			
			if(_.size(publicationInfo) > 0 ){
		        var publiAbstract  = publicationInfo[0].publiAbstract;				
				var publiTitle  = publicationInfo[0].publiTitle;	

				if(publiAbstract!=""){
					ViewAdapter.prependToBackboneView('<h4>'+publiAbstract+'</h4>'); 
					ViewAdapter.prependToBackboneView('<h2>Abstract</h2>');
				}
				if(publiTitle!=""){
					ViewAdapter.prependToBackboneView('<h4>'+publiTitle+'</h4>');
					ViewAdapter.prependToBackboneView('<h2>Title</h2>');
				}
			}
		}
	},
     
	/** Command used to get the auhors of a publication  **/
    getPublicationAuthor : {
        dataType : "XML",
        method : "GET",
        getQuery : function(parameters){
		    var conferenceUri = parameters.conferenceUri;
		    var prefix =	'PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#>                  ' +
						    'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>                        ' +
						    'PREFIX dc: <http://purl.org/dc/elements/1.1/>                               ' +
						    'PREFIX swrc: <http://swrc.ontoware.org/ontology#>                           ' +
						    'PREFIX foaf: <http://xmlns.com/foaf/0.1/>            		                 ' ;
						
		    var query =		'SELECT DISTINCT ?authorUri   ?authorName  WHERE { ' +
						    '	<'+parameters.uri+'>   dc:title ?publiTitle.                              ' +
						    '	<'+parameters.uri+'>  dc:creator ?authorUri.                      	      ' +
						    '	?authorUri   foaf:name     ?authorName   .                                ' +
						    '}';
		    var  ajaxData ={ query : prefix + query };
			return ajaxData;
		},

        ModelCallBack : function(dataXML,conferenceUri,datasourceUri, currentUri){
			var result = $(dataXML).find("sparql > results > result").text();
			if( result != ""){
				var JSONfile = {};
				$(dataXML).find("sparql > results > result").each(function(i){  
					var JSONToken = {};
					JSONToken.authorUri =  $(this).find("[name = authorUri]").text();
					JSONToken.authorName =  $(this).find("[name = authorName]").text(); 	
					JSONfile[i] = JSONToken;
				});
				StorageManager.pushToStorage(currentUri,"getPublicationAuthor",JSONfile);
			}
		},
		
		ViewCallBack : function(parameters){
		
			var JSONdata = parameters.JSONdata;
			var conferenceUri = parameters.conferenceUri;
		
			if(JSONdata.getPublicationAuthor != null){
				
				var authorList = JSONdata.getPublicationAuthor;
				if(_.size(authorList) > 0 ){
					ViewAdapter.appendToBackboneView('<h2>Author</h2>');
					$.each(authorList, function(i,author){
						ViewAdapter.appendButton('#author/'+author.authorUri,author.authorName,{tiny:true});
					});
				}
			}
		}
    }, 
    
	/** Command used to get all session's sub event of a given event  **/
    getSessionSubEvent : {
	    dataType : "XML",
	    method : "GET", 
	    getQuery : function(parameters){

		    var conferenceUri = parameters.conferenceUri;
		
		    var prefix =	' PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#>   ' +
							'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>    ' +
						    ' PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>         ' ;
						
						
		    var query = 	'SELECT DISTINCT ?eventUri ?eventLabel  WHERE {                ' +
						    '	<'+parameters.uri+'> swc:isSuperEventOf  ?eventUri. ' +
							'	?eventUri  rdf:type 	swc:SessionEvent.                  ' +
						    '	OPTIONAL { ?eventUri rdfs:label ?eventLabel.} 			   ' +
							'} ORDER BY DESC(?eventLabel)';
							
			var  ajaxData = { query : prefix + query };
			return ajaxData;
		
	    },
	    
	    ModelCallBack : function(dataXML,conferenceUri,datasourceUri, currentUri){
			var result = $(dataXML).find("sparql > results > result").text();
			if( result != ""){
				var JSONfile = {};
				$(dataXML).find("sparql > results > result").each(function(i){  
					var JSONToken = {};
					JSONToken.eventUri =  $(this).find("[name = eventUri]").text();
					JSONToken.eventLabel =  $(this).find("[name = eventLabel]").text(); 	
					JSONfile[i] = JSONToken;
				});
				StorageManager.pushToStorage(currentUri,"getSessionSubEvent",JSONfile);
			}                                            
		
		},
		
		ViewCallBack : function(parameters){
			var JSONdata = parameters.JSONdata;
			var conferenceUri = parameters.conferenceUri;
			
			if(JSONdata != null){
				var subSessions = JSONdata.getSessionSubEvent;
				if(_.size(subSessions) > 0 ){
					ViewAdapter.appendToBackboneView('<h2>Sub tracks</h2>'); 
					$.each(subSessions, function(i,session){
						ViewAdapter.appendButton('#event/'+session.eventUri.replace(conferenceUri,""),session.eventLabel);
					});
				}
			}
		}
                                         
    },
	
		/** Command used to get all session's sub event of a given event  **/
    getTrackSubEvent : {
	    dataType : "XML",
	    method : "GET", 
	    getQuery : function(parameters){

		    var prefix =	' PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#>   ' +
							'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>     ' +
						    ' PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>         ' ;
						
						
		    var query = 	'SELECT DISTINCT ?eventUri ?eventLabel  WHERE {                ' +
						    '	<'+parameters.uri+'> swc:isSuperEventOf  ?eventUri. ' +
							'	?eventUri  rdf:type 	swc:TrackEvent.                    ' +
						    '	OPTIONAL { ?eventUri rdfs:label ?eventLabel.} 			   ' +
							'} ORDER BY DESC(?eventLabel)';
							
			var  ajaxData = { query : prefix + query };
			return ajaxData;
		
	    },
	    
	    ModelCallBack : function(dataXML,conferenceUri,datasourceUri, currentUri){
		
	        var result = $(dataXML).find("sparql > results > result").text();
			if( result != ""){
				var JSONfile = {};
				$(dataXML).find("sparql > results > result").each(function(i){  
					var JSONToken = {};
					JSONToken.eventUri =  $(this).find("[name = eventUri]").text();
					JSONToken.eventLabel =  $(this).find("[name = eventLabel]").text(); 	
					JSONfile[i] = JSONToken;
				});
				StorageManager.pushToStorage(currentUri,"getTrackSubEvent",JSONfile);
			}                                
		
		},
		
		ViewCallBack : function(parameters){
			var JSONdata = parameters.JSONdata;
			var conferenceUri = parameters.conferenceUri;
			if(JSONdata != null){
				var subTracks = JSONdata.getTrackSubEvent;
				if(_.size(subTracks) > 0 ){
					ViewAdapter.appendToBackboneView('<h2>Sub tracks</h2>'); 
					$.each(subTracks, function(i,track){
						ViewAdapter.appendButton('#event/'+track.eventUri.replace(conferenceUri,""),track.eventLabel);
					});
				}
			}
		}
                                         
    },
       
    /** Command used to get and display the name, the start and end time and location of a given event  **/ 
    getEvent : {
	    dataType : "XML",
	    method : "GET", 
	    getQuery : function(parameters){

		    var eventId = parameters.id;  
		    var conferenceUri = parameters.conferenceUri;
		
		    var prefix =	'PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#>                              ' +
						    'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>                                    ' +
						    'PREFIX ical: <http://www.w3.org/2002/12/cal/ical#>                                      ' ;
						
		    var query = 	'SELECT DISTINCT ?eventLabel ?eventLocation ?locationName ?eventStart ?eventEnd  WHERE { ' +
						    '	OPTIONAL { <'+conferenceUri+eventId+'> rdfs:label ?eventLabel.}                      ' +
						    '	OPTIONAL { <'+conferenceUri+eventId+'> swc:hasLocation ?eventLocation.               ' +
						    '	?eventLocation  rdfs:label ?locationName.'+'}                                        ' +
						    '	OPTIONAL { <'+conferenceUri+eventId+'> ical:dtStart ?eventStart.}                    ' +
						    '	OPTIONAL { <'+conferenceUri+eventId+'> ical:dtEnd ?eventEnd.}                        ' +
						    '}';
		    var  ajaxData = { query : prefix+query };
			return ajaxData;
		
	    },
	    ModelCallBack : function(dataXML,conferenceUri,datasourceUri, currentUri){
		
			var result = $(dataXML).find("sparql > results > result").text();
			if( result != ""){
				var JSONfile = {};
				$(dataXML).find("sparql > results > result").each(function(i){  
					var JSONToken = {};
					JSONToken.eventLabel =  $(this).find("[name = eventLabel]").text();
					JSONToken.eventLocation =  $(this).find("[name = eventLocation]").text(); 
					JSONToken.eventLocationName =  $(this).find("[name = locationName]").text();  
					JSONToken.eventStart =  $(this).find("[name = eventStart]").text(); 
					JSONToken.eventEnd =  $(this).find("[name = eventEnd]").text();
					JSONfile[i] = JSONToken;
				});
				StorageManager.pushToStorage(currentUri,"getEvent",JSONfile);
			}
		}, 

		ViewCallBack : function(parameters){
			var JSONdata = parameters.JSONdata;
			var conferenceUri = parameters.conferenceUri;

			if(JSONdata != null){
				var eventInfo = JSONdata.getEvent;
				if(_.size(eventInfo) > 0 ){
							  
					var eventLabel  = eventInfo[0].eventLabel;				
					var eventLocation  = eventInfo[0].eventLocation;	
					var locationName  = eventInfo[0].eventLocationName;	
					var eventStart  = eventInfo[0].eventStart;	
					var eventEnd  = eventInfo[0].eventEnd;
				
					if(eventEnd != ""){  
						ViewAdapter.prependToBackboneView('<p>Ends at : '+moment(eventEnd).format('MMMM Do YYYY, h:mm:ss a')+'</p>');  
					} 
					if(eventStart != ""){ 
						ViewAdapter.prependToBackboneView('<p>Starts at : '+moment(eventStart).format('MMMM Do YYYY, h:mm:ss a')+'</p>');
					}
					if(locationName != ""){ 
						ViewAdapter.prependToBackboneView('<p>Location : '+locationName+'</p>');   
					}
					if(eventLabel !=""){ 
						$("[data-role = page]").find("#DataConf").html(eventLabel);
					}			  
				}
			}
		}
    },

	/** Command used to get and display the documents linked to an event **/ 
    getEventPublications : {
	    dataType : "XML",
	    method : "GET", 
	    getQuery : function(parameters){
		    var conferenceUri = parameters.conferenceUri;
		
		    var prefix =	'PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#>    ' +
						    'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>          ' +
						    'PREFIX dc: <http://purl.org/dc/elements/1.1/>                 ' ;
						
		    var query = 	'SELECT DISTINCT ?publiUri ?publiTitle WHERE {                 ' +
							'	<'+parameters.uri+'> swc:isSuperEventOf  ?eventUri. ' +
						    '	?eventUri swc:hasRelatedDocument ?publiUri.                ' +
						    '	?publiUri dc:title ?publiTitle.                            ' +
						    '}';
		    var  ajaxData ={ query : prefix+query };
			return ajaxData;
		
	    },
	    ModelCallBack : function(dataXML,conferenceUri,datasourceUri, currentUri,callback){
			var result = $(dataXML).find("sparql > results > result").text();
			if( result != ""){
				var JSONfile = {};
				$(dataXML).find("sparql > results > result").each(function(i){  
					var JSONToken = {};
					JSONToken.publiUri =  $(this).find("[name = publiUri]").text();
					JSONToken.publiTitle =  $(this).find("[name = publiTitle]").text(); 	
					JSONfile[i] = JSONToken;
				});
				StorageManager.pushToStorage(currentUri,"getEventPublications",JSONfile);
				
			}
		},
		ViewCallBack : function(parameters){
			var JSONdata = parameters.JSONdata;
			var conferenceUri = parameters.conferenceUri;
			
			if(JSONdata != null){
				var publications = JSONdata.getEventPublications;
				if(_.size(publications) > 0 ){
					ViewAdapter.appendToBackboneView('<h2>Publications</h2>'); 
					$.each(JSONdata.getEventPublications, function(i,publication){
						$("[data-role = page]").find(".content").append($('<a href="#publication/'+publication.publiUri+'" data-role="button">'+publication.publiTitle+'</a>'));
	
					});
				}
			}
		}
    },
	
	/** Command used to get the track events of a given conference **/ 
    getConferenceMainTrackEvent : {
	    dataType : "XML",
	    method : "GET", 
	    getQuery : function(parameters){	
		    var conferenceUri = parameters.conferenceUri;
		    var prefix =	'PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#>   ' +
							'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>    ' +
						    'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>         ' ;
					     
		    var query = 	'SELECT DISTINCT ?eventUri ?eventLabel WHERE {                ' +
						    '	<'+conferenceUri+'> swc:isSuperEventOf  ?eventUri.        ' +
						    '	?eventUri rdf:type swc:TrackEvent.                        ' +
						    '	?eventUri rdfs:label ?eventLabel                          ' +
							'}';
		    var  ajaxData = { query : prefix+query };
			return ajaxData;
	    },
	    ModelCallBack : function(dataXML,conferenceUri,datasourceUri, currentUri){
			
			var result = $(dataXML).find("sparql > results > result").text();
			if( result != ""){
				var JSONfile = {};
				$(dataXML).find("sparql > results > result").each(function(i){  
					var JSONToken = {};
					JSONToken.eventLabel =  $(this).find("[name = eventLabel]").text();
					JSONToken.eventUri =  $(this).find("[name = eventUri]").text(); 	
					JSONfile[i] = JSONToken;
				});
				StorageManager.pushToStorage(currentUri,"getConferenceMainTrackEvent",JSONfile);
			}
		},
			
		ViewCallBack : function(parameters){
			
			var JSONdata = parameters.JSONdata;
			
			var conferenceUri = parameters.conferenceUri;
			var tracks = JSONdata.getConferenceMainTrackEvent;
			if(_.size(tracks) > 0 ) {
				ViewAdapter.appendToBackboneView('<h2>Browse conference tracks</h2> '); 
				$.each(tracks, function(i,track){
					$("[data-role = page]").find(".content").append($('<a href="#event/'+track.eventUri+'" data-role="button">'+track.eventLabel+'</a>'));
				});
			}
		}
    },
	
	/** Command used to get the Session events of a given conference that are not subEvent of any trackEvent**/ 
   /* getConferenceMainSessionEvent : {
	    dataType : "XML",
	    method : "GET", 
	    getQuery : function(parameters){	
		    var conferenceUri = parameters.conferenceUri;
		    var prefix =	'PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#>   ' +
						    'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>         ' ;
					     
		    var query = 	'SELECT DISTINCT ?eventUri ?eventLabel WHERE {                ' +
						    '	<'+conferenceUri+'> swc:isSuperEventOf  ?eventUri.        ' +
						    '	?eventUri rdf:type swc:SessionEvent.                      ' +
						    '	?eventUri rdfs:label ?eventLabel                          ' +
							'	OPTIONAL {?eventUri swc:isSubEventOf ?superEvent.  		  ' +
							'    ?superEvent    rdf:type   swc:TrackEvent. }              ' +
							'	FILTER (!BOUND(?superEvent))                              ' +
							'}';
		    var  ajaxData = { query : prefix+query };
			return ajaxData;
	    },
	    ModelCallBack : function(dataXML,conferenceUri){
			
		},
		
		ViewCallBack : function(parameters){
			var JSONdata = parameters.JSONdata;
			var conferenceUri = parameters.conferenceUri;
			var result = $(JSONdata).find("sparql > results> result").text();
			if( result != ""){
				$(dataXML).find("sparql > results > result").each(function(){                  
					var eventLabel  = $(this).find("[name = eventLabel]").text();
					var eventUri  = $(this).find("[name = eventUri]").text().replace(conferenceUri,""); 

					var title = $(this).next().find(":first-child").text();

					ViewAdapter.appendButton("#event/"+eventUri,eventLabel);
				});
			}
		}
    },*/
 
	/** Command used to get the keywords linked to a publication  **/ 
	getPublicationKeywords : {
		dataType : "XML",
		method : "GET",
		getQuery : function(parameters){

			var prefix = 	'PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#>  ' +
							'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>        ' +
							'PREFIX dc: <http://purl.org/dc/elements/1.1/>               ' +
							'PREFIX swrc: <http://swrc.ontoware.org/ontology#>           ' +
							'PREFIX foaf: <http://xmlns.com/foaf/0.1/>                   ' ;

			var query =  'SELECT DISTINCT ?keyword ?publiTitle  WHERE { ' +
						'	<'+parameters.uri+'>   dc:title  ?publiTitle. ' +
						' 	<'+parameters.uri+'>      dc:subject     ?keyword .                          ' +
						'}';

			var  ajaxData = { query : prefix + query };
			return ajaxData;
		},
		ModelCallBack : function(dataXML,conferenceUri,datasourceUri, currentUri){
				
			var result = $(dataXML).find("sparql > results > result").text();
			if( result != ""){
				var JSONfile = {};
				$(dataXML).find("sparql > results > result").each(function(i){  
					var JSONToken = {};
					JSONToken.keyword =  $(this).find("[name = keyword]").text();
					JSONfile[i] = JSONToken;
				});
				StorageManager.pushToStorage(currentUri,"getPublicationKeywords",JSONfile);
			}
		},
		
		ViewCallBack : function(parameters){
		
			var JSONdata = parameters.JSONdata;
			
			var conferenceUri = parameters.conferenceUri;
	
			if(JSONdata.hasOwnProperty("getPublicationKeywords")){
				var keywordList = JSONdata.getPublicationKeywords;
				if(_.size(keywordList) > 0 ){
					ViewAdapter.appendToBackboneView('<h2>Keywords</h2> ');
					$.each(keywordList, function(i,keyword){
				
						$("[data-role = page]").find(".content").append($('<a href="#keyword/'+keyword.keyword.split(' ').join('_')+'" data-role="button" data-inline="true">'+keyword.keyword+'</a>'));

					});
				}
			}
		}
	} ,
	
	/** Command used to get all publications linked to a keyword  **/ 
	getPublicationsByKeyword : {
		dataType : "XML",
		method : "GET",
		getQuery : function(parameters){
			var conferenceUri = parameters.conferenceUri;  
			var keyword = parameters.uri.split('_').join(' ');
			
			var prefix =   	'PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#> PREFIX foaf: <http://xmlns.com/foaf/0.1/>   ' +
							'PREFIX dc: <http://purl.org/dc/elements/1.1/>                                                          ' ;
			var query =   	'SELECT DISTINCT ?publiUri ?publiTitle  WHERE {                                 ' +
							'    ?publiUri       swc:isPartOf  <'+conferenceUri+'/proceedings>.            ' +
							'    ?publiUri       dc:subject     "'+keyword+'".                              ' +
							'    ?publiUri       dc:title     ?publiTitle.                                  ' +
							'}ORDER BY ASC(?publiTitle) ';
			var  ajaxData = { query : prefix + query };
			return ajaxData;
		},
		ModelCallBack : function(dataXML,conferenceUri,datasourceUri, currentUri){ 
			var result = $(dataXML).find("sparql > results > result").text();
			if( result != ""){
				var JSONfile = {};
				$(dataXML).find("sparql > results > result").each(function(i){  
					var JSONToken = {};
					JSONToken.publiUri =  $(this).find("[name = publiUri]").text();
					JSONToken.publiTitle =  $(this).find("[name = publiTitle]").text(); 	
					JSONfile[i] = JSONToken;
				});
				StorageManager.pushToStorage(currentUri,"getPublicationsByKeyword",JSONfile);
			}
		},
		
		ViewCallBack : function(parameters){
			var JSONdata = parameters.JSONdata;
			var conferenceUri = parameters.conferenceUri;
			if(JSONdata.hasOwnProperty("getPublicationsByKeyword")){
				var publiList = JSONdata.getPublicationsByKeyword;
				if(_.size(publiList) > 0 ){
					ViewAdapter.appendToBackboneView('<h2>Publications</h2> '); 
					$.each(publiList, function(i,publi){

						$("[data-role = page]").find(".content").append($('<a href="#publication/'+publi.publiUri+'" data-role="button">'+publi.publiTitle+'</a>'));

					});

				}
			}
		}
	 }  ,
	
	/** Command used to get the organizations linked to an author  **/ 
	getAuthorOrganization : {
		dataType : "XML",
		method : "GET",
		getQuery : function(parameters){
			var conferenceUri = parameters.conferenceUri;
			var prefix =	'PREFIX foaf: <http://xmlns.com/foaf/0.1/>                   ' ;

			var query = 	'SELECT DISTINCT ?OrganizationName ?OrganizationUri  ?authorName WHERE {  ' +
							'  <'+parameters.uri+'>    foaf:name  ?authorName.           ' +
							'   ?OrganizationUri       foaf:member  <'+parameters.uri+'> .'+
							'   ?OrganizationUri       foaf:name   ?OrganizationName.    ' +
							'}';
												
			var  ajaxData = { query : prefix + query };
			return ajaxData;
		},

		ModelCallBack : function(dataXML,conferenceUri,datasourceUri, currentUri){
			var result = $(dataXML).find("sparql > results > result").text();
			if( result != ""){
				var JSONfile = {};
				$(dataXML).find("sparql > results > result").each(function(i){  
					var JSONToken = {};
					JSONToken.OrganizationName =  $(this).find("[name = OrganizationName]").text();
					JSONToken.OrganizationUri =  $(this).find("[name = OrganizationUri]").text(); 	
					JSONToken.authorName =  $(this).find("[name = authorName]").text();
					JSONfile[i] = JSONToken;
				});
				StorageManager.pushToStorage(currentUri,"getAuthorOrganization",JSONfile);
			}
		},
		
		ViewCallBack : function(parameters){
			var JSONdata = parameters.JSONdata;
			var conferenceUri = parameters.conferenceUri;
			if(JSONdata.hasOwnProperty("getAuthorOrganization")){
				var organizationList = JSONdata.getAuthorOrganization;
				if(_.size(organizationList) > 0 ){
					ViewAdapter.appendToBackboneView('<h2>Organizations</h2>');
					$.each(organizationList, function(i,organization){

						$("[data-role = page]").find(".content").append($('<a href="#organization/'+organization.OrganizationUri+'" data-role="button"  data-inline="true">'+organization.OrganizationName+'</a>'));

					});

				}
			}
		}

	},
		
	
    /** Command used to get and display all members linked to an organization   **/                  
	getOrganization : {
		dataType : "XML",
		method : "GET",
		getQuery : function(parameters){
			
			var organizationUri = parameters.id;
			var prefix =	' PREFIX foaf: <http://xmlns.com/foaf/0.1/>                          ' ;
			var query =  	' SELECT DISTINCT ?MemberName ?MemberUri ?organizationName  WHERE {   ' +
							'    <'+organizationUri+'>   foaf:name  ?organizationName .   ' +															   
							'  <'+organizationUri+'>  foaf:member ?MemberUri.      		             ' +
							'   ?MemberUri         foaf:name   ?MemberName.     	             ' +
							'}';   															 
			var  ajaxData = { query : prefix + query };
			return ajaxData;
		},
		ModelCallBack : function(dataXML,conferenceUri,datasourceUri, currentUri){
			
		},
		
		ViewCallBack : function(parameters){
			var JSONdata = parameters.JSONdata;
			var conferenceUri = parameters.conferenceUri;
			var result = $(JSONdata).find("sparql > results> result").text();
			if( result != ""){
				$("[data-role = page]").find(".content").append($('<h2>Members</h2>')).trigger("create");
				$(dataXML).find("sparql > results > result").each(function(){                  
					var OrganizationUri  = $(this).find("[name = OrganizationUri]").text().replace(conferenceUri,"");	
					var memberName  = $(this).find("[name = MemberName]").text();
					ViewAdapter.appendButton('#author/'+memberName.split(' ').join('_'),memberName,{tiny:true}); 
				});            
			}
		}
	},

    /**********************                           GRAPH QUERY SECTION (pending....)                      *****************/
    getRdfGraphFromPublicationTitle : {
        dataType : "XML",
        method : "GET",
        getQuery : function(parameters){
		     
            var publiUri = parameters.id; 
		    var prefix =	' PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#>' +
						    ' PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>      ' +
						    ' PREFIX dc: <http://purl.org/dc/elements/1.1/>             ' +
						    ' PREFIX swrc: <http://swrc.ontoware.org/ontology#>         ' +
						    ' PREFIX foaf: <http://xmlns.com/foaf/0.1/>            		' ;
						
		    var query =		'SELECT DISTINCT ?publiTitle WHERE   ' +
						    '{ <'+publiUri+'>  dc:title  ?publiTitle.' + 
						    ' } ' ;
		    var  ajaxData ={ query : prefix+query };
			return ajaxData;
		},
      
       
        ModelCallBack : function(dataXML,conferenceUri,queryUrl){
       
        },
		
		ViewCallBack : function(id,conferenceUri){
				//Pick up data in local storage
				var JSONdata = getFromLocalStorage(id);
				var result = $(dataXML).find("sparql > results> result");
			 if( result.text() != ""){
				 var graph=new ViewAdapter.Graph(queryUrl,SWDFCommandStore.getRdfLink,conferenceUri); 
				 graph.showGraph( result.find("[name = publiUri]").text()  );
			 }
		}
    
    },
	
	
     getRdfLink : {
        dataType : "XML",
        method : "GET",
        getQuery : function(parameters){
       
            var entity = parameters.entity; 
			var prefix = ' PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#>' +
          ' PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>      ' +
          ' PREFIX dc: <http://purl.org/dc/elements/1.1/>             ' +
          ' PREFIX swrc: <http://swrc.ontoware.org/ontology#>         ' +
          ' PREFIX foaf: <http://xmlns.com/foaf/0.1/>              ' ;
      
      var query =  'SELECT DISTINCT ?link ?to  WHERE  { ' +
          '<'+entity+'> ?link  ?to.' +  
          ' } ' ;
           
          var  ajaxData = { query : prefix+query };
      return ajaxData;
            },
                          
    }
};
    ///////////////// STORAGE SAVER ///////////////
    
	// Changes XML to JSON
