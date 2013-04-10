 var Configuration = {
			"conference" : {
				"name": "example glossary",
				"logoUri": "http://data.semanticweb.org/images/logo_www2012.jpg",
				"baseUri": "http://data.semanticweb.org/www/2012",
			},
			
			"datasources" : [{
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
				
				"eventDatasource" : {
					"Uri" : "http://calendar.labs.idci.fr/api/schedule_event.jsonp?",
					"crossDomainMode" : "JSONP",
					"commands" : "conferenceDatasourceCommands",
				}
			}],
			
			"routes" : [
				{
					"route" : "Home",
					"hash" : "",
					"view" : "#home",
					"commands" : [
						{
							"datasource" : "conferenceDatasource",
							"name" : "getAuthor",
						}
					]
				},
				{
					"hash" : "Person/:id",
					"view" : "PersonView",
					"commands" : {
						"command" : {
							"datasource" : "conferenceDatasource",
							"name" : "getPublications",
						},
						
						"command" : {
							"datasource" : "publicationDatasource",
							"name" : "getPublications",
						},
						
						"command" : {
							"datasource" : "publicationDatasource",
							"name" : "getPublications",
						}
					}
				}
			]
		};
