/**api personale 157.230.17.132:3016/todos */

$(document).ready(function () {
    //Referenze
    var todoInput = $('.todo__input');
    var todoButton = $('.todo__button');
    var todoList = $('.todo__list');

    //Api
    var apiUrl = '157.230.17.132:3016/todos';

    //Init HandlebarsJs
    var source = $('#template__results').html();
    var template = Handlebars.compile(source);
    
}); //<---- end doc ready

/********************
 ******FUNZIONI******
 ********************/