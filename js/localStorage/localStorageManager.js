/**   
*	Copyright <c> Claude Bernard - University Lyon 1 -  2013
* 	License : This file is part of the DataConf application, which is licensed under a Creative Commons Attribution-NonCommercial 3.0 Unported License. See details at : http://liris.cnrs.fr/lionel.medini/wiki/doku.php?id=dataconf&#licensing 
*   Author: Lionel MEDINI(supervisor), Florian BACLE, Fiona LE PEUTREC, Benoît DURANT-DE-LA-PASTELLIERE, NGUYEN Hoang Duy Tan
*   Description: This object contains method for save and pick JSON file in local storage.
*				 The method pushToStorage(uri, commandName,JSONdata) check if data doesn't exist in local storage, in that case save data JSONData in paramaters with the key,id.
*				 The methode pullFromStorage(uri, commandName,id) look for the data with the Key ,id .If something exist, return the JSONFile corresponding to the key, else return undefined.
*   Version: 1.1
*   Tags:  JSON, Local Storage
**/

var StorageManager = {

	initialize : function(){
		if(!$.jStorage.storageAvailable()){
			this.store = {};
		}
		this.store = [];
		this.maxSize = 50;
	},
	pushToStorage : function (uri,commandName, JSONdata){
		var dataContainer = StorageManager.get(uri);
		
		if(dataContainer != null){
			if(!dataContainer.hasOwnProperty(commandName)){
				dataContainer[commandName] = JSONdata;
				StorageManager.controlSize();
				StorageManager.set(uri,dataContainer);
				
			}	
		}else{
			var newElement = {};
			newElement[commandName] = JSONdata;
			StorageManager.set(uri,newElement);
		}
	},
	pullFromStorage : function (uri){
        
		var dataContainer = StorageManager.get(uri);
		if(dataContainer != null){
			return dataContainer;
		}else{
		    return null;
		}
	},
	set : function(uri,dataContainer){
		if(this.store !== undefined){
			this.store[uri] = dataContainer;
		}else{
			$.jStorage.set(uri,JSON.stringify(dataContainer));
		}
	},
	get : function(uri){
		if(this.store !== undefined){
			return this.store[uri];
		}else{
			return JSON.parse($.jStorage.get(uri));
		}
	},
	controlSize : function (){
		if(this.store !== undefined){
			alert("javascript store : "+jQuery(this.store).size());
			console.log(this.store[0]);
			if(this.store.length > this.maxSize ){
			
			
			}
		}else{
			alert("cloud store : "+$.jStorage.index().length);
			if($.jStorage.index() > this.maxSize ){
			
				
			}
		}
	}
	
};










