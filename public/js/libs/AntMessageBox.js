﻿/*! AntMessageBox V0.21
* Copyright (c) 2014 AntProduction
* http://antproduction.free.fr/AntMessageBox
* https://github.com/antrax2013/AntMessageBox
*
* GPL license:
*   http://www.gnu.org/licenses/gpl.html
*
* Contributor: antrax2013@hotmail.com
*
*/

var AntMessageBox = function () {
    this.box = null;
    this.title = null;
	this.callbackOkParams = [];
	this.callbackCancelParams = [];
    var _initWithTarget = false;
    this.content= null;
        
	this.initDialogBox = function (p_title, p_elmt, p_content) {
        this.box = (p_elmt != undefined && p_elmt.trim() != "") ? $(p_elmt) : null;
        this.title = (p_title != undefined)? p_title:"";
        if(p_content != null && p_content !=undefined) this.content=p_content;

        if (this.box == null || this.box.length == 0) {
            var id = 'AntMessageBox-'+new Date().getTime();
            $("body").append("<div id='" + id + "'></div>");
            this.box = $("#" + id);
			_initWithTarget = false;
        }
		else _initWithTarget = true;
        
		var box = this.box;
		
        this.box.dialog({
            autoOpen: false,
            width:'auto',
            show: { effect: "blind" },
            hide: { effect: "blind" },
            buttons: { Ok: function () { $(this).html = ""; box.dialog("close"); } },
            title: this.title,
            close: function (event, ui) { if (_initWithTarget) box.dialog("close"); else { box.dialog("destroy"); box.remove(); } }
        });
         

    }

	this.MsgDialogBox = function (p_content, p_modal) {
	    if (_initWithTarget == false) this.initDialogBox((this.title != null && this.title.length)? this.title:"Info");
	    if(p_content != null && p_content !=undefined) this.content=p_content;
        this.box.html(this.content);
	    this.box.dialog({ dialogClass: "info" });
	    this.box.dialog("option", "modal", p_modal==true);
	    this.box.dialog("open");
	}

    this.AlertDialogBox = function (p_content, p_ok_click_callback, p_label_ok) {
        if (_initWithTarget == false) this.initDialogBox((this.title != null && this.title.length)? this.title:"Alert");
        if(p_content != null && p_content !=undefined) this.content=p_content;
        this.box.html(this.content);
        this.box.dialog("option", "modal", true);
        this.box.dialog({ dialogClass: "alert" });
		
		var paramsOk = ((this.callbackOkParams != [])?this.callbackOkParams:null);
		var box = this.box;
        this.box.dialog("option", "buttons",
            [
                {
                    text: p_label_ok != null ? p_label_ok : "Ok",
                    click: function () { if (typeof (p_ok_click_callback) == 'function') { p_ok_click_callback(paramsOk); } box.dialog("close"); }
                }
            ]);
		
		this.box.keypress(function (e) {
            if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {//Bouton entrée
                $(this).dialog("option").buttons[0].click();
            }
		});
		
        this.box.dialog("open");
    }

    this.ConfirmDialogBox = function (p_content, p_ok_click_callback, p_cancel_click_callback, p_label_ok, p_label_cancel) {
        if (_initWithTarget == false) this.initDialogBox((this.title != null && this.title.length)? this.title:"Confirm");
        if(p_content != null && p_content !=undefined) this.content=p_content;
        this.box.html(this.content);
        this.box.dialog("option", "modal", true);
		
		var paramsOk = ((this.callbackOkParams != [])?this.callbackOkParams:null);
		var paramsCancel = ((this.callbackCancelParams!= [])?this.callbackCancelParams:null);
		var box = this.box;
        this.box.dialog("option", "buttons",
            [
                {
                    text: p_label_ok != null ? p_label_ok : "Ok",
                    click: function () { if (typeof (p_ok_click_callback) == 'function') { p_ok_click_callback(paramsOk); } box.dialog("close"); }
                },
                {
                    text: p_label_cancel != null ? p_label_cancel : "Cancel",
                    click: function () { if (typeof (p_cancel_click_callback) == 'function') { p_cancel_click_callback(paramsCancel); } box.dialog("close"); }
                }
            ]);
			
		this.box.keypress(function (e) {
            if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {//Bouton entrée
                $(this).dialog("option").buttons[0].click();
            }
		});
		this.box.dialog("open");
    }

    //Gestion des événements clavier sur element
    this.KeyEvent = function (idBoutonValide, idElement) {
		console.log(idBoutonValide+" "+idElement);
        this.box.find("#" + idElement).keypress(function (e) {
            if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {//Bouton entrée
                $("#" + idBoutonValide).click();
            }
            else if ((e.which && e.which == 27) || (e.keyCode && e.keyCode == 27)) { //Bouton échap
                $(this).dialog("close");
            }
        });
    }

};


