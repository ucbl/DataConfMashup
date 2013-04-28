/**   
* Copyright <c> Claude Bernard - University Lyon 1 -  2013
*  License : This file is part of the DataConf application, which is licensed under a Creative Commons Attribution-NonCommercial 3.0 Unported License. See details at : http://liris.cnrs.fr/lionel.medini/wiki/doku.php?id=dataconf&#licensing 
*   Author: Lionel MEDINI(supervisor), Florian BACLE, Fiona LEPEUTREC, Benoît DURANT-DE-LA-PASTELLIERE, NGUYEN Hoang Duy Tan
*   Description: This file provide simple function to build jquery mobile element such as button or sorted list plus some graph first attempt
*   Version: 1.1
*   Tags:  Backbone Jquery-ui-mobile Adapter 
**/
var ViewAdapter = {

	initialize : function(mode){
		ViewAdapter.mode = mode;
	},
	update : function(template,title,conference,datasources,commands,uri,name){
		ViewAdapter.currentPage = ViewAdapter.changePage(new AbstractView({templateName :  template ,title : title, model : conference }));
		ViewAdapter.template = template;
		ViewAdapter.title = title;
		ViewAdapter.conference = conference;
		ViewAdapter.datasources = datasources;
		ViewAdapter.commands = commands;
		ViewAdapter.uri = uri;
		ViewAdapter.name = name;
		ViewAdapter.initPage();
		return ViewAdapter.currentPage ;
		
	},

	/** Chaning page handling, call the rendering of the page and execute transition **/
	changePage : function (page, transitionEffect) {
		
		$(page.el).attr('data-role', 'page');
		page.render();
		$('body').append($(page.el));
		var transition = $.mobile.defaultPageTransition;
		if(transitionEffect !== undefined){
			transition = transitionEffect;
		}
		$.mobile.changePage($(page.el), {changeHash:false, transition: transition,reverse : true});
		
		$(page.el).bind('pagehide', function(event, data) {
			$(event.currentTarget).remove();
		});
		
		return $(page.el);
	},
	
	initPage : function (){
		
		if(ViewAdapter.mode == "text"){
			ViewAdapter.addswitchButton();
			$.each(ViewAdapter.commands,function(i,commandItem){
				ViewAdapter.Text.generateContainer(ViewAdapter.currentPage,commandItem.name);	
			});
		}else{
			ViewAdapter.currentPage.find(".content").empty();
			ViewAdapter.addswitchButton();
			ViewAdapter.Graph.initContainer(ViewAdapter.currentPage.find(".content"),ViewAdapter.uri);
		}
	},
	addswitchButton : function (){
		var btnLabel = "";
		if(ViewAdapter.mode == "text"){
			btnlabel = "Graph View";
		}else{
			btnlabel = "Text View";
		}

		switchViewBtn = ViewAdapter.Text.appendButton(ViewAdapter.currentPage.find(".content"),'javascript:void(0)',btnlabel,{tiny:true,theme:"a",prepend:true, align : "right",margin: "20px"}) ;
		switchViewBtn.css("margin"," 0px");   
		switchViewBtn.css("z-index","20"); 
		switchViewBtn.trigger("create");

		switchViewBtn.click(function(){  
			ViewAdapter.changeMode();
		});
	},
	changeMode : function(){
	
		if(ViewAdapter.mode == "text"){
			ViewAdapter.mode = "graph";
		}else{
			ViewAdapter.mode = "text";
		}
		ViewAdapter.currentPage = ViewAdapter.changePage(new AbstractView({templateName :  ViewAdapter.template ,title : ViewAdapter.title, model : ViewAdapter.conference }), "flip");
		ViewAdapter.initPage();
		
		var JSONdata = StorageManager.pullFromStorage(ViewAdapter.uri);
		$.each(ViewAdapter.commands,function(i,commandItem){
		
			var currentDatasource = ViewAdapter.datasources[commandItem.datasource];
			var currentCommand    = currentDatasource.commands[commandItem.name];
			
			
			if(JSONdata != null){
				if(JSONdata.hasOwnProperty(commandItem.name)){
					
					currentCommand.ViewCallBack({JSONdata : JSONdata[commandItem.name],contentEl : ViewAdapter.currentPage.find("#"+commandItem.name), name : ViewAdapter.name});
				}
			}
		});
		
		ViewAdapter.generateJQMobileElement();
		if(ViewAdapter.mode == "graph")ViewAdapter.Graph.render();
	},
	
	generateJQMobileElement : function(){
		ViewAdapter.currentPage.trigger("create");
	}
	
};

