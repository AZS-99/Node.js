$(() => {

    $('#email').focusout(() => {
        if ($('#email').val()) {
            $.ajax({
                url: 'userexists/' + $('#email').val(),
                type: 'GET',
                dataType: 'json',
                success: (resultJSON) => {
                    if (resultJSON.result) {
                        $('#emailNotificationLabel').text('Email is already registered in our system!')
                    } else {
                        $('#emailNotificationLabel').text('')
                    }
                },
                error: (error) => {
                    alert(error)
                }
            })
        }
    })


})