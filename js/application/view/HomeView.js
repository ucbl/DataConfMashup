var HomeView = Backbone.View.extend({

  
	initialize: function (options){
		this.model = options.model;
		this.headerTpl = _.template($("#header").html());
		this.contentTpl = _.template($("#home").html());
		this.footerTpl = _.template($("#footer").html());
	},
	open: function(){
		this.$el.show();
	},

	close: function(){
		this.$el.hide();
	},
	
	render: function(){
		$(this.el).append(this.headerTpl(this.model));
		$(this.el).append(this.contentTpl(this.model));
		$(this.el).append(this.footerTpl(this.model));
	}

});