var submitElement = $('input[type="submit"]');

var chieuDaiElement = $('input[name="chieudai"]');
var chieuRongElement = $('input[name="chieurong"]');

/**
 * Hàm để xử lý khi blur vào ô input
 * @param {*} input 
 */

function handleBlurInput(el) {
    var errorElement = $(el).parent().find('.form-message');
    el.blur(function () {
        if (el.val() === '') {
            errorElement.css({ 'color': 'red', 'font-style': 'italic' })
            errorElement.text('Vui long nhap');
            el.addClass('invalid')
        } else {
            errorElement.text('');
            el.removeClass('invalid')
        }
    })
    el.on('input', function () {
        errorElement.css('display', 'none');
        el.removeClass('invalid')
    })
}

handleBlurInput(chieuDaiElement);
handleBlurInput(chieuRongElement);

submitElement.click(function (e) {
    e.preventDefault();

    var resultElement = $('#result');
    if (chieuDaiElement.val() !== '' && chieuRongElement.val() !== '') {
        var chuVi = (Number(chieuDaiElement.val()) + Number(chieuRongElement.val())) * 2;
        var dienTich = chieuDaiElement.val() * chieuRongElement.val();
        resultElement.html(`
        <p>Chu vi: ${chuVi}</p>  
        <p>Diện tích: ${dienTich}</p>
    `);
    } else {
        resultElement.html(`
            <p style="color: red">Vui lòng nhập đầy đủ thông tin vào!</p>
        `);
    }

})