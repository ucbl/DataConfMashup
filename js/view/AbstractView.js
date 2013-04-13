var AbstractView = Backbone.View.extend({

  
	initialize: function (options){
	
		this.title = options.title;

		this.model = options.model;
	
		this.headerTpl = _.template(tpl.get("header"));
		this.navBarTpl = _.template(tpl.get("navBar"));
		
		this.contentEl = options.contentEl;
	
		if(tpl.get(this.contentEl)!== undefined){
			this.contentTpl = _.template(tpl.get(this.contentEl));
		}else{
			this.contentTpl =  _.template('<article><section class="content"></section></article>');
		}
		
		this.footerTpl = _.template(tpl.get("footer"));
	},

	
	render: function(){
	
		$(this.el).append(this.headerTpl({conference : this.model, title : this.title} ));
		$(this.el).append(this.navBarTpl());
		$(this.el).append(this.contentTpl());
		$(this.el).append(this.footerTpl());
	}

});
