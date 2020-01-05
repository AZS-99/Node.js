$(() => {

    $('#email').focusout(() => {
        if ($('#email').val()) {
            $.ajax({
                url: 'userexists/' + $('#email').val(),
                type: 'GET',
                dataType: 'json',
                success: (resultJSON) => {
                    if (resultJSON.result) {
                        $('#emailNotificationLabel').text('Email aleady exists!')
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