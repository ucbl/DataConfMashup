
AppRouter = Backbone.Router.extend({

		initialize: function (options){
			var self = this;
			this.configuration = options.configuration;
			
			this.conference = this.configuration.conference;
			this.datasources = this.configuration.datasources;
			this.routes = this.configuration.routes;

			$.each(this.datasources,function(i,itemDatasource){
				console.log("******* DATASOURCE ********");
				console.log(itemDatasource);

			});
		
		/************************************************      ROUTES         **************************************/ 
		    $.each(this.routes,function(i,routeItem){
				

				self.route(routeItem.hash, function(id) {
				
					self.changePage(new AbstractView({contentEl :  routeItem.view , model : self.conference}));
						
					$.each(routeItem.commands,function(i,commandItem){
						console.log("CAll : "+commandItem.name+" ON "+commandItem.datasource);
						var currentDatasource = self.datasources[commandItem.datasource];
						var currentCommand    = currentDatasource.commands[commandItem.name];
						console.log(commandItem);
						console.log(commandItem.name);
						console.log(currentDatasource);
						var currentQuery = currentCommand.getQuery({ conferenceUri : self.conference.baseUri, id : id });
						self.executeCommand({datasource : currentDatasource, command : currentCommand, query : currentQuery});
						
					});
					
				});
			});
	  
			this.firstPage = true;
	
		},
		
		
		/************************************************      ACTIONS        **************************************/
		 
		
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
		
		executeCommand: function (parameters) {
			
			
			var datasource = parameters.datasource;
			var command    = parameters.command;
			var query      = parameters.query;
			
			if(datasource.crossDomainMode == "CORS"){
				
				jQuery.support.cors = true;
			}else{
				jQuery.support.cors = false;
			}
			
		
			console.log(command);
			$.ajax({
				url: datasource.uri,
				type: command.method,
				cache: false,
				dataType: command.dataType,
				data: {query : query },							
				success:command.ModelCallBack,
				error: function(jqXHR, textStatus, errorThrown) { 
					alert(errorThrown);
				}
			});
		}
	
		
		
		
});
