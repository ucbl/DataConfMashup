  /**   
 *   Copyright <c> Claude Bernard - University Lyon 1 -  2013
 *   Author: Lionnel MEDINI(supervisor), Florian BACLE, Fiona LEPEUTREC, Beno�t DURANT-DE-LA-PASTELLIERE, NGUYEN Hoang Duy Tan
 *   Description: Interface of a Datasource model
 *   Version: 1
 *   Tags:  
 **/
//SWDF commands file
//First Part SWDF commands file, Second Part : ModelCallBack function definition 

var SWDFCommandStore = {};  
 
 
 //Command getAuthorSuggestion 
  SWDFCommandStore.getAuthorSuggestion = {
                                  name: "getAuthorSuggestion",
                                  dataType : "XML",
                                  method : "GET",
                                  getQuery : function(parameters){ //JSON file parameters 
                                                var trackUri = parameters.trackUri;
												alert("pop");
                                                var author = parameters.author;
                                                var query = 'SELECT DISTINCT ?name WHERE  { '+
                                                            '   ?author foaf:name ?name.         '+
                                                            '   ?author foaf:made ?uriPaper.     '+
                                                            '   ?uriPaper swc:isPartOf  <'+trackUri+'>.'+
                                                            '   FILTER REGEX( ?name , "'+ author +'","i").'+
                                                            ' } LIMIT 5 ';
                                                   return query ; 
                                           },
                                  ModelCallBack : "TODO",
                                     
                                  }
 /*
 //Command getKeywordSuggestion      
 var getKeywordSuggestion = SWDFCommandStore.getKeywordSuggestion = {
                                  name: "getAuthorSuggestion",
                                  dataType : "XML",
                                  method : "GET",
                                  getQuery : function(parameters){ //JSON file parameters 
                                                var trackUri = parameters.trackUri;
                                                var keyword = parameters.keyword;  
                                                return  ' PREFIX key:<http://www.w3.org/2004/02/skos/core#> ' 
                                                              +
                                                             '  SELECT DISTINCT ?keyword WHERE {{ ' +
                                                             '  	 ?uriPaper       swc:isPartOf  <'+ trackUri+'> .' +
                                                             '  	 ?uriPaper       foaf:topic    ?uriKeywork.         ' +
                                                             '  	 ?uriKeywork     key:prefLabel ?keywork. 	         ' +
                                                             '           FILTER REGEX(?keywork , "'+ keyword +'","i").'+
                                                             ' } UNION '+
                                                             ' {       '+
                                                             '  	       ?uriPaper       swc:isPartOf  <'+trackUri+'> .' +
                                                             '           ?uriPaper       dc:subject    ?keywork.      '+
                                                             '           FILTER REGEX( ?keywork , "'+ keyword +'","i").'+
                                                             ' }} LIMIT 5 '; 
                                              },
                                   ModelCallBack : "TODO"
                                  }
                                  
 //Command getTitleSuggestion       
var getTitleSuggestion = SWDFCommandStore.getTitleSuggestion= {
                                  name: "getTitleSuggestion",
                                  dataType : "XML",
                                  method : "GET",
                                  getQuery : function(parameters){ //JSON file parameters 
                                                var trackUri = parameters.trackUri;
                                                var title = parameters.title;  
                                                var query = '  SELECT DISTINCT ?title WHERE {   ' +
                                                            '  	 ?uriPaper swc:isPartOf  <'+trackUri+'> .' +
                                                            '  	 ?uriPaper dc:title     ?title.         ' +
                                                            '   FILTER REGEX( ?title , "'+ title +'","i").'+
                                                            ' } LIMIT 5 ';
                                                    return query;
                                                 },
                                  ModelCallBack : "TODO"
                                  }
                                  

 //Command getPosterSearchByKeyword       
var getPosterSearchByKeyword = SWDFCommandStore.getPosterSearchByKeyword = {
                                  name: "getPosterSearchByKeyword",
                                  dataType : "XML",
                                  method : "GET",
                                  getQuery : function(parameters){ //JSON file parameters 
                                                var trackUri = parameters.trackUri;
                                                var keyword = parameters.keyword;  
                                                var query ='	PREFIX key: <http://www.w3.org/2004/02/skos/core#> ' +
                                                           '  SELECT DISTINCT ?uriPaper ?title  WHERE { {  ' +
                                                           '           ?uriPaper swc:isPartOf  <'+trackUri+'> .' +
                                                           '           ?uriPaper   dc:title     ?title.         ' +
                                                           '  	 ?uriPaper   foaf:topic    ?uriKeywork.         ' +
                                                           '  	 ?uriKeywork key:prefLabel ?keywork. 	         ' +
                                                           '           FILTER REGEX( ?keywork , "'+ keyword +'","i").'+
                                                           ' } UNION '+
                                                           ' { ' +
                                                           '  	 ?uriPaper   swc:isPartOf  <'+trackUri+'> .' +
                                                           '           ?uriPaper   dc:title     ?title.         ' +
                                                           '           ?uriPaper   dc:subject    ?keywork.      '+
                                                           '           FILTER REGEX( ?keywork , "'+ keyword +'","i").'+
                                                           ' }} ';
                                                           return query;
                                               },
                                  ModelCallBack : getPosterSearchByKeywordByAuthorByTitle,
                                  }
                             
//Command getPosterSearchByTitle                                 
var getPosterSearchByTitle = SWDFCommandStore.getPosterSearchByTitle = {
                                  name: "getPosterSearchByTitle",
                                  dataType : "XML",
                                  method : "GET",
                                  getQuery : function(parameters){ //JSON file parameters 
                                                var trackUri = parameters.trackUri;
                                                var title = parameters.title;  
                                                var query = '  SELECT DISTINCT ?uriPaper ?title WHERE {   ' +
                                                            '  	 ?uriPaper swc:isPartOf  <'+trackUri+'> .' +
                                                            '  	 ?uriPaper dc:title     ?title.         ' +
                                                            '   FILTER REGEX( ?title , "'+ title +'","i").'+
                                                            ' } ' ;
                                                         return query;
                                              },
                                  ModelCallBack : getPosterSearchByKeywordByAuthorByTitle
                                  }
                                  
                                  
//Command getPosterSearchByAuthor                                 
var getPosterSearchByAuthor = SWDFCommandStore.getPosterSearchByAuthor = {
                                  name: "getPosterSearchByAuthor",
                                  dataType : "XML",
                                  method : "GET",
                                  getQuery : function(parameters){ //JSON file parameters 
                                                var trackUri = parameters.trackUri;
                                                var author = parameters.keyword;  
                                                var query ='SELECT DISTINCT ?uriPaper ?title  WHERE  {     '+
                                                           '   ?author foaf:name "'+ author +'".         '+
                                                           '   ?author foaf:made ?uriPaper.     '+
                                                           '   ?uriPaper swc:isPartOf  <'+trackUri+'>.      '+
                                                           '   ?uriPaper dc:title     ?title.         ' +
                                                           ' } ';
                                                           return query;
                                               },
                                  ModelCallBack : getPosterSearchByKeywordByAuthorByTitle
                                  }
                                  
                    /*              
//Command getAuthorSearchByName                               
getAuthorSearchByName :     new Command({
                                  name: "getAuthorSearchByName",
                                  dataType : "XML",
                                  method : "GET",
                                  getQuery : function(parameters){ //JSON file parameters 
                                                var trackUri = parameters.trackUri;
                                                var author = parameters.author;  
                                                var query = 'SELECT DISTINCT ?uriAuthor ?name WHERE  {     '+
                                                            '   ?uriAuthor foaf:name ?name.         '+
                                                            '   ?uriAuthor foaf:made ?uriPaper.     '+
                                                            '   ?uriPaper  swc:isPartOf  <'+trackUri+'> .     '+      
                                                            '   FILTER REGEX( ?name , "'+ author +'","i").'+
                                                                 ' } ';
                                                                 return query;
                                              },
                                  ModelCallBack : getAuthorSearchByName
                                  })
                                  
 ,                                 /*
//Command getPaper                               
getPaper :                  new Command({
                                  name: "getPaper",
                                  dataType : "XML",
                                  method : "GET",
                                  getQuery : function(parameters){ //JSON file parameters 
                                                var uriPaper = parameters.uriPaper;
                                                var query ='SELECT DISTINCT ?Title  ?Abstract ?PDF  ?Author ?uriAuthor ?Keyword ?KeywordLabel WHERE  ' +
                                                           '{{ <'+ uriPaper +'>  dc:title      ?Title;    ' +
                                                           '   swrc:abstract ?Abstract. ' +
                                                           '   OPTIONAL {  '+
                                                           '              <'+ uriPaper +'> owl:sameAs    ?uirPosterWWW2012 .  '+
                                                           '              ?uirPosterWWW2012 iswm:hasPDF     ?PDF   .  '+
                                                           '                     }   ' +
                                                           ' } ' +
                                                           'UNION ' +
                                                           ' { <'+ uriPaper +'> dc:creator    ?uriAuthor. ' +
                                                           '     ?uriAuthor    foaf:name     ?Author   . ' +
                                                           ' } ' +
                                                                                   'UNION ' +
                                                           ' { ' +
                                                           '     <'+ uriPaper +'> dc:subject    ?KeywordLabel. ' +
                                                           ' } ' +
                                                           'UNION ' +
                                                           ' {   <'+ uriPaper +'> foaf:topic    ?Keyword. ' +
                                                           '     ?Keyword         rdfs:label    ?KeywordLabel. ' +
                                                           ' }} ' ;
                                                           return query;
                                                 },
                                  ModelCallBack : getPaperModelCallBack
                                  })
                                  
 ,     */                            
//Command getAuthor                                
SWDFCommandStore.getAuthor = {
                                  name: "getAuthor",
                                  dataType : "XML",
                                  method : "GET",
                                  getQuery : function(parameters){ //JSON file parameters 
												//alert(parameters.trackUri); 
                                                var trackUri = parameters.trackUri;
                                                var uriAuthor = parameters.uriAuthor;  
                                                var query =' SELECT DISTINCT ?Publication ?uriPublication ?keywordLabel ?PDF ?Organization ?uriOrganization WHERE {     ' +
                                                           ' { ' +
                                                           '   ?uriOrganization       foaf:member <'+ uriAuthor +'>  . '  +
                                                           '   ?uriOrganization       foaf:name   ?Organization .      '  +
                                                           ' } UNION ' 							+       // Auhtor's publication 
                                                           ' { ' +
                                                           '   ?uriPublication    swc:isPartOf  <'+trackUri+'> ;  ' +
                                                           '                      foaf:maker    <'+ uriAuthor +'> ;          ' +
                                                           ' 			dc:title      ?Publication .               ' + // Auhtor's publication 
                                                           '   OPTIONAL {  '+
                                                           '              ?uriPublication       owl:sameAs    ?uirPosterWWW2012 .  '+
                                                           '              ?uirPosterWWW2012     iswm:hasPDF     ?PDF   .  '+
                                                           '             }  '+
                                                           ' } UNION ' +
                                                           ' { ' +
                                                           '   ?uri               swc:isPartOf  <'+trackUri+'> ;  ' +  // a poster has many keywords...
                                                           '                      foaf:maker    <'+ uriAuthor +'> ;          ' +
                                                           '                      dc:subject    ?keywordLabel .              ' +  // Recommendation 
                                                           ' }} ORDER BY ?Organization ';
                                                           console.log(query);
                                                           return query;
                                                    },
                                  ModelCallBack : getAuthorModelCallBack
                                  }
                                  
                              /*
 //Command getOrganization                               
getOrganization : 			new Command({
                                  name: "getOrganization",
                                  dataType : "XML",
                                  method : "GET",
                                  getQuery : function(parameters){ //JSON file parameters 
                                                var uriOrganization = parameters.uriOrganization;
                                                var query =' SELECT DISTINCT ?Member ?UriPerson ?Name WHERE {      '+
                                                           ' {   																 '+
                                                           '   <'+uriOrganization+'> foaf:member ?UriPerson.      			 '+
                                                           '    ?UriPerson           foaf:name   ?Member.     				 '+
                                                           ' }     															 '+
                                                           ' UNION 															 '+
                                                           ' {     															 '+
                                                           '   <'+uriOrganization+'> foaf:name   ?Name.                        '+
                                                           ' }} ';
                                                           return query;
                                                     },
                                  ModelCallBack : getOrganizationModelCallBack
                                  })
                                                          
,                                  
//Command getTopic                                 
getTopic : 				 new Command({
                                  name: "getTopic",
                                  dataType : "XML",
                                  method : "GET",
                                  getQuery : function(parameters){ //JSON file parameters 
                                                var uriTopic = parameters.uriTopic; 
                                                var query =' SELECT DISTINCT * WHERE {      '+
                                                           ' {   																 '+
                                                           '    <'+uriTopic+'>   rdfs:label      ?Label.       '+
                                                           ' } UNION{ '+
                                                           '    ?Publication     foaf:topic <'+uriTopic+'> ;   '+
                                                           '                     dc:title      ?Title.         '+
                                                           ' }} ';
                                                           return query;
                                                  },
                                  ModelCallBack : getTopicModelCallBack
                                  })
                                  
                                  
                                 
 ,                                 
//Command getKeyword               
getKeyword : 			new Command({
                                  name: "getKeyword",
                                  dataType : "XML",
                                  method : "GET",
                                  getQuery : function(parameters){ //JSON file parameters 
                                                var trackUri = parameters.trackUri;
                                                var paramKeyword = parameters.paramKeyword;  
                                                var query = ' SELECT DISTINCT ?Publication ?title WHERE { '+
                                                            '  ?Publication      dc:subject          ?keywordLabel . '+
                                                            '  ?Publication      dc:title          ?title . '+
                                                            '  ?Publication      swc:isPartOf     <'+trackUri+'> .     '+
                                                            '  FILTER REGEX( ?keywordLabel , "'+paramKeyword+'","i"). '+
                                                            ' } ';
                                                            return query;
                                                  },
                                  ModelCallBack : getKeywordModelCallBack
                                  })
                                  
 ,                                 
//Command getPublicationKeyword                                   
getPublicationKeyword : 	new Command({
                                  name: "getPublicationKeyword ",
                                  dataType : "XML",
                                  method : "GET",
                                  getQuery : function(parameters){ //JSON file parameters 
                                                var subKeywordClass = parameters.subKeywordClass; 
                                                var query = ' SELECT DISTINCT ?posterWWW2012  ?title WHERE {      '+
                                                            ' { '+
                                                            '    ?subUriKeyword           rdf:type               iswm:'+subKeywordClass.slice(1)+'           .       '+
                                                            '    ?posterWWW2012        iswm:hasKeyword           ?subUriKeyword              .       '+
                                                            '    ?uriPosterSWDF        owl:sameAs                ?posterWWW2012              .       '+
                                                            '    ?uriPosterSWDF           dc:title                  ?title                   .       '+
                                                            ' }}';
                                                            return query;
                                              },
                                  ModelCallBack : getPublicationKeywordMethodCallBack
                                  })
                                  
 ,                                 
 //Command getKeywordGraphView         
getKeywordGraphView : 		 new Command({
                                  name: "getKeywordGraphView",
                                  dataType : "XML",
                                  method : "GET",
                                  getQuery : function(parameters){ //JSON file parameters 
                                                var keywordLabel = parameters.keywordLabel; 
                                                var uriKeyword = parameters.uriKeyword;
                                                var query =  ' PREFIX iswm: <http://poster.www2012.org/ontologies/2012/3/KeywordsOntologyWithoutInstance.owl#>      '+
                                                             ' SELECT DISTINCT ?uriPoster ?titlePoster ?equiUriKeyword ?equiKeywordLabel ?subUriKeyword ?subKeywordLabel ?upperUriKeyword ?upperKeywordLabel WHERE { '+
                                                             ' { '+
                                                             '    ?uriPoster     dc:subject      "'+keywordLabel+'" .'+
                                                             '    ?uriPoster     dc:title        ?titlePoster  .   '+
                                                             ' } UNION{ '+
                                                             '    <'+uriKeyword+'>  rdf:type                ?keywordClass     .       '+        // Equivalent keywords
                                                             '    ?keywordClass     iswm:equivalentClass     ?equiClass        .       '+
                                                             '    ?equiUriKeyword   rdf:type                ?equiClass        .       '+
                                                             '    ?equiClass        iswm:hasLabel           ?equiKeywordLabel .       '+
                                                             ' } UNION{ '+
                                                             '    <'+uriKeyword+'>  rdf:type                ?keywordClass     .       '+        // More specific Keywords
                                                             '    ?subKeywordClass  rdfs:subClassOf         ?keywordClass     .       '+
                                                             '    ?subUriKeyword    rdf:type                ?subKeywordClass  .       '+
                                                             '    ?subUriKeyword    iswm:hasLabel           ?subKeywordLabel  .       '+
                                                             ' } UNION{ '+
                                                             '    <'+uriKeyword+'>  rdf:type                ?keywordClass     .       '+        // Upper level keywords
                                                             '    ?keywordClass     rdfs:subClassOf         ?upperClass       .       '+
                                                             '    ?upperUriKeyword  rdf:type                ?upperClass       .       '+
                                                             '    ?upperUriKeyword  iswm:hasLabel           ?upperKeywordLabel .      '+
                                                             ' }}';
                                                             return query;
                                                    },
                                  ModelCallBack : getKeywordGraphViewMethodCallBack
                                  })
                                  
                                  
 ,                                 
 //Command getTopicGraphView                                 
getTopicGraphView : 		new Command({
                                  name: "getTopicGraphView ",
                                  dataType : "XML",
                                  method : "GET",
                                  getQuery : function(parameters){ //JSON file parameters 
                                                var uriTopic = parameters.uriTopic; 
                                                var query =  ' SELECT DISTINCT * WHERE {      '+
                                                             ' { '+
                                                             '    ?Publication     foaf:topic <'+uriTopic+'> ;   '+
                                                             '                     dc:title      ?Title.         '+
                                                             ' }} LIMIT 10 ';
                                                             return query;
                                                },
                                  ModelCallBack : getTopicGraphViewMethodCallBack
                                  })*/
                                  
//End file SWDFCommands    
/*

 //.......................ModelCallBack................................

//CallBack for the command getPaper on SWDF     
function getPaperModelCallBack(dataXML,presenter){
    	          
        var titlePaper = $(dataXML).find('sparql > results > result > binding[name="Title"]').find(":first-child").text();                  
        if(titlePaper != ''){
 
            //  Add root node 
            this.paperGraph.setRootNode(this.uriPaper,titlePaper);
            //   Parsing XML 
            $(dataXML).find("sparql > results > result > binding").each(function(){
                var key          = $(this).attr("name");
                var value        = $(this).find(":first-child").text();    // Label ressource
                var idContent    = self.prefix + key;
                          
                // Add content 
                switch(key){                                    
                    case 'Author':
                        var nameToDash = value.replace(/\s+/g, '~');
                        var uriAuthor =  $(this).next().find(":first-child").text();
                        var paramater = uriAuthor.replace(ConfigurationManager.getInstance().getConfBaseUri(),'');
                        var paramaterToDash = paramater.replace(/\/+/g, '~');
                        //  Add to DOM and to Graph 
                        $(idContent).append('<span><a href="#'+ paramaterToDash +'~~'+ nameToDash +'">' + value +'</a></span>, ');
                        self.paperGraph.setChildNode(uriAuthor, value, self.uriPoster, key);
                        break;
                    case 'Title' :
                        var pdf =  $(this).next().next().find(":first-child").text();
                        //  Add to DOM and to Graph 
                        if(pdf != '') $('#paperNumber').append('<h1><a href='+pdf+' style="text-decoration: underline;">'+self.poster.capitalizeFirstLetter()+'</a></h1>');
                        else          $('#paperNumber').append('<h1>'+self.poster.capitalizeFirstLetter()+'</h1>');                                           
                        $(idContent).append(value);
                        break;
                    case 'Keyword':
                        if(value == 'http://dbpedia.org/resource/World_Wide_Web') var theme = 'topic~world-wide-web';
                        else                                                      var theme = Dash.getValue(value,ConfigurationManager.getInstance().getConfBaseUri());
                        var KeywordLabel =  $(this).next().find(":first-child").text();
                        //  Add to DOM and to Graph 
                        $(idContent).append('<span><a href="#'+ theme + '"> ' + KeywordLabel +'</a></span>,');
                        self.paperGraph.setChildNode(value, KeywordLabel, self.uriPaper, key);
                        break;
                    case 'KeywordLabel' :
                        var uriKeyword  =  'http://poster.www2012.org/ontologies/2012/3/KeywordsOntologyWithoutInstance.owl#keyword_'+value.toLowerCase().replace(/\s+/g,'_');
                        var keywordClass = '#KeywordClass_'+value.toLowerCase().replace(/\s+/g,'_');
                        // Storage 
                        presenter.storeKeyword(keywordClass, value);
                        //  Add to DOM and to Graph 
                        $(self.prefix + 'Keyword').append('<span><a href="#keyword~' + value.replace(/\s+/g,'-') +'"> '+ value.capitalizeFirstLetter() +'</a></span>,');
                        self.paperGraph.setChildNode(uriKeyword, value, self.uriPaper, "hasKeyword");
                        break;
                    default:
                        $(idContent).append(value+' ');
                        break;
                }
            });
            // toString Paper's Graph 
            var graphJSON    = JSON.stringify(self.paperGraph.getInstance());
            var keyGraphStorage = self.uriPaper.replace("http://data.semanticweb.org/","");
            // store Paper's Graph with jstorage 
            presenter.storeGraph("graph/"+keyGraphStorage,graphJSON);
            // Set link 
            $(self.prefix+'Graph').append('<span><a href="#' + self.hashGraph + '" id="viewAs">View As Graph</a></span>');
        }
        else{
            $('#paperDetail > div').empty();
            $('#paperDetail > div').append('<h3>Search result not found!</h3>')
        }
    }
                                 
 
 */
 //CallBack for the command getAuthor on SWDF                                  
function getAuthorModelCallBack(dataXML,presenter){
                  //  Set root node of author's graph 
                 this.authorGraph.setRootNode(this.uriAuthorSWDF,this.authorName);
                  //  Parsing XML 
                 $(dataXML).find("sparql > results > result > binding").each(function(){

                            var key          = $(this).attr("name");
                            var value        = $(this).find(":first-child").text();    // Label ressource
                            var idContent    = self.prefix + key;
                            switch(key){
                                    case 'Publication':
                                            //  Publication > uriPublication > uriKeyword  > urlPDF  
                                            var uriResource    = $(this).next().find(":first-child").text(); // URI Resource
                                           
                                            
                                            //Catch the publication id
                                            var split = uriResource.split("/");
                                            var publiId = split[split.length-1]; 
                                            console.log("publi IDD : "+ publiId);
                                            
                                          	//Catch the track id
                                            var locationId = uriResource.replace(ConfigurationManager.getInstance().getConfBaseUri()+ConfigurationManager.getInstance().getConfId(),"");
                                            locationId = locationId.replace(publiId,"");	
                                            locationId = locationId.slice(1,locationId.length-1);	
                                            locationId =  Dash.setValue(locationId,"");	
                                            console.log("track id : "+ locationId);
                                            
                                            //Construction of the navigation Uri
                                            var constructedUri =  Dash.setValue(ConfigurationManager.getInstance().getConfId(),"" );
                                            constructedUri = constructedUri +"~"+locationId +"~"+ publiId;
                                            console.log("publication Dash : "+ constructedUri);
                                            
                                            constructedUri = constructedUri.replace("conference-","conference~");
                                            
                                            var pdf            = $(this).next().next().find(":first-child").text(); // URI Resource
                                            var keyPublication = value.toLowerCase().replace(/\s+/g,'_');
                                            //  Publications added 
                                            self.arrPublicationsSWDF[keyPublication] = true;                                 
                                            // Add child node Graph JSON                                             
                                            if(pdf == '') $(idContent).append('<div><a  href="#'+ constructedUri  +'">' + value  +'</a></div>');
                                            else          $(idContent).append('<div><a  href="#'+ constructedUri  +'">' + value  +'</a> <a  href='+pdf+'> (PDF) </a> </div>');
                                            self.authorGraph.setChildNode(uriResource,value , self.uriAuthorSWDF , key);
                                            break;
                                    case 'Organization':
                                            var uriResource   = $(this).next().find(":first-child").text();
                                            // Add child node Graph JSON 
                                            self.authorGraph.setChildNode(uriResource, value, self.uriAuthorSWDF, key);
                                            $(idContent).append('<div><a  href="#'+ Dash.getValue(uriResource, ConfigurationManager.getInstance().getConfBaseUri()) +'">' + value   +'</a></div>');
                                            break;
                                    case 'keywordLabel':
                                            var keywordLabel   =  value;
                                            var uriKeyword     = 'http://poster.www2012.org/ontologies/2012/3/KeywordsOntologyWithoutInstance.owl#keyword_'+keywordLabel.toLowerCase().replace(/\s+/g,'_');
                                            var keywordClass   = '#KeywordClass_' + keywordLabel.toLowerCase().replace(/\s+/g,'_');
                                            // Storage 
                                            presenter.storeKeyword(keywordClass, value);
                            }
                 });
                 if($('#authorPublication').text() == '') $('#labelAuthorPublication').hide();
                 if($('#authorOrganization').text() == '') $('#labelAuthorOrganization').hide();
                 return this;
	}                               
    /*                              
//CallBack for the command getOrganization on SWDF
function getOrganizationModelCallBack(dataXML,presenter){
                
                var organizationName = $(dataXML).find('sparql > results > result > binding[name="Name"]').find(":first-child").text();                  
                //  Add root node                 
                this.grahp.setRootNode(this.uriOrganization,organizationName);
                
		$(dataXML).find("sparql > results > result > binding").each(function(){                   
                        var key  = $(this).attr("name");				
                        var value = $(this).find(":first-child").text();
                        var idContent    = self.prefix + key;

                        var toDashValue = value.replace(/\s+/g, '~');
                        if(key == 'Name'){                                    
                            $(idContent).append(value);
                        }
                        else if (key == 'Member'){                                    
                            var nameToDash = value.replace(/\s+/g, '~');
                            var uriAuthor =  $(this).next().find(":first-child").text();
                            var paramater = uriAuthor.replace('http://data.semanticweb.org/','');					
                            var paramaterToDash = paramater.replace(/\/+/g, '~');	
                            self.grahp.setChildNode(uriAuthor, value, self.uriOrganization, key);
                            $(idContent).append('<div><a href="#'+ paramaterToDash +'~~'+ nameToDash +'">' + value +'</a></div>');							
                        }     
		  });
                  
                  //toString Paper's Graph
                  var graphJSON       = JSON.stringify(this.grahp.getInstance());
                  var keyGraphStorage = this.uriOrganization.replace("http://data.semanticweb.org/","");
                  //store Paper's Graph with jstorage    
                  presenter.storeGraph("graph/"+keyGraphStorage,graphJSON);
                  //Set link
                  $(self.prefix+'Graph').append('<span><a href="#' + this.hashGraph + '" id="viewAs">View As Graph</a></span>');                                    
                  // Search on DuckDuckGo
                  var organizationName = $('#organizationName').text().replace(/\s+/g, '+');
                  if(organizationName.indexOf(",") != -1) presenter.search(organizationName.split(",")[0]);
                  else presenter.search(organizationName);

                  return this;
                
    }                                
 
 
 //CallBack for the command getTopic on SWDF                                 
function getTopicModelCallBack(dataXML){           
            $(dataXML).find("sparql > results > result > binding").each(function(){                               
                            var key  = $(this).attr("name");				
                            var value = $(this).find(":first-child").text();

                            if(key == 'Label'){                         
                                $('#topic'+key).append(value);
                            }else if(key == 'Publication'){                                  
                                var title = $(this).next().find(":first-child").text();
                                var publication = Dash.getValue(value, 'http://data.semanticweb.org/');                              
                                $('#topic'+key).append('<div><a href="#'+ publication +'">' + title +'</a></div>');
                            }                                
            });	
       }                                 
   
   
 //CallBack for the command getKeyword on SWDF                                 
function getKeywordModelCallBack(dataXML,presenter){
        // Store current Keyword 
        presenter.storeKeyword(this.keywordClass,this.paramKeyword);
        // Parsing 
        $(dataXML).find("sparql > results > result > binding").each(function(){                               
            var key          = $(this).attr("name");				
            var value        = $(this).find(":first-child").text();
            var idContent    = self.prefix + key;
            
            if(key == 'Publication'){                                                              
                var title  =  $(this).next().find(":first-child").text();					
              //Catch the publication id
                var split = value.split("/");
                var publiId = split[split.length-1]; 
                console.log("publi IDD : "+ publiId);
                
              	//Catch the track id
                var locationId = value.replace(ConfigurationManager.getInstance().getConfBaseUri()+ConfigurationManager.getInstance().getConfId(),"");
                locationId = locationId.replace(publiId,"");	
                locationId = locationId.slice(1,locationId.length-1);	
                locationId =  Dash.setValue(locationId,"");	
                console.log("track id : "+ locationId);
                
                //Construction of the navigation Uri
                var constructedUri =  Dash.setValue(ConfigurationManager.getInstance().getConfId(),"" );
                constructedUri = constructedUri +"~"+locationId +"~"+ publiId;
                console.log("publication Dash : "+ constructedUri);
                
                constructedUri = constructedUri.replace("conference-","conference~");
              
                $('#keyword'+key).append('<div><a href="#'+ constructedUri +'">' + title +'</a></div>');
            }                                
        });                 
        var ontology = jsw.owl.xml.parseUrl('http://poster.www2012.org/onto/KeywordClasses.owl');
        this.reasoner = new jsw.owl.BrandT(ontology);           
        var classeArray  = this.reasoner.classHierarchy;

        var ThingClassJSON   = classeArray[0];
        // ThingClasseJSON.name[0]  // http://www.w3.org/2002/07/owl#Thing
        var KeywordClassJSON = ThingClassJSON.children[0];
        // KeywordClassJSON.names[0] //#Keyword
        var arrayChildrenKeyword = KeywordClassJSON.children;
        this.loadTree(arrayChildrenKeyword);
    }                                  


 //CallBack for the command getKeywordGraphView on SWDF  
 
function getKeywordGraphViewMethodCallBack(dataXML) {                         
                     var  KeywordGraphView = {
                           
                        idCurrentNode:'',
                        labelCurrentNode:'',
                        graphJSON : new GraphJSON(),
                        init : function(idCurrentNode,labelCurrentNode){
                            KeywordGraphView.idCurrentNode = idCurrentNode;
                            KeywordGraphView.labelCurrentNode = labelCurrentNode;
                            KeywordGraphView.graphJSON.setRootNode(KeywordGraphView.idCurrentNode,KeywordGraphView.labelCurrentNode);    //PersonGraphView.idCurrentNode : uriAuthor SWDF                                                 
                            $('#currentNode').append('<h3>Keyword  : '+labelCurrentNode+'</h3>');
                        },
                        render : function(dataXML){
                           
                              // upperUriKeyword  > subUriKeyword > uriPoster
                              $(dataXML).find("sparql > results > result > binding").each(function(){                               
                                            var key  = $(this).attr("name");				
                                            var value = $(this).find(":first-child").text(); // uri                       
                                            if(key == 'upperUriKeyword'){                             
                                                var label = $(this).next().find(":first-child").text(); // label paper                                                                              
                                                KeywordGraphView.graphJSON.setChildNode(value, label, KeywordGraphView.idCurrentNode, key);                                                        
                                            }
                                            else if (key == 'subUriKeyword'){                            
                                                var label = $(this).next().find(":first-child").text(); // label paper                                                                              
                                                KeywordGraphView.graphJSON.setChildNode(value, label, KeywordGraphView.idCurrentNode, key);                                                        
                                            }
                                            else if (key == 'uriPoster'){                            
                                                var label = $(this).next().find(":first-child").text(); // label paper                                                                              
                                                KeywordGraphView.graphJSON.setChildNode(value, label, KeywordGraphView.idCurrentNode, key);                                                        
                                            }
                                            else if (key == 'equiUriKeyword'){                            
                                                var label = $(this).next().find(":first-child").text(); // label paper                                                                              
                                                KeywordGraphView.graphJSON.setChildNode(value, label, KeywordGraphView.idCurrentNode, key);                                                        
                                            }
                              });  
                        }
                    }                                 
                                                      
                }               
 
 //CallBack for the command getTopicGraphView on SWDF  
function getTopicGraphViewMethodCallBack(dataXml){                                 
                       var TopicGraphView = {	
                        idCurrentNode:'',
                              labelCurrentNode:'',
                              graphJSON : new GraphJSON(),
                              init: function(idCurrentNode,labelCurrentNode){
                                  TopicGraphView.idCurrentNode = idCurrentNode;
                                  TopicGraphView.labelCurrentNode = labelCurrentNode;
                                  TopicGraphView.graphJSON.setRootNode(TopicGraphView.idCurrentNode,TopicGraphView.labelCurrentNode);    //PersonGraphView.idCurrentNode : uriAuthor SWDF                                                 
                              },
                              render : function(dataXML){
                                  //GraphView.idCurrentNode : uriAuthor SWDF     
                                  $(dataXML).find("sparql > results > result > binding").each(function(){                               
                                                  var key  = $(this).attr("name");				
                                                  var value = $(this).find(":first-child").text(); // uri
                                                  if(key == 'Publication'){                                  
                                                      var title = $(this).next().find(":first-child").text(); // label paper                                                                              
                                                      TopicGraphView.graphJSON.setChildNode(value, title, TopicGraphView.idCurrentNode, key);                                                        
                                                  }                                
                                  });

                              }
                        }
    }                                                     
         
  //CallBack for the command getPublicationKeyword on SWDF       
function getPublicationKeywordMethodCallBack(dataXML){              
        $(dataXML).find("sparql > results > result > binding").each(function(){                               
            var key  = $(this).attr("name");				
            var value = $(this).find(":first-child").text(); // uri   
            if(key == 'posterWWW2012'){   
                 $('#posternotFound').remove();        
                var title = $(this).next().find(":first-child").text(); // title paper 
                var paramater = value.replace("http://poster.www2012.org/ontologies/2012/3/KeywordsOntologyWithoutInstance.owl#","");                          
                if($('#'+paramater).val() != ''){
                    $('#recommend'+key).append('<li><a href="#'+ paramater + '" id="' + paramater + '"><span>'+title+'</span></a></li> ');                                                                                                                 
                }                                                                                                                                                            
            }                            
        });                                  
    }   
    
    
//CallBack for the command getAuthorSearchByName on SWDF       
function getAuthorSearchByName(dataXML){
         var result = $(dataXML).find("sparql > results> result").text();
         if( result != ""){
              $(dataXML).find("sparql > results > result > binding").each(function(){                  
                    var key  = $(this).attr("name");				
                    var value = $(this).find(":first-child").text();
                    if(key == 'uriAuthor'){
                        var name = $(this).next().find(":first-child").text();
                        var nameToDash = name.replace(/\s+/g, '~');
                        var paramaterToDash = Dash.getValue(value, 'http://data.semanticweb.org/');                                                   
                        $(self.prefix).append('<li><a  href="#'+ paramaterToDash+'~~'+ nameToDash +'">'+name+'</a></li> '); 
                    }
              }); 
         }else{
             $(self.prefix).append('<li>Search result not found!</li>');
         }
    }    


  // search poster by author, title, keyword 
function getPosterSearchByKeywordByAuthorByTitle(dataXML){
        
         var result = $(dataXML).find("sparql > results> result").text();
         if( result != ""){
              $(dataXML).find("sparql > results > result > binding").each(function(){                  
                    var key  = $(this).attr("name");				
                    var value = $(this).find(":first-child").text();
                    if(key == 'uriPaper'){
                        var title = $(this).next().find(":first-child").text();
                        
                        //Preparing the Uri
                       
                        
                        //Catch the publication id
                        var split = value.split("/");
                        var publiId = split[split.length-1]; 
                        console.log("publi IDD : "+ publiId);
                        
                      	//Catch the track id
                        var locationId = value.replace(ConfigurationManager.getInstance().getConfBaseUri()+ConfigurationManager.getInstance().getConfId(),"");
                        locationId = locationId.replace(publiId,"");	
                        locationId = locationId.slice(1,locationId.length-1);	
                        locationId =  Dash.setValue(locationId,"");	
                        console.log("track id : "+ locationId);
                        
                        //Construction of the navigation Uri
                        var constructedUri =  Dash.setValue(ConfigurationManager.getInstance().getConfId(),"" );
                        constructedUri = constructedUri +"~"+locationId +"~"+ publiId;
                        console.log("publication Dash : "+ constructedUri);
                        
                        constructedUri = constructedUri.replace("conference-","conference~");
                 
                        $(self.prefix).append('<li><a href="#'+ constructedUri + '"><span>'+title+'</span></a></li> ');
                       
                    }
              });            
        }else{             
              $(self.prefix).append('<li>Search result not found!</li>');
        }
}*/
	                           

                                  