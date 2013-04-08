
AppRouter = Backbone.Router.extend({

		initialize: function (options){
		
			
			this.conference = new Conference({ name: "www2012", logoUri: "http://data.semanticweb.org/images/logo_www2012.jpg"});
		
	
			//this.swdfDatasource = new SparqlEndPoint ({ uri : "semanticwebdofood/", method:"GET", cache : false, dataType : "XML", xDomainMode : "JSONP"});
			//this.evenCalDatasource = new RestWebService ({ uri : "simpleSchedul/", method:"GET", cache : false, dataType : "XML", xDomainMode : "JSONP"});
			//this.dblpDatasource = new SparqlEndPoint ({ uri : "dblp/", method:"GET", cache : false, dataType : "XML", xDomainMode : "JSONP"});
			
			
			
			this.firstPage = true;
	
		},
		
		/************************************************      ROUTES         **************************************/
        routes: {
            "": "home",
            "search" : "searchChoice",
			"search/:id" : "searchForm",
		
        },
		
		/************************************************      ACTIONS        **************************************/
		home: function (){
			this.changePage(new HomeView({ model : this.conference}));
			this.SWDFManager.getAuthor();
		},
		
		searchChoice: function (){
			this.changePage(new SearchView({ model : this.conference}));
		},
		
		searchForm: function (id){
			this.changePage(new SearchForm({ model : this.conference}));
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
		
		executeCommand: function (command,callback) {
		
			jQuery.support.cors = this.corsEnable;
			
			$.ajax({
				url: this.sparqlEndPointURL ,
				type: this.method,
				cache: this.cache,
				dataType: this.dataType,
				data: query,							
				success:callback,
				error: function(jqXHR, textStatus, errorThrown) { 
					alert(errorThrown);
				}
			});
		}
	
		
		/*app_router.on('route:Home', function (id) {
        // Note the variable in the route definition being passed in here
        alert( "display" + id );   
		});
		app_router.on('route:defaultRoute', function (actions) {
			alert( actions ); 
		});*/
});