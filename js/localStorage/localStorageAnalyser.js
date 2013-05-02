/**   
*	Copyright <c> Claude Bernard - University Lyon 1 -  2013
* 	License : This file is part of the DataConf application, which is licensed under a Creative Commons Attribution-NonCommercial 3.0 Unported License. See details at : http://liris.cnrs.fr/lionel.medini/wiki/doku.php?id=dataconf&#licensing 
*   Author: Lionel MEDINI(supervisor), Florian BACLE, Fiona LE PEUTREC, Beno�t DURANT-DE-LA-PASTELLIERE, NGUYEN Hoang Duy Tan
*   Description: This object is used to retrieve values from localstorage and process it to get navigation informations
*   Version: 1.2
*   Tags:  JSON, Local Storage
**/

var StorageAnalyser = {
	

	getMostViewKeyword : function(){
		keywordStore = StorageManager.get("keyword");
		console.log(keywordStore);
		var maxOccurKeyword = 0;
		var maxOccurKeywordLabel = "";
		$.each(keywordStore, function(i,keyword){
			if(keyword.cpt > maxOccurKeyword){
				maxOccurKeyword = keyword.cpt;
				maxOccurKeywordLabel = keyword.label;
			}
			
		});
		console.log(maxOccurKeywordLabel);
	},
	
	getMostViewEntity : function(){
		keywordStore = StorageManager.get("keyword");
		console.log(keywordStore);
		var maxOccurKeyword = 0;
		var maxOccurKeywordLabel = "";
		$.each(keywordStore, function(i,keyword){
			if(keyword.cpt > maxOccurKeyword){
				maxOccurKeyword = keyword.cpt;
				maxOccurKeywordLabel = keyword.label;
			}
			
		});
		console.log(maxOccurKeywordLabel);
	}

};