// JavaScript event handlers for dict.html
$(document).ready(function () {

    $('#btn').click(search);

    $('#input').keyup(event => {
        if (event.keyCode == 13) {
            search();
        }
    });
});


function search() {
    let searchWord = $('#input').val();
    console.log("Inside search!" + " " + $('#input').val());
    console.log(typeof searchWord);
    if (typeof searchWord !== 'string') {
        $('#definition').fadeOut();
        $('#errors').text('Input should be type of string.');
        $('#errors').fadeIn();
        return;
    }

    if (searchWord.length < 1) {
        $('#definition').fadeOut();
        $('#errors').text('Input should be more then 1 character');
        $('#errors').fadeIn();
        return;
    }

    let url = "/api/words/" + searchWord;

    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (produce) {
            $('#definition').fadeIn();

            if (produce.length === 0) {
                $('#definition').fadeOut();
                $('#errors').text('No Results found.');
                $('#errors').fadeIn();
                $('table tbody').empty();
            } else {
                $('#errors').fadeOut();
                $('table tbody').empty();
            }

            for (var i = 0; i < produce.length; i++) {
                if (produce[i].word)
                    $('<tr><td>' + (i + 1) + '</td><td>' + produce[i].word + '</td><td>' + ((produce[i].wordtype) ? produce[i].wordtype : ' " " ') + '</td><td>' + produce[i].definition + '</td></tr>').appendTo($('table tbody')).slideDown("slow");
            }
        },
        error: function (result) {
            $('#errors').text('An ajax error occurred.');
        }

    })
}