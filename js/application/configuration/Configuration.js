 var Configuration = {
			"conference" : {
				"name": "example glossary",
				"logoUri": "http://data.semanticweb.org/images/logo_www2012.jpg",
				"baseUri": "http://data.semanticweb.org/www/2012",
			},
			
			"datasources" : {
			    "conferenceDatasource" : {
					"uri" : "http://data.semanticweb.org/sparql",
					"crossDomainMode" : "Cors",
					"commands" : SWDFCommandStore,
					
				},
				
				"publicationDatasource" : {
					"Uri" : "http://data.semanticweb.org/sparql",
					"crossDomainMode" : "Cors",
					"commands" : "conferenceDatasourceCommands",
				},
				"webDatasource" : {   
					"Uri" : "http://api.duckduckgo.com/",
					"crossDomainMode" : "JSONP",
					"commands" : "conferenceDatasourceCommands",
				},
				
				 "eventDatasource": {   
					"Uri" : "http://calendar.labs.idci.fr/api/schedule_event.jsonp?",
					"crossDomainMode" : "JSONP",
					"commands" : "conferenceDatasourceCommands",
				}
			}, 
			"routes" : {
			    "Home" : { 
					"hash" : "",
					"view" : "#home",
					"commands" : [
						{
							"datasource" : "conferenceDatasource",
							"name" : "getEvent",
						}
					]
				},
				"Proceedings-search" : { 
					"hash" : "proceedings-search",
					"view" : "#proceedings-search", 
				},
				"Proceedings-search-By-author" : { 
					"hash" : "proceedings-search/by-author",
					"view" : "#searchFormAuthor",
					"commands" : [
						{
							"datasource" : "conferenceDatasource",
							"name" : "getEvent",
						}
					]
				},
				"Person" : {
					"hash" : "Person/:id",
					"view" : "PersonView",
					"commands" : [
					    {
							"datasource" : "conferenceDatasource",
							"name" : "getPublications",
						},
						
						{
							"datasource" : "publicationDatasource",
							"name" : "getPublications",
						},
						
						{
							"datasource" : "publicationDatasource",
							"name" : "getPublications",
						}
					]
				}
			}
		};
