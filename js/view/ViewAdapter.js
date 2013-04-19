/**   
* Copyright <c> Claude Bernard - University Lyon 1 -  2013
*  License : This file is part of the DataConf application, which is licensed under a Creative Commons Attribution-NonCommercial 3.0 Unported License. See details at : http://liris.cnrs.fr/lionel.medini/wiki/doku.php?id=dataconf&#licensing 
*   Author: Lionel MEDINI(supervisor), Florian BACLE, Fiona LEPEUTREC, Benoît DURANT-DE-LA-PASTELLIERE, NGUYEN Hoang Duy Tan
*   Description: This file provide simple function to build jquery mobile element such as button or sorted list plus some graph first attempt
*   Version: 1.0
*   Tags:  Backbone Jquery-ui-mobile Adapter 
**/


 (function(){

var ViewAdapter;
var root = this;
ViewAdapter = root.ViewAdapter = {};





// option { option.theme a|b|c , option.tiny : bool, option.align : right,option.prepend }
var appendButton = ViewAdapter.appendButton = function(el,href,label,option){
    if(!href)return;
    if(!option)var option={}
    var newButton = 
        $(  '<a href="'+href+'" data-role="button" ' +
            (option.tiny?'data-inline="true"':'data-icon="arrow-r" data-iconpos="right"') +
            (option.theme?'data-theme="'+option.theme+'"':'') +
   (option.align?'style="float:'+option.align+';"':'') +
            '>'+(label==""?href:label) +'</a>'); 
 el.append(newButton);
    return newButton;
};


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
  
  // /*
var appendList = ViewAdapter.appendList = function(dataList,baseHref,hrefCllbck,labelProperty,appendToDiv,graphPt,option){
      console.log(dataList);console.log(baseHref);console.log(hrefCllbck);console.log(labelProperty);console.log(appendToDiv);console.log(graphPt);console.log(option);
      if(!option)var option = {};
      
      var isfilter = _.size(dataList) > 10 ? true : false;
      var what, to ;
      var currentRank=0,counter=1;
      
      var bubble= option.count  ?   '<span class="ui-li-count">1</span>'    :   ''  ;  
      var ulContainer = $('<ul  id="SearchByAuthorUl" '+
                  (option.autodividers?'data-autodividers="true"':'')+
                  ' data-role="listview" '+
                  (_.size(dataList) > 10?'data-filter="true" ':'')+
                  'data-filter-placeholder="filter ..." class="ui-listview ui-corner-all ui-shadow"> ');
                  
   $.each(dataList, function(i,currentData){
     var currentHref=baseHref+hrefCllbck(currentData);
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
        
          //graph node
          if(graphPt){
         var nodeLabel = graphPt.labelCllbck(currentData);
         ViewAdapter.Graph.addNode(nodeLabel,currentHref);
       }
          ulContainer.append(
                  $('<li></li>').append(
                      $('<a href='+currentHref+'>'+currentLabel+'</a>')
                                 .append($(bubble)))) ;
         currentRank++;
        }
     
     
   });//end each
       ulContainer.appendTo(appendToDiv);
}
 


        /************ basic append functions ************/

		var appendToBackboneView = ViewAdapter.appendToBackboneView=function(div){
			if(!div)return;
			var el=$(div)
			$("[data-role = page]").find(".content").append(el).trigger("create"); 
			return el;
		};

		var prependToBackboneView = ViewAdapter.prependToBackboneView=function(div){
			if(!div)return;
			var el=$(div)
			$("[data-role = page]").find(".content").prepend(el).trigger("create");
			return el;
		};
}).call(this);