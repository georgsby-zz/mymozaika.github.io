$(document).ready(function () {
    var socketItem = $('.socket-item')
    var socketCircle = $('.socket-circle')
    var resetField = $('#resetField')
    var saveImg = $('#saveImg')
    var tooltip = $('#tooltip')

    tooltip.on("click", function () {
        alert("Для начала необходимо выбрать цвет мозаики. При первом клике на ячейку появляется мозаика, при повторном - удаляется!")
    })

    socketCircle.on("click", function () {
        if ($(this).hasClass('isColor')) {
            $(this).removeClass('isColor').addClass('EmptyColor').css('background', $('#chooseColor').val())
        } else if ($(this).hasClass('EmptyColor')) {
            $(this).removeClass('EmptyColor').addClass('isColor').css('background', 'transparent')
        }
    })

    resetField.click(function () {
        if (socketCircle.hasClass('EmptyColor')) {
            socketCircle.removeClass('EmptyColor').addClass('isColor').css('background', 'transparent')
        }
    })

    saveImg.click(function () {
        html2canvas(document.getElementsByClassName('socket-list'), {
            dpi: 100,
            onrendered: function(canvas){
                $('#blank').attr('href', canvas.toDataURL('image/png'))
                $('#blank').attr('download', 'mozaika.png')
                $('#blank')[0].click()
            }

            // width: 1400,
            // onrendered: function (canvas) {
            //     var img = canvas.toDataURL("image/png")
            //     var doc = new jsPDF()
            //     doc.addImage(img, 'PNG', 10, 10)
            //     doc.save('test.pdf')

            // }
        })
    })
})