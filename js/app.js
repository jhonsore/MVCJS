//https://gist.github.com/g6scheme/4157554
//http://alistapart.com/article/javascript-mvc
//https://alexatnet.com/articles/model-view-controller-mvc-javascript
$(function() {
    "use strict";
    //-------------------------------------------------
    //-------------------------------------------------
    //MODEL
    //-------------------------------------------------
    //-------------------------------------------------
    /*
    * Model Application
    * */
    function AppModel(){

    }

    AppModel.prototype.constructor = AppModel;

    AppModel.prototype.loadNotes = function (){
        $.getJSON( "data/notes.json", function( data ) {
            $.controller.loadNotes(data);
        });
    }

    //-------------------------------------------------
    //-------------------------------------------------
    //VIEW
    //-------------------------------------------------
    //-------------------------------------------------
    /*
     * View Application
     * */
    function AppView(){

        this.init();

    }

    AppView.prototype.constructor = AppView;

    /*
     * init view
     * */
    AppView.prototype.init = function (){
        $("#bt-call-note")
            .click($.controller.openAddNote);
    }


    /*
     * remove overlay
     * */
    AppView.prototype.removeOverlay = function (){
        $("#overlay").remove();
    }

    /*
     * show add note
     * */
    AppView.prototype.showAddNote = function (){

        var template = _.template(
            $("script[data=template_overlay]").html()
        );

        $("body")
            .append(template);

        $("#bt-add-note")
            .click($.controller.addNote);

        $("#bt-close-overlay")
            .click($.controller.closeOverlay);

        $("#input-note")
            .focus();
    }

    /*
     * show add note
     * */
    AppView.prototype.addNote = function (val){

        var template = _.template(
            $("script[data=note]")
                .html()
        );

        template = template({note:val});

        $("#box-notes")
            .prepend(template);

        //note mouse events
        $(".note__control__button--del")
            .unbind()
            .click($.controller.removeNote);

        $(".note__control__button--ok")
            .unbind()
            .click($.controller.completeNote);
    }

    //-------------------------------------------------
    //-------------------------------------------------
    //CONTROLLER
    //-------------------------------------------------
    //-------------------------------------------------
    /*
     * Controller Application
     * */
    function AppController(){
        "use strict";

        this.init();
    }

    AppController.prototype.constructor = AppController;

    /*
     * init controller
     * */
    AppController.prototype.init = function (){

        //load first notes
        $.model.loadNotes();

    }

    /*
     * open overlay that calls to add a new note
     * */
    AppController.prototype.openAddNote = function (){
        //add some logic here before call view to open note overlay
        $.view.showAddNote();
        return false;
    }

    /*
     * add a new note
     * */
    AppController.prototype.addNote = function (){
        if($("#input-note").val() !== ""){
            $.view.addNote($("#input-note").val());
            $.controller.closeOverlay();
        }
        else
        {
            alert('Fill in the note!!!');
        }
        return false;
    }

    /*
     * remove overlay
     * */
    AppController.prototype.closeOverlay = function (){
        $.view.removeOverlay();
        return false;
    }

    /*
     * remove a note
     * */
    AppController.prototype.removeNote = function (){
       $(this)
           .closest('.note')
           .remove();

        return false;
    }

    /*
     * check or not a note
     * */
    AppController.prototype.completeNote = function (){

        $(this)
            .closest('.note')
            .toggleClass('on');

        return false;
    }

    /*
     * load initial notes from data/notes.json file
     * */
    AppController.prototype.loadNotes = function (data){

        $.each( data.notes, function( key, val ) {
            $.view.addNote(val.value);
        });

    }

    //-----------------------------------------
    $.model = new AppModel();
    $.controller = new AppController();
    $.view = new AppView();


});


