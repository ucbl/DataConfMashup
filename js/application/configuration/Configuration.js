 var Configuration = {
			"conference" : {
				"name": "example glossary",
				"logoUri": "http://data.semanticweb.org/images/logo_www2012.jpg",
				"baseUri": "http://data.semanticweb.org/www/2012",
			},
			
			"datasources" : {
				"datasource" : {
					"id"  : "conferenceDatasource",
					"uri" : "http://data.semanticweb.org/sparql",
					"crossDomainMode" : "Cors",
					"commands" : SWDFCommandStore,
					
				},
				
				"datasource" : {
					"id"  : "publicationDatasource",
					"Uri" : "http://data.semanticweb.org/sparql",
					"crossDomainMode" : "Cors",
					"commands" : "conferenceDatasourceCommands",
				},
				
				"datasource" : {
					"id"  : "webDatasource",
					"Uri" : "http://api.duckduckgo.com/",
					"crossDomainMode" : "JSONP",
					"commands" : "conferenceDatasourceCommands",
				},
				
				"datasource" : {
					"id"  : "eventDatasource",
					"Uri" : "http://calendar.labs.idci.fr/api/schedule_event.jsonp?",
					"crossDomainMode" : "JSONP",
					"commands" : "conferenceDatasourceCommands",
				}
			},
			
			"routes" : {
				"route" : {
					"hash" : "/Home",
					"parameters" : {
						"param" : "id",
						"param" : "id"
					},
					"view" : "HomeView",
					"commands" : {
						"command" : {
							"datasource" : "conferenceDatasource",
							"name" : "getEvent",
						}
					}
				},
				
				"route" : {
					"hash" : "/Person",
					"action" : "person",
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
			}
		};