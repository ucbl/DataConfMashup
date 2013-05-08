/**   
*	Copyright <c> Claude Bernard - University Lyon 1 -  2013
* 	License : This file is part of the DataConf application, which is licensed under a Creative Commons Attribution-NonCommercial 3.0 Unported License. See details at : http://liris.cnrs.fr/lionel.medini/wiki/doku.php?id=dataconf&#licensing 
*   Author: Lionel MEDINI(supervisor), Florian BACLE, Fiona LEPEUTREC, Benoît DURANT-DE-LA-PASTELLIERE, NGUYEN Hoang Duy Tan
*   Description: This object contains a json definition of all the commands that will prepare all the queries we want to send on the SemanticWebDogFood sparql endpoint.
*				 Each one of those commands declare the datatype, the method, the query string it is supposed to use on the endpoint and provide a model Callback to store results, a view CallBack to render data stored.		
*				 To declare a request, each commands can use the parameters declared for the route they are called in (see Configuration.js). Those parameters can be a name, an uri or both and represents
*				 the entity which we want informations on. After calling a command, the results are stored using the localStorageManager (see localStorage.js) and rendered when needed. It is the role of the router to call those commands according to the configuration file.
*   Version: 1.1
*   Tags:  JSON, SPARQL, AJAX
**/

var swcEventCommandStore = { 
    
    
	
	/** Command used to get the track events of a given conference **/ 
    getConferenceMainTrackEvent : {
	    dataType : "JSONP",
	    method : "GET", 
	    getQuery : function(parameters){	
	    
		    var conferenceUri = parameters.conferenceUri;
	      var ajaxData = { category_id : 2} ;
	      return ajaxData; 
		     
	    },
	    
	    ModelCallBack : function(dataXML,conferenceUri,datasourceUri, currentUri){
			var JSONfile = {};
			$(dataXML).each(function(i){  
				var JSONToken = {};
				JSONToken.eventLabel =  this.name
				for(var j=0;j<this.xproperties.length;j++){
				  if(this.xproperties[j].xNamespace=='event_uri')JSONToken.eventUri =  this.xproperties[j].xValue;
				}
				JSONfile[i] = JSONToken;
			});
				console.log(JSONfile);
			StorageManager.pushCommandToStorage(currentUri,"getConferenceMainTrackEvent",JSONfile);
			return JSONfile;
			
		},
			
		ViewCallBack : function(parameters){
		
			//Reasoner.getMoreSpecificKeywords();
			if(parameters.JSONdata != null){
				if(_.size(parameters.JSONdata) > 0 ){
					if(ViewAdapter.mode == "text"){
						
						parameters.contentEl.append('<h2>Browse conference tracks</h2>'); 
						ViewAdapter.Text.appendList(parameters.JSONdata,
												 {baseHref:'#event/',
												  hrefCllbck:function(str){return Encoder.encode(str["eventUri"])},
												  },
												 "eventLabel",
												 parameters.contentEl,
												 {type:"Node",labelCllbck:function(str){return "Track : "+str["eventLabel"];}});
					}else{ 
						ViewAdapter.Graph.appendList(parameters.JSONdata,
											 {baseHref:'#event/',
											  hrefCllbck:function(str){return Encoder.encode(str["eventUri"])},
											  },
											 "eventLabel",
											 parameters.contentEl,
											 {type:"Node",
											  labelCllbck:function(str){return "Track : "+str["eventLabel"];},
											  option:{color:"#3366CC"},
											 }); 
					}

				}
			} 
		}
    },
    
    /** Command used to get and display the name, the start and end time and location of a given event  **/ 
    getEvent : {
	    dataType : "JSONP",
	    method : "GET", 
	    getQuery : function(parameters){	
	    
		    var conferenceUri = parameters.conferenceUri;
	      var ajaxData = { "xproperty_namespace" : "event_uri","xproperty_value" : parameters.uri} ; 
	      return ajaxData; 
		      
	    },
	    
	    ModelCallBack : function(dataXML,conferenceUri,datasourceUri, currentUri){
			  var JSONfile = {}; 
			  dataXML=dataXML[0];
			  if(!dataXML)return JSONfile;
			  
			  console.log(dataXML);
				JSONfile.eventLabel = (dataXML.name?dataXML.name:"");
				JSONfile.eventDescription =  (dataXML.description?dataXML.description:"");
				JSONfile.eventAbstract =  (dataXML.comment?dataXML.comment:""); 
				JSONfile.eventStart = (dataXML.start_at!= '1980-01-01 00:00'?dataXML.start_at:"");
				JSONfile.eventEnd = (dataXML.end_at!= '1980-01-01 00:00'?dataXML.end_at:"");
				JSONfile.eventLocationName =  (dataXML.location.name?dataXML.location.name:"") ;
				
			  StorageManager.pushCommandToStorage(currentUri,"getEvent",JSONfile);
			  return JSONfile;
			
		}, 

		ViewCallBack : function(parameters){
			var JSONdata = parameters.JSONdata;
			var conferenceUri = parameters.conferenceUri;

			if(parameters.JSONdata != null){
				
				var eventInfo = parameters.JSONdata;
					
				if(_.size(eventInfo) > 0 ){
					if(ViewAdapter.mode == "text"){
								  
						var eventLabel  = eventInfo.eventLabel;				
						var eventLocation  = eventInfo.eventLocation;
						var eventDescription  = eventInfo.eventDescription;
						var eventAbstract  = eventInfo.eventAbstract;							
						var locationName  = eventInfo.eventLocationName;	
						var eventStart  = eventInfo.eventStart;	
						var eventEnd  = eventInfo.eventEnd;
					
						if(eventDescription != ""){ 
							parameters.contentEl.append($('<h2>Description</h2>')); 
							parameters.contentEl.append($('<p>'+eventDescription+'</p>'));   
						}
						if(eventAbstract != ""){ 
							parameters.contentEl.append($('<h2>Abstract</h2>')); 
							parameters.contentEl.append($('<p>'+eventAbstract+'</p>'));   
						}
						if(eventStart != ""){ 
							parameters.contentEl.append($('<p>Starts at : '+moment(eventStart).format('MMMM Do YYYY, h:mm:ss a')+'</p>'));
						}
						if(eventEnd != ""){
							parameters.contentEl.append($('<p>Ends at : '+moment(eventEnd).format('MMMM Do YYYY, h:mm:ss a')+'</p>'));  
						} 
						if(locationName != ""){ 
							parameters.contentEl.append($('<p>Location : '+locationName+'</p>'));   
						}
						if(eventLabel !=""){ 
							$("[data-role = page]").find("#DataConf").html(eventLabel);
						}
					}else{
								  
						var eventLabel  = eventInfo.eventLabel;				
						var eventLocation  = eventInfo.eventLocation;
						var eventDescription  = eventInfo.eventDescription;
						var eventAbstract  = eventInfo.eventAbstract;							
						var locationName  = eventInfo.eventLocationName;	
						var eventStart  = eventInfo.eventStart;	
						var eventEnd  = eventInfo.eventEnd;
					
						if(eventDescription != ""){ 
							ViewAdapter.Graph.addLeaf("Description :"+eventDescription);
						}
						if(eventAbstract != ""){ 
							ViewAdapter.Graph.addLeaf("Abstract :"+eventAbstract);
						}
						if(eventStart != ""){ 
							ViewAdapter.Graph.addLeaf("Starts at :"+moment(eventStart).format('MMMM Do YYYY, h:mm:ss a'));
						}
						if(eventEnd != ""){
							ViewAdapter.Graph.addLeaf("Ends at :"+moment(eventEnd).format('MMMM Do YYYY, h:mm:ss a'));
						} 
						if(locationName != ""){ 
							ViewAdapter.Graph.addLeaf("Location :"+locationName);
						}
						if(eventLabel !=""){ 
							ViewAdapter.Graph.addLeaf("Label :"+eventLabel);
							$("[data-role = page]").find("#DataConf").html(eventLabel);
						}
						
					}
				}
				
			}
		}
    },
    

		/** Command used to get all session's sub event of a given event  **/
    getTrackSubEvent : {
	    dataType : "JSONP",
	    method : "GET", 
	    getQuery : function(parameters){	
	    
		    var conferenceUri = parameters.conferenceUri; 
	      var ajaxData = { "parent_xproperty_value" : parameters.uri,'category_id': 2 } ; 
	      return ajaxData; 
		      
	    }, 
	    
	    
	    ModelCallBack : function(dataXML,conferenceUri,datasourceUri, currentUri){
			var JSONfile = {};
			$(dataXML).each(function(i){  
				var JSONToken = {};
				JSONToken.eventLabel =  this.name
				for(var j=0;j<this.xproperties.length;j++){
				  if(this.xproperties[j].xNamespace=='event_uri')JSONToken.eventUri =  this.xproperties[j].xValue;
				}
				JSONfile[i] = JSONToken;
			});
				console.log(JSONfile);
			StorageManager.pushCommandToStorage(currentUri,"getTrackSubEvent",JSONfile);
			return JSONfile;
			
		},
		
		 
		
		ViewCallBack : function(parameters){
			if(parameters.JSONdata != null){
				if(_.size(parameters.JSONdata) > 0 ){
					
					if(ViewAdapter.mode == "text"){
						parameters.contentEl.append($('<h2>Sub tracks</h2>')); 
						$.each(parameters.JSONdata, function(i,track){
							ViewAdapter.Text.appendButton(parameters.contentEl,'#event/'+Encoder.encode(track.eventUri),track.eventLabel);
						});
					}else{
						$.each(parameters.JSONdata, function(i,track){
							ViewAdapter.Graph.addNode("Sub track : "+track.eventLabel,'#event/'+Encoder.encode(track.eventUri),{color:"#003399"});
						});
					
					}
				}
			}
		}
                                         
    },  
  
	/** Command used to get and display the documents linked to an event **/ 
    getEventPublications : {
	    dataType : "JSONP",
	    method : "GET", 
	    getQuery : function(parameters){	
	    
		    var conferenceUri = parameters.conferenceUri; 
	      var ajaxData = { "parent_xproperty_value" : parameters.uri} ; 
	      return ajaxData; 
		      
	    },  
	    ModelCallBack : function(dataXML,conferenceUri,datasourceUri, currentUri){
			var JSONfile = {};
			$(dataXML).each(function(i){  
				var JSONToken = {};
				JSONToken.eventLabel =  this.name
				for(var j=0;j<this.xproperties.length;j++){
				  if(this.xproperties[j].xNamespace=='publication_uri'){
				      if (/[a-zA-Z]/.test(this.xproperties[j].xKey)) {
                  JSONToken.publiUri =  this.xproperties[j].xValue; 
                  JSONToken.publiTitle =  this.xproperties[j].xKey; 
				          JSONfile[i] = JSONToken;
              }
          }
				}
			});
				console.log(JSONfile);
			StorageManager.pushCommandToStorage(currentUri,"getEventPublications",JSONfile);
			return JSONfile;
			
		}, 
		ViewCallBack : function(parameters){

			if(parameters.JSONdata != null){
				if(_.size(parameters.JSONdata) > 0 ){
					if(ViewAdapter.mode == "text"){
						parameters.contentEl.append($('<h2>Publications</h2>')); 
						ViewAdapter.Text.appendList(parameters.JSONdata,
											 {baseHref:'#publication/',
											  hrefCllbck:function(str){return Encoder.encode(str["publiTitle"])+'/'+Encoder.encode(str["publiUri"])},
											  },
											 "publiTitle",
											 parameters.contentEl,
											 {type:"Node",labelCllbck:function(str){return "Publication : "+str["publiTitle"];}});
					}else{
						ViewAdapter.Graph.appendList(parameters.JSONdata,
											 {baseHref:'#publication/',
											  hrefCllbck:function(str){return Encoder.encode(str["publiTitle"])+'/'+Encoder.encode(str["publiUri"])},
											  },
											 "publiTitle",
											 parameters.contentEl,
											 {type:"Node",labelCllbck:function(str){return "Publication : "+str["publiTitle"];}});
					
					}
				}
			} 
		}
    },
	
	
	/** Command used to get the session events of a given publication **/ 
    getEventRelatedPublication : {
	    dataType : "JSONP",
	    method : "GET", 
	    getQuery : function(parameters){	
	    
		    var conferenceUri = parameters.conferenceUri; 
	      var ajaxData = { "child_xproperty_value" : parameters.uri} ; 
	      return ajaxData; 
		      
	    },   
	    ModelCallBack : function(dataXML,conferenceUri,datasourceUri, currentUri){
			var JSONfile = {};
			$(dataXML).each(function(i){  
				var JSONToken = {};
				JSONToken.eventLabel =  this.name
				for(var j=0;j<this.xproperties.length;j++){
				  if(this.xproperties[j].xNamespace=='event_uri'){
				                    JSONToken.eventUri =  this.xproperties[j].xValue;  
          }
				}
				JSONfile[i] = JSONToken;
			});
				console.log(JSONfile);
			StorageManager.pushCommandToStorage(currentUri,"getTrackSubEvent",JSONfile);
			return JSONfile;
			
		},   
		ViewCallBack : function(parameters){
			if(parameters.JSONdata != null){
				if(_.size(parameters.JSONdata) > 0 ){
					if(ViewAdapter.mode == "text"){
					
						parameters.contentEl.append($('<h2>Related Sessions :</h2>')); 
						ViewAdapter.Text.appendList(parameters.JSONdata,
											 {baseHref:'#event/',
											  hrefCllbck:function(str){return Encoder.encode(str["eventUri"])},
											  },
											 "eventLabel",
											 parameters.contentEl,
											 {type:"Node",labelCllbck:function(str){return "presentation : "+str["eventLabel"];}});

					}else{
						ViewAdapter.Graph.appendList(parameters.JSONdata,
											 {baseHref:'#event/',
											  hrefCllbck:function(str){return Encoder.encode(str["eventUri"])},
											  },
											 "eventLabel",
											 parameters.contentEl,
											 {type:"Node",labelCllbck:function(str){return "presentation : "+str["eventLabel"];}});
					}
				}
			} 
		}
    },
   
};
 

