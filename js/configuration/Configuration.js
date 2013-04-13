 var Configuration = {
			"conference" : {
				"name": "ISWC 2012",
				"logoUri": "http://iswc2012.semanticweb.org/sites/default/files/iswc_logo.jpg",
				"baseUri": "http://data.semanticweb.org/conference/iswc/2012",
			},
			
			"datasources" : {
				"SemanticWebDogFoodDatasource" : {
					"uri" : "http://data.semanticweb.org/sparql",
					"crossDomainMode" : "CORS",
					"commands" : SWDFCommandStore, 
				},
				
				"DblpDatasource" : {
					"uri" : "http://dblp.l3s.de/d2r/sparql",
					"crossDomainMode" : "JSONP",
					"commands" : DBLPCommandStore,
				},

				"DuckDuckGoDatasource" : {   
					"uri" : "http://api.duckduckgo.com/",
					"crossDomainMode" : "JSONP",
					"commands" : DDGoCommandStore,
				},
				
				"GoogleDataSource" : {   
					"uri" : "https://ajax.googleapis.com/ajax/services/search/web",
					"crossDomainMode" : "JSONP",
					"commands" : GoogleCommandStore,
				},
				
				"eventDatasource" : {
					"uri" : "http://calendar.labs.idci.fr/api/schedule_event.jsonp?",
					"crossDomainMode" : "JSONP",
					"commands" : "conferenceDatasourceCommands",
				}

			}, 
			"routes" : {
			    "Home" : { 
					"hash" : "",
					"view" : "home",
					"title": "ISCW - publications",
					"commands" : [ 
						{
						    "datasource" : "SemanticWebDogFoodDatasource",
						    "name" : "getConferenceMainEvent",
						}
					]
				}, 
			    "Proceedings-search" : { 
					"hash" : "proceedings-search",
					"view" : "proceedingsSearch",
					"title": "Search in proceedings",
					"commands" : [
					]
				},
			    "Proceedings-search-by-author" : { 
					"hash" : "proceedings-search/by-author",
					"view" : "searchFormAuthor",
					"title": "Search by author",
					"commands" : [
					    {
							"datasource" : "SemanticWebDogFoodDatasource",
							"name" : "getAllAuthors",
						} 
					]
				},
			    "Proceedings-search-author" : { 
					"hash" : "proceedings-search/author-:author",
					"view" : "searchFormAuthorProceedings",
					"title": "Author publications",
					"commands" : [
					    {
							"datasource" : "SemanticWebDogFoodDatasource",
							"name" : "getAuthorsProceedings",
						} 
					]
				},
			    "Proceedings-search-by-keyword" : { 
					"hash" : "proceedings-search/by-keyword",
					"view" : "searchFormKeyword",
					"title": "Search by keywords",
					"commands" : [
					    {
							"datasource" : "SemanticWebDogFoodDatasource",
							"name" : "getAllKeyword",
						} 
					]
				},
			    "Proceedings-search-by-title" : { 
					"hash" : "proceedings-search/by-title",
					"view" : "searchFormTitle",
					"title": "Search by title",
					"commands" : [
					    {
							"datasource" : "SemanticWebDogFoodDatasource",
							"name" : "getAllTitle",
						} 
					]
				},
				"Event" : { 
					"hash" : "event/*id",
					"view" : "event",
					"title": "Search in event",
					"commands" : [
						{
							"datasource" : "SemanticWebDogFoodDatasource",
							"name" : "getEvent",
						},
						{
							"datasource" : "SemanticWebDogFoodDatasource",
							"name" : "getSubEvent",
						
						},
						{
							"datasource" : "SemanticWebDogFoodDatasource",
							"name" : "getEventPublications",
						}
					]
				},
				"Publication" : { 
					"hash" : "publication/:id",
					"view" : "publication",
					"title": "Publication",
					"commands" : [
						{
							"datasource" : "SemanticWebDogFoodDatasource",
							"name" : "getPublicationInfo",
						},
						{
							"datasource" : "SemanticWebDogFoodDatasource",
							"name" : "getPublicationAuthor",
						},	
						{
							"datasource" : "SemanticWebDogFoodDatasource",
							"name" : "getPublicationKeywords",
						},
						{
							"datasource" : "SemanticWebDogFoodDatasource",
							"name" : "getRdfGraphFromPublicationTitle",
						} 
					]
				},
				"Person" : {
					"hash" : "Person/:id",
					"view" : "PersonView",
					"title": "Person",
					"commands" : [
					    {
							"datasource" : "SemanticWebDogFoodDatasource",
							"name" : "getPublications",
						},
						
						{
							"datasource" : "DblpDatasource",
							"name" : "getPublications",
						},
						
						{
							"datasource" : "DblpDatasource",
							"name" : "getPublications",
						},
					]
				},
				"Author" : {
					"hash" : "author/:id",
					"view" : "author",
					"title": "Author",
					"commands" : [
					    {
							"datasource" : "DblpDatasource",
							"name" : "getAuthor",
						},
						{
							"datasource" : "SemanticWebDogFoodDatasource",
							"name" : "getAuthorsProceedings",
						},
						{
							"datasource" : "SemanticWebDogFoodDatasource",
							"name" : "getAuthorOrganization",
						},
						{
							"datasource" : "DuckDuckGoDatasource",
							"name" : "getResultAuthor",
						},
						{
							"datasource" : "GoogleDataSource",
							"name" : "getAuthorPersonalPage",
						}
					]
				},
				"ExternPublication" : {
					"hash" : "externPublication/:id",
					"view" : "externPublication",
					"title": "External publication",
					"commands" : [
					    {
							"datasource" : "DblpDatasource",
							"name" : "getExternPublicationInfo",
						}
					]
				},
				"Keyword" : {
					"hash" : "keyword/:id",
					"view" : "keyword",
					"title": "Keyword",
					"commands" : [
					    {
							"datasource" : "SemanticWebDogFoodDatasource",
							"name" : "getPublicationsByKeyword",
						}
					]
				},
				"Organization" : {
					"hash" : "organization/:id",
					"view" : "organization",
					"title": "Organization",
					"commands" : [
					    {
							"datasource" : "SemanticWebDogFoodDatasource",
							"name" : "getOrganization",
						},
						{
							"datasource" : "DuckDuckGoDatasource",
							"name" : "getResultOrganization",
						}
					]
				}
			}
		};
