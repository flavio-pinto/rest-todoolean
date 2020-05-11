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

    //Rendo funzionante pulsante invio nuovo elemento todo
    todoButton.click(function(){
        createNewTodo(apiUrl, todoInput, template, todoList);
    });

    //Rimozione elemento
    todoList.on('click', '.todo__list__element__remove', function() {
        deleteToDo($(this), apiUrl, template, todoList);
    });
}); //<---- end doc ready

/********************
 ******FUNZIONI******
 ********************/

//Funzione per creare nuovo elemento todo
function createNewTodo(apiUrl, input, template, todoList) {
    var todoInputValue = input.val().trim();
    var settings = {
        url: apiUrl,
        method: 'POST',
        data: {
            text: todoInputValue
        }
    };
    $.ajax(settings)
    .done(function(){
        printApiTodos(apiUrl, template, todoList);
    })
    .fail(function(){
        console.error('Si è verificato un errore nella creazione del nuovo elemento todo');
    });
    //Reset input
    input.val('');
}

//Funzione per eliminare elemento todo
function deleteToDo(self, apiUrl, template, todoList) {
    var todoId = self.data('id');
    var settings = {
        url: apiUrl + '/' + todoId,
        method: 'DELETE',
    };
    $.ajax(settings)
    .done(function(){
        printApiTodos(apiUrl, template, todoList);
    })
    .fail(function(){
        console.error('Si è verificato un errore durante l\'eliminazione dell\'elemento');
    })
}

//Funzione per stampare la lista todo presa dall'Api
function printApiTodos(apiUrl, template, todoList) {
    //Pulizia lista
    todoList.html('');
    
    var settings = {
        url: apiUrl,
        method: 'GET',
    };
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