/**   
*	Copyright <c> Claude Bernard - University Lyon 1 -  2013
* 	License : This file is part of the DataConf application, which is licensed under a Creative Commons Attribution-NonCommercial 3.0 Unported License. See details at : http://liris.cnrs.fr/lionel.medini/wiki/doku.php?id=dataconf&#licensing 
*   Author: Lionel MEDINI(supervisor), Florian BACLE, Fiona LEPEUTREC, Benoît DURANT-DE-LA-PASTELLIERE, NGUYEN Hoang Duy Tan
*   Description: Here is the interface we use to launch function of the reasoner. 
*   Version: 1.2
*   Tags:  mobile-reasoning
**/

var Reasoner = {
    key:'recommendationStorage',
    arrKeyword:{},
    
    arrPosterR:[{}],
    numPosterRCall:0,        
    numPaperRCall:0,  
    initialize : function(ontoUrl){
        /*$.jStorage.set(KeywordStore.key,'');
         var strArrKeyword = $.jStorage.get(KeywordStore.key);
         console.log(strArrKeyword);*/
		 
		var ontology = jsw.owl.xml.parseUrl(ontoUrl);
		Reasoner.reasoner = new jsw.owl.BrandT(ontology); 
    },
    set:function(keywordClass,keywordLabel){
        if(!($.jStorage.get(KeywordStore.key))){
            var arr = {};
        }else{
            var strArrKeyword = $.jStorage.get(KeywordStore.key);
            var arr    = $.parseJSON(strArrKeyword);
        }
        arr[keywordClass] = keywordLabel ;
        $.jStorage.set(KeywordStore.key,JSON.stringify(arr));
    },
    loadTree:function(childrenArray,callback){           
            $.each(childrenArray,function(i,item){
                    $.each(KeywordStore.arrKeyword,function(keywordClass,keywordLabel){                                                                             
                           // equivalent class                                   
                           if(KeywordStore.reasoner.isSubClassOf(item.names[0],keywordClass) && KeywordStore.reasoner.isSubClassOf(keywordClass,item.names[0]) && (keywordClass != item.names[0])/*doublon*/ ){
                                 console.log(keywordClass+' is equivalent ClassOf '+item.names[0]);                            
                                  callback(item.names[0]);
                            }
                           // keywordClass(keywordPoster) subClassOf ?Class                   
                           else if(KeywordStore.reasoner.isSubClassOf(keywordClass,item.names[0]) && (keywordClass != item.names[0])/*doublon*/){
                                 console.log(keywordClass+' is subClassOf '+item.names[0]);                                  
                                   callback(item.names[0]);
                            }
                            // keywordClass(keywordPoster) upperClassOf  ?Class    
                           if(KeywordStore.reasoner.isSubClassOf(item.names[0],keywordClass) && (keywordClass != item.names[0])/*doublon*/){
                                 console.log(keywordClass+' is upper ClassOf '+item.names[0]);                                 
                                   callback(item.names[0]);
                            }
                    });                  
                    Reasoner.loadTree(item.children,callback);
            });           
       },
       getMoreSpecificKeywords:function(callback){   
            
            // Array Keyword Class
            //var strArrKeyword = $.jStorage.get(KeywordStore.key);
            //console.log("Recommendation key :"+ strArrKeyword);
           // KeywordStore.arrKeyword = $.parseJSON(strArrKeyword);
            
                	//	var ontology = jsw.owl.xml.parseUrl("http://poster.www2012.org/onto/KeywordClasses.owl");
		//Reasoner.reasoner = new jsw.owl.BrandT(ontology); 
          //  var classeArray  = Reasoner.reasoner.classHierarchy;
           // console.log(JSON.stringify(classeArray));
            var ThingClassJSON   = classeArray[0];
            // ThingClasseJSON.name[0]  // http://www.w3.org/2002/07/owl#Thing
            var KeywordClassJSON = ThingClassJSON.children[0];
            // KeywordClassJSON.names[0] //#Keyword
            var arrayChildrenKeyword = KeywordClassJSON.children;
			console.log("REASONER");
			
			//console.log(arrayChildrenKeyword);
            /* Recommendation for poster 2012 */
            //Reasoner.loadTree(arrayChildrenKeyword,callback); 
			 // var uriPoster = 'http://data.semanticweb.org/' + keyPosterStorage.replace("recommendation/","");    
				
				//alert(Reasoner.reasoner.isSubClassOf("#KeywordClass_data_mining","#Keyword")); 
				var queryText = 'PREFIX owl: <http://www.w3.org/2002/07/owl#> SELECT ?keyword { ?keyword owl:subClassOf  <#KeywordClass> }';
			var query = jsw.sparql.parse(queryText);

			var results = Reasoner.reasoner.answerQuery(query);
			//console.log(results);
       },
       
       getKeywords:function(callback){
            /* Recommendation for paper 2012 */ 
            var strArrKeyword = $.jStorage.get(KeywordStore.key);
            var arrKey = $.parseJSON(strArrKeyword);
            $.each(arrKey,function(keywordClass,keywordLabel){ 
                   callback(keywordLabel);                    
            });
       }
    
}