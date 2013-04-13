


 $(document).ready(function() {
	
	//Loading templates from /templates directory
	tpl.loadTemplates(['header', 'footer', 'proceedingsSearch', 'navBar', 'home'], 
	
	function () {
		//Instantiate the router with configuration (see Configuration.js)
		var app_router = new AppRouter({configuration : Configuration});
		Backbone.history.start();
	});


  
});


