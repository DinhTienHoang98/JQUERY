const students = [
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

const classList = [
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
// 
function getClassNameById(id) {
    return classList.find(function (el) {
        return el.id === id;
    }).name;
}

// Tạo danh sách sinh viên
var listStudents = [];
students.forEach(function (student) {
    var classInfo = classList.find(function (el) {
        return el.id === student.classId;
    });
    var newStudent = {
        id: student.id,
        name: student.name,
        classId: classInfo.id,
        className: classInfo.name
    };

    listStudents.push(newStudent);
});
console.log(listStudents);

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
    tableElement.html(htmlTitle);
    // Noi dung
    var htmlBody = '<body>'
    for (const student of array) {
        var trElement = displaystudent(student);
        htmlBody += trElement;
    }
    htmlBody += '</body>'
    tableElement.html(htmlBody);
}
display(listStudents);
function displaystudent(student) {
    var htmls = `
    <tr>
        <td>${student.name}</td>
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
var classOptions = '<option value="">-- Chọn lớp --</option>';
classList.forEach(function (classInfo) {
    classOptions += `<option value="${classInfo.id}">${classInfo.name}</option>`;
});
$('#class').html(classOptions);

// ********************
var tenInput = $('input[name="name"]');
var lopInput = $('select[name="class"]');
var createButton = $('#create');
const updateButton = $('#update');

function handleBlurInput(input) {
    var errorElement = input.parentElement.querySelector('.form-message');
    input.onblur = function () {
        if (input.value === '') {
            errorElement.setAttribute('style', 'color: red; font-style: italic')
            errorElement.innerText = 'Vui long nhap';
        } else {
            errorElement.innerText = ''
        }
    }
    input.oninput = function () {
        errorElement.setAttribute('style', 'display: none')
    }
}
handleBlurInput(tenInput);
handleBlurInput(lopInput);

// ham` add student
function addStudents() {
    createButton.onclick = function (e) {
        e.preventDefault();
        const ten = tenInput.val();
        const lop = lopInput.val();

        const newStudent = {
            id: listStudents.length + 1,
            name: ten,
            classId: lop,
            className: getClassNameById(lop)
        }
        listStudents.push(newStudent)

        display(listStudents)

        tenInput.val() = '';
        lopInput.val() = '';
    }
}
// Gắn sự kiện click cho nút Thêm
createButton.click(addStudents());

// ham` sua sinh vien
var idEd;
function onUpdate(id) {
    idEd = id;
    var editSt = listStudents.find(el => {
        return el.id == id
    })
    tenInput.val() = editSt.name;
    lopInput.val() = editSt.classId;

    updateButton.style.display = 'block';
    createButton.style.display = 'none';

}
function editStudent() {
    const name = tenInput.val();
    const lop = lopInput.val();

    console.log(lop);
    const student = {
        id: idEd,
        name: name,
        classId: Number(lop),
        className: getClassNameById(lop)
    }

    var idx = listStudents.findIndex(function (el) {
        return el.id == idEd;
    });
    listStudents.splice(idx, 1, student);
    // Hiển thị danh sách sinh viên   
    display(listStudents)

    // xoa noi dung input
    tenInput.val() = '';
    lopInput.val() = '';
    // an nut
    updateButton.style.display = 'none';
    createButton.style.display = 'block';
}

// loại bỏ hành vi mặc định của trình duyệt
updateButton.click(function (e) {
    e.preventDefault();
})
// Gắn sự kiện click cho nút Sửa
updateButton.click(editStudent);

function onDelete(id) {
    var check = confirm("Bạn có chắc muốn xóa?");
    if (check) {
        const idx = listStudents.findIndex(el => {
            return el.id == id;
        });
        listStudents.splice(idx, 1);
        console.log(listStudents);
        display(listStudents)
    }
}