"use strict"; 

$(document).ready(function() {

    formValidation();
    infinitScroll();

});

function formValidation() {

    var admin = {
        "username": "admin",
        "password": "admin"
    };


    $('form').on('submit', function (e) {

        e.preventDefault();

        var formContent = $(this).serializeArray();

        if (formContent[0].value == admin.username && formContent[1].value == admin.password) {

            window.location.replace('blog.html');
            $('#message').hide();

        } else if (formContent[0].value == '' || formContent[1].value == '') {

            $('#message').show().text('Please enter your user and password to log in.');

        } else {

            $('#message').show().text('Incorrect username or password.');

        }

    });
}


function infinitScroll(){
    
    var myIndex = 1;
    const pageSize = 1;
    for (var i = 0; i < 3; i++) {
        var url = "https://mobile.developersgrave.com/v2.0/api/users/38695/blog/page/" + myIndex + "/size/" + pageSize;
        myIndex++;
        $.ajax({
            type: 'get',
            url: url,
            dataType: 'json',
            beforeSent: function () {
                $('.loader').show();
            },
            success: function (data) {

                try{    
                    var cover = data.Result.items[0].cover,
                        title = data.Result.items[0].title,
                        content = data.Result.items[0].content,
                        urlBlog = data.Result.items[0].furl;


                    if (typeof content === undefined || typeof title === undefined) {

                        $('.loader').hide(300);
                        $('.main-section div.blogs-wrapper').append("<article class='more alert-warning'><h1>Something went wrong!!</h1></article>");

                    }
                    else {

                        $('.main-section div.blogs-wrapper').append("<article class='more'> </img src='"+ cover +"'><h1>" + title + "</h1> <hr/> <p>" + content + "</p> </article>");

                        $('article').wrap("<a href=" + urlBlog + "></a>");

                        $('.loader').hide(300);
                    }
                }
                catch(error) {
                    $('.main-section div.blogs-wrapper').append("<article class='more alert-warning'><h1>Something went wrong!!</h1></article>");
                }
            },
            error: function() {
                $('.main-section div.blogs-wrapper').append("<article class='more alert-warning'><h1>Something went wrong!!</h1></article>");
            }
        });
    }

    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            myIndex++;

            var url = "https://mobile.developersgrave.com/v2.0/api/users/38695/blog/page/" + myIndex + "/size/" + pageSize;

            $.ajax({
                type: 'get',
                url: url,
                dataType: 'json',
                beforeSend: function () {
                    $('.loader').show();
                },
                success: function (data) {
                    try {
                        var title = data.Result.items[0].title,
                            content = data.Result.items[0].content,
                            urlBlog = data.Result.items[0].furl;


                        if (typeof content === undefined || typeof title === undefined) {

                            $('.loader').hide(300);
                            $('.main-section div.blogs-wrapper').append("<article class='more alert-warning'><h1>Something went wrong!!</h1></article>");

                        }
                        else {

                            $('.main-section div.blogs-wrapper').append("<article class='more'><h1>" + title + "</h1> <hr/> <p>" + content + "</p> </article>");

                            $('article').wrap('<a href=' + urlBlog + '></a>');

                            $('.loader').hide(300);
                        }
                    } catch (error) {
                        $('.main-section div.blogs-wrapper').append("<article class='more alert-warning'><h1>Something went wrong!!</h1></article>");
                    }                    
                },
                error: function () {
                    $('.main-section div.blogs-wrapper').append("<article class='more alert-warning'><h1>Something went wrong!!</h1></article>");
                }

            });
        }
    });
    
}
