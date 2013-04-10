
AppRouter = Backbone.Router.extend({

		initialize: function (options){
			var self = this;
			this.configuration = options.configuration;
			
			this.conference = this.configuration.conference;
			this.datasources = this.configuration.datasources;
			this.routes = this.configuration.routes;

			$.each(this.datasources,function(i,datasourceItem){
				console.log("******* DATASOURCES ********");
				console.log(datasourceItem);
				/*self.on(this.hash, function(this.parameters) {
					
				});*/  
				//A voir : le fichier SWDFCommandStore.js a changé le syntaxe ;)
				//console.log(this.commands.getAuthor.ge tQuery({trackUri:"pop"})); 
				//JSON.parse(this.commands.getAuthor.getQuery);

			});
		
		    $.each(this.routes,function(i,routeItem){
				
				/*self.route(routeItem.hash, function(id) {
					//console.log(Route : routeItem.name);
					self.changePage(new AbstractView({contentEl :  routeItem.view , model : self.conference}));
					
					$.each(routeItem.commands,function(i,commandItem){
					console.log(commandItem.name);
					var getQuery = self.datasources[commandItem.datasource].commands[commandItem.name].getQuery);
					getQuery({trackUri:"pop"});
						//this.executeCommand(.commands.[commandItem.name];
					});
				});*/
			});
		
			this.firstPage = true;
	
		},
		
		/************************************************      ROUTES         **************************************/
        routes: {
          
            "search/:entity": "loadView",  
        },
		
		/************************************************      ACTIONS        **************************************/
		loadView: function (entity){
			
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
