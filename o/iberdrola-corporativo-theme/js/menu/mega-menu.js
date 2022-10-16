const menuBarArrow = $('.menu-link.menu-bar-link .mSpan');
const menuListArrow = $('.menu-link.menu-list-link .mSpan');
const menuLargeBlock = 'd-lg-block';

$('.multi-nivel ul').hide();

$('.menu-link.menu-bar-link').on('click', function() {
    $(this).next('ul.menu-list.nivel2').slideToggle();
    $('.menu-list.nivel2').not($(this).next('ul.menu-list.nivel2')).slideUp("fast");
    if (menuBarArrow.hasClass('rotateIcon')) {
        if ($(this).children(".mSpan").hasClass('rotateIcon')) {
        	$(this).children(".mSpan").removeClass('rotateIcon');
        } else {
        	menuBarArrow.removeClass('rotateIcon');
        	$(this).children(".mSpan").addClass('rotateIcon');
        }
    } else {
    	menuBarArrow.removeClass('rotateIcon');
        $(this.children[1]).addClass('rotateIcon');
    }

});

$('.menu-link.menu-list-link').on('click', function() {
	$(this).next('ul.menu-list.nivel3').slideToggle();
    $('.menu-list.nivel3').not($(this).next('ul.menu-list.nivel3')).slideUp("fast");
    if (menuListArrow.hasClass('rotateIcon')) {
    	if ($(this).children(".mSpan").hasClass('rotateIcon')) {
        	$(this).children(".mSpan").removeClass('rotateIcon');
        } else {
        	menuListArrow.removeClass('rotateIcon');
        	$(this).children(".mSpan").addClass('rotateIcon');
        }
    } else {
    	$(this).children(".mSpan").addClass('rotateIcon');
    }
});

$('.btn_hamburguesa').on('click', function() {
	const elements = {
        navbar: $('.menu_navegacion.navbar #navbarPrincipal'),
        buscador: $('.buscadorIcon'),
        divider: $('.dividerVMenu'),
        menuSecundario: $('.menu_secundario'),
        nivelDos: $('.nivel2'),
        nivelTres: $('.nivel3')
    }
    if (elements.navbar.hasClass(menuLargeBlock)) {
        elements.navbar.removeClass(menuLargeBlock);
        elements.buscador.hide();
        elements.divider.hide();
    } else {
        elements.navbar.addClass(menuLargeBlock);
        elements.buscador.show();
        elements.divider.show();
        elements.nivelDos.hide();
        elements.nivelTres.hide();
    }

});
