$(document).ready(function () {
  $("#myTable").DataTable({
    paging: true, // Allow data to be split into pages
    lengthMenu: [10, 20, 30, 40, 50, 100], // Number of records per page options
    searching: true, // Enable search box
    ordering: true, // Enable sorting
    info: true, // Enable showing information about the table
    autoWidth: false, // Disable auto width calculation
    responsive: true, // Enable responsive design
    dom: "lBfrtip", // Add export buttons to the table
    buttons: ["copy", "csv", "excel", "pdf", "print"],
    language: {
      search: "Search:",
      lengthMenu: "Display _MENU_ records per page",
      info: "Showing _START_ to _END_ of _TOTAL_ entries",
      infoEmpty: "Showing 0 to 0 of 0 entries",
      infoFiltered: "(filtered from _MAX_ total entries)",
      paginate: {
        first: "First",
        last: "Last",
        next: "Next",
        previous: "Previous",
      },
    },

    initComplete: function () {
      // Add filtering options for client type
      this.api()
        .columns(1)
        .every(function () {
          var column = this;
          var select = $(
            '<select class="form-select"><option value="">All Client Types</option></select>'
          )
            .appendTo($("#client-type-filter"))
            .on("change", function () {
              var val = $.fn.dataTable.util.escapeRegex($(this).val());

              column.search(val ? "^" + val + "$" : "", true, false).draw();
            });

          column
            .data()
            .unique()
            .sort()
            .each(function (d, j) {
              select.append('<option value="' + d + '">' + d + "</option>");
            });
        });

      // Add filtering options for status
      this.api()
        .columns(4)
        .every(function () {
          var column = this;
          var select = $(
            '<select class="form-select"><option value="">All Statuses</option></select>'
          )
            .appendTo($("#status-filter"))
            .on("change", function () {
              var val = $.fn.dataTable.util.escapeRegex($(this).val());

              column.search(val ? "^" + val + "$" : "", true, false).draw();
            });

          select
            .append('<option value="enable">Enable</option>')
            .append('<option value="disable">Disable</option>');
        });
    },
  });

  // Function to get selected rows
  function getSelectedRows() {
    var selected = [];
    $("#myTable tbody input[type=checkbox]:checked").each(function () {
      selected.push($(this).closest("tr"));
    });
    return selected;
  }

  // Trigger export actions
  $("#export-copy").click(function () {
    $("#myTable").DataTable().button(".buttons-copy").trigger();
  });
  $("#export-csv").click(function () {
    $("#myTable").DataTable().button(".buttons-csv").trigger();
  });
  $("#export-excel").click(function () {
    $("#myTable").DataTable().button(".buttons-excel").trigger();
  });
  $("#export-pdf").click(function () {
    $("#myTable").DataTable().button(".buttons-pdf").trigger();
  });
  $("#export-print").click(function () {
    $("#myTable").DataTable().button(".buttons-print").trigger();
  });

  // Example: Handle multiple selection for delete action
  $("#delete-selected").click(function () {
    var selectedRows = getSelectedRows();
    if (selectedRows.length > 0) {
      // Perform delete action for selected rows
      selectedRows.forEach(function (row) {
        // Perform delete action for each row
        row.remove();
      });
      $("#myTable").DataTable().draw(false); // Redraw table
    } else {
      alert("No rows selected.");
    }
  });
});
