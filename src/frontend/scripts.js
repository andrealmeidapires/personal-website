let formatDate = function (data, type, row) {
  // If display or filter data is requested, format the date
  if ( type === 'display' || type === 'filter' ) {
    let d = new Date(data);
    let monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.","Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
    return d.getFullYear() + " " + monthNames[d.getMonth()];
  }

  // Otherwise the data type requested (`type`) is type detection or
  // sorting data, for which we want to use the integer, so just return
  // that, unaltered
  return data;
};

let checkEmptyField = function(data, type, row) {
  if(data === null || data === "")
    return "N/A";
  else {
    return data;
  }
};

$(document).ready(function(){

  $('#experienceTable').DataTable( {
    ajax: {
      url: '/experience',
      dataSrc: ''
    },
    columns: [
      { data: "startDate",
        render: formatDate
      },
      { data: "endDate",
        render: formatDate
      },
      { data: "employer",
        render: checkEmptyField
      },
      { data: "client",
        render: checkEmptyField
      },
      { data: "projects" },
      { data: "tasks" }
    ],
    columnDefs: [
      { title: "Start date", targets: 0 },
      { title: "End date", targets: 1 },
      { title: "Employer", targets: 2 },
      { title: "Client", targets: 3 },
      { title: "Projects", targets: 4 },
      { title: "Tasks", targets: 5 },
    ],
    order: []
  });

});

$(function () {

    $('#getInTouchForm').on('submit', function (e) {

      e.preventDefault();

      $.ajax({
        type: 'post',
        url: '/message',
        data: $('#getInTouchForm').serialize(),
        success: function () {
          alert("I'll get in touch with you soon =)");
          $('#getInTouchForm')[0].reset();
        }
      });

    });

  });
