/**   
*	Copyright <c> Claude Bernard - University Lyon 1 -  2013
* 	License : This file is part of the DataConf application, which is licensed under a Creative Commons Attribution-NonCommercial 3.0 Unported License. See details at : http://liris.cnrs.fr/lionel.medini/wiki/doku.php?id=dataconf&#licensing 
*   Author: Lionel MEDINI(supervisor), Florian BACLE, Fiona LEPEUTREC, Benoît DURANT-DE-LA-PASTELLIERE, NGUYEN Hoang Duy Tan
*   Description: This file provide simple function to build jquery mobile element such as button or sorted list plus some graph first attempt
*   Version: 0.8
*   Tags:  Backbone Jquery-ui-mobile Adapter Linked-Data Graph html5 canvas
**/
var ViewAdapterGraph = ViewAdapter.Graph = { 
    canvas : $('<canvas style="clear:both;" id="graph">'), 
    rootNodeLabel : '',
    nodeLimit : 9,
    nodeCounter : 0,
    theUI : '',
    sys:  arbor.ParticleSystem({stiffness:900, repulsion:2000, gravity:true, dt:0.015}),
	initted : false,
	el : '',
	reloading : false,
    
    //generate root node
    initContainer : function(el,rootNodeLabel){
		console.log("-----GRAPH - INIT ------"); 
		ViewAdapter.Graph["nodeCounter"]=0;
		ViewAdapter.Graph.rootNodeLabel=rootNodeLabel;
		ViewAdapter.Graph.el=el;
		

		//root node
		ViewAdapter.Graph["theUI"] = {nodes:{},edges:{}};
		ViewAdapter.Graph.theUI.nodes[rootNodeLabel]={color:"red", alpha:1, rootNode:true, alone:true, mass:.5};
		ViewAdapter.Graph.theUI.edges[rootNodeLabel]={};

		//arbor.js 
		if(!ViewAdapter.Graph.initted){ 
		//	delete ViewAdapter.Graph.sys.renderer;
			ViewAdapter.Graph.sys.renderer = Renderer(ViewAdapter.Graph.canvas); 
			ViewAdapter.Graph.initted = true;
		}
		
		
		//move to page
		$(ViewAdapter.Graph.sys.renderer).on('navigate',function(event,data){
			if(data.href!=undefined)document.location.href = data.href;
		});
		
		
		if(ViewAdapter.Graph.sys.energy()){
			console.log("###   n nodes   ###");
			console.log(ViewAdapter.Graph.sys.energy());
			
			//this timeout actually catch the bug ...
			setTimeout(function(){
				if(ViewAdapter.Graph.sys.energy().n<=1){
					if(!ViewAdapter.reloading){
						ViewAdapter.reloading = true;
						console.log("################## BUG #####################");
						console.log("### temporary fix... reload the page###");
						window.location.reload();
						ViewAdapter.changeMode();
					}
				}
			},1000);
			
		}
       
    },
	
	//render after each command
    render : function(){ 
		
			console.log("###### Graph render ######");
			console.log(ViewAdapter.Graph.sys);
			console.log(ViewAdapter.Graph.theUI);
			ViewAdapter.Graph.sys.merge(ViewAdapter.Graph.theUI);
		//canvas
		ViewAdapter.Graph.el.append(ViewAdapter.Graph.canvas);
    },
	
	
	appendList : function(dataList,href,labelProperty,appendToDiv,graphPt){
 
		if(!href) var href={};
		$.each(dataList, function(i,currentData){
			var currentHref=href.baseHref+href.hrefCllbck(currentData);
			var currentLabel=currentData[labelProperty];
	    
			//show
			if(currentLabel){
				//graph node
				if(graphPt){
					var nodeLabel = graphPt.labelCllbck(currentData);
					 ViewAdapter.Graph.addNode(nodeLabel,currentHref);
				}  
			}
		 
		 
	   });//end each  
	},
    
    //generate clickable node
    addNode : function(label,href){
		if(ViewAdapter.Graph.nodeCounter<=ViewAdapter.Graph.nodeLimit){
			console.log("-----GRAPH - ADD NODE------"); 
			var rootNodeLabel=ViewAdapter.Graph.rootNodeLabel;
			
			ViewAdapter.Graph.theUI.nodes[label]={color:"#0B614B", fontColor:"#F2F2F2", alpha:0.8,href:href};
			ViewAdapter.Graph.theUI.edges[rootNodeLabel][label] = {length:1};
			 
			
			ViewAdapter.Graph["nodeCounter"]=ViewAdapter.Graph.nodeCounter+1;
			//ViewAdapter.Graph.render(); 
		}
    },
    
    //generate info node
    addLeaf : function(label){
		//if(ViewAdapter.Graph.nodeCounter<=ViewAdapter.Graph.nodeLimit){
			console.log("-----GRAPH - ADD LEAF------"); 
			var rootNodeLabel=ViewAdapter.Graph.rootNodeLabel;
			ViewAdapter.Graph.theUI.nodes[label]={color:"orange", fontColor:"#F2F2F2", alpha:0.7};
			ViewAdapter.Graph.theUI.edges[rootNodeLabel][label] = {length:1};
			
			ViewAdapter.Graph["nodeCounter"]=ViewAdapter.Graph.nodeCounter+1;
			//ViewAdapter.Graph.render();  
		//}
    }, 
     
};






