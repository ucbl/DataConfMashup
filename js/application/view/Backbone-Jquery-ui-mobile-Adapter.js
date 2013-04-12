(function(){

var ViewAdapter
var root = this;
ViewAdapter = root.ViewAdapter = {};

var appendButton = ViewAdapter.appendButton = function(href,label,option){
    if(!href)return;
    if(!option)var option={}
    var newButton = $('<a href="'+href+'" data-role="button" '+(option.tiny?'data-inline="true"':'data-icon="arrow-r" data-iconpos="right"')+'  >'+(label==""?href:label)+'</a>');
    $("[data-role = page]").find(".content").append(newButton).trigger("create"); 
    appendToBackboneView(newButton);
};

var appendToBackboneView = ViewAdapter.appendToBackboneView=function(div){
    if(!div)return;
    $("[data-role = page]").find(".content").append($(div)).trigger("create"); 
};

//TODO make it free from swdf
/** append filter list to current view using '$("[data-role = page]").find(".content")' selector (backbone)
  * @param dataXML : SWDF sparql result
  * @param baselink : string url pattern for dynamic link generation (i.e. "#publication/")
  * @param bindingName : string pattern to match with sparql result 'binding[name="'+bindingName+'"]'
  * @param optional option : {
  *         autodividers : boolean add jquerymobileui autodividers
  *         count : boolean add count support for sparql endpoint 1.0 : require "ORDER BY ASC(?bindingName)" in the sparql query.
  *         parseUrl : parsing lat function => " parseUrl:function(url){return url.replace('foo',"")}
  *         show : array of object : key=bindingName => Shown 'binding[name="'+bindingName+'"]'
  *             alt : binding name if label is empty
  *             parseAlt : parsing alt function (see parseUrl param)
  *          
  */ 
var appendFilterList = ViewAdapter.appendFilterList = function(dataXML,baseLink,bindingName,option){
    if(!option)option={};
    var Uldiv= $('<ul  id="SearchByAuthorUl" '+(option.autodividers?'data-autodividers="true"':'')+' data-role="listview" data-filter="true" data-filter-placeholder="filter author name" class="ui-listview ui-corner-all ui-shadow"> ');
    var bubble= option.count  ?   '<span class="ui-li-count">1</span>'    :   ''  ; 
    var parseUrl= option.parseUrl ? option.parseUrl:function(text){return text.split(' ').join('_') };
    var text, counter, previousText, current, label, currentlabel;
    $(dataXML).find('sparql results > result').each(function(i,currentResult){
        label = text = $(currentResult).find('binding[name="'+bindingName+'"] :first-child').text();
        
        //change shown label
        if(option.show){
            label ="";
            for (var key in option.show) {
                currentlabel="";
                console.log(option.show[key]);
                currentlabel =  $(currentResult).find('binding[name="'+key+'"] :first-child').text();
                if(currentlabel=="" && option.show[key].alt){  
                    currentlabel =  $(currentResult).find('binding[name="'+option.show[key].alt+'"] :first-child').text();
                    if(option.show[key].parseAlt) currentlabel=  option.show[key].parseAlt(currentlabel);
                }
                label+=currentlabel;
            }
        };
            
        //count
        if(option.count && i!=0 ){  
            if(text==$(currentResult.previousElementSibling).find('binding[name="'+bindingName+'"] :first-child').text()){
                console.log(text);
                //increment bubble
                counter=parseInt(Uldiv.find(' li:last-child span').html());  
                Uldiv.find(' li:last-child span').html(counter+1); 
                text=false;
            }  
        }
        //show
        if(text){ 
            Uldiv.append(
                    $('<li></li>').append(
                        $('<a href='+baseLink+parseUrl(text)+'>'+label+'</a>')
                                   .append($(bubble)))) ;
        }
    });  
    ViewAdapter.appendToBackboneView(Uldiv)
};
}).call(this);
