
AppRouter = Backbone.Router.extend({

		initialize: function (options){
			var self = this;
			this.configuration = options.configuration;
			
			this.conference = this.configuration.conference;
			this.datasources = this.configuration.datasources;
			this.routes = this.configuration.routes;

			$.each(this.datasources,function(i,datasourceItem){

				/*self.on(this.hash, function(this.parameters) {
					
				});*/  
				//A voir : le fichier SWDFCommandStore.js a changé le syntaxe ;)
				//console.log(this.commands.getAuthor.ge tQuery({trackUri:"pop"})); 
				//JSON.parse(this.commands.getAuthor.getQuery);

			});
		
		    $.each(this.routes,function(i,routeItem){
				
				self.route(routeItem.hash, function() {
					
					alert("pop");
					self.changePage(new HomeView({ model : this.conference}));
				});
			});
		
			this.firstPage = true;
	
		},
		
		/************************************************      ROUTES         **************************************/
        routes: {
          
            "search/:entity": "loadView",  
        },
		
		/************************************************      ACTIONS        **************************************/
		home: function (){
			
			//this.SWDFManager.getAuthor();
		},
		loadView: function (entity){
		    switch (entity) 
            { 
            case "event": 
			    this.changePage(new EventSearchView({ model : this.conference})); 
            break;  
            default: 
			    this.changePage(new HomeView({ model : this.conference}));
            break; 
            } 
		},
		/*
		loadView: function (){
		alert(route + "_" + action); // dashboard_graph
		    
			this.changePage(new HomeView({ model : this.conference}));
			//this.SWDFManager.getAuthor();
		}, */
		
		
		/************************************************      PAGE CHANGE HANDLERS            **************************************/
		
		 changePage:function (page) {
		   $(page.el).attr('data-role', 'page');
			page.render();
			$('body').append($(page.el));
			var transition = $.mobile.defaultPageTransition;
		
			if (this.firstPage) {
				transition = 'fade';
				this.firstPage = false;
			}
			$.mobile.changePage($(page.el), {changeHash:false, transition: transition});
			
   
		
		},
		
		executeCommand: function (command) {
		
			jQuery.support.cors = this.corsEnable;
			
			$.ajax({
				url: this.sparqlEndPointURL,
				type: this.method,
				cache: this.cache,
				dataType: this.dataType,
				data: query,							
				success:command.callback,
				error: function(jqXHR, textStatus, errorThrown) { 
					alert(errorThrown);
				}
			});
		}
	
		
		
		
});
