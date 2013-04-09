
AppRouter = Backbone.Router.extend({

		initialize: function (options){
			var self = this;
			this.configuration = options.configuration;
			
			this.conference = this.configuration.conference;
			this.datasources = this.configuration.datasources;
			this.routes = this.configuration.routes;
			
		    $.each(this.routes,function(i){
		    console.log(this.hash);
		    
		    /*
				self.on(this.hash, function(this.parameters) {
				*/
					 
				});
			this.firstPage = true;
	
		},
		
		/************************************************      ROUTES         **************************************/
        routes: {
            "": "home",
            "event-search": "eventSearch",
            ":route/:action": "loadView",
		
        },
		
		/************************************************      ACTIONS        **************************************/
		home: function (){
			this.changePage(new HomeView({ model : this.conference}));
			//this.SWDFManager.getAuthor();
		},
		eventSearch: function (){
			this.changePage(new EventSearchView({ model : this.conference}));
			//this.SWDFManager.getAuthor();
		},
		loadView: function (){
		alert(route + "_" + action); // dashboard_graph
		    
			this.changePage(new HomeView({ model : this.conference}));
			//this.SWDFManager.getAuthor();
		}, 
		
		
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
				url: this.sparqlEndPointURL ,
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
