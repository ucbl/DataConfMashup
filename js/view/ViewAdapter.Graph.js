/**   
*	Copyright <c> Claude Bernard - University Lyon 1 -  2013
* 	License : This file is part of the DataConf application, which is licensed under a Creative Commons Attribution-NonCommercial 3.0 Unported License. See details at : http://liris.cnrs.fr/lionel.medini/wiki/doku.php?id=dataconf&#licensing 
*   Author: Lionel MEDINI(supervisor), Florian BACLE, Fiona LEPEUTREC, Benoît DURANT-DE-LA-PASTELLIERE, NGUYEN Hoang Duy Tan
*   Description: This file contains all function used to handle the graph view.
*   Version: 1.2
*   Tags:  Backbone Jquery-ui-mobile Adapter Linked-Data Graph html5 canvas
**/
var ViewAdapterGraph = ViewAdapter.Graph = { 
   
    rootNodeLabel : '',
    nodeLimit : 9,
    nodeCounter : 0,
    theUI : '',

	/** Initialize the particul system **/
	initSystem : function (){
		ViewAdapter.Graph.sys = arbor.ParticleSystem();
	},
	
	/** Prepare the canvas the root node and the renderer of the graph
	* el : The current page identifier
	* rootNodeLabel : The current root node in use
	**/
    initContainer : function(el,rootNodeLabel){
		ViewAdapter.Graph["nodeCounter"]=0;
		ViewAdapter.Graph.el=el;
		ViewAdapter.Graph.rootNodeLabel=rootNodeLabel;

		ViewAdapter.Graph.canvas = $('<canvas style="clear:both; id="graph">');	
		el.append(ViewAdapter.Graph.canvas);
		
		ViewAdapter.Graph["theUI"] = {nodes:{},edges:{}};
		ViewAdapter.Graph.theUI.nodes[rootNodeLabel]={color:"red", alpha:1, rootNode:true, alone:true, mass:.5};
		ViewAdapter.Graph.theUI.edges[rootNodeLabel]={};
	  
		 ViewAdapter.Graph.sys.parameters({stiffness:900, repulsion:2000, gravity:true, dt:0.015});
		ViewAdapter.Graph.sys.renderer = Renderer(ViewAdapter.Graph.canvas);
		ViewAdapter.Graph.sys.graft(ViewAdapter.Graph.theUI);
		
		$(ViewAdapter.Graph.sys.renderer).on('navigate',function(event,data){
			if(data.href!=undefined)document.location.href = data.href;
		
		});
    },
	
	/** Parsing of a result list **/
	appendList : function(dataList,href,labelProperty,appendToDiv,graphPt){
		if(!href) var href={};
			$.each(dataList, function(i,currentData){
				var currentHref=href.baseHref+href.hrefCllbck(currentData);
				var currentLabel=currentData[labelProperty];
				if(currentLabel){
					if(graphPt){
						var nodeLabel = graphPt.labelCllbck(currentData);
						 ViewAdapter.Graph.addNode(nodeLabel,currentHref);
					}  
				}
		   });
	},

	/** Add node (clickable box)to the system particule and redraw the graph **/
    addNode : function(label,href){
		if(ViewAdapter.Graph.nodeCounter<=ViewAdapter.Graph.nodeLimit){
			var rootNodeLabel=ViewAdapter.Graph.rootNodeLabel;
			ViewAdapter.Graph.theUI.nodes[label]={color:"#0B614B", fontColor:"#F2F2F2", alpha:0.8,href:href};
			ViewAdapter.Graph.theUI.edges[rootNodeLabel][label] = {length:1};
			ViewAdapter.Graph["nodeCounter"]=ViewAdapter.Graph.nodeCounter+1;
			ViewAdapter.Graph.sys.merge(ViewAdapter.Graph.theUI); 
		}
    },
    
	/** Add leaf (not clickable box) to the system particule and redraw the graph **/
    addLeaf : function(label){
		if(ViewAdapter.Graph.nodeCounter<=ViewAdapter.Graph.nodeLimit){
			var rootNodeLabel=ViewAdapter.Graph.rootNodeLabel;
			ViewAdapter.Graph.theUI.nodes[label]={color:"orange", fontColor:"#F2F2F2", alpha:0.7};
			ViewAdapter.Graph.theUI.edges[rootNodeLabel][label] = {length:1};
			ViewAdapter.Graph["nodeCounter"]=ViewAdapter.Graph.nodeCounter+1;
			ViewAdapter.Graph.sys.merge(ViewAdapter.Graph.theUI); 
		}
    }, 
     
};






