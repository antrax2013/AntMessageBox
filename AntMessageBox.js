/*! AntMessageBox V0.12
* Copyright (c) 2014 Antrax2013 http://antproduction.blog.free.fr
*
* GPL license:
*   http://www.gnu.org/licenses/gpl.html
*
*//*
* Description:
*   A jQuery custom plugin based on Dialog from jQuery-UI to manage message box.
*
* Contributor:
*	antrax2013@hotmail.com
*
* Usage:
*   var Dialog = new MessageBox();
*   Dialog.intDialogBox("title");
*   Dialog.AlertDialogBox("hello world");
*
*/
var AntMessageBox = function () {
    this.id = null
    this.titre = null
    var _init = false
        
    this.intDialogBox = function (p_titre, p_elmt) {
        this.id = (p_elmt != undefined && p_elmt.trim() != "") ? $(p_elmt) : null;
        this.titre = (p_titre != undefined)? p_titre:"";

        if (this.titre.trim() != "") _init = true;

        if (this.id == null || this.id.length != 0) {
            var id = 'AntMessageBox-'+new Date().getTime();
            $("body").append("<div id='" + id + "'></div>");
            this.id = $("#" + id);
        }        
        
        this.id.dialog({
            autoOpen: false,
            width:'auto',
            show: { effect: "blind" },
            hide: { effect: "blind" },
            buttons: { Ok: function () { $(this).html = ""; $(this).dialog("close"); } },
            title: this.titre,
            close: function (event, ui) { if (_init) $(this).dialog("close"); else $(this).dialog("destroy"); }
        });
        

    },

	this.MsgDialogBox = function (chaineHtml, p_modal) {
	    if (_init == false) this.intDialogBox("Info");
	    this.id.html(chaineHtml);
	    this.id.dialog({ dialogClass: "info" });
	    this.id.dialog("option", "modal", p_modal==true);
	    this.id.dialog("open");
	}

    this.AlertDialogBox = function (chaineHtml, ok_click_callback, label_ok) {
        if (_init == false) this.intDialogBox("Alert");
        this.id.html(chaineHtml);
        this.id.dialog("option", "modal", true);
        this.id.dialog({ dialogClass: "alert" });
        this.id.dialog("option", "buttons",
            [
                {
                    text: label_ok != null ? label_ok : "Ok",
                    click: function () { if (typeof (ok_click_callback) == 'function') { ok_click_callback(); } $(this).dialog("close"); }
                }
            ]);
        this.id.dialog("open");
    }

    this.ConfirmDialogBox = function (chaineHtml, ok_click_callback, cancel_click_callback, label_ok, label_cancel) {
        if (_init == false) this.intDialogBox("Confirm");
        this.id.html(chaineHtml);
        this.id.dialog("option", "modal", true);
        this.id.dialog("option", "buttons",
            [
                {
                    text: label_ok != null ? label_ok : "Ok",
                    click: function () { if (typeof (ok_click_callback) == 'function') { ok_click_callback(); } $(this).dialog("close"); }
                },
                {
                    text: label_cancel != null ? label_ok : "Cancel",
                    click: function () { if (typeof (cancel_click_callback) == 'function') { cancel_click_callback(); } $(this).dialog("close"); }
                }
            ]);
        this.id.dialog("open");
    }

    //Gestion des événements clavier sur element
    this.KeyEvent = function (idBoutonValide, idElement) {
        this.id.find("#" + idElement).keypress(function (e) {
            if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {//Bouton entrée
                $("#" + idBoutonValide).click();
            }
            else if ((e.which && e.which == 27) || (e.keyCode && e.keyCode == 27)) { //Bouton échap
                $(this).dialog("close");
            }
        });
    }

};


