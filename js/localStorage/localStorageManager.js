/**   
*	Copyright <c> Claude Bernard - University Lyon 1 -  2013
* 	License : This file is part of the DataConf application, which is licensed under a Creative Commons Attribution-NonCommercial 3.0 Unported License. See details at : http://liris.cnrs.fr/lionel.medini/wiki/doku.php?id=dataconf&#licensing 
*   Author: Lionel MEDINI(supervisor), Florian BACLE, Fiona LE PEUTREC, Benoît DURANT-DE-LA-PASTELLIERE, NGUYEN Hoang Duy Tan
*   Description: This object contains method for save and pick JSON file in local storage.
*	The method saveInLocalStorage(id,JSONdata) check if data doesn't exist in local storage, in that case save data JSONData in paramaters with the key,id.
*	The methode getFromLocalStorage(id) look for the data with the Key ,id .If something exist, return the JSONFile corresponding to the key, else return undefined.
*   Version: 0.8
*   Tags:  JSON, Local Storage
**/

//Override method localStorage.getItem('id') and  localStorage.setItem('id',value) 

//Method saveInLocalStorage override localStorage.setItem('id',value) 

function saveInLocalStorage(id,JSONdata){

	if(localStorage.getItem(id) !== undefined){//If object doesn't already exist in local storage then
			localStorage.setItem(id,JSON.stringify(JSONData));//save JSON object with the id :id
		
	}

}

function getFromLocalStorage(id){

		if(localStorage.getItem(id) !== undefined){
			var returnData = localStorage.getItem(id) ;
				return JSON.parse(returnData);
		}else{
			   return undefined;
		}
	
}










