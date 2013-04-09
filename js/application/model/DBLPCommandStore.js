  /**   
 *   Copyright <c> Claude Bernard - University Lyon 1 -  2013
 *   Author: Lionnel MEDINI(supervisor), Florian BACLE, Fiona LE PEUTREC, Benoît DURANT-DE-LA-PASTELLIERE, NGUYEN Hoang Duy Tan
 *   Description: Interface of a Datasource model
 *   Version: 1
 *   Tags:  
 **/
 //DBLP commands file 
 
 
 //Command getAuthor 
 /*var getAuthor = new Command({
                            name: "getAuthorSuggestion",
                            dataType : "JSONP",
                            method : "GET",
                            getQuery : function(parameters){ //JSON file parameters 
                                                var authorName = parameters.authorName; 
                                                var query =  ' SELECT DISTINCT ?uriAuthor  ?Site  ?CoAuthors  ?OtherPublication ?UriOtherPublication ?Years  WHERE {      ' +
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
                                      ModelCallBack : TODO
                                         
                                  });
                                  
                                  
var getConfPublication = new Command({
                              name: "getConfPublication ",
                              dataType : "JSONP",
                              method : "GET",
                              getQuery : function(parameters){ //JSON file parameters 
                                                var uriPublication = parameters.uriPublication; 
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
                                        ModelCallBack : TODO
                                           
                                  });
                                  
var getJournalPublication  = new Command({
                                name: "getJournalPublication  ",
                                dataType : "JSONP",
                                method : "GET",
                                getQuery : function(parameters){ //JSON file parameters 
                                                var uriPublication = parameters.uriPublication; 
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
                                          ModelCallBack : TODO
                                     
                                  });
                                  
                                  
var getAuthorGraphView  = new Command({
                                name: "getAuthorGraphView",
                                dataType : "JSONP",
                                method : "GET",
                                getQuery : function(parameters){ //JSON file parameters 
                                                var authorName = parameters.authorName; 
                                                var query =  '  SELECT DISTINCT ?OtherPublication ?UriOtherPublication   WHERE {       ' +
                                                             ' { ?author foaf:name  "'+ authorName +'" . '+
                                                             '   ?UriOtherPublication foaf:maker ?author  .  '+                                
                                                             '   ?UriOtherPublication dc:title ?OtherPublication  .    '+                                     
                                                             ' }} ORDER BY  DESC  (?Years) LIMIT 5 ';
                                                             return query;
                                                  },
                                ModelCallBack : TODO
                                     
                           });
                                  

                                  
 */