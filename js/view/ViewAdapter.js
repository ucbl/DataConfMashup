/**   
* Copyright <c> Claude Bernard - University Lyon 1 -  2013
*  License : This file is part of the DataConf application, which is licensed under a Creative Commons Attribution-NonCommercial 3.0 Unported License. See details at : http://liris.cnrs.fr/lionel.medini/wiki/doku.php?id=dataconf&#licensing 
*   Author: Lionel MEDINI(supervisor), Florian BACLE, Fiona LEPEUTREC, Benoît DURANT-DE-LA-PASTELLIERE, NGUYEN Hoang Duy Tan
*   Description: This file provide simple function to build jquery mobile element such as button or sorted list plus some graph first attempt
*   Version: 1.1
*   Tags:  Backbone Jquery-ui-mobile Adapter 
**/


 (function(){

var ViewAdapter;
var root = this;
ViewAdapter = root.ViewAdapter = {};

var isTextMode = true;

var textView = []; //Array of JQuery objects

var graphBtnCtn ;
var switchViewBtn ;
var btnShowGraph = 'View as graph';
var btnShowText = 'View as text';  
var graphView ;
var uri ; 

ViewAdapter.init = function(el,url){
		uri = url;
    graphView = el;
    
    //init graph 
    ViewAdapter.Graph.init(el,uri); 
    
		var btnlabel= ( ViewAdapter.Graph.enabled  ?    ViewAdapter.Graph.btnHideLabel : ViewAdapter.Graph.btnShowLabel );
		console.log(el);
		switchViewBtn = ViewAdapter.appendButton(el,'javascript:void(0)',btnlabel,{tiny:true,theme:"a",prepend:true, align : "right",margin: "20px"}) ;
		switchViewBtn.css("margin"," 0px");   
		switchViewBtn.css("z-index","20"); 
		switchViewBtn.trigger("create");
		var parent = el.parent();
		el.show();
		
      switchViewBtn.toggle(function(){  
            console.log("-----VIEW TEXT------"); 
          $(this).find('.ui-btn-text').html("View as text");
          $(ViewAdapter.Graph.canvas).show("slow");
          parent.children().not(el).hide("slow");
         isTextMode = true;
		     ViewAdapter.Graph.render(); 
          
        },function(){ 
            console.log("-----VIEW GRAPH------"); 
          $(ViewAdapter.Graph.canvas).hide("slow"); 
          parent.children().not(el).show("slow");
         
          $(this).find('.ui-btn-text').html("View as graph");
         isTextMode = false;
		     ViewAdapter.Graph.render(); 
      });   
      
      if(!isTextMode){
        switchViewBtn.trigger('click');
      }
      
      $(ViewAdapter.Graph.sys.renderer).on('navigate',function(event,data){
            console.log("-----BROWSE RDF------"); 
         isTextMode = false;
            //move to page
            if(data.href!=undefined)document.location.href = data.href;
            
      });
		 /* 
    //btn
    graphBtnCtn = prependToBackboneView($('<div id="graphBtnCtn"></div>'));
		switchViewBtn = appendButton(graphBtnCtn,'javascript:void(0)',btnShowGraph,{tiny:true,theme : "a",prepend:true, align : "right"}); 
		//console.log(graphView);
		//console.log(switchViewBtn);
		switchViewBtn.css("margin"," 0px");   
		switchViewBtn.css("z-index","20"); 
		switchViewBtn.trigger("create"); 
		switchViewBtn.click(function(event){
		  ViewAdapter.switchMode();
		});
		
		
		showMode();*/
};

//make the switch
var showMode= function(){
  var brother = graphView.siblings().not(graphBtnCtn);
	ViewAdapter.render(); 
		if(isTextMode){
      //text mode
			$(root.Graph.canvas).hide("slow"); 
			brother.show("slow"); 
			switchViewBtn.find('.ui-btn-text').html(btnShowGraph);
			
		}else{ 
		 
      //graph mode
			switchViewBtn.find('.ui-btn-text').html(btnShowText);
			graphView.show("slow"); 
			graphView.find(' > canvas').show("slow"); 
			brother.hide("slow");
		}
};


var switchMode = ViewAdapter.switchMode = function(force){
  if(force!=undefined)
    isTextMode = force;
  else 
    isTextMode = (!isTextMode);
    
};


var render = ViewAdapter.render = function(){ 
console.log('render isTextMode ?');
console.log(isTextMode);

  if( isTextMode){
    for (var i=0; i< textView.length;i++){
      $(textView[i].appendToDiv).append(textView[i].content);
    }

    $("[data-role = page]").trigger("create");

  }else{
      ViewAdapter.Graph.render();
  }
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
var appendList = ViewAdapter.appendList = function(dataList,href,labelProperty,appendToDiv,graphPt,option){

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
			//graph node
			if(graphPt){
				var nodeLabel = graphPt.labelCllbck(currentData);
				ViewAdapter.Graph.addNode(nodeLabel,currentHref);
			}
			var a = $('<a href='+currentHref+' '+(isfilter?' ':'data-corners="true" data-role="button" data-iconpos="right" data-icon="arrow-r" data-shadow="false"')+'>'+currentLabel+'</a>');
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
}



// option { option.theme a|b|c , option.tiny : bool, option.align : right,option.prepend }
var appendButton = ViewAdapter.appendButton = function(el,href,label,option){
    if(!href)return;
    if(!option)var option={}
    var newButton = 
        $(  '<a href="'+href+'" data-role="button" ' +
            (option.tiny  ? 'data-inline="true"'              : 'data-icon="arrow-r" data-iconpos="right"') +
            (option.theme ? 'data-theme="'+option.theme+'"'   : '') +
            (option.align ? 'style="float:'+option.align+';"' : '') +
            'data-shadow="false">'+(label==""?href:label) +'</a>'); 
	el.append(newButton);
    return newButton;
};


	/************ basic append functions ************/

	var appendToBackboneView = ViewAdapter.appendToBackboneView=function(div){
		if(!div)return;
		var el=$(div)
		$("[data-role = page]").find(".content").append(el); 
		return el;
	};

	var prependToBackboneView = ViewAdapter.prependToBackboneView=function(div){
		if(!div)return;
		var el=$(div)
		$("[data-role = page]").find(".content").prepend(el);
		return el;
	};

}).call(this);





/* toggle fix*/
jQuery.fn.toggle = function( fn, fn2 ) {
  // Don't mess with animation or css toggles
  if ( !jQuery.isFunction( fn ) || !jQuery.isFunction( fn2 ) ) {
    return oldToggle.apply( this, arguments );
  }
  // migrateWarn("jQuery.fn.toggle(handler, handler...) is deprecated");
  // Save reference to arguments for access in closure
  var args = arguments,
  guid = fn.guid || jQuery.guid++,
  i = 0,
  toggler = function( event ) {
    // Figure out which function to execute
    var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
    jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );
    // Make sure that clicks stop
    event.preventDefault();
    // and execute the function
    return args[ lastToggle ].apply( this, arguments ) || false;
  };
  // link all the functions, so any of them can unbind this click handler
  toggler.guid = guid;
  while ( i < args.length ) {
    args[ i++ ].guid = guid;
  }
  return this.click( toggler );
};


