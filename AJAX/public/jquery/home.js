$(() => {
    $('#visitorsBtn').click(() => {
        $.ajax({
            url: 'users/count',
            type: 'GET',
            dataType: 'text',
            success: (count) => {
                $('#visitorsDiv').html("<p> number of members: " + count + "</p>")
            }
        })
    })
})