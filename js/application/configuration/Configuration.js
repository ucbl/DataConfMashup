 var Configuration = {
			"conference" : {
				"name": "example glossary",
				"logoUri": "http://data.semanticweb.org/images/logo_www2012.jpg",
				"baseUri": "http://data.semanticweb.org/conference/www/2012",
			},
			
			"datasources" : {
				"conferenceDatasource" : {

					"Uri" : "http://data.semanticweb.org/sparql",
					"crossDomainMode" : "CORS",
					"commands" : SWDFCommandStore, 
				},
				
				"publicationDatasource" : {
					"Uri" : "http://dblp.l3s.de/d2r/sparql",
					"crossDomainMode" : "JSONP",
					"commands" : DBLPCommandStore,
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

			}, 
			"routes" : {
			    "Home" : { 
					"hash" : "",
					"view" : "#home",
					"commands" : [
						{
							"datasource" : "conferenceDatasource",
							"name" : "getConferenceMainEvent",
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
				},
				"Author" : {
					"hash" : "lol/:id",
					"view" : "#Author",
					"commands" : [
					    {
							"datasource" : "publicationDatasource",
							"name" : "getAuthor",
						}
					]
				}
				
			}
		};
