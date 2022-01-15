class MainComponent {




    // статический компонент ( html-разметка не меняется )
    static index( data = null ) {
        
        //let str = window.location.pathname.substr( 1 );
        //let tag = getCpnByUrn( str );

        //console.log( data );


        let html = `
            ${ ContentComponent.index( {} ) }
        `;

        return html;
    }




    // динамическая разметка ( html-разметка загружается по требованию )
    static html( data = null ) {

        $('component-modal').html(``);

    }



    static meta() {

        return {
            description: 'Описание index-страницы',
            image: 'http://blablabla.com/img/site-banner.jpg',
            url: 'http://this-site.com',
            title: 'MainComponent.meta()',
            type: 'website',
            site_name: 'Название этого сайта',
            keywords: 'слово,ключ,магазин,итд,итп',
        };
    }








}







