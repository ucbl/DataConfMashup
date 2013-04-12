  /**   
 *   Copyright <c> Claude Bernard - University Lyon 1 -  2013
 *   Author: Lionnel MEDINI(supervisor), Florian BACLE, Fiona LE PEUTREC, Benoît DURANT-DE-LA-PASTELLIERE, NGUYEN Hoang Duy Tan
 *   Description: Interface of a Datasource model
 *   Version: 1
 *   Tags:  
 **/
 //DBLP commands file 
 
//First Part SWDF commands file, Second Part : ModelCallBack function definition 
 var DBLPCommandStore = {};
 
 //Command getAuthor 
DBLPCommandStore.getAuthor = {
                            name: "getAuthor",
                            dataType : "JSONP",
                            method : "GET",
                            getQuery : function(parameters){ //JSON file parameters 
                                              
                                                var authorName = parameters.id.split("_").join(" ");
                                                console.log(authorName);
                                                var prefix = ' PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> ' + 
                                                            ' PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>      ' +
                                                            ' PREFIX owl: <http://www.w3.org/2002/07/owl#>              ' +
                                                            ' PREFIX dc: <http://purl.org/dc/elements/1.1/>             ' +
                                                            ' PREFIX foaf: <http://xmlns.com/foaf/0.1/>                 ' +
                                                            ' PREFIX swrc: <http://swrc.ontoware.org/ontology#>         ' +
                                                            ' PREFIX dcterms: <http://purl.org/dc/terms/>               ';  
                                                var query = prefix + ' SELECT DISTINCT ?uriAuthor  ?Site  ?CoAuthors  ?OtherPublication ?UriOtherPublication ?Years  WHERE {      ' +
                                                                     ' { ?uriAuthor foaf:name "'+ authorName +'" . ' +
                                                                     '   OPTIONAL {?uriAuthor foaf:homepage ?Site . }    '  +
                                                                     ' } UNION ' 							  +
                                                                     ' { ?uri foaf:name "'+ authorName +'" . ' +
                                                                     '   ?publication foaf:maker ?uri      . ' +
                                                                     '   ?publication foaf:maker ?uriCoAuthor .' +										
                                                                     '   ?uriCoAuthor foaf:name ?CoAuthors          ' +
                                                                     ' } UNION ' 							  +
                                                                     ' { ?author foaf:name  "'+ authorName +'" . '+
                                                                     '   ?UriOtherPublication foaf:maker ?author  .  '+
                                                                     '   ?UriOtherPublication foaf:maker ?publication_coauthor .' +										
                                                                     '   ?UriOtherPublication dc:title ?OtherPublication  .    '+
                                                                     '   ?UriOtherPublication dcterms:issued ?Years .      '+
                                                                     ' }} ORDER BY (?uriAuthor )  DESC  (?Years)';
                                                             return query;
                                                  },
                                      ModelCallBack : function(dataJSON){ 
                                                          alert('toto');
                                                           $("[data-role = page]").find(".content").append("<div id='otherPublication'><h3>Other Publication</h3></div>");
                                                           $("[data-role = page]").find(".content").append("<div id='coAuthors'><h3>CoAuthors</h3></div>");
                                                           $("[data-role = page]").find(".content").append("<div id='site'><h3>Site</h3></div>");
                                                          $.each(dataJSON.results.bindings,function(i,item){
                                                                    $.each(item, function(key, valueArr) {
                                                                              var idContent = self.prefix + key;
                                                                              var uriPublication;
                                                                              var years;
                                
                                                                              switch(key){
                                                                                  case 'OtherPublication':
                                                                                         
                                                                                          var keyPublication =  valueArr.value.split('_').join('');
                                                                                          if( $("[data-role = page]").find("#otherPublication"))
                                                                                          var newButton = $('<a href="#otherPublication/'+keyPublication+'" data-role="button" data-icon="arrow-r" data-iconpos="right" >'+keyPublication+'</a>'); 
                                                   
                                                                                          $("[data-role = page]").find("#otherPublication").append(newButton).trigger("create");                                           
                                                                                          /* Eliminate publications SWDF added in DOM*/
                                                                                          /*if(self.arrPublicationsSWDF[keyPublication] != true)
                                                                                              $(idContent).append('<div><a href="#'+ Dash.getValue(item.UriOtherPublication.value, 'http://dblp.l3s.de/d2r/resource/publications/') +'">' + valueArr.value + '(' +item.Years.value + ')' +'</a></div>');*/
                                                                                          break;
                                                                                  case 'CoAuthors':
                                                                                          var paramDogFoodName = 'person~' + (valueArr.value).toLowerCase();
                                                                                          var nameToSpace  = paramDogFoodName.replace(/\.+/g, ' ');
                                                                                          var nameSWDFtoDash = nameToSpace.replace(/\s+/g, '-');
                                                                                          var nameDBLPtoDash = (valueArr.value).replace(/\s+/g, '~');
                                                                                          var nameCoAuthor = (valueArr.value).replace('_',' ');
                                                                                          var newButton = $('<a href="#author/'+nameCoAuthor+'" data-role="button" data-inline="true" >'+nameCoAuthor+'</a>'); 
                                                                                          // check if double author name
                                                                                          console.log(self.authorName);
                                                                                          if(valueArr.value != self.authorName ) $("[data-role = page]").find("#coAuthors").append(newButton).trigger("create");  //$('#author').append('<span><a href="#'+ nameSWDFtoDash +'~~'+ nameDBLPtoDash +'">' + valueArr.value +'</a></span>, ');
                                                                                          
                                                                                              
                                                                                          break;
                                                                                  case 'Site':
                                                                                          site = true;
                                                                                            var newButton = $('<a href="'+ valueArr.value +'" data-role="button" data-iconpos="right" >'+valueArr.value+'</a>');
                                                                                            $("[data-role = page]").find("#site").append(newButton).trigger("create");  
                                                                                          //$(idContent).append('<a href="'+ valueArr.value +'" >' + valueArr.value +'</a>');
                                                                                          break;
                                                                              } 
                                                                              //var newButton = $('<a href="#author/'+authorName.split(' ').join('_')+'" data-role="button" data-icon="arrow-r" data-iconpos="right" >'+publiTitle+'</a>'); 
                                                                              //$("[data-role = page]").find(".content").append(newButton).trigger("create");                             
                                                                      });
                                                              });
                                                           }
          }    
                                
 //Command getConfPublication                                  
DBLPCommandStore.getConfPublication = {
                              name: "getConfPublication ",
                              dataType : "JSONP",
                              method : "GET",
                              getQuery : function(parameters){ //JSON file parameters 
                                                var uriPublication = parameters.id; 
                                                var query =  ' SELECT DISTINCT ?Title ?Author ?Url ?Year ?Conference ?Publisher WHERE {      '+
                                                             ' {   																 '+
                                                             '   <'+uriPublication+'>  dc:title ?Title;			      			 '+
                                                             '              		   dcterms:issued ?Year .     				 '+
                                                             '      OPTIONAL {  <'+uriPublication+'>      		    foaf:homepage ?Url  } .      '+
                                                             ' }     															 '+
                                                             ' UNION 															 '+
                                                             ' {   														     	 '+
                                                             '   <'+uriPublication+'> dc:creator ?uriAuthor.      			     '+
                                                             '   ?uriAuthor  foaf:name ?Author.     							 '+					 																				
                                                             ' }     															 '+
                                                             ' UNION 															 '+					
                                                             ' {     															 '+ 
                                                             '   <'+uriPublication+'> dcterms:partOf ?uriConf.                   '+	
                                                             '    ?uriConf 		 	  dc:title ?Conference ;                     '+
                                                             '     		 	 		  dc:publisher ?Publisher.                   '+			
                                                             ' }} ';
                                                             return query;
                                                 },
                                        ModelCallBack : function(dataJSON){
                                                                    var publicationTitle;
                                                                    $.each(dataJSON.results.bindings,function(i,item){
                                                                        $.each(item, function(key, valueArr) {
                                                                            if(key == 'Title'){
                                                                                publicationTitle = valueArr.value;
                                                                                $("[data-role = page]").find(".content").append("<h3>"+publicationTitle+"</h3>");
                                                                            }
                                                                            
                                                                           
                                                                        });
                                                                    });
                                                                    this.graph.setRootNode(this.uriPublication,publicationTitle);
                                                                  $.each(dataJSON.results.bindings,function(i,item){
                                                                            $.each(item, function(key, valueArr) {
                                                                                    var idContent    = self.prefix + key;
                                                                                    switch(key){
                                                                                        case 'Author':
                                                                                            var paramDogFoodName = 'person~' + (valueArr.value).toLowerCase();
                                                                                            var nameToSpace  = paramDogFoodName.replace(/\.+/g, ' ');
                                                                                            var nameSWDFtoDash = nameToSpace.replace(/\s+/g, '-');
                                                                                            var nameDBLPtoDash = (valueArr.value).replace(/\s+/g, '~');
                                                                                            var nameAuthor = (valueArr.value).replace('_',' ');
                                                                                            var newButton = $('<a href="#author/'+nameAuthor+'" data-role="button" data-inline="right" >'+nameAuthor+'</a>'); 
                                                                                            //$(idContent).append('<span><a href="#'+ nameSWDFtoDash +'~~'+ nameDBLPtoDash +'">' + valueArr.value +'</a></span>, ');
                                                                                            $("[data-role = page]").find(".content").append(newButton).trigger("create");  //$('#author').append('<span><a href="#'+ nameSWDFtoDash +'~~'+ nameDBLPtoDash +'">' + valueArr.value +'</a></span>, ');
                                                                                         
                                                                                            break;
                                                                                        case 'Url':
                                                                                            //self.graph.setChildNode(valueArr.value, valueArr.value, self.uriPublication, key);
                                                                                            $(idContent).append('<div><a href="'+ valueArr.value +'" >' + valueArr.value +'</a></div>');
                                                                                            break;
                                                                                        default:
                                                                                            if($(idContent).text() == '')
                                                                                                    $(self.prefix + key).append(valueArr.value);
                                                                                                //if(key != 'Title') self.graph.setChildNode(valueArr.value, valueArr.value, self.uriPublication, key);
                                                                                            break;
                                                                                    }
                                                                             });
                                                                 });
                                                          }
}


 //Command getJournalPublication  
 //.............TODO Method CallBack....................                                 
DBLPCommandStore.getJournalPublication ={
                                name: "getJournalPublication  ",
                                dataType : "JSONP",
                                method : "GET",
                                getQuery : function(parameters){ //JSON file parameters 
                                                var uriPublication = parameters.id; 
                                                var query =  ' SELECT DISTINCT ?Title ?Author ?Url ?Year ?Journal  WHERE {       '+
                                                             ' {   																 '+
                                                             '   <'+uriPublication+'>  dc:title ?Title;			             '+
                                                             '              		   dcterms:issued ?Year .                    '+
                                                             '    OPTIONAL { <'+uriPublication+'> 	    foaf:homepage ?Url   .   }                       '+
                                                             ' }     															 '+
                                                             ' UNION 															 '+
                                                             ' {   														     	 '+
                                                             '   <'+uriPublication+'> dc:creator ?uriAuthor.      			     '+
                                                             '   ?uriAuthor  foaf:name ?Author.     							 '+					 																				
                                                             ' }     															 '+
                                                             ' UNION 															 '+					
                                                             ' {     															 '+ 
                                                             '   <'+uriPublication+'> swrc:journal ?uriJournal.                  '+	
                                                             '    ?uriJournal 		  dc:title ?Journal ;                     '+				
                                                             ' }} ';
                                                             return query;
                                                    },
                                          ModelCallBack :  function(dataJSON){
                                               
                                                                    $.each(dataJSON.results.bindings,function(i,item){
                                                                       var nameAuthor = item.Author;
                                                                       var url = item.Url;
                                                                       var year = item.year;
                                                                       var journal = item.journal;
                                                                       var title = item.Title;
                                                                       var newButton = $('<a href="#author/'+nameAuthor+'" data-role="button" data-inline="right" >'+nameAuthor+'</a>'); 
                                                                        
                                                                        $("[data-role = page]").find(".content").append("<h3>Title "+title+"</h3>").trigger("create"); 
                                                                        $("[data-role = page]").find(".content").append("<h3>Year "+year+"</h3>").trigger("create"); 
                                                                        $("[data-role = page]").find(".content").append(newButton).trigger("create");  
                                                                        $("[data-role = page]").find(".content").append("<h3>Journal "+journal+"</h3>").trigger("create"); 
                                                             
                                                                    });
                                     
                                                            }
}
                                  
                                
 /*//Command getAuthorGraphView                                                          
DBLPCommandStore.getAuthorGraphView = {
                                name: "getAuthorGraphView",
                                dataType : "JSONP",
                                method : "GET",
                                getQuery : function(parameters){ //JSON file parameters 
                                                var authorName = parameters.id; 
                                                var query =  '  SELECT DISTINCT ?OtherPublication ?UriOtherPublication   WHERE {       ' +
                                                             ' { ?author foaf:name  "'+ authorName +'" . '+
                                                             '   ?UriOtherPublication foaf:maker ?author  .  '+                                
                                                             '   ?UriOtherPublication dc:title ?OtherPublication  .    '+                                     
                                                             ' }} ORDER BY  DESC  (?Years) LIMIT 5 ';
                                                             return query;
                                                  },
                                ModelCallBack : getAuthorGraphViewMethodCallBack
                                     
                           }
                                  

 */
   
   
//.......................ModelCallBack................................   




    
    
//CallBack for the command getAuthorGraphView on DBLP      
function getAuthorGraphViewMethodCallBack(dataJSON){
 
    function render(dataJSON){               
        $.each(dataJSON.results.bindings,function(i,item){
            $.each(item, function(key, valueArr) {
                if(key == 'Author'){
                    var paramDogFoodName = 'person~' + (valueArr.value).toLowerCase();
                    var nameToSpace      = paramDogFoodName.replace(/\.+/g, ' ');
                    var uriAuthoSWDF     = 'http://data.semanticweb.org/person/'+nameToSpace.replace(/\s+/g, '-');
                    self.graphJSON.setChildNode(uriAuthoSWDF  , valueArr.value, self.idCurrentNode, key);
                }else if(key == 'Url'){			
                    self.graphJSON.setChildNode(valueArr.value, valueArr.value, self.idCurrentNode, key);
                }
                else {	
                    self.graphJSON.setChildNode(valueArr.value, valueArr.value, self.idCurrentNode, key);
                }

            });	
        });
        return this;
    }
    this.getGraph = function(){
        return self.graphJSON;
    } 
    
 }  
 
 

