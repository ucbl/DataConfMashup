/**   
*	Copyright <c> Claude Bernard - University Lyon 1 -  2013
* 	License : This file is part of the DataConf application, which is licensed under a Creative Commons Attribution-NonCommercial 3.0 Unported License. See details at : http://liris.cnrs.fr/lionel.medini/wiki/doku.php?id=dataconf&#licensing 
*   Author: Lionel MEDINI(supervisor), Florian BACLE, Fiona LE PEUTREC, Benoît DURANT-DE-LA-PASTELLIERE, NGUYEN Hoang Duy Tan
*   Description: This object contains method for save and pick JSON file in local storage.
*				 The method pushToStorage(uri, commandName,JSONdata) check if data doesn't exist in local storage, in that case save data JSONData in paramaters with the key,id.
*				 The methode pullFromStorage(uri, commandName,id) look for the data with the Key ,id .If something exist, return the JSONFile corresponding to the key, else return undefined.
*   Version: 0.8
*   Tags:  JSON, Local Storage
**/

//Override method localStorage.getItem('id') and  localStorage.setItem('id',value) 

//Method saveInLocalStorage override localStorage.setItem('id',value) 
var StorageManager = {

	initialize : function(){
		this.dataContainer = {};
		
		//TODO : Mettre en place l'enregistrement des command effectuée pour pouvoir savoir si faut faire un requête dans le routeur
		this.commandLog = [];

	},
	pushToStorage : function (uri,commandName, JSONdata){
		
		
		//this.commandLog.push(commandName);
		if(this.dataContainer.hasOwnProperty(uri)){
			
			var existingData = this.dataContainer[uri];
			if(!this.dataContainer[uri].hasOwnProperty(commandName)){
				console.log("ENRICHING ELEMENT :");
				existingData[commandName] = JSONdata;
				//store.set(uri,existingData);
			}
			
		}else{
			console.log("SAVING ELEMENT :");
			var newElement = {};
			newElement.push(JSONdata);
			
			this.dataContainer[uri] = newElement;
			//store.set(uri,newElement);
		}
	},

   pullFromStorage : function (uri, commandName){
  
		
		
		if(this.dataContainer.hasOwnProperty(uri)){
			var existingData = this.dataContainer[uri];
			if(existingData.hasOwnProperty(commandName)){
				
				return existingData ;
			}else{
				return null;
			}
		}else{
		    return null;
		}
	}
	
	
	
	
};










