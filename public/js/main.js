$(document).ready(function() {
  $(".date").text(moment().format("lll"));
  $("#edit_account").on("click", function() {
    let oldUserObj = {
      fName: $("#fname").text(),
      lName: $("#lname").text(),
      email: $("#email").text()
    };
    $("#fname").html(`
      <input type="text" value="${oldUserObj.fName}" id="new_fname" class="form-control">
    `);
    $("#lname").html(`
    <input type="text" value="${oldUserObj.lName}" id="new_lname" class="form-control">
    `);
    $("#email").html(`
    <input type="text" value="${oldUserObj.email}" id="new_email" class="form-control" disabled>
    `);
    $("#save_btn_placeholder").html(
      // eslint-disable-next-line quotes
      `<button class="btn btn-dark" id="account_save">Save</button>
    <button class="btn btn-danger" id="cancel">Cancel</button>`
    );
  });
  $(document).on("click", "#account_save", function(event) {
    event.preventDefault();
    let editedUserObj = {
      fName: $("#new_fname")
        .val()
        .trim(),
      lName: $("#new_lname")
        .val()
        .trim(),
      email: $("#new_email")
        .val()
        .trim(),
      id: $("#user_id")
        .val()
        .trim()
    };
    $.ajax({
      url: "/account",
      type: "PUT",
      data: editedUserObj
    }).then(() => location.reload());
  });
  $(document).on("click", "#cancel", function() {
    location.reload();
  });
});
