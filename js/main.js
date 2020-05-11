/**
 * Todoolean
 * Creazione di una todo list con le seguenti funzionalità, attraverso l’uso delle API, AJAX, jQuery e Handlebars
 * Lettura di tutti i todo
 * Creazione nuovo todo
 * Cancellazione todo
 */

$(document).ready(function () {
    //Referenze
    var todoInput = $('.todo__input');
    var todoButton = $('.todo__button');
    var todoList = $('.todo__list');

    //Api
    var apiUrl = 'http://157.230.17.132:3016/todos';

    //Init HandlebarsJs
    var source = $('#template__todo').html();
    var template = Handlebars.compile(source);
    
    //Richiamo funzione per ottenere la todo list dall'API
    printApiTodos(apiUrl, template, todoList);
}); //<---- end doc ready

/********************
 ******FUNZIONI******
 ********************/

//Funzione per stampare la lista todo presa dall'Api
function printApiTodos(apiUrl, template, todoList) {
    //Reset list
    todoList.html('');
    
    var settings = {
        url: apiUrl,
        method: 'GET',
    }
    $.ajax(settings)
    .done(function(res){
        var todoElementsApi = res;
        for(var i = 0; i < todoElementsApi.length; i++) {
            var todoElement = todoElementsApi[i];

            var context = {
                todoText: todoElement.text,
                id: todoElement.id
            };
            var object = template(context);
            todoList.append(object);
        };
    })
    .fail(function(){
        console.error('Errore chiamata Ajax');
    })
}
