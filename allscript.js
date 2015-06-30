/////////////////////////////////////////////////////////////////////////////////////////////////////// GLOBAL VARIABLE
var win = $( window ), doc = $( document ), bdy = $('body'), pages = { main: '.pageHome', list: '.pageList', detail: '.pageDetail', blog: '.pageBlog' }, wt,  ht, wst, sRatio = 0, rstDom = false;

/////////////////////////////////////////////////////////////////////////////////////////////////////// MENU
var menu = {
	el: '.mainMenu',
	mobile: '.mainMenu .subMenuHldr',
	btn: '.mmenu',
	overlay: '.mobiMenu.vail',
	plugin: function( ID ){
		ID.minusDropDown({ customClass: 'opened', openedDelay: 222, isVisible: '.smartHeader' });
	},
	subMenu: function( ID ){
		$('.lvl2', ID).each(function( i, k ) { 
			var _this = $( this ), sib = _this.siblings('a');
			if( detectEl( $('> li', _this ) ) && detectEl( sib ) )
				_this.before('<span class="toggle"></span>'); 
		});	
		$('span.toggle', ID).bind('click', function(){
			var _this = $( this ), prt = _this.parent('li'), sib = prt.siblings('li');
			if( prt.hasClass('opened') ){
				ID.removeClass('subLvl1');
				$('.opened', ID).removeClass('opened');
			}else{
				sib.removeClass('opened');
				prt.addClass('opened');
				ID.addClass('subLvl1');
			}
		});
		$('.goBack', ID).bind('click', function(){
			ID.removeClass('subLvl1');
			$('.opened', ID).removeClass('opened');
		});	
	},
	destroy: function(){
		bdy.removeClass('mobiMenuReady mobileMenuOpened');
	},
	initMobile: function(){
		var _t = this, el = $( _t.mobile );
		if( detectEl( el ) ){
			
			if( detectEl( $( _t.btn ) ) )
				$( _t.btn ).bind('click', function(){
					if( bdy.hasClass('mobiMenuReady') ) 
						cssClass({ 'ID': 'body', 'delay': 444, 'type': 'remove', 'cls':['mobileMenuOpened', 'mobiMenuReady'] }); 
					else
						cssClass({ 'ID': 'body', 'delay': 100, 'type': 'add', 'cls':['mobiMenuReady', 'mobileMenuOpened'] }); 
				});
		
			if( detectEl( $( _t.overlay ) ) )
				$( _t.overlay ).bind('click', function(){ 
					cssClass({ 'ID': 'body', 'delay': 444, 'type': 'remove', 'cls':['mobileMenuOpened', 'mobiMenuReady'] }); 
				});
			
			_t.subMenu( el );	
		}
	},
	init: function(){
		var _t = this, el = $( _t.el );
		if( detectEl( el ) ){
			_t.plugin( el );
			_t.initMobile();
		}
	}
};

menu.init();

/////////////////////////////////////////////////////////////////////////////////////////////////////// CART
var cart = {
	amoundEl: 'span#lblUrunAdet',
	amountTarget: '.basketAmount',
	priceEl: 'span#lblUrunTutari',
	priceTarget: '.basketTotal',
	btn: '.userInfo .basket',
	overlay: '.mobiCart.vail',
	add: function(){
		var _t = this;
			_t.amound();
		pageScroll(0, function(){ _t.opened(); });	
	},
	amound: function(){
		var _t = this, amoundEl = $( _t.amoundEl ), amountTarget = $( _t.amountTarget ), priceEl = $( _t.priceEl ), priceTarget = $( _t.priceTarget );
		if( detectEl( amoundEl ) && detectEl( amountTarget ) ){
			var val = parseFloat( amoundEl.text() );
			amountTarget.text( val );
		}
		if( detectEl( priceEl ) && detectEl( priceTarget ) ){
			var val = parseFloat( priceEl.text() );
			if( val > 0 ) priceTarget.text( priceEl.text() );
		}
	},
	destroy: function(){
		bdy.removeClass('miniCartReady miniCartAnimate');
	},
	opened: function(){
		cssClass({ 'ID': 'body', 'delay': 100, 'type': 'add', 'cls':['miniCartReady', 'miniCartAnimate'] });
	},
	closed: function(){
		cssClass({ 'ID': 'body', 'delay': 444, 'type': 'remove', 'cls':['miniCartAnimate', 'miniCartReady'] });
	},
	init: function(){
		var _t = this;
		if( detectEl( $( _t.btn ) ) )
			$( _t.btn ).bind('click', function(){
				if( bdy.hasClass('miniCartReady') ) 
					_t.closed();
				else
					_t.opened();
			});
	
		if( detectEl( $( _t.overlay ) ) )
			$( _t.overlay ).bind('click', function(){ 
				_t.closed();
			});
	},
};

cart.init();

if( typeof sepetObjectID !== "undefined" )
	$.post(sepetObjectID, function( data ){ cart.amound(); });
stage.addEventListener("CustomEvent", [ { type: "sepetDoldur", handler: "cartAmound" } ]);
stage.addEventListener("CustomEvent", [ { type: "sepeteEkle", handler: "cartAdd" } ]);	
function cartAmound(){ cart.amound(); }
function cartAdd(){ cart.add(); }

/////////////////////////////////////////////////////////////////////////////////////////////////////// LOGIN
var login = {
	err: '.errorKutuLogin',
	btn: '.btnGirisPc',
	overlay: '.mobiLogin.vail',
	check: function(){
		var _t = this;
		if( detectEl( $( _t.err ) ) ){
			var ekt = cleanText( $( _t.err ).text() );
			if( ekt != '' ) _t.opened();
		}
	},
	destroy: function(){
		bdy.removeClass('userLoginReady userLoginAnimate');
	},
	opened: function(){
		cssClass({ 'ID': 'body', 'delay': 100, 'type': 'add', 'cls':['userLoginReady', 'userLoginAnimate'] });
	},
	closed: function(){
		cssClass({ 'ID': 'body', 'delay': 444, 'type': 'remove', 'cls':['userLoginAnimate', 'userLoginReady'] });
	},
	init: function(){
		var _t = this;
		if( detectEl( $( _t.btn ) ) )
			$( _t.btn ).bind('click', function(){
				if( bdy.hasClass('userLoginReady') ) 
					_t.closed();
				else
					_t.opened();
			});
	
		if( detectEl( $( _t.overlay ) ) )
			$( _t.overlay ).bind('click', function(){ 
				_t.closed();
			});
	}
};
login.init();

/////////////////////////////////////////////////////////////////////////////////////////////////////// MAIN PAGE
function mainPage(){
	if( detectEl( $('.mainSlider') ) ) $('.mainSlider').minusSimpleSlider({ infinite: true, rotate:false, navPosition: false });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////// LIST PAGE
function listPage(){
	//noThing
}

/////////////////////////////////////////////////////////////////////////////////////////////////////// DETAIL PAGE
function detailPage(){
	//noThing
}

/////////////////////////////////////////////////////////////////////////////////////////////////////// BLOG PAGE
function blogPage(){
	//noThing
}

/////////////////////////////////////////////////////////////////////////////////////////////////////// PAGES
if( detectEl( $( pages['main'] ) ) ) mainPage();
if( detectEl( $( pages['list'] ) ) ) listPage();
if( detectEl( $( pages['detail'] ) ) ) detailPage();
if( detectEl( $( pages['blog'] ) ) ) blogPage();

/////////////////////////////////////////////////////////////////////////////////////////////////////// GLOBAL FUNC

function getAjax( uri, callback, error ){
	$.ajax({
		type:'GET',
		dataType:'html',
		url: uri,
		error: function( e ){ 
			if( error != undefined ) 
				error( e ); 
		},
		timeout: 30000,
		success:function( d ){ 
			if( callback != undefined ) 
				callback( d );
		}
	});
}

function detectEl( ID ){ return ID.length > 0 ? true : false; }

function cssClass( o, callback ){
	var ID = $( o['ID'] ), k = o['delay'], type = o['type'], cls;
	if( detectEl( ID ) ){
		if( type == 'add' ){
			cls = o['cls'] || ['ready', 'animate'];
			ID.addClass( cls[ 0 ] ).delay( k ).queue('fx', function(){ $( this ).dequeue().addClass( cls[ 1 ] ); if( callback != undefined ) callback(); });
		}else{
			cls = o['cls'] || ['animate', 'ready'];
			ID.removeClass( cls[ 0 ] ).delay( k ).queue('fx', function(){ $( this ).dequeue().removeClass( cls[ 1 ] ); if( callback != undefined ) callback(); });
		}
	}
}

function pageScroll( t, callback ){
	$('html, body').stop().animate({ scrollTop: t }, 888, 'easeInOutExpo', function(){ if( callback != undefined ) callback();  });
}

function triggerMinusScroller( ID ){
	if( detectEl( ID ) ){
		ID.minusScroller({ resize:true, navigation:true, snap: true, padding:0, divName: { wrapper: '#ajxUrunList > .prdListHolder', ul: '> ul', li: '> li' } });
		lazyControl( ID );
	}
}

function lazyControl( ID ){
	if( detectEl( ID ) ){
		if( $('img.lazyload', ID).length > 0 )
			$('img.lazyload', ID).unveil().trigger("unveil");
	}
}

function iStylers(){	
	if( detectEl( $("select, input:checkbox, input:radio") ) )
		$("select, input:checkbox, input:radio").iStyler({ wrapper:true });
}

function cleanText( k ){
	return k.replace(/\s+/g, '');
}

function destroy(){
	login.destroy();
	cart.destroy();
	menu.destroy();
}

function changeDivPosition( type ){
	if( type == 'mobi' ){
		// noThing
	}else{
		// noThing
	}
}

function clearClass( type ){
	if( type == 'mobi' ){
		// noThing
	}else{
		// noThing
	}
}

function resetDom(){
	if( $('.smartHeader').is(':visible') && !rstDom ){
		// MOBILE VER.
		rstDom = true;
		clearClass('mobi');
		changeDivPosition('mobi');
		destroy();
	}else if( !$('.smartHeader').is(':visible') && rstDom ){
		// PC VER.
		rstDom = false;
		clearClass('pc');
		changeDivPosition('pc');
		destroy();
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////// GLOBAL EVENTS
var events =
{
	
	init: function(){
	
	},
	
	onResize: function(){
		wt = parseFloat( win.width() );
		ht = parseFloat( win.height() );
		resetDom();			
	},
	
	onScroll: function(){
		wst = parseFloat( win.scrollTop() );
		sRatio = wst / ( doc.height() - ht );
	}
	
};

win.load( events.init );
win.resize( events.onResize ).resize();
win.scroll( events.onScroll ).scroll();