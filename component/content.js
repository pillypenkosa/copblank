class ContentComponent {


	static repairArr = {
		fio: '',
		pdr_post: [],
		pdr_prot: [],
		pdr_td: [],
		gb_post: [],
		gb_prot: [],
        gb_zatr: [],
		gb_pripis: [],
	};





    static index( data=null ) {
        //console.log( data );

        let html = '<div class="titleWin">Бланкова продукція</div>';


        html += `

        <select id="bat" class="inspector">
            <option value="0">- батальон</option>
            <option value="1">Батальон 1</option>
            <option value="2">Батальон 2</option>
            <option value="3" selected>Батальон 3</option>
            <option value="4">Батальон 4</option>
        </select>

        <select id="rota" class="inspector">
            <option value="0">- рота</option>
            <option value="1">Рота 1</option>
            <option value="2">Рота 2</option>
            <option value="3">Рота 3</option>
            <option value="4">Рота 4</option>
            <option value="5">Рота 5</option>
            <option value="6">Рота 6</option>
        </select>

        `;



        // фамилии
        let inputSelect = '<select id="fio" class="fio inspector"><option>П.І.Б.</option>';

/*
        serviceUsers.map( function( k ){
        	inputSelect += '<option value="' + k.id + '">' + k.name + '</option>';
        });
*/

        inputSelect += '</select><br/><br/>';



        // категории бланков
        let catBlankBtns = '';

        serviceBlankCat.map( function( k ){
        	catBlankBtns += '<button value="' + k.id + '">Додати ' + k.name + '</button>';
        });


        //let jsonExampleDel = `{ name: "pilip", doc: { aa: 'qersdfgsdf', bb: '098adouahdsf' } }`;



        html += inputSelect;
        html += '<div class="inputBlank"></div>';

        if ( true ) {
            html += '<div class="cpBtnsAdd">' + catBlankBtns + '</div>';
            html += '<div id="checkReport">' + ContentComponent.getHtmlReport() + '</div>';
            html += '<textarea id="jsonTxt"></textarea>';
            html += '<hr/><button id="btnSend">Завершити та скопіювати</button>';
        }


        // обработчик кнопки добавить
        ContentComponent.clcBtnAdd();

        // обработчик кнопки отмены добавления
        ContentComponent.clcBtnAddCancel();

        // обработчик кнопки отправления сформированного отчета на сервер
        ContentComponent.clcBtnSend();

        ContentComponent.clcBtnSelect();







        return '<component-content>' + html + '</component-content>';
    }




    static html( data ) {

        //console.log( data );

        //$('component-content').html();
    }



    static showFormAddBlank( txt, arr ) {


    	//console.log( txt );
    	//console.log( arr );



        let option = `<option></option>`;

        arr.map( function( k ){
            option += '<option value="' + k.name + '">' + k.name + '</option>';
        });


        let txtHint = serviceBlankCat.find( k => k.id == txt );

		//alert( txtHint.name  );


        $('component-content .inputBlank').html(`
            <div class="titleBlankPre">${ txtHint.name }</div>

            <div class="preHint">
                <span class="txtSeria"></span> <span class="txtNfrom"></span><span class="txtNto"></span> <span class="txtItems"></span>
            </div>

            <div class="chose">
                <select class="seria">${ option }</select>
                <input type="number" class="inputNum from" placeholder="№ від">
                <input type="number" class="inputNum to" placeholder="№ до">

                <div class="cp">
                    <button id="btnAdd">Додати</button>
                    <button id="btnCancelBlank">Відміна</button>
                </div>
            </div>
        `);



        // изменение серии
        $('body component-content .inputBlank .seria').on('change', function(){
            let val = $(this).val();
            $('body component-content .inputBlank .txtSeria').html( val );
        });


        // изменение номера FROM
        $('body component-content .inputBlank .from').on('keyup', function(e) { 
            let val = $(this).val();
            $('body component-content .inputBlank .to').val( val );
            $('body component-content .inputBlank .to').css({color: '#000'});

            $('body component-content .inputBlank .txtNfrom').html( val );
            $('body component-content .inputBlank .txtNto').html('');
            $('body component-content .inputBlank .txtItems').html('(1 шт)');
        });



        // изменение номера TO
        $('body component-content .inputBlank .to').on('keyup', function(e) { 
            let from = +$('body component-content .inputBlank .from').val();
            let to = +$(this).val();


            if ( to < from ) {
                //$('body component-content .inputBlank .to').val( from );
                $('body component-content .inputBlank .to').css({color: '#f00'});


            } else {
                $('body component-content .inputBlank .to').css({color: '#000'});

            }


            let txtTo = '';
            let txtItem = '';
            //let txtTo = ( to > from ) ? ' - ' + to : '';

            if ( to > from ) {
                txtTo = '..' + to;
                txtItem = to - from + 1;

            } else {
                txtTo = '';
                txtItem = 1;
            }

            $('body component-content .inputBlank .txtNto').html( txtTo );
            $('body component-content .inputBlank .txtItems').html('(' + txtItem + ' шт)');

        });



        // обработчик-клик по кнопке Отмена внесения данной категории материалов
        $('body component-content .inputBlank').off('click', '#btnCancelBlank');
        $('body component-content .inputBlank').on('click', '#btnCancelBlank', function(){
            $('component-content .inputBlank').empty();
        });



        // обработчик-клик по кнопке Добавить
        $('body component-content .inputBlank').off('click', '#btnAdd');
        $('body component-content .inputBlank').on('click', '#btnAdd', function(){
            //$('component-content .inputBlank').empty();
            ContentComponent.repairArr.fio = $('component-content .fio').val();

            let data = { 
            	seria: $('component-content .inputBlank .seria').val(),
            	from: $('component-content .inputBlank .from').val(),
            	to: $('component-content .inputBlank .to').val(),
            };

            if ( !ContentComponent.repairArr.fio ) {
            	alert('Вкажіть прізвище');
            	return;
            }

            if ( !data.seria ) {
            	alert('Вкажіть серію бланка');
            	return;
            }

            if ( !data.from ) {
            	alert('Вкажіть номер бланка');
            	return;
            }

            if ( data.to && data.to < data.from ) {
            	alert( 'Невірний діапазон! Перевірте правильність номерів...');
            	return;
            }

            if ( data.from == data.to )
            	data.to = '';


            ContentComponent.repairArr[ txt ].push( data );
            ContentComponent.showRepairArr();

            // клик по кнопке удалить бланк из подготовленного списка
	    	$('component-content #checkReport').off('click', '.deleteRecord');
	    	$('component-content #checkReport').on('click', '.deleteRecord', function(){

	    		let cat = $(this).data('cat');
	    		let index = $(this).data('index');

				ContentComponent.repairArr[ cat ].splice( index, 1 );
            	ContentComponent.showRepairArr();
	    	});


            $('component-content .inputBlank').empty();

        });
    }





    static getHtmlReport() {
        let html = '';

        serviceBlankCat.map( function( k ){
            html += `
                <div class="blanks ${ k.id }">
                    <div class="title">${ k.name }</div>
                    <div class="list"></div>
                </div>
            `; 
        });

        return html;
    }





    static showRepairArr() { 

        //alert( 'showRepairArr()' );

        //$('component-content #checkReport').empty();
    	$('component-content #checkReport').html( ContentComponent.getHtmlReport() );



/*

    	serviceBlankCat.map( function( k ){
	    	$('component-content #checkReport').append(`
	    		<div class="blanks ${ k.id }">
	    			<div class="title">${ k.name }</div>
	    			<div class="list"></div>
	    		</div>
	    	`); 

            //console.log( k );
    	});



*/




    	serviceBlankCat.map( function( k ){

            if ( ContentComponent.repairArr[ k.id ].length ) {

    	    	ContentComponent.repairArr[ k.id ].map( function( k1, i1 ){

    	    		let txtTo = ( k1.to ) ? '-' + k1.to : '';

    	    		$('component-content #checkReport .' + k.id + ' .list').append(`
    	    			<div class="each">
    	    				${ k1.seria } ${ k1.from }${ txtTo } <span class="deleteRecord" data-cat="${ k.id }" data-index="${ i1 }" title="Видалити">&#10006;</span>
    	    			</div>
    	    		`);
    	    	}); 
            
            } else {
                $('component-content #checkReport .' + k.id + ' .list').html('нет');

            }

    	});


        //console.log( ContentComponent.repairArr );
    }










    static clcBtnAdd() {

        let selector = 'component-content button';

        $('body').off('click', selector );
        $('body').on('click', selector, function(){

            let cat = $(this).val();

            //alert( id );

            //$('component-content .inputBlank').empty();

            if ( cat == 'pdr_post' ) 
            	ContentComponent.showFormAddBlank( cat, servicePostPDR );
            
            if ( cat == 'pdr_prot' ) 
            	ContentComponent.showFormAddBlank( cat, serviceProtPDR );
            
            if ( cat == 'pdr_td' ) 
            	ContentComponent.showFormAddBlank( cat, serviceTD );
            
            if ( cat == 'gb_post' ) 
            	ContentComponent.showFormAddBlank( cat, listPostGB );
            
            if ( cat == 'gb_prot' ) 
            	ContentComponent.showFormAddBlank( cat, serviceProtGB );
            
            if ( cat == 'gb_zatr' ) 
            	ContentComponent.showFormAddBlank( cat, serviceZatr );

            if ( cat == 'gb_pripis' ) 
                ContentComponent.showFormAddBlank( cat, servicePripis );

        });
    }




    static clcBtnAddCancel() {


    }






    static clcBtnSend() {

        $('body').on( 'click', '#btnSend', ()=>{

            let data = {};


            data.bat = +$('#bat').val();
            data.rota = +$('#rota').val();
            data.fio = $('#fio').val();


            if ( !data.bat ) {
                alert( 'Оберіть батальон...' );
                return;
            }

            if ( !data.rota ) {
                alert( 'Оберіть роту...' );
                return;
            }

            if ( !data.fio ) {
                alert( 'Оберіть прізвище...' );
                return;
            }



            //repairArr


            ContentComponent.repairArr.fio = data.fio;


            //console.log( data );
            console.log( ContentComponent.repairArr );


            let textArea = document.getElementById( 'jsonTxt' );

            textArea.value = JSON.stringify( ContentComponent.repairArr ) + ',';

            textArea.select();
            document.execCommand( 'copy' );








            //alert( 'clcBtnSend()' );
            //alert( txt );



        }); 
    }



    static clcBtnSelect() {


        $('body').on('change', '#bat', function(){

            let bat = +$(this).val();
            let rota = +$('#rota').val();

            let users = ContentComponent.getUsers( bat, rota );

            //console.log( users );

            $('#fio').html( ContentComponent.getHTMLusersOption( users ));
        });



        $('body').on('change', '#rota', function(){

            let rota = +$(this).val();
            let bat = +$('#bat').val();

            let users = ContentComponent.getUsers( bat, rota );

            //console.log( users );

            $('#fio').html( ContentComponent.getHTMLusersOption( users ));
        });




    }







    static getUsers( bat, rota ) {

        let users = [];

        if ( bat ) {
            if ( rota ) {
                users = serviceUsers.filter( function( k ){
                    if ( k.b == bat && k.r == rota )
                        return true;
                });
            } else {
                users = serviceUsers.filter( function( k ){
                    if ( k.b == bat )
                        return true;
                });
            }
        }

        return users;
    }





    static getHTMLusersOption( arr ) {

        let html = '<option value="">П.І.Б.</option>';

        arr.map( function( k ){
            html += '<option value="' + k.id + '">' + k.name + ' ' + k.b + '/' + k.r + '/' + k.v + '</option>';
        });

        return html;
    }







}










