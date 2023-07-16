var students = [
    {
        id: '1',
        name: 'Nguyen Van Teo',
        classId: '1'
    },
    {
        id: '2',
        name: 'Nguyen Van Ti',
        classId: '2'
    },
    {
        id: '3',
        name: 'Tran Van Tun',
        classId: '3'
    },
    {
        id: '4',
        name: 'Nguyen Thi Heo',
        classId: '1'
    },
    {
        id: '5',
        name: 'Le Thi Be',
        classId: '1'
    }
]

var classList = [
    {
        id: '1',
        name: "CNTT"
    },
    {
        id: '2',
        name: 'DTVT'
    },
    {
        id: '3',
        name: 'THXD'
    },
    {
        id: '4',
        name: 'XDDD'
    }
]

function getClassNameById(id) {
    return classList.find(function (el) {
        return el.id === id;
    }).name;
}

var listStudents = [];
students.forEach(function (student) {
    var classInfo = classList.find(function (el) {
        return el.id === student.classId;
    })
    var newSt = {
        id: student.id,
        studentName: student.name,
        classId: classInfo.id,
        className: classInfo.name
    }
    listStudents.push(newSt);
})

// man hinh hien thi
function display(array) {
    var tableElement = $('#tbl')

    // Tieu de
    var htmlTitle = `
<thead>
    <tr>
        <th>Ten Sinh Vien</th>
        <th>Lop</th>
        <th>Chuc Nang</th>
    </tr>
</thead>
`;
    // Noi dung
    var htmlBody = '<body>'
    for (const student of array) {
        var trElement = displaystudent(student);
        htmlBody += trElement;
    }
    htmlBody += '</body>'
    tableElement.html(htmlTitle + htmlBody);
}
display(listStudents);

function displaystudent(student) {
    var htmls = `
    <tr>
        <td>${student.studentName}</td>
        <td>${student.className}</td>
        <td>
            <button onclick = "onUpdate('${student.id}')" > Sua</button>
            <button onclick = "onDelete('${student.id}')"> Xoa </button>
        </td>
    </tr>
    `;
    return htmls;
};

// Tạo danh sách lớp học
var classElement = $('#class');

var htmlOptions = `<option value=''>-- Chọn lớp --</option>`;
classList.forEach(function (classInfo) {
    htmlOptions += `
            <option value='${classInfo.id}'>${classInfo.name}</option>
        `;
})

classElement.html(htmlOptions);

var addBtnElement = $('#create');
var editBtnElement = $('#update');

var stName = $('input[name="name"]');
var classInfo = $('select[name="class"]');

// Ham nay de tao ra mot chuoi ngau nhien lam id
function generateUuid() {
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function handleBlurInput(input) {
    var errorElement = input.parent().find('.form-message');
    input.blur(function () {
        if (input.val() === '') {
            errorElement.css({ 'display': 'block', 'color': 'red', 'font-style': 'italic' });
            errorElement.text('Yêu cầu nhập!');
            input.addClass('invalid')
        } else {
            errorElement.css({ 'display': 'none' });
            input.removeClass('invalid')
        }
    })
    input.on('input', function () {
        errorElement.css({ 'display': 'none' });
        errorElement.text('')
        input.removeClass('invalid')
    })
}

handleBlurInput(stName);
handleBlurInput(classInfo);

addBtnElement.click(function (e) {
    e.preventDefault();

    var check = true;
    if (isRequired(stName)) {
        check = false;
    }
    if (isRequired(classInfo)) {
        check = false;
    }
    if (check) {

        var newSt = {
            id: generateUuid(),
            studentName: stName.val(),
            classId: Number(classInfo.val()),
            className: getClassNameById(classInfo.val())
        }

        listStudents.push(newSt);
        display(listStudents);

        stName.val('');
        classInfo.val('');
    }

    function isRequired(input) {
        var errorElement = input.parent().find('.form-message');
        if (input.val() === '') {
            errorElement.css({ 'display': 'block', 'color': 'red', 'font-style': 'italic' });
            errorElement.text('Yêu cầu nhập!');
            return true;
        } else {
            errorElement.css({ 'display': 'none' });
            return false;
        }
    }
})

var idEd;
function onUpdate(id) {
    idEd = id;
    // Tìm sinh viên muốn sửa
    var student = listStudents.find(function (st) {
        return st.id === idEd;
    })

    stName.val(student.studentName);
    classInfo.val(student.classId);

    addBtnElement.css({ 'display': 'none' });
    editBtnElement.css({ 'display': 'block' });
}

editBtnElement.click(function (e) {
    e.preventDefault();
    var edSt = {
        id: idEd,
        studentName: stName.val(),
        classId: classInfo.val(),
        className: getClassNameById(classInfo.val())
    }

    var idx = listStudents.findIndex(function (student) {
        return student.id === idEd;
    })
    listStudents.splice(idx, 1, edSt);
    display(listStudents);

    addBtnElement.css({ 'display': 'block' });
    editBtnElement.css({ 'display': 'none' });

    stName.val('');
    classInfo.val('');
})

function onDelete(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
        var idx = listStudents.findIndex(function (student) {
            return student.id === id;
        })

        if (idx !== -1) {
            listStudents.splice(idx, 1);
        }

        display(listStudents);
    }
}