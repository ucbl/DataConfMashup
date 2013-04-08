var SearchView = Backbone.View.extend({

  
	initialize: function (options){
		this.model = options.model;
		console.log($("#header").length);
		this.headerTpl = _.template($("#header").html());
		this.navBarTpl = _.template($("#navBar").html());
		this.contentTpl = _.template($("#searchPublication").html());
		this.footerTpl = _.template($("#footer").html());
	},
	open: function(){
		this.$el.show();
	},

	close: function(){
		this.$el.hide();
	},
	
	render: function(){
		$(this.el).append(this.headerTpl(this.model.toJSON()));
		$(this.el).append(this.navBarTpl(this.model.toJSON()));
		$(this.el).append(this.contentTpl(this.model.toJSON()));
		$(this.el).append(this.footerTpl(this.model.toJSON()));
	}

});