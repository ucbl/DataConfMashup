
/**   
*	Copyright <c> Claude Bernard - University Lyon 1 -  2013
* 	License : This file is part of the DataConf application, which is licensed under a Creative Commons Attribution-NonCommercial 3.0 Unported License. See details at : http://liris.cnrs.fr/lionel.medini/wiki/doku.php?id=dataconf&#licensing 
*   Author: Lionel MEDINI(supervisor), Florian BACLE, Fiona LEPEUTREC, Beno�t DURANT-DE-LA-PASTELLIERE, NGUYEN Hoang Duy Tan
*   Description: This file provide simple function to build jquery mobile element such as button or sorted list plus some graph first attempt
*   Version: 0.8
*   Tags:  Backbone Jquery-ui-mobile Adapter Linked-Data Graph html5 canvas
**/

var ViewAdapterText = ViewAdapter.Text ={

	generateContainer : function(page,commandName){
		//Creating the content box of the current command
		var contentEl = $('<div id="'+commandName+'"></div>');
		page.find(".content").append(contentEl);
    },
	/** function appendList :
	*  append filter list to current view using '$("[data-role = page]").find(".content")' selector (backbone)
	* @param dataList : result obj
	* @param baseHref : string url pattern for dynamic link generation (i.e. "#publication/")
	* @param hrefCllbck : parsing function to get href
	* @param labelProperty : string pattern to match with sparql result 'binding[name="'+bindingName+'"]'
	* @param optional option : object {
	*         autodividers : boolean add jquerymobileui autodividers
	*         count : boolean add count support for sparql endpoint 1.0 : require "ORDER BY ASC(?bindingName)" in the sparql query.
	*         parseUrl : parsing lat function => " parseUrl:function(url){return url.replace('foo',"")}
	*         show : array of object {  key=bindingName => Shown 'binding[name="'+bindingName+'"]'
	*             alt : binding name if label is empty
	*             parseAlt : parsing alt function (see parseUrl param)
	*          
	*/ 
	appendList : function(dataList,href,labelProperty,appendToDiv,graphPt,option){

		if(!option)var option = {};
		if(!href) var href={};
		//limit of results to enable the filter mode
		var isfilter = _.size(dataList) > 10 ? true : false; 

		var currentRank=0,counter=1;

		var bubble= option.count  ?   '<span class="ui-li-count">1</span>'    :   ''  ;  
		var ulContainer = $('<ul  id="SearchByAuthorUl" data-role="listview"'+ 
						  (option.autodividers ? 'data-autodividers="true"':'')+
						  (isfilter?'data-filter="true" ':'')+
						  'data-shadow="false"'+
						  'data-filter-placeholder="filter ..." class="ui-listview ui-corner-all"> ');
		
		$.each(dataList, function(i,currentData){
			var currentHref=href.baseHref+href.hrefCllbck(currentData);
			var currentLabel=currentData[labelProperty];
	   
			//count
			if(option.count && i!=0 ){
			
				var lastData =ulContainer.find('> li').eq(currentRank-1).children('a'); 
				
				if(currentLabel.replace(counter,'')==lastData.text().replace(counter,'')){ 
					//increment bubble
					counter=parseInt(ulContainer.find(' li:last-child span').html())+1;   
					ulContainer.find(' li:last-child span').html(counter);
					currentLabel=false;
				}else{counter=1;}
			}
			
			//show
			if(currentLabel){ 
				var a = $('<a href='+currentHref+' '+(isfilter?' ':'data-corners="true" data-role="button" data-iconpos="right" data-icon="arrow-r" data-mini="true" data-shadow="false"')+'>'+currentLabel+'</a>');
				var li = $('<li ></li>');
				if(isfilter){
					ulContainer.append(li.append(a).append($(bubble)))
				}else{
					appendToDiv.append(a);
				}   
				currentRank++;
			}
		 
		 
	   });//end each
	   if(isfilter)ulContainer.appendTo(appendToDiv);
	},



	// option { option.theme a|b|c , option.tiny : bool, option.align : right,option.prepend }
	appendButton: function(el,href,label,option){
		if(!href)return;
		if(!option)var option={}
		var newButton = 
			$(  '<a href="'+href+'" data-role="button" ' +
				(option.tiny  ? 'data-inline="true"'              : 'data-icon="arrow-r" data-iconpos="right"') +
				(option.theme ? 'data-theme="'+option.theme+'"'   : '') +
				(option.align ? 'style="float:'+option.align+';"' : '') +
				'data-shadow="false" data-mini="true">'+(label==""?href:label) +'</a>'); 
		if( option.prepend)
			el.prepend(newButton);
		else 
			el.append(newButton);
		return newButton;
	}
}








