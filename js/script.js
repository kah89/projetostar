	/**
	 * Função para criar um objeto XMLHTTPRequest
	 */
	function CriaRequest() {
	    try {
	        request = new XMLHttpRequest();
	    } catch (IEAtual) {

	        try {
	            request = new ActiveXObject("Msxml2.XMLHTTP");
	        } catch (IEAntigo) {

	            try {
	                request = new ActiveXObject("Microsoft.XMLHTTP");
	            } catch (falha) {
	                request = false;
	            }
	        }
	    }

	    if (!request)
	        alert("Seu Navegador não suporta Ajax!");
	    else
	        return request;
	}









	/*var offset = $('#meuMenu').offset().top;
	var $meuMenu = $('#meuMenu');
	$(document).on('scroll', function () {
	    if (offset <= $(window).scrollTop()) {
	        $meuMenu.addClass('fixar');
	    } else {
	        $meuMenu.removeClass('fixar');
	    }
	}); */




	$(document).ready(function () {
        
      //  if(sessionStorage.getItem('chave')!='')
//		{
			//$('input[id=txtemailhidden]').val(JSON.parse(sessionStorage.getItem('chave')));
//		}
        
        

	        $('#btnsairtopo').css('display', 'none');
            $('#btnsetatopo').css('display', 'none');



	    // //site STAR (pagina area do cliente) - CADASTRO
	    $('#btncadastrar').click(function () {
            
             var msgHtml;
            
           if ($('input[id=txtNome]').val() == ''|| $('input[id=txtsobrenome]').val() == ''|| $('input[id=txtemaildois]').val() == ''|| $('input[id=txttelefone]').val() == ''|| $('input[id=txtcpf]').val() == ''|| $('input[id=txtsenhadois]').val() == '' || $('input[id=txtrepetirsenha]').val() == '') {
	            msgHtml = 'Preencha todos os campos';
	            $('#dialog').dialog('open');
	            $('#resultado').html(msgHtml);
            
            } 
                        
	        else{
            cadastrarclientesStar();
            }
        
            
	      //  $('#btnsairtopo').css('display', 'block');
            $('#btnsetatopo').css('display', 'block');
            
            
                $('#btnnometopo').css('display', 'block');
             
           
            
         
	    });

	    $('#btnsairtopo').click(function () {
	        var msgHtml;
            desconectarEmail();
	        $('#btnsairtopo').css('display', 'none');
            $('#btnsetatopo').css('display', 'none');
            $('#btnnometopo').css('display', 'none');
            $('#idenfNome').html('');
            
           

	    });
        
          //entrar no site STAR (pagina area do cliente) - LOGIN

	    
	    $('#btnentrar').click(function () {
            var msgHtml;
             
	        
	        
	        if ($('input[id=txtemail]').val() == ''|| $('input[id=txtsenha]').val() == '') {
	            msgHtml = 'Preencha todos os campos';
	            $('#dialog').dialog('open');
	            $('#resultado').html(msgHtml);
                
                
                
	        } else //{$('#tabelasenha').html(MostrarSenha (arr_usuarios_senha ));} 
	            validarEmail();
         
	          /*limpar os campos*/
	        $('input[id=txtemail]').val("");
            $('input[id=txtsenha]').val("");
          
	        
            
           

	        /*posicionar no campo txtNumero*/
	        $('input[id=txtemail]').focus();
            
            
	    });
        
        
        
       
	    });



	$(function () {

	    // Caixa de Mensagem
	    $('#dialog').dialog({
	        autoOpen: false,
	        width: 600,
	        buttons: {
	            "Ok": function () {
	                $(this).dialog("close");
	            },
	            
	        }
	    });


	});



 












	function MostrarSenha(obj) {
	    var msgHtml;
	    var strusuario = $('input[id=txtnome]').val();
	    var strsenha = $('input[id=txtSenha]').val();
	    var controle = false;

	    for (var i in obj) {
	        if (obj[i].usuario == strusuario && obj[i].senha == strsenha) {
	            controle = true;
	        }
	    }

	    if (controle == true) {
	        msgHtml = 'Bem vindo';
	    } else {
	        msgHtml = 'Usuário ou senha incorretos';
	        $('input[id=txtnome]').focus();
	    }

	    $('#dialog').dialog('open');
	    $('#resultado').html(msgHtml);
	}









	










	





	//função para logar no site STAR


	function validarEmail() {

	    var stremail = $('input[id=txtemail]').val();
	    var strsenha = $('input[id=txtsenha]').val();
	    var url = "bd/verificarLogin.php?txtemail=" + stremail + "&txtsenha=" + strsenha;


	    var xmlreq = CriaRequest();
	    // Iniciar uma requisição
	    xmlreq.open('POST', url, true);



	    // Atribui uma função para ser executada sempre que houver uma mudança de ado
	    xmlreq.onreadystatechange = function () {

	        // Verifica se foi concluído com sucesso e a conexão fechada (readyState=4)
	        if (xmlreq.readyState == 4) {

	            // Verifica se o arquivo foi encontrado com sucesso
	            if (xmlreq.status == 200) {
                    
	                //alert(xmlreq.responseText);
	               mostrarResultado(JSON.parse(xmlreq.responseText));
	            }
                
                else
                    {
                        var dados = "";
	                    sessionStorage.setItem('chave', dados );
                        mostrarResultado(JSON.parse(xmlreq.responseText));
                    }
                
                
	        }
	    };
	    xmlreq.send(null);
	}














	//função para desconectar no site STAR

	function desconectarEmail() {

	    var stremail = $('input[id=txtemailhidden]').val(); 
	    var url = "bd/VerificarLogin.php?txtLogout=" + stremail;


	    var xmlreq = CriaRequest();
	    // Iniciar uma requisição
	    xmlreq.open('POST', url, true);

	    // Atribui uma função para ser executada sempre que houver uma mudança de ado
	    xmlreq.onreadystatechange = function () {

	        // Verifica se foi concluído com sucesso e a conexão fechada (readyState=4)
	        if (xmlreq.readyState == 4) {

	            // Verifica se o arquivo foi encontrado com sucesso
	            if (xmlreq.status == 200) {
	                //alert(xmlreq.responseText);
	                mostarResultado(JSON.parse(xmlreq.responseText));
	            }
                
                 
	        }
	    };
	    xmlreq.send(null);
	}









	








	// função cadastrar cliente STAR (PAGINA CADASTRO)
	function cadastrarclientesStar() {
	    var strNome = $('input[id=txtNome]').val();
	    var strsobrenome = $('input[id=txtsobrenome]').val();
	    var stremaildois = $('input[id=txtemaildois]').val();
	    var strtelefone = $('input[id=txttelefone]').val();
	    var strcpf = $('input[id=txtcpf]').val();
	    var strsenhadois = $('input[id=txtsenhadois]').val();
        var strrepetirsenha =  $('input[id=txtrepetirsenha]').val();
        
        
        
	    var url = "bd/incluirClientes.php?txtNome="+strNome+"&txtsobrenome="+strsobrenome+"&txtemaildois="+stremaildois+"&txttelefone="+strtelefone+"&txtcpf="+strcpf+"&txtsenhadois="+strsenhadois+"&txtrepetirsenha="+strrepetirsenha;
        
       

	    var xmlreq = CriaRequest();
	    xmlreq.open('POST', url, true);

	    // Atribui uma função para ser executada sempre que houver uma mudança de ado
	    xmlreq.onreadystatechange = function () {

	        // Verifica se foi concluído com sucesso e a conexão fechada (readyState=4)
	        if (xmlreq.readyState == 4) {

	            // Verifica se o arquivo foi encontrado com sucesso
	            if (xmlreq.status == 200) {
	             //   alert(xmlreq.responseText);
                $('#idenfNome').html(strNome);
                $('input[id=txtemailhidden]').val(stremaildois);   
                mostrarResultadoIncluir(JSON.parse(xmlreq.responseText));
	            }
                else
                    {
                        var dados = "";
	                    sessionStorage.setItem('chave', dados );
                        mostrarResultadoIncluir(JSON.parse(xmlreq.responseText));
                    }
	        }
	    };
        
        
    
         /*limpar os campos*/
    $('input[id=txtNome]').val("");
    $('input[id=txtsobrenome]').val("");
    $('input[id=txtemaildois]').val("");
    $('input[id=txttelefone]').val("");
    $('input[id=txtcpf]').val("");
    $('input[id=txtsenhadois]').val("");
    $('input[id=txtrepetirsenha]').val("");
    xmlreq.send(null);

	}




	function mostrarResultadoIncluir(obj) {
	    var msgHtml;
        var i;
        
        

	    switch (obj.RetornoDados.sucesso) {
	   
	    case 0:
	        msgHtml = 'Cliente cadastrado com sucesso';
             $('#btnsairtopo').css('display', 'block');
	        break;
	   case 1:
	        msgHtml = 'Problemas ao incluir cliente';
	        break;
	   


	    }
        
        
       
        
	    $('#dialog').dialog('open');
	    $('#resultado').html(msgHtml);


	}




	function mostrarResultado(obj) {
	    var msgHtml;


	    switch (obj[0].logado) {
	   
	    case '0':
	        msgHtml = 'Contate o Administrador do Site e informe problemas ao desconectar';
	        break;
	   case '2':
	        msgHtml = 'Usuário ou senha incorretos';
	        break;
	    case '3':
	        msgHtml = 'Usuário já esta conectado';
	        break;
	    case '4':
	        msgHtml = 'Bem vindo';
            $('#idenfNome').html(obj[0].nomeusuario);
         //   var dados = JSON.stringify(obj[0].usuario);
	       //    sessionStorage.setItem('chave', dados );
        
         
            $('input[id=txtemailhidden]').val(obj[0].usuario);   
            $('#btnsairtopo').css('display', 'block');
            $('#btnsetatopo').css('display', 'block');
            
	        break;
                
        case '5':
	        msgHtml = 'Até breve!!!';
	        break;
            
	        // code block


	    }
        
        
       
        
	    $('#dialog').dialog('open');
	    $('#resultado').html(msgHtml);


	}



// TELEFONE PAGINA STAR 

function mascaraTelefone( campo  ) {
							

				function trata( valor) {
					
					valor = valor.replace(/\D/g,"");                   //Remove tudo o que não é dígito         			
					valor = valor.replace(/^(\d{2})(\d)/g,"($1)$2");  //Coloca parênteses em volta dos dois primeiros dígitos		
					valor = valor.replace(/(\d)(\d{5})$/,"$1-$2");   //Coloca parênteses em volta dos dois primeiros dígitos
				
					return valor;
				}


				campo.onkeypress = function (evt) {
					 
					var code = (window.event)? window.event.keyCode : evt.which;	
					var valor = this.value;
					
					if(code > 57 || (code < 48 && code != 8 ))  {
						return false;
					} else {
						this.value = trata(valor);
					}
				}
				
				campo.onblur = function() {
					
					var valor = this.value;
					if( valor.length < 13 ) {
						this.value = "";
					}else {		
						this.value = trata( this.value, true );
					}
				}
				
				campo.maxLength = 14;
			}









	//função galeria//

	function myFunction(imgs) {
	    var expandImg = document.getElementById("expandedImg");
	    var imgText = document.getElementById("imgtext");
	    expandImg.src = imgs.src;
	    imgText.innerHTML = imgs.alt;
	    expandImg.parentElement.style.display = "block";
	}




	//função sobre//

	/*$(document).ready(function () {
	    $("#about").click(function () {
	        $("#sobre").slideDown("slow");
	        $("#missao").hide("slow");
	        $("#visao").hide("slow");
	        $("#valores").hide("slow");
	    });
	});

	$(document).ready(function () {
	    $("#mission").click(function () {
	        $("#missao").slideDown("slow");
	        $("#sobre").hide("slow");
	        $("#visao").hide("slow");
	        $("#valores").hide("slow");
	    });
	});



	$(document).ready(function () {
	    $("#vision").click(function () {
	        $("#visao").slideDown("slow");
	        $("#sobre").hide("slow");
	        $("#missao").hide("slow");
	        $("#valores").hide("slow");
	    });
	});


	$(document).ready(function () {
	    $("#values").click(function () {
	        $("#valores").slideDown("slow");
	        $("#sobre").hide("slow");
	        $("#missao").hide("slow");
	        $("#visao").hide("slow");
	    });
	});*/


//SOBRE TRES
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

	