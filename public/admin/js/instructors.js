$(document).ready(function() {
  $("#create_instructor").on("click", function(event) {
    console.log("click");
    event.preventDefault();
    //only validating name now, have to implement validation
    if ($("#instructor_first_name").val() === "") {
      $("#firstNameHelp").text("Please, insert instructor's name");
      return;
    }
    //creating the new instructor object
    let newInstructorObj = {
      firstName: $("#instructor_first_name")
        .val()
        .trim(),
      lastName: $("#instructor_last_name")
        .val()
        .trim(),
      bio: $("#instructor_bio")
        .val()
        .trim(),
      photo: $("#instructor_photo")
        .val()
        .trim(),
      email: $("#instructor_email")
        .val()
        .trim(),
      phone: $("#instructor_phone")
        .val()
        .trim()
    };
    //sending our object to the post route
    $.post("/admin/instructors", newInstructorObj).then(() =>
      location.reload()
    );
  });
  //edit existing instructor
  $("#edit_instructor").on("click", function(event) {
    event.preventDefault();

    //saving old information in case don't want to edit some fields
    let oldInstructorObj = {
      firstName: $("#instructor_f_name").text(),
      lastName: $("#instructor_l_name").text(),
      bio: $("#instructor_bio").text(),
      photo: $("#instructor_img_url").attr("src"),
      email: $("#instructor_email").text(),
      phone: $("#instructor_phone").text()
    };
    $("#instructor_f_name").html(`
      <input type="text" value="${oldInstructorObj.firstName}" name="new_instructor_f_name" id="new_instructor_f_name" class="form-control">
    `);
    $("#instructor_l_name").html(`
      <input type="text" value="${oldInstructorObj.lastName}" name="new_instructor_l_name" id="new_instructor_l_name" class="form-control">
    `);
    $("#instructor_bio").html(`
      <textarea type="text" name="new_instructor_bio" id="new_instructor_bio" class="form-control" rows="5">${oldInstructorObj.bio}</textarea>
    `);
    $("#instructor_img_td").html(`
    <input type="text" value="${oldInstructorObj.photo}" name="new_instructor_img_url" id="new_instructor_img_url" class="form-control">
    `);
    $("#instructor_email").html(`
    <input type="text" value="${oldInstructorObj.email}" name="new_instructor_email" id="new_instructor_email" class="form-control">
    `);
    $("#instructor_phone").html(`
    <input type="text" value="${oldInstructorObj.phone}" name="new_instructor_phone" id="new_instructor_phone" class="form-control">
    `);
    $("#save_btn_placeholder").html(
      // eslint-disable-next-line quotes
      `<button class="btn btn-dark" id="instructor_save">Save</button>
      <button class="btn btn-danger" id="cancel">Cancel</button>`
    );
  });

  //saving edited object
  $(document).on("click", "#instructor_save", function(event) {
    event.preventDefault();
    let editedInstructorObj = {
      firstName: $("#new_instructor_f_name")
        .val()
        .trim(),
      lastName: $("#new_instructor_l_name")
        .val()
        .trim(),
      description: $("#new_instructor_bio")
        .val()
        .trim(),
      photo: $("#new_instructor_img_url")
        .val()
        .trim(),
      email: $("#new_instructor_email")
        .val()
        .trim(),
      phone: $("#new_instructor_phone")
        .val()
        .trim()
    };
    $.ajax({
      url: "/admin/instructors/" + $("#instructor_id").text(),
      type: "PUT",
      data: editedInstructorObj
    }).then(() => location.reload());
  });

  //delete instructor
  $("#delete_instructor").on("click", function(event) {
    event.preventDefault();
    if (
      confirm(
        "are you sure you want to delete instructor with ID " +
          $("#instructor_id").text() +
          " from databbase?"
      )
    ) {
      $.ajax({
        url: "/admin/instructors/" + $("#instructor_id").text(),
        type: "DELETE"
      }).then(() => (location.href = "/admin/instructors"));
    } else {
      console.log("doing nothing");
    }
  });
});
