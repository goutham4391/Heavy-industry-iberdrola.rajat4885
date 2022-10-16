/*******************************************************************************
 * Copyrigth � 2017 Iberdrola, S.A. Todos los derechos reservados.
 *******************************************************************************/
$(document).ready(function(){

	listenerCerrarModal();
	listenerBotonEnviar();

	//colocamos los checks en orden para ipad
	$.each($('.newsletter input[type="checkbox"]'), function() {
		var id = $(this).attr('id');
		$(this).before($("#" + id + ' + input[type="hidden"]'));
	});

	$('#btnGuardarUsuario').click(function () {
		submitWithCaptcha();
	    return;
	  });
});

function submitWithCaptcha() {
	if (activeCaptcha) {
		grecaptcha.ready(function() {
			if ($('#captchaResponse').length) {
				var siteKey = $('#captchaResponse').data('sitekey');
				grecaptcha.execute(siteKey, {
					action: 'NewsletterRegistro'
				}).then(function(response) {
					guardarDatosUsuario(response);
				});
			}
		});
	} else {
		guardarDatosUsuario("");
	}
}

function guardarDatosUsuario(captchaResponse) {
	var param = {
	};
    param['email'] = $('#emailNewsletter').val();
    if ($('#condiciones').is(':checked')) {
      param['condiciones'] = $('#condiciones').val();
    } else {
      param['condiciones'] = $('#condiciones_denegadas').val();
    }
    param['tiempoRelleno'] = $('#tiempoRelleno').val();
    param['campoSeguridad'] = $('#campoSeguridad').val();
    param['captchaResponse'] = captchaResponse;
    $.ajax({
      url: $urlRegistroUsuario,
      data: param,
      global: false,
      method: 'POST',
	  dataType: 'json'
    }).done(function (response) {
	  try {
		mostrarVentanaModal(response.titulo, response.mensaje, null);
	  } catch(e) {
	    document.location = pathMenu + '/400';
	  }
    }).fail(function () {
      document.location = pathMenu + '/400';
    }).always(function () {
      //se desmarca el checkbox
      $('#condiciones').removeProp('checked');
    });
}

function marcaCheck(evt, id){
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode === 13 || charCode === 32){
		$("#"+id).click();
	}
}

function listenerBotonEnviar() {
	$('#boton-ctr').on('click', function() {
		if($('#checkBaja').is(':checked')) {
			mostrarVentanaModal(i18nModal('i18n.modal.titulo','ckBaja'),i18nModal('i18n.modal.descripcion','ckBaja'), true);
			listenerModalBaja();
		} else {
			$('#newsletterUsuario').submit();
		}
	});
}

function listenerModalBaja() {
	$('.btnFormAceptar').on('click', function(){
		handlerCheckBaja();
	});

	$('.btnFormCancelar').on('click', function(){
		ocultarVentanaModal();
	});
}

function handlerCheckBaja() {
	$('#newsletterUsuario').submit();
}

function listenerCerrarModal() {
	$('#cerrar-modal').on('click', function(){
		if ($('#idioma').val() === '0') {
			window.location.href = "/wcorp/iberdrola";
		} else {
			window.location.href = "/wcorp/iberdrola/home";
		}
	});
}

function guardarUsuario(){	
	$.ajax({
		url: '${altaNewsletterURL}',
		data: new FormData(document.getElementById("<portlet:namespace/>newsletterUsuario")),		
		cache:false,
		method: 'POST',
		dataType: 'json',
		processData: false,
		contentType: false,
		success: function(data) {			
			var titulo = data.titulo;
			var mensaje = data.mensaje;
			mostrarVentanaModal(titulo, mensaje, null);				
		},
		error: function(data) {
			mostrarVentanaModal("Error", "Expirada sesion", null);			
		}
	});	
	desmarcarCheckBox();
};

function desmarcarCheckBox(){
	$('#condiciones').removeAttr('checked');
	document.getElementById("spanCondiciones").setAttribute("aria-checked", false);
}
