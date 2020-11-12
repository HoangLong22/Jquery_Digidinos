function obj(row,id) {
    if(id==1) {
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
    else if(id==2){
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
   
}

var table = $('#example').DataTable({
    data: JSON.parse(dataJson).users,
    paging: false,
    columns: [
        { data: 'id' },
        { data: 'name' },
        {
            data:  function (row) {
                var objs = obj(row,1);
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
                var objs = obj(row,2);
                return objs ;
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
    var value = $('#myInputName').val();
    if(value != "" || values != "") {
        $("#example tr").filter(function() {      
       $(this).toggle($(this).text().indexOf(value) > -1);
        });
    } else {
        alert("Cần nhập các trường")
    }
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
    var name = $(this).find('td:nth-child(2)').text();
    var position = $(this).find('td:nth-child(3) option:selected').text();
    var salary = $(this).find('td:nth-child(4)').children().val();
    var date = $(this).find('td:nth-child(5)').children().val();
    var office = $(this).find('td:nth-child(6) option:selected').text();
    var extn = $(this).find('td:nth-child(7)').children().val();
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
    var data = table.rows().data();
    data.each(function (item) {
        //salary
        var salary = $('#salary_' + item.id).val();
        if (salary) {
            item.salary = salary;
        }

        //start_date
        var start_date = $('#date_' + item.id).val();
        if (start_date) {
            item.start_date = start_date;
        }

        //extn
        var extn = $('#extn_' + item.id).val();
        if (extn) {
            item.extn = extn;
        }

        //position
        var position = $('#position_' + item.id + ' option:selected').val();
        if (position) {
            item.position = position;
        }

        //office
        var office = $('#office_' + item.id + ' option:selected').val();
        if (office) {
            item.office = office;
        }
    });
    console.log(data)
});