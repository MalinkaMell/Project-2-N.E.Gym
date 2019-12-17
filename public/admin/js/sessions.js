$(document).ready(function() {
  tail.DateTime(".tail-datetime-field", {
    time12h: true,
    timeSeconds: false,
    position: "top"
  });
  $("#create_session").on("click", function(event) {
    event.preventDefault();
    let newSessionObj = {
      date: $("#session_date")
        .val()
        .trim(),
      ClassId: $("#session_class")
        .val()
        .trim(),
      InstructorId: $("#session_inst")
        .val()
        .trim()
    };
    $.post("/admin/sessions", newSessionObj).then(() => location.reload());
    console.log(newSessionObj);
  });

  $("#edit_session").on("click", function(event) {
    event.preventDefault();
    $("#session_date").removeAttr("disabled");
    $("#session_class").removeAttr("disabled");
    $("#session_inst").removeAttr("disabled");
    $("#save_btn_placeholder").html(
      // eslint-disable-next-line quotes
      `<button class="btn btn-dark" id="session_save">Save</button>
      <button class="btn btn-danger" id="cancel">Cancel</button>`
    );
  });

  $(document).on("click", "#session_save", function(event) {
    event.preventDefault();
    let editedSessionObj = {
      date: $("#session_date")
        .val()
        .trim(),
      ClassId: $("#session_class")
        .val()
        .trim(),
      InstructorId: $("#session_inst")
        .val()
        .trim()
    };
    console.log(editedSessionObj);
    $.ajax({
      url: "/admin/sessions/" + $("#session_id").text(),
      type: "PUT",
      data: editedSessionObj
    }).then(() => location.reload());
  });

  $("#delete_session").on("click", function(event) {
    event.preventDefault();
    if (
      confirm(
        "are you sure you want to delete the item with ID " +
          $("#session_id").text() +
          " from databbase?"
      )
    ) {
      $.ajax({
        url: "/admin/sessions/" + $("#session_id").text(),
        type: "DELETE"
      }).then(() => (location.href = "/admin/sessions"));
    } else {
      console.log("doing nothing");
    }
  });
});
