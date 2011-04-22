
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  arguments.callee = arguments.callee.caller;  
  if(this.console) console.log( Array.prototype.slice.call(arguments) );
};
// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});


// place any jQuery/helper plugins in here, instead of separate, slower script files.

/**
 * Isotope v1.0.110401
 * An exquisite jQuery plugin for magical layouts
 * http://isotope.metafizzy.co
 *
 * Commercial use requires one-time license fee
 * http://metafizzy.co/#licenses
 *
 * Copyright 2011 David DeSandro / Metafizzy
 */
(function(l,f,s){var m=function(){var a=["Moz","Webkit","Khtml","O","Ms"],b={};return function(c,d){d=d||document.documentElement;var e=d.style,g,h,i,t;if(arguments.length===1&&typeof b[c]==="string")return b[c];if(typeof e[c]==="string")return b[c]=c;h=c.charAt(0).toUpperCase()+c.slice(1);i=0;for(t=a.length;i<t;i++){g=a[i]+h;if(typeof e[g]==="string")return b[c]=g}}}(),u=document.documentElement,w=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),o=[{name:"csstransforms",getResult:function(){return!!m("transform")}},
{name:"csstransforms3d",getResult:function(){var a=!!m("perspective");if(a){var b=document.createElement("style"),c=document.createElement("div");a="@media ("+w.join("transform-3d),(")+"modernizr)";b.textContent=a+"{#modernizr{height:3px}}";(document.head||document.getElementsByTagName("head")[0]).appendChild(b);c.id="modernizr";u.appendChild(c);a=c.offsetHeight===3;b.parentNode.removeChild(b);c.parentNode.removeChild(c)}return!!a}},{name:"csstransitions",getResult:function(){return!!m("transitionProperty")}}],
j,v=o.length;if(l.Modernizr)for(j=0;j<v;j++){var p=o[j];Modernizr.hasOwnProperty(p.name)||Modernizr.addTest(p.name,p.getResult)}else l.Modernizr=function(){var a={_version:"1.6ish: miniModernizr for Isotope"},b=[],c,d;for(j=0;j<v;j++){c=o[j];d=c.getResult();a[c.name]=d;c=(d?"":"no-")+c.name;b.push(c)}u.className+=" "+b.join(" ");return a}();var k={transformProp:m("transform"),fnUtils:Modernizr.csstransforms3d?{translate:function(a){return"translate3d("+a[0]+"px, "+a[1]+"px, 0) "},scale:function(a){return"scale3d("+
a+", "+a+", 1) "}}:{translate:function(a){return"translate("+a[0]+"px, "+a[1]+"px) "},scale:function(a){return"scale("+a+") "}},set:function(a,b,c){var d=f(a),e=d.data("isoTransform")||{},g={},h,i={};g[b]=c;f.extend(e,g);for(h in e)i[h]=(0,k.fnUtils[h])(e[h]);b=(i.translate||"")+(i.scale||"");d.data("isoTransform",e);a.style[k.transformProp]=b}};f.cssNumber.scale=true;f.cssHooks.scale={set:function(a,b){if(typeof b==="string")b=parseFloat(b);k.set(a,"scale",b)},get:function(a){return(a=f.data(a,"transform"))&&
a.scale?a.scale:1}};f.fx.step.scale=function(a){f.cssHooks.scale.set(a.elem,a.now+a.unit)};f.cssNumber.translate=true;f.cssHooks.translate={set:function(a,b){k.set(a,"translate",b)},get:function(a){return(a=f.data(a,"transform"))&&a.translate?a.translate:[0,0]}};var q=f.event,r;q.special.smartresize={setup:function(){f(this).bind("resize",q.special.smartresize.handler)},teardown:function(){f(this).unbind("resize",q.special.smartresize.handler)},handler:function(a,b){var c=this,d=arguments;a.type=
"smartresize";r&&clearTimeout(r);r=setTimeout(function(){jQuery.event.handle.apply(c,d)},b==="execAsap"?0:100)}};f.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])};f.Isotope=function(a,b){this.element=f(b);this._create(a);this._init()};var n=["overflow","position","width","height"];f.Isotope.prototype={options:{resizable:true,layoutMode:"masonry",containerClass:"isotope",itemClass:"isotope-item",hiddenClass:"isotope-hidden",hiddenStyle:Modernizr.csstransforms&&
!f.browser.opera?{opacity:0,scale:0.0010}:{opacity:0},visibleStyle:Modernizr.csstransforms&&!f.browser.opera?{opacity:1,scale:1}:{opacity:1},animationEngine:f.browser.opera?"jquery":"best-available",animationOptions:{queue:false,duration:800},sortBy:"original-order",sortAscending:true,resizesContainer:true,transformsEnabled:true},_filterFind:function(a,b){return b?a.filter(b).add(a.find(b)):a},_create:function(a){this.options=f.extend(true,{},this.options,a);this.isNew={};this.styleQueue=[];this.elemCount=
0;this.$allAtoms=this._filterFind(this.element.children(),this.options.itemSelector);a=this.element[0].style;this.originalStyle={};for(var b=0,c=n.length;b<c;b++){var d=n[b];this.originalStyle[d]=a[d]||null}this.element.css({overflow:"hidden",position:"relative"});a=false;switch(this.options.animationEngine.toLowerCase().replace(/[ _\-]/g,"")){case "css":case "none":this.applyStyleFnName="css";break;case "jquery":this.applyStyleFnName="animate";a=true;break;default:this.applyStyleFnName=Modernizr.csstransitions?
"css":"animate"}this.getPositionStyles=(this.usingTransforms=this.options.transformsEnabled&&Modernizr.csstransforms&&Modernizr.csstransitions&&!a)?this._translate:this._positionAbs;this.options.getSortData=f.extend(this.options.getSortData,{"original-order":function(g,h){return h.elemCount}});this._setupAtoms(this.$allAtoms);a=f(document.createElement("div"));this.element.prepend(a);this.posTop=Math.round(a.position().top);this.posLeft=Math.round(a.position().left);a.remove();var e=this;setTimeout(function(){e.element.addClass(e.options.containerClass)},
0);this.options.resizable&&f(l).bind("smartresize.isotope",function(){e.element.isotope("resize")})},_isNewProp:function(a){return this.prevOpts?this.options[a]!==this.prevOpts[a]:true},_init:function(a){var b=this;f.each(["filter","sortBy","sortAscending"],function(c,d){b.isNew[d]=b._isNewProp(d)});this.$filteredAtoms=this.isNew.filter?this._filter(this.$allAtoms):this.$allAtoms;if(this.isNew.filter||this.isNew.sortBy||this.isNew.sortAscending)this._sort();this.reLayout(a)},option:function(a,b){if(f.isPlainObject(a))this.options=
f.extend(true,this.options,a);else if(a&&typeof b==="undefined")return this.options[a];else this.options[a]=b;return this},_setupAtoms:function(a){var b={position:"absolute"};if(this.usingTransforms){b.left=0;b.top=0}a.css(b).addClass(this.options.itemClass);this.updateSortData(a,true)},_filter:function(a){var b=this.options.filter===""?"*":this.options.filter;if(b){var c=this.options.hiddenClass,d="."+c,e=a.not(d),g=a.filter(d);d=g;a=a.filter(b);if(b!=="*"){d=g.filter(b);b=e.not(b).toggleClass(c);
b.addClass(c);this.styleQueue.push({$el:b,style:this.options.hiddenStyle})}this.styleQueue.push({$el:d,style:this.options.visibleStyle});d.removeClass(c)}return a},updateSortData:function(a,b){var c=this,d=this.options.getSortData,e,g;a.each(function(){e=f(this);g={};for(var h in d)g[h]=d[h](e,c);e.data("isotope-sort-data",g);b&&c.elemCount++})},_sort:function(){var a=this,b=function(d){return f(d).data("isotope-sort-data")[a.options.sortBy]},c=this.options.sortAscending?1:-1;this.$filteredAtoms.sort(function(d,
e){var g=b(d),h=b(e);return(g>h?1:g<h?-1:0)*c});return this},_translate:function(a,b){return{translate:[a,b]}},_positionAbs:function(a,b){return{left:a,top:b}},_pushPosition:function(a,b,c){b=this.getPositionStyles(b,c);this.styleQueue.push({$el:a,style:b})},layout:function(a,b){var c=this.options.layoutMode;this["_"+c+"Layout"](a);this.options.resizesContainer&&this.styleQueue.push({$el:this.element,style:this["_"+c+"GetContainerSize"]()});var d=this.applyStyleFnName==="animate"&&!this.isLaidOut?
"css":this.applyStyleFnName,e=this.options.animationOptions;f.each(this.styleQueue,function(g,h){h.$el[d](h.style,e)});this.styleQueue=[];b&&b.call(a);this.isLaidOut=true;return this},resize:function(){return this["_"+this.options.layoutMode+"Resize"]()},reLayout:function(a){return this["_"+this.options.layoutMode+"Reset"]().layout(this.$filteredAtoms,a)},addItems:function(a,b){var c=this._filterFind(a,this.options.itemSelector);this._setupAtoms(c);this.$allAtoms=this.$allAtoms.add(c);b&&b(c)},insert:function(a,
b){this.element.append(a);var c=this;this.addItems(a,function(d){d=c._filter(d);c.$filteredAtoms=c.$filteredAtoms.add(d)});this._sort().reLayout(b)},appended:function(a,b){var c=this;this.addItems(a,function(d){c.$filteredAtoms=c.$filteredAtoms.add(d);c.layout(d,b)})},remove:function(a){this.$allAtoms=this.$allAtoms.not(a);this.$filteredAtoms=this.$filteredAtoms.not(a);a.remove()},_shuffleArray:function(a){var b,c,d=a.length;if(d)for(;--d;){c=~~(Math.random()*(d+1));b=a[c];a[c]=a[d];a[d]=b}return a},
shuffle:function(a){this.options.sortBy="shuffle";this.$allAtoms=this._shuffleArray(this.$allAtoms);this.$filteredAtoms=this._filter(this.$allAtoms);return this.reLayout(a)},destroy:function(){var a=this.usingTransforms;this.$allAtoms.removeClass(this.options.hiddenClass+" "+this.options.itemClass).each(function(){this.style.position=null;this.style.top=null;this.style.left=null;this.style.opacity=null;if(a)this.style[k.transformProp]=null});for(var b=this.element[0].style,c=0,d=n.length;c<d;c++){var e=
n[c];b[e]=this.originalStyle[e]}this.element.unbind(".isotope").removeClass(this.options.containerClass).removeData("isotope");f(l).unbind(".isotope")},_getSegments:function(a,b){var c=b?"rowHeight":"columnWidth",d=b?"height":"width",e=b?"Height":"Width",g=b?"rows":"cols";this[d]=this.element[d]();e=this.options[a]&&this.options[a][c]||this.$filteredAtoms["outer"+e](true)||this[d];d=Math.floor(this[d]/e);d=Math.max(d,1);this[a][g]=d;this[a][c]=e;return this},_masonryPlaceBrick:function(a,b,c){b=Math.min.apply(Math,
c);for(var d=b+a.outerHeight(true),e=c.length,g=e,h=this.masonry.cols+1-e;e--;)if(c[e]===b)g=e;this._pushPosition(a,this.masonry.columnWidth*g+this.posLeft,b);for(e=0;e<h;e++)this.masonry.colYs[g+e]=d},_masonryLayout:function(a){var b=this;a.each(function(){var c=f(this),d=Math.ceil(c.outerWidth(true)/b.masonry.columnWidth);d=Math.min(d,b.masonry.cols);if(d===1)b._masonryPlaceBrick(c,b.masonry.cols,b.masonry.colYs);else{var e=b.masonry.cols+1-d,g=[],h,i;for(i=0;i<e;i++){h=b.masonry.colYs.slice(i,
i+d);g[i]=Math.max.apply(Math,h)}b._masonryPlaceBrick(c,e,g)}});return this},_masonryReset:function(){this.masonry={};this._getSegments("masonry");var a=this.masonry.cols;for(this.masonry.colYs=[];a--;)this.masonry.colYs.push(this.posTop);return this},_masonryResize:function(){var a=this.masonry.cols;this._getSegments("masonry");this.masonry.cols!==a&&this.reLayout();return this},_masonryGetContainerSize:function(){return{height:Math.max.apply(Math,this.masonry.colYs)-this.posTop}},_fitRowsLayout:function(a){this.width=
this.element.width();var b=this;a.each(function(){var c=f(this),d=c.outerWidth(true),e=c.outerHeight(true);if(b.fitRows.x!==0&&d+b.fitRows.x>b.width){b.fitRows.x=0;b.fitRows.y=b.fitRows.height}b._pushPosition(c,b.fitRows.x+b.posLeft,b.fitRows.y+b.posTop);b.fitRows.height=Math.max(b.fitRows.y+e,b.fitRows.height);b.fitRows.x+=d});return this},_fitRowsReset:function(){this.fitRows={x:0,y:0,height:0};return this},_fitRowsGetContainerSize:function(){return{height:this.fitRows.height}},_fitRowsResize:function(){return this.reLayout()},
_cellsByRowReset:function(){this.cellsByRow={};this._getSegments("cellsByRow");this.cellsByRow.rowHeight=this.options.cellsByRow.rowHeight||this.$allAtoms.outerHeight(true);return this},_cellsByRowLayout:function(a){var b=this,c=this.cellsByRow.cols;this.cellsByRow.atomsLen=a.length;a.each(function(d){var e=f(this),g=(d%c+0.5)*b.cellsByRow.columnWidth-e.outerWidth(true)/2+b.posLeft;d=(~~(d/c)+0.5)*b.cellsByRow.rowHeight-e.outerHeight(true)/2+b.posTop;b._pushPosition(e,g,d)});return this},_cellsByRowGetContainerSize:function(){return{height:Math.ceil(this.cellsByRow.atomsLen/
this.cellsByRow.cols)*this.cellsByRow.rowHeight+this.posTop}},_cellsByRowResize:function(){var a=this.cellsByRow.cols;this._getSegments("cellsByRow");this.cellsByRow.cols!==a&&this.reLayout();return this},_straightDownReset:function(){this.straightDown={y:0};return this},_straightDownLayout:function(a){var b=this;a.each(function(){var c=f(this);b._pushPosition(c,b.posLeft,b.straightDown.y+b.posTop);b.straightDown.y+=c.outerHeight(true)});return this},_straightDownGetContainerSize:function(){return{height:this.straightDown.y+
this.posTop}},_straightDownResize:function(){this.reLayout();return this},_masonryHorizontalPlaceBrick:function(a,b,c){b=Math.min.apply(Math,c);for(var d=b+a.outerWidth(true),e=c.length,g=e,h=this.masonryHorizontal.rows+1-e;e--;)if(c[e]===b)g=e;this._pushPosition(a,b,this.masonryHorizontal.rowHeight*g+this.posTop);for(e=0;e<h;e++)this.masonryHorizontal.rowXs[g+e]=d},_masonryHorizontalLayout:function(a){var b=this;a.each(function(){var c=f(this),d=Math.ceil(c.outerHeight(true)/b.masonryHorizontal.rowHeight);
d=Math.min(d,b.masonryHorizontal.rows);if(d===1)b._masonryHorizontalPlaceBrick(c,b.masonryHorizontal.rows,b.masonryHorizontal.rowXs);else{var e=b.masonryHorizontal.rows+1-d,g=[],h,i;for(i=0;i<e;i++){h=b.masonryHorizontal.rowXs.slice(i,i+d);g[i]=Math.max.apply(Math,h)}b._masonryHorizontalPlaceBrick(c,e,g)}});return this},_masonryHorizontalReset:function(){this.masonryHorizontal={};this._getSegments("masonryHorizontal",true);var a=this.masonryHorizontal.rows;for(this.masonryHorizontal.rowXs=[];a--;)this.masonryHorizontal.rowXs.push(this.posLeft);
return this},_masonryHorizontalResize:function(){var a=this.masonryHorizontal.rows;this._getSegments("masonryHorizontal",true);this.masonryHorizontal.rows!==a&&this.reLayout();return this},_masonryHorizontalGetContainerSize:function(){return{width:Math.max.apply(Math,this.masonryHorizontal.rowXs)-this.posLeft}},_fitColumnsReset:function(){this.fitColumns={x:0,y:0,width:0};return this},_fitColumnsLayout:function(a){var b=this;this.height=this.element.height();a.each(function(){var c=f(this),d=c.outerWidth(true),
e=c.outerHeight(true);if(b.fitColumns.y!==0&&e+b.fitColumns.y>b.height){b.fitColumns.x=b.fitColumns.width;b.fitColumns.y=0}b._pushPosition(c,b.fitColumns.x+b.posLeft,b.fitColumns.y+b.posTop);b.fitColumns.width=Math.max(b.fitColumns.x+d,b.fitColumns.width);b.fitColumns.y+=e});return this},_fitColumnsGetContainerSize:function(){return{width:this.fitColumns.width}},_fitColumnsResize:function(){return this.reLayout()},_cellsByColumnReset:function(){this.cellsByColumn={};this._getSegments("cellsByColumn",
true);this.cellsByColumn.columnWidth=this.options.cellsByColumn.columnWidth||this.$allAtoms.outerHeight(true);return this},_cellsByColumnLayout:function(a){var b=this,c=this.cellsByColumn.rows;this.cellsByColumn.atomsLen=a.length;a.each(function(d){var e=f(this),g=(~~(d/c)+0.5)*b.cellsByColumn.columnWidth-e.outerWidth(true)/2+b.posLeft;d=(d%c+0.5)*b.cellsByColumn.rowHeight-e.outerHeight(true)/2+b.posTop;b._pushPosition(e,g,d)});return this},_cellsByColumnGetContainerSize:function(){return{width:Math.ceil(this.cellsByColumn.atomsLen/
this.cellsByColumn.rows)*this.cellsByColumn.columnWidth+this.posLeft}},_cellsByColumnResize:function(){var a=this.cellsByColumn.rows;this._getSegments("cellsByColumn",true);this.cellsByColumn.rows!==a&&this.reLayout();return this}};f.fn.imagesLoaded=function(a){var b=this.find("img"),c=b.length,d=this;b.length||a.call(this);b.bind("load",function(){--c<=0&&a.call(d)}).each(function(){if(this.complete||this.complete===s){var e=this.src;this.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
this.src=e}});return this};f.widget=f.widget||{};f.widget.bridge=f.widget.bridge||function(a,b){f.fn[a]=function(c){var d=typeof c==="string",e=Array.prototype.slice.call(arguments,1),g=this;c=!d&&e.length?f.extend.apply(null,[true,c].concat(e)):c;if(d&&c.charAt(0)==="_")return g;d?this.each(function(){var h=f.data(this,a);if(!h)return f.error("cannot call methods on "+a+" prior to initialization; attempted to call method '"+c+"'");if(!f.isFunction(h[c]))return f.error("no such method '"+c+"' for "+
a+" widget instance");var i=h[c].apply(h,e);if(i!==h&&i!==s){g=i;return false}}):this.each(function(){var h=f.data(this,a);h?h.option(c||{})._init():f.data(this,a,new b(c,this))});return g}};f.widget.bridge("isotope",f.Isotope)})(window,jQuery);


var $container = $('.artboard');

 $('#filters').find('a').click(function(){
   // get href attribute, minus the #, plus a . to make it a class
   var filterName = '.' + $(this).attr('href').slice(1);
   filterName = filterName === '.show-all' ? '*' : filterName;
   $container.isotope({ filter: filterName })
   return false;
 });


 // switches selected class on buttons
 $('#options').find('.option-set a').click(function(){
   var $this = $(this);

   // don't proceed if already selected
   if ( !$this.hasClass('selected') ) {
     $this.parents('.option-set').find('.selected').removeClass('selected');
     $this.addClass('selected');
   }

 });

 $container.isotope({
   itemSelector : '.element',
   // layoutMode : 'fitRows',
   masonry : {
     columnWidth : 80
   },
   animationEngine : $.browser.opera ? 'jquery' : 'best-available'
   // animationEngine : 'jquery',
 });



 /* =========================================================

 // jquery.innerfade.js

 // Datum: 2008-02-14
 // Firma: Medienfreunde Hofmann & Baldes GbR
 // Author: Torsten Baldes
 // Mail: t.baldes@medienfreunde.com
 // Web: http://medienfreunde.com

 // based on the work of Matt Oakes http://portfolio.gizone.co.uk/applications/slideshow/
 // and Ralf S. Engelschall http://trainofthoughts.org/

  *
  *  <ul id="news"> 
  *      <li>content 1</li>
  *      <li>content 2</li>
  *      <li>content 3</li>
  *  </ul>
  *  
  *  $('#news').innerfade({ 
  *    animationtype: Type of animation 'fade' or 'slide' (Default: 'fade'), 
  *    speed: Fading-/Sliding-Speed in milliseconds or keywords (slow, normal or fast) (Default: 'normal'), 
  *    timeout: Time between the fades in milliseconds (Default: '2000'), 
  *    type: Type of slideshow: 'sequence', 'random' or 'random_start' (Default: 'sequence'), 
  *    containerheight: Height of the containing element in any css-height-value (Default: 'auto'),
  *    runningclass: CSS-Class which the container get’s applied (Default: 'innerfade'),
  *    children: optional children selector (Default: null)
  *  }); 
  *

 // ========================================================= */


 (function($) {

     $.fn.innerfade = function(options) {
         return this.each(function() {   
             $.innerfade(this, options);
         });
     };

     $.innerfade = function(container, options) {
         var settings = {
             'animationtype':    'fade',
             'speed':            'normal',
             'type':             'sequence',
             'timeout':          2000,
             'containerheight':  'auto',
             'runningclass':     'innerfade',
             'children':         null
         };
         if (options)
             $.extend(settings, options);
         if (settings.children === null)
             var elements = $(container).children();
         else
             var elements = $(container).children(settings.children);
         if (elements.length > 1) {
             $(container).css('position', 'relative').css('height', settings.containerheight).addClass(settings.runningclass);
             for (var i = 0; i < elements.length; i++) {
                 $(elements[i]).css('z-index', String(elements.length-i)).css('position', 'absolute').hide();
             };
             if (settings.type == "sequence") {
                 setTimeout(function() {
                     $.innerfade.next(elements, settings, 1, 0);
                 }, settings.timeout);
                 $(elements[0]).show();
             } else if (settings.type == "random") {
                 var last = Math.floor ( Math.random () * ( elements.length ) );
                 setTimeout(function() {
                     do { 
                         current = Math.floor ( Math.random ( ) * ( elements.length ) );
                     } while (last == current );             
                     $.innerfade.next(elements, settings, current, last);
                 }, settings.timeout);
                 $(elements[last]).show();
             } else if ( settings.type == 'random_start' ) {
                 settings.type = 'sequence';
                 var current = Math.floor ( Math.random () * ( elements.length ) );
                 setTimeout(function(){
                   $.innerfade.next(elements, settings, (current + 1) %  elements.length, current);
                 }, settings.timeout);
                 $(elements[current]).show();
             } else {
               alert('Innerfade-Type must either be \'sequence\', \'random\' or \'random_start\'');
             }
         }
     };

     $.innerfade.next = function(elements, settings, current, last) {
         if (settings.animationtype == 'slide') {
             $(elements[last]).slideUp(settings.speed);
             $(elements[current]).slideDown(settings.speed);
         } else if (settings.animationtype == 'fade') {
             $(elements[last]).fadeOut(settings.speed);
             $(elements[current]).fadeIn(settings.speed, function() {
               removeFilter($(this)[0]);
             });
         } else
             alert('Innerfade-animationtype must either be \'slide\' or \'fade\'');
         if (settings.type == "sequence") {
             if ((current + 1) < elements.length) {
                 current = current + 1;
                 last = current - 1;
             } else {
                 current = 0;
                 last = elements.length - 1;
             }
         } else if (settings.type == "random") {
             last = current;
             while (current == last)
                 current = Math.floor(Math.random() * elements.length);
         } else
             alert('Innerfade-Type must either be \'sequence\', \'random\' or \'random_start\'');
         setTimeout((function() {
             $.innerfade.next(elements, settings, current, last);
         }), settings.timeout);
     };

 })(jQuery);

 // **** remove Opacity-Filter in ie ****
 function removeFilter(element) {
   if(element.style.removeAttribute){
     element.style.removeAttribute('filter');
   }
 }


 $('ul.testimonials').innerfade({
   speed: 500,
   timeout: 9000,
   type: 'random_start'
 });





 /*
  * Shadowbox.js, version 3.0.3
  * http://shadowbox-js.com/
  *
  * Copyright 2007-2010, Michael J. I. Jackson
  * Date: 2011-04-08 13:17:58 +0000
  */
 (function(au,k){var Q={version:"3.0.3"};var J=navigator.userAgent.toLowerCase();if(J.indexOf("windows")>-1||J.indexOf("win32")>-1){Q.isWindows=true}else{if(J.indexOf("macintosh")>-1||J.indexOf("mac os x")>-1){Q.isMac=true}else{if(J.indexOf("linux")>-1){Q.isLinux=true}}}Q.isIE=J.indexOf("msie")>-1;Q.isIE6=J.indexOf("msie 6")>-1;Q.isIE7=J.indexOf("msie 7")>-1;Q.isGecko=J.indexOf("gecko")>-1&&J.indexOf("safari")==-1;Q.isWebKit=J.indexOf("applewebkit/")>-1;var ab=/#(.+)$/,af=/^(light|shadow)box\[(.*?)\]/i,az=/\s*([a-z_]*?)\s*=\s*(.+)\s*/,f=/[0-9a-z]+$/i,aD=/(.+\/)shadowbox\.js/i;var A=false,a=false,l={},z=0,R,ap;Q.current=-1;Q.dimensions=null;Q.ease=function(K){return 1+Math.pow(K-1,3)};Q.errorInfo={fla:{name:"Flash",url:"http://www.adobe.com/products/flashplayer/"},qt:{name:"QuickTime",url:"http://www.apple.com/quicktime/download/"},wmp:{name:"Windows Media Player",url:"http://www.microsoft.com/windows/windowsmedia/"},f4m:{name:"Flip4Mac",url:"http://www.flip4mac.com/wmv_download.htm"}};Q.gallery=[];Q.onReady=aj;Q.path=null;Q.player=null;Q.playerId="sb-player";Q.options={animate:true,animateFade:true,autoplayMovies:true,continuous:false,enableKeys:true,flashParams:{bgcolor:"#000000",allowfullscreen:true},flashVars:{},flashVersion:"9.0.115",handleOversize:"resize",handleUnsupported:"link",onChange:aj,onClose:aj,onFinish:aj,onOpen:aj,showMovieControls:true,skipSetup:false,slideshowDelay:0,viewportPadding:20};Q.getCurrent=function(){return Q.current>-1?Q.gallery[Q.current]:null};Q.hasNext=function(){return Q.gallery.length>1&&(Q.current!=Q.gallery.length-1||Q.options.continuous)};Q.isOpen=function(){return A};Q.isPaused=function(){return ap=="pause"};Q.applyOptions=function(K){l=aC({},Q.options);aC(Q.options,K)};Q.revertOptions=function(){aC(Q.options,l)};Q.init=function(aG,aJ){if(a){return}a=true;if(Q.skin.options){aC(Q.options,Q.skin.options)}if(aG){aC(Q.options,aG)}if(!Q.path){var aI,S=document.getElementsByTagName("script");for(var aH=0,K=S.length;aH<K;++aH){aI=aD.exec(S[aH].src);if(aI){Q.path=aI[1];break}}}if(aJ){Q.onReady=aJ}P()};Q.open=function(S){if(A){return}var K=Q.makeGallery(S);Q.gallery=K[0];Q.current=K[1];S=Q.getCurrent();if(S==null){return}Q.applyOptions(S.options||{});G();if(Q.gallery.length){S=Q.getCurrent();if(Q.options.onOpen(S)===false){return}A=true;Q.skin.onOpen(S,c)}};Q.close=function(){if(!A){return}A=false;if(Q.player){Q.player.remove();Q.player=null}if(typeof ap=="number"){clearTimeout(ap);ap=null}z=0;aq(false);Q.options.onClose(Q.getCurrent());Q.skin.onClose();Q.revertOptions()};Q.play=function(){if(!Q.hasNext()){return}if(!z){z=Q.options.slideshowDelay*1000}if(z){R=aw();ap=setTimeout(function(){z=R=0;Q.next()},z);if(Q.skin.onPlay){Q.skin.onPlay()}}};Q.pause=function(){if(typeof ap!="number"){return}z=Math.max(0,z-(aw()-R));if(z){clearTimeout(ap);ap="pause";if(Q.skin.onPause){Q.skin.onPause()}}};Q.change=function(K){if(!(K in Q.gallery)){if(Q.options.continuous){K=(K<0?Q.gallery.length+K:0);if(!(K in Q.gallery)){return}}else{return}}Q.current=K;if(typeof ap=="number"){clearTimeout(ap);ap=null;z=R=0}Q.options.onChange(Q.getCurrent());c(true)};Q.next=function(){Q.change(Q.current+1)};Q.previous=function(){Q.change(Q.current-1)};Q.setDimensions=function(aS,aJ,aQ,aR,aI,K,aO,aL){var aN=aS,aH=aJ;var aM=2*aO+aI;if(aS+aM>aQ){aS=aQ-aM}var aG=2*aO+K;if(aJ+aG>aR){aJ=aR-aG}var S=(aN-aS)/aN,aP=(aH-aJ)/aH,aK=(S>0||aP>0);if(aL&&aK){if(S>aP){aJ=Math.round((aH/aN)*aS)}else{if(aP>S){aS=Math.round((aN/aH)*aJ)}}}Q.dimensions={height:aS+aI,width:aJ+K,innerHeight:aS,innerWidth:aJ,top:Math.floor((aQ-(aS+aM))/2+aO),left:Math.floor((aR-(aJ+aG))/2+aO),oversized:aK};return Q.dimensions};Q.makeGallery=function(aI){var K=[],aH=-1;if(typeof aI=="string"){aI=[aI]}if(typeof aI.length=="number"){aF(aI,function(aK,aL){if(aL.content){K[aK]=aL}else{K[aK]={content:aL}}});aH=0}else{if(aI.tagName){var S=Q.getCache(aI);aI=S?S:Q.makeObject(aI)}if(aI.gallery){K=[];var aJ;for(var aG in Q.cache){aJ=Q.cache[aG];if(aJ.gallery&&aJ.gallery==aI.gallery){if(aH==-1&&aJ.content==aI.content){aH=K.length}K.push(aJ)}}if(aH==-1){K.unshift(aI);aH=0}}else{K=[aI];aH=0}}aF(K,function(aK,aL){K[aK]=aC({},aL)});return[K,aH]};Q.makeObject=function(aH,aG){var aI={content:aH.href,title:aH.getAttribute("title")||"",link:aH};if(aG){aG=aC({},aG);aF(["player","title","height","width","gallery"],function(aJ,aK){if(typeof aG[aK]!="undefined"){aI[aK]=aG[aK];delete aG[aK]}});aI.options=aG}else{aI.options={}}if(!aI.player){aI.player=Q.getPlayer(aI.content)}var K=aH.getAttribute("rel");if(K){var S=K.match(af);if(S){aI.gallery=escape(S[2])}aF(K.split(";"),function(aJ,aK){S=aK.match(az);if(S){aI[S[1]]=S[2]}})}return aI};Q.getPlayer=function(aG){if(aG.indexOf("#")>-1&&aG.indexOf(document.location.href)==0){return"inline"}var aH=aG.indexOf("?");if(aH>-1){aG=aG.substring(0,aH)}var S,K=aG.match(f);if(K){S=K[0].toLowerCase()}if(S){if(Q.img&&Q.img.ext.indexOf(S)>-1){return"img"}if(Q.swf&&Q.swf.ext.indexOf(S)>-1){return"swf"}if(Q.flv&&Q.flv.ext.indexOf(S)>-1){return"flv"}if(Q.qt&&Q.qt.ext.indexOf(S)>-1){if(Q.wmp&&Q.wmp.ext.indexOf(S)>-1){return"qtwmp"}else{return"qt"}}if(Q.wmp&&Q.wmp.ext.indexOf(S)>-1){return"wmp"}}return"iframe"};function G(){var aH=Q.errorInfo,aI=Q.plugins,aK,aL,aO,aG,aN,S,aM,K;for(var aJ=0;aJ<Q.gallery.length;++aJ){aK=Q.gallery[aJ];aL=false;aO=null;switch(aK.player){case"flv":case"swf":if(!aI.fla){aO="fla"}break;case"qt":if(!aI.qt){aO="qt"}break;case"wmp":if(Q.isMac){if(aI.qt&&aI.f4m){aK.player="qt"}else{aO="qtf4m"}}else{if(!aI.wmp){aO="wmp"}}break;case"qtwmp":if(aI.qt){aK.player="qt"}else{if(aI.wmp){aK.player="wmp"}else{aO="qtwmp"}}break}if(aO){if(Q.options.handleUnsupported=="link"){switch(aO){case"qtf4m":aN="shared";S=[aH.qt.url,aH.qt.name,aH.f4m.url,aH.f4m.name];break;case"qtwmp":aN="either";S=[aH.qt.url,aH.qt.name,aH.wmp.url,aH.wmp.name];break;default:aN="single";S=[aH[aO].url,aH[aO].name]}aK.player="html";aK.content='<div class="sb-message">'+s(Q.lang.errors[aN],S)+"</div>"}else{aL=true}}else{if(aK.player=="inline"){aG=ab.exec(aK.content);if(aG){aM=ad(aG[1]);if(aM){aK.content=aM.innerHTML}else{aL=true}}else{aL=true}}else{if(aK.player=="swf"||aK.player=="flv"){K=(aK.options&&aK.options.flashVersion)||Q.options.flashVersion;if(Q.flash&&!Q.flash.hasFlashPlayerVersion(K)){aK.width=310;aK.height=177}}}}if(aL){Q.gallery.splice(aJ,1);if(aJ<Q.current){--Q.current}else{if(aJ==Q.current){Q.current=aJ>0?aJ-1:aJ}}--aJ}}}function aq(K){if(!Q.options.enableKeys){return}(K?F:M)(document,"keydown",an)}function an(aG){if(aG.metaKey||aG.shiftKey||aG.altKey||aG.ctrlKey){return}var S=v(aG),K;switch(S){case 81:case 88:case 27:K=Q.close;break;case 37:K=Q.previous;break;case 39:K=Q.next;break;case 32:K=typeof ap=="number"?Q.pause:Q.play;break}if(K){n(aG);K()}}function c(aK){aq(false);var aJ=Q.getCurrent();var aG=(aJ.player=="inline"?"html":aJ.player);if(typeof Q[aG]!="function"){throw"unknown player "+aG}if(aK){Q.player.remove();Q.revertOptions();Q.applyOptions(aJ.options||{})}Q.player=new Q[aG](aJ,Q.playerId);if(Q.gallery.length>1){var aH=Q.gallery[Q.current+1]||Q.gallery[0];if(aH.player=="img"){var S=new Image();S.src=aH.content}var aI=Q.gallery[Q.current-1]||Q.gallery[Q.gallery.length-1];if(aI.player=="img"){var K=new Image();K.src=aI.content}}Q.skin.onLoad(aK,W)}function W(){if(!A){return}if(typeof Q.player.ready!="undefined"){var K=setInterval(function(){if(A){if(Q.player.ready){clearInterval(K);K=null;Q.skin.onReady(e)}}else{clearInterval(K);K=null}},10)}else{Q.skin.onReady(e)}}function e(){if(!A){return}Q.player.append(Q.skin.body,Q.dimensions);Q.skin.onShow(I)}function I(){if(!A){return}if(Q.player.onLoad){Q.player.onLoad()}Q.options.onFinish(Q.getCurrent());if(!Q.isPaused()){Q.play()}aq(true)}if(!Array.prototype.indexOf){Array.prototype.indexOf=function(S,aG){var K=this.length>>>0;aG=aG||0;if(aG<0){aG+=K}for(;aG<K;++aG){if(aG in this&&this[aG]===S){return aG}}return -1}}function aw(){return(new Date).getTime()}function aC(K,aG){for(var S in aG){K[S]=aG[S]}return K}function aF(aH,aI){var S=0,K=aH.length;for(var aG=aH[0];S<K&&aI.call(aG,S,aG)!==false;aG=aH[++S]){}}function s(S,K){return S.replace(/\{(\w+?)\}/g,function(aG,aH){return K[aH]})}function aj(){}function ad(K){return document.getElementById(K)}function C(K){K.parentNode.removeChild(K)}var h=true,x=true;function d(){var K=document.body,S=document.createElement("div");h=typeof S.style.opacity==="string";S.style.position="fixed";S.style.margin=0;S.style.top="20px";K.appendChild(S,K.firstChild);x=S.offsetTop==20;K.removeChild(S)}Q.getStyle=(function(){var K=/opacity=([^)]*)/,S=document.defaultView&&document.defaultView.getComputedStyle;return function(aJ,aI){var aH;if(!h&&aI=="opacity"&&aJ.currentStyle){aH=K.test(aJ.currentStyle.filter||"")?(parseFloat(RegExp.$1)/100)+"":"";return aH===""?"1":aH}if(S){var aG=S(aJ,null);if(aG){aH=aG[aI]}if(aI=="opacity"&&aH==""){aH="1"}}else{aH=aJ.currentStyle[aI]}return aH}})();Q.appendHTML=function(aG,S){if(aG.insertAdjacentHTML){aG.insertAdjacentHTML("BeforeEnd",S)}else{if(aG.lastChild){var K=aG.ownerDocument.createRange();K.setStartAfter(aG.lastChild);var aH=K.createContextualFragment(S);aG.appendChild(aH)}else{aG.innerHTML=S}}};Q.getWindowSize=function(K){if(document.compatMode==="CSS1Compat"){return document.documentElement["client"+K]}return document.body["client"+K]};Q.setOpacity=function(aG,K){var S=aG.style;if(h){S.opacity=(K==1?"":K)}else{S.zoom=1;if(K==1){if(typeof S.filter=="string"&&(/alpha/i).test(S.filter)){S.filter=S.filter.replace(/\s*[\w\.]*alpha\([^\)]*\);?/gi,"")}}else{S.filter=(S.filter||"").replace(/\s*[\w\.]*alpha\([^\)]*\)/gi,"")+" alpha(opacity="+(K*100)+")"}}};Q.clearOpacity=function(K){Q.setOpacity(K,1)};function o(K){return K.target}function V(K){return[K.pageX,K.pageY]}function n(K){K.preventDefault()}function v(K){return K.keyCode}function F(aG,S,K){jQuery(aG).bind(S,K)}function M(aG,S,K){jQuery(aG).unbind(S,K)}jQuery.fn.shadowbox=function(K){return this.each(function(){var aG=jQuery(this);var aH=jQuery.extend({},K||{},jQuery.metadata?aG.metadata():jQuery.meta?aG.data():{});var S=this.className||"";aH.width=parseInt((S.match(/w:(\d+)/)||[])[1])||aH.width;aH.height=parseInt((S.match(/h:(\d+)/)||[])[1])||aH.height;Shadowbox.setup(aG,aH)})};var y=false,al;if(document.addEventListener){al=function(){document.removeEventListener("DOMContentLoaded",al,false);Q.load()}}else{if(document.attachEvent){al=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",al);Q.load()}}}}function g(){if(y){return}try{document.documentElement.doScroll("left")}catch(K){setTimeout(g,1);return}Q.load()}function P(){if(document.readyState==="complete"){return Q.load()}if(document.addEventListener){document.addEventListener("DOMContentLoaded",al,false);au.addEventListener("load",Q.load,false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",al);au.attachEvent("onload",Q.load);var K=false;try{K=au.frameElement===null}catch(S){}if(document.documentElement.doScroll&&K){g()}}}}Q.load=function(){if(y){return}if(!document.body){return setTimeout(Q.load,13)}y=true;d();Q.onReady();if(!Q.options.skipSetup){Q.setup()}Q.skin.init()};Q.plugins={};if(navigator.plugins&&navigator.plugins.length){var w=[];aF(navigator.plugins,function(K,S){w.push(S.name)});w=w.join(",");var ai=w.indexOf("Flip4Mac")>-1;Q.plugins={fla:w.indexOf("Shockwave Flash")>-1,qt:w.indexOf("QuickTime")>-1,wmp:!ai&&w.indexOf("Windows Media")>-1,f4m:ai}}else{var p=function(K){var S;try{S=new ActiveXObject(K)}catch(aG){}return !!S};Q.plugins={fla:p("ShockwaveFlash.ShockwaveFlash"),qt:p("QuickTime.QuickTime"),wmp:p("wmplayer.ocx"),f4m:false}}var X=/^(light|shadow)box/i,am="shadowboxCacheKey",b=1;Q.cache={};Q.select=function(S){var aG=[];if(!S){var K;aF(document.getElementsByTagName("a"),function(aJ,aK){K=aK.getAttribute("rel");if(K&&X.test(K)){aG.push(aK)}})}else{var aI=S.length;if(aI){if(typeof S=="string"){if(Q.find){aG=Q.find(S)}}else{if(aI==2&&typeof S[0]=="string"&&S[1].nodeType){if(Q.find){aG=Q.find(S[0],S[1])}}else{for(var aH=0;aH<aI;++aH){aG[aH]=S[aH]}}}}else{aG.push(S)}}return aG};Q.setup=function(K,S){aF(Q.select(K),function(aG,aH){Q.addCache(aH,S)})};Q.teardown=function(K){aF(Q.select(K),function(S,aG){Q.removeCache(aG)})};Q.addCache=function(aG,K){var S=aG[am];if(S==k){S=b++;aG[am]=S;F(aG,"click",u)}Q.cache[S]=Q.makeObject(aG,K)};Q.removeCache=function(K){M(K,"click",u);delete Q.cache[K[am]];K[am]=null};Q.getCache=function(S){var K=S[am];return(K in Q.cache&&Q.cache[K])};Q.clearCache=function(){for(var K in Q.cache){Q.removeCache(Q.cache[K].link)}Q.cache={}};function u(K){Q.open(this);if(Q.gallery.length){n(K)}}Q.lang={code:"en",of:"of",loading:"loading",cancel:"Cancel",next:"Next",previous:"Previous",play:"Play",pause:"Pause",close:"Close",errors:{single:'You must install the <a href="{0}">{1}</a> browser plugin to view this content.',shared:'You must install both the <a href="{0}">{1}</a> and <a href="{2}">{3}</a> browser plugins to view this content.',either:'You must install either the <a href="{0}">{1}</a> or the <a href="{2}">{3}</a> browser plugin to view this content.'}};var D,at="sb-drag-proxy",E,j,ag;function ax(){E={x:0,y:0,startX:null,startY:null}}function aA(){var K=Q.dimensions;aC(j.style,{height:K.innerHeight+"px",width:K.innerWidth+"px"})}function O(){ax();var K=["position:absolute","cursor:"+(Q.isGecko?"-moz-grab":"move"),"background-color:"+(Q.isIE?"#fff;filter:alpha(opacity=0)":"transparent")].join(";");Q.appendHTML(Q.skin.body,'<div id="'+at+'" style="'+K+'"></div>');j=ad(at);aA();F(j,"mousedown",L)}function B(){if(j){M(j,"mousedown",L);C(j);j=null}ag=null}function L(S){n(S);var K=V(S);E.startX=K[0];E.startY=K[1];ag=ad(Q.player.id);F(document,"mousemove",H);F(document,"mouseup",i);if(Q.isGecko){j.style.cursor="-moz-grabbing"}}function H(aI){var K=Q.player,aJ=Q.dimensions,aH=V(aI);var aG=aH[0]-E.startX;E.startX+=aG;E.x=Math.max(Math.min(0,E.x+aG),aJ.innerWidth-K.width);var S=aH[1]-E.startY;E.startY+=S;E.y=Math.max(Math.min(0,E.y+S),aJ.innerHeight-K.height);aC(ag.style,{left:E.x+"px",top:E.y+"px"})}function i(){M(document,"mousemove",H);M(document,"mouseup",i);if(Q.isGecko){j.style.cursor="-moz-grab"}}Q.img=function(S,aG){this.obj=S;this.id=aG;this.ready=false;var K=this;D=new Image();D.onload=function(){K.height=S.height?parseInt(S.height,10):D.height;K.width=S.width?parseInt(S.width,10):D.width;K.ready=true;D.onload=null;D=null};D.src=S.content};Q.img.ext=["bmp","gif","jpg","jpeg","png"];Q.img.prototype={append:function(S,aI){var aG=document.createElement("img");aG.id=this.id;aG.src=this.obj.content;aG.style.position="absolute";var K,aH;if(aI.oversized&&Q.options.handleOversize=="resize"){K=aI.innerHeight;aH=aI.innerWidth}else{K=this.height;aH=this.width}aG.setAttribute("height",K);aG.setAttribute("width",aH);S.appendChild(aG)},remove:function(){var K=ad(this.id);if(K){C(K)}B();if(D){D.onload=null;D=null}},onLoad:function(){var K=Q.dimensions;if(K.oversized&&Q.options.handleOversize=="drag"){O()}},onWindowResize:function(){var aH=Q.dimensions;switch(Q.options.handleOversize){case"resize":var K=ad(this.id);K.height=aH.innerHeight;K.width=aH.innerWidth;break;case"drag":if(ag){var aG=parseInt(Q.getStyle(ag,"top")),S=parseInt(Q.getStyle(ag,"left"));if(aG+this.height<aH.innerHeight){ag.style.top=aH.innerHeight-this.height+"px"}if(S+this.width<aH.innerWidth){ag.style.left=aH.innerWidth-this.width+"px"}aA()}break}}};Q.iframe=function(S,aG){this.obj=S;this.id=aG;var K=ad("sb-overlay");this.height=S.height?parseInt(S.height,10):K.offsetHeight;this.width=S.width?parseInt(S.width,10):K.offsetWidth};Q.iframe.prototype={append:function(K,aG){var S='<iframe id="'+this.id+'" name="'+this.id+'" height="100%" width="100%" frameborder="0" marginwidth="0" marginheight="0" style="visibility:hidden" onload="this.style.visibility=\'visible\'" scrolling="auto"';if(Q.isIE){S+=' allowtransparency="true"';if(Q.isIE6){S+=" src=\"javascript:false;document.write('');\""}}S+="></iframe>";K.innerHTML=S},remove:function(){var K=ad(this.id);if(K){C(K);if(Q.isGecko){delete au.frames[this.id]}}},onLoad:function(){var K=Q.isIE?ad(this.id).contentWindow:au.frames[this.id];K.location.href=this.obj.content}};Q.html=function(K,S){this.obj=K;this.id=S;this.height=K.height?parseInt(K.height,10):300;this.width=K.width?parseInt(K.width,10):500};Q.html.prototype={append:function(K,S){var aG=document.createElement("div");aG.id=this.id;aG.className="html";aG.innerHTML=this.obj.content;K.appendChild(aG)},remove:function(){var K=ad(this.id);if(K){C(K)}}};var ao=false,Y=[],q=["sb-nav-close","sb-nav-next","sb-nav-play","sb-nav-pause","sb-nav-previous"],aa,ae,Z,m=true;function N(aG,aQ,aN,aL,aR){var K=(aQ=="opacity"),aM=K?Q.setOpacity:function(aS,aT){aS.style[aQ]=""+aT+"px"};if(aL==0||(!K&&!Q.options.animate)||(K&&!Q.options.animateFade)){aM(aG,aN);if(aR){aR()}return}var aO=parseFloat(Q.getStyle(aG,aQ))||0;var aP=aN-aO;if(aP==0){if(aR){aR()}return}aL*=1000;var aH=aw(),aK=Q.ease,aJ=aH+aL,aI;var S=setInterval(function(){aI=aw();if(aI>=aJ){clearInterval(S);S=null;aM(aG,aN);if(aR){aR()}}else{aM(aG,aO+aK((aI-aH)/aL)*aP)}},10)}function aB(){aa.style.height=Q.getWindowSize("Height")+"px";aa.style.width=Q.getWindowSize("Width")+"px"}function aE(){aa.style.top=document.documentElement.scrollTop+"px";aa.style.left=document.documentElement.scrollLeft+"px"}function ay(K){if(K){aF(Y,function(S,aG){aG[0].style.visibility=aG[1]||""})}else{Y=[];aF(Q.options.troubleElements,function(aG,S){aF(document.getElementsByTagName(S),function(aH,aI){Y.push([aI,aI.style.visibility]);aI.style.visibility="hidden"})})}}function r(aG,K){var S=ad("sb-nav-"+aG);if(S){S.style.display=K?"":"none"}}function ah(K,aJ){var aI=ad("sb-loading"),aG=Q.getCurrent().player,aH=(aG=="img"||aG=="html");if(K){Q.setOpacity(aI,0);aI.style.display="block";var S=function(){Q.clearOpacity(aI);if(aJ){aJ()}};if(aH){N(aI,"opacity",1,Q.options.fadeDuration,S)}else{S()}}else{var S=function(){aI.style.display="none";Q.clearOpacity(aI);if(aJ){aJ()}};if(aH){N(aI,"opacity",0,Q.options.fadeDuration,S)}else{S()}}}function t(aO){var aJ=Q.getCurrent();ad("sb-title-inner").innerHTML=aJ.title||"";var aP,aL,S,aQ,aM;if(Q.options.displayNav){aP=true;var aN=Q.gallery.length;if(aN>1){if(Q.options.continuous){aL=aM=true}else{aL=(aN-1)>Q.current;aM=Q.current>0}}if(Q.options.slideshowDelay>0&&Q.hasNext()){aQ=!Q.isPaused();S=!aQ}}else{aP=aL=S=aQ=aM=false}r("close",aP);r("next",aL);r("play",S);r("pause",aQ);r("previous",aM);var K="";if(Q.options.displayCounter&&Q.gallery.length>1){var aN=Q.gallery.length;if(Q.options.counterType=="skip"){var aI=0,aH=aN,aG=parseInt(Q.options.counterLimit)||0;if(aG<aN&&aG>2){var aK=Math.floor(aG/2);aI=Q.current-aK;if(aI<0){aI+=aN}aH=Q.current+(aG-aK);if(aH>aN){aH-=aN}}while(aI!=aH){if(aI==aN){aI=0}K+='<a onclick="Shadowbox.change('+aI+');"';if(aI==Q.current){K+=' class="sb-counter-current"'}K+=">"+(++aI)+"</a>"}}else{K=[Q.current+1,Q.lang.of,aN].join(" ")}}ad("sb-counter").innerHTML=K;aO()}function U(aH){var K=ad("sb-title-inner"),aG=ad("sb-info-inner"),S=0.35;K.style.visibility=aG.style.visibility="";if(K.innerHTML!=""){N(K,"marginTop",0,S)}N(aG,"marginTop",0,S,aH)}function av(aG,aM){var aK=ad("sb-title"),K=ad("sb-info"),aH=aK.offsetHeight,aI=K.offsetHeight,aJ=ad("sb-title-inner"),aL=ad("sb-info-inner"),S=(aG?0.35:0);N(aJ,"marginTop",aH,S);N(aL,"marginTop",aI*-1,S,function(){aJ.style.visibility=aL.style.visibility="hidden";aM()})}function ac(K,aH,S,aJ){var aI=ad("sb-wrapper-inner"),aG=(S?Q.options.resizeDuration:0);N(Z,"top",aH,aG);N(aI,"height",K,aG,aJ)}function ar(K,aH,S,aI){var aG=(S?Q.options.resizeDuration:0);N(Z,"left",aH,aG);N(Z,"width",K,aG,aI)}function ak(aM,aG){var aI=ad("sb-body-inner"),aM=parseInt(aM),aG=parseInt(aG),S=Z.offsetHeight-aI.offsetHeight,K=Z.offsetWidth-aI.offsetWidth,aK=ae.offsetHeight,aL=ae.offsetWidth,aJ=parseInt(Q.options.viewportPadding)||20,aH=(Q.player&&Q.options.handleOversize!="drag");return Q.setDimensions(aM,aG,aK,aL,S,K,aJ,aH)}var T={};T.markup='<div id="sb-container"><div id="sb-overlay"></div><div id="sb-wrapper"><div id="sb-title"><div id="sb-title-inner"></div></div><div id="sb-wrapper-inner"><div id="sb-body"><div id="sb-body-inner"></div><div id="sb-loading"><div id="sb-loading-inner"><span>{loading}</span></div></div></div></div><div id="sb-info"><div id="sb-info-inner"><div id="sb-counter"></div><div id="sb-nav"><a id="sb-nav-close" title="{close}" onclick="Shadowbox.close()"></a><a id="sb-nav-next" title="{next}" onclick="Shadowbox.next()"></a><a id="sb-nav-play" title="{play}" onclick="Shadowbox.play()"></a><a id="sb-nav-pause" title="{pause}" onclick="Shadowbox.pause()"></a><a id="sb-nav-previous" title="{previous}" onclick="Shadowbox.previous()"></a></div></div></div></div></div>';T.options={animSequence:"sync",counterLimit:10,counterType:"default",displayCounter:true,displayNav:true,fadeDuration:0.35,initialHeight:160,initialWidth:320,modal:false,overlayColor:"#000",overlayOpacity:0.5,resizeDuration:0.35,showOverlay:true,troubleElements:["select","object","embed","canvas"]};T.init=function(){Q.appendHTML(document.body,s(T.markup,Q.lang));T.body=ad("sb-body-inner");aa=ad("sb-container");ae=ad("sb-overlay");Z=ad("sb-wrapper");if(!x){aa.style.position="absolute"}if(!h){var aG,K,S=/url\("(.*\.png)"\)/;aF(q,function(aI,aJ){aG=ad(aJ);if(aG){K=Q.getStyle(aG,"backgroundImage").match(S);if(K){aG.style.backgroundImage="none";aG.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src="+K[1]+",sizingMethod=scale);"}}})}var aH;F(au,"resize",function(){if(aH){clearTimeout(aH);aH=null}if(A){aH=setTimeout(T.onWindowResize,10)}})};T.onOpen=function(K,aG){m=false;aa.style.display="block";aB();var S=ak(Q.options.initialHeight,Q.options.initialWidth);ac(S.innerHeight,S.top);ar(S.width,S.left);if(Q.options.showOverlay){ae.style.backgroundColor=Q.options.overlayColor;Q.setOpacity(ae,0);if(!Q.options.modal){F(ae,"click",Q.close)}ao=true}if(!x){aE();F(au,"scroll",aE)}ay();aa.style.visibility="visible";if(ao){N(ae,"opacity",Q.options.overlayOpacity,Q.options.fadeDuration,aG)}else{aG()}};T.onLoad=function(S,K){ah(true);while(T.body.firstChild){C(T.body.firstChild)}av(S,function(){if(!A){return}if(!S){Z.style.visibility="visible"}t(K)})};T.onReady=function(aH){if(!A){return}var S=Q.player,aG=ak(S.height,S.width);var K=function(){U(aH)};switch(Q.options.animSequence){case"hw":ac(aG.innerHeight,aG.top,true,function(){ar(aG.width,aG.left,true,K)});break;case"wh":ar(aG.width,aG.left,true,function(){ac(aG.innerHeight,aG.top,true,K)});break;default:ar(aG.width,aG.left,true);ac(aG.innerHeight,aG.top,true,K)}};T.onShow=function(K){ah(false,K);m=true};T.onClose=function(){if(!x){M(au,"scroll",aE)}M(ae,"click",Q.close);Z.style.visibility="hidden";var K=function(){aa.style.visibility="hidden";aa.style.display="none";ay(true)};if(ao){N(ae,"opacity",0,Q.options.fadeDuration,K)}else{K()}};T.onPlay=function(){r("play",false);r("pause",true)};T.onPause=function(){r("pause",false);r("play",true)};T.onWindowResize=function(){if(!m){return}aB();var K=Q.player,S=ak(K.height,K.width);ar(S.width,S.left);ac(S.innerHeight,S.top);if(K.onWindowResize){K.onWindowResize()}};Q.skin=T;au.Shadowbox=Q})(window);
Shadowbox.init();
