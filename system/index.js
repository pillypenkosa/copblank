// получить компонент по URN
function getCpnByUrn( txt = null ) {

    let cpn = 'WinIndexComponent';
    //let str = window.location.pathname.substr( 1 );
    //console.log( urns );

    if ( txt ) {
	    //console.log( txt );
	    
	    let cmp = urns.find( function( k ){

	    	if ( k.urn ) {
		    	//console.log( k.urn );

		        return k.urn.test( txt );
	    	}
	    });

    	//console.log( cmp );


		if ( cmp ){
		    cpn = cmp.cpn;
		}
		else cpn = 'WinErr404Component';
    }

    //console.log( cpn );

    return cpn;



}







function component222( data ) {

/*
	let nameClass = '';
	let arr = data.tag.split('-');

	arr.map( function( k ){
		nameClass += k.substr( 0, 1 ).toUpperCase() + k.substr( 1 );
	});

*/

	let cpn = getCpnByTag( data.tag );

	alert( cpn ); 
	//return;



	//let nameClass = getCpnByTag( 'nav-btns' ) + 'Component';

	return eval( cpn ).index( data );
}


//tag: 'nav-btns',


// получить класс компонента по тегу
function getCpnByTag222( txt ) {

	console.log( txt );


    let obj = urns.find( function( k ){
    	//console.log( k );

    	if ( k.tag == txt ) 
    		return true;
    });



	//console.log( obj );

    if ( obj )
    	return obj.cpn;
}


//console.log( getCpnByTag( 'nav-btns' ));








function meta( data ) {

	$('meta[property="og:description"]').attr('content', data.description );
	$('meta[property="og:image"]').attr('content', data.image );
	$('meta[property="og:url"]').attr('content', data.url );
	$('meta[property="og:title"]').attr('content', data.title );
	$('meta[property="og:type"]').attr('content', data.type );
	$('meta[property="og:site_name"]').attr('content', data.site_name );

	$('meta[name="description"]').attr('content', data.description );
	$('meta[name="keywords"]').attr('content', data.keywords );
}







$(function(){



	$('component-main').html( MainComponent.index( {} ) );







	$('body222').on('click', 'a.local', function(){

		// onclick="event.preventDefault()"

		let href = $(this).attr('href');

		event.preventDefault();

		//console.log( 'index.js',  href );



        if ( history.pushState ) {
            //history.pushState( null, null, window.location.protocol + "//" + window.location.host + window.location.pathname + '#' + win );
            history.pushState( null, null, href );
        }








	})

	//alert();


	//$('meta[name="description"]').attr('content');


	//console.log( $('meta[name="description"]').attr('content', '123qwer') );

/*
	metaData = {
		description: 'Описалово дескрипшн',
		image: 'http://blablabla.com/img/site-banner.jpg',
		url: 'http://this-site.com',
		title: 'Титровалка в титул',
		type: 'website',
		site_name: 'Мазвание моего сайта',
		keywords: 'слово,ключ,магазин,итд,итп',
	};



	meta( metaData );

*/


/*

	<meta name="description" content="">
	<meta property="og:description" content="">



*/












});













