function createSelectPosition(row) {
        var positions = JSON.parse(dataJson).positions;
                var result = '<select id = "position_' + row["id"] + '" class="form-control form-control-sm">';
                positions.forEach(function (item) {
                    if (row["position"] == item.id) {
                        result += '<option selected value="' + row["position"] + '">' + item.name + '</option>'
                    }
                    else {
                        result += '<option value="' + item.id + '">' + item.name + '</option>'
                    }
                });
                result += '</select >';
                return result;

}
function createSelectOffice(row) {
        var offices = JSON.parse(dataJson).offices;
                var result = '<select id="office_' + row["id"] + '" class="form-control form-control-sm">';
                offices.forEach(function (item) {
                    if (row["office"] == item.id) {
                        result += '<option selected value="' + row["office"] + '">' + item.name + '</option>'
                    }
                    else {
                        result += '<option value="' + item.id + '">' + item.name + '</option>'
                    }
                });
                result += '</select >';
                return result;
   
}

var table = $('#example').DataTable({
    data: JSON.parse(dataJson).users,
    paging: false,
    columns: [
        { data: 'id' },
        { data: 'name' },
        {
            data:  function (row) {
                var objs = createSelectPosition(row);
                return objs ;
            }
        },
        {
            data: function (row) {
                return '<input type="text" id = "salary_' + row["id"] + '" class="form-control form-control-sm" value="' + row["salary"] + '"/>';
            }
        },
        {
            data: function (row) {
                return '<input type="date" id="date_' + row["id"] + '" class="form-control form-control-sm" value="' + row["start_date"] + '"/>';
            }
        },
        {
            data: function (row) {
                var obj = createSelectOffice(row);
                return obj ;
            }
        },
        {
            data: function (row) {
                return '<input type="text" id="extn_' + row["id"] + '" class="form-control form-control-sm" value="' + row["extn"] + '"/>';
            }
        },
        { data: "", "data": null }
    ],
    columnDefs: [
        {
            targets: -1,
            data: null,
            defaultContent: '<div class="btn-group"><button type="button" class="btn btn-danger"><span><i class="fa fa-trash-alt"></i> Delete</span></button></div>'
        },
    ],
});

//Reset
$(document).ready(function () {
    $("#btn_reset").click(function () {
        $("#myForm").trigger("reset");
    });
});

//Search
var tables = $('#example tbody').html();
$(document).ready(function(){
 $("#btn_search").on("click", function() {
    $('#example tbody').html(tables);
    var id = $('#myInputId').val();
    var name = $('#myInputName').val();
    $('#example tbody tr').each(function () {
        var table_id = $(this).find('td:eq(1)').find("input").val();
        var table_name = $(this).find('td:eq(1)').find("input").val();
        if(id == table_id || table_name.toLowerCase().includes(name.toLowerCase())){
            var content ="";
            content += '<tr>' + $(this).html() + '</tr>';
           $('#example tbody').html(content);
        }
  });
});
});
//$('#btn_search').on('click', function () {
  //  var id = $('#myInputId').val();
    //var name = $('#myInputName').val();
    //table.columns(0).search(id).draw();
    //table.columns(1).search(name).draw();
//});

//Detail
//$('#example tbody').on('click', 'tr', function () {
 //   var data = table.row(this).data();
  //  $('#name').val(data["name"]);
  //  $('#position').val(data["position"]);
  //  $('#salary').val(data["salary"]);
  //  $('#date').val(data["start_date"]);
  //  $('#office').val(data["office"]);
  //  $('#extn').val(data["extn"]);
//});

//detaul
$(function () {
  $('#example tr').click(function (e) {
    var name = $(this).find('td:eq(2)').find("input").val();
    var position = $(this).find('td:eq(3) option:selected').find("input").val();
    var salary = $(this).find('td:eq(4)').find("input").val();
    var date = $(this).find('td:eq(5)').find("input").val();
    var office = $(this).find('td:eq(6) option:selected').find("input").val();
    var extn = $(this).find('td:eq(7    )').find("input").val();
      $('#name').val(name);
      $('#position').val(position);
      $('#salary').val(salary);
      $('#date').val(date);
      $('#office').val(office);
      $('#extn').val(extn);
    });
  });

//Save
$('#btn_save').on('click', function () {
    $('#example tbody tr').each(function () {
        var item = {
            id: $(this).find('td:nth-child(1)').text(),
            name: $(this).find('td:nth-child(2)').text(),
            position: $(this).find('td:nth-child(3) option:selected').text(),
            salary: $(this).find('td:nth-child(4)').children().val(),
            date: $(this).find('td:nth-child(5)').children().val(),
            office: $(this).find('td:nth-child(6) option:selected').text(),
            extn: $(this).find('td:nth-child(7)').children().val()
        };
         console.log(item);
    });
  
});
