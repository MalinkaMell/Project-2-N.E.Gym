$(document).ready(function() {
  //creating new class
  $("#create_class").on("click", function(event) {
    event.preventDefault();
    //only validating name now, have to implement validation
    if ($("#class_name").val() === "") {
      $("#nameHelp").text("Please, insert class name");
      return;
    }
    //creating the new class object
    let newClassObj = {
      name: $("#class_name")
        .val()
        .trim(),
      description: $("#class_description")
        .val()
        .trim(),
      CategoryId: $("#class_category")
        .val()
        .trim(),
      duration: $("#class_duration")
        .val()
        .trim(),
      intensity: $("#class_intensity")
        .val()
        .trim(),
      price: $("#class_price")
        .val()
        .trim()
    };
    //sending our object to the post route
    $.post("/admin/classes", newClassObj).then(() => location.reload());
  });
  //edit existing class
  $("#edit_class").on("click", function(event) {
    event.preventDefault();
    //saving old information in case don't want to edit some fields
    let oldClassObj = {
      name: $("#class_name").text(),
      description: $("#class_desc").text(),
      CategoryId: $("#class_category").text(),
      duration: $("#class_duration").text(),
      intensity: $("#class_intensity").text(),
      price: $("#class_price").text()
    };
    $("#class_name").html(`
      <input type="text" value="${oldClassObj.name}" name="new_class_name" id="new_class_name" class="form-control">
    `);
    $("#class_desc").html(`
      <textarea type="text" name="new_class_desc" id="new_class_desc" class="form-control" rows="5">${oldClassObj.description}</textarea>
    `);
    $("#class_category").removeAttr("disabled");
    $("#class_duration").html(`
    <input type="text" value="${oldClassObj.duration}" name="new_class_duration" id="new_class_duration" class="form-control">
    `);
    $("#class_intensity").html(`
    <input type="text" value="${oldClassObj.intensity}" name="new_class_intensity" id="new_class_intensity" class="form-control">
    `);
    $("#class_price").html(`
    <input type="text" value="${oldClassObj.price}" name="new_class_price" id="new_class_price" class="form-control">
    `);
    $("#save_btn_placeholder").html(
      // eslint-disable-next-line quotes
      `<button class="btn btn-dark" id="class_save">Save</button>
      <button class="btn btn-danger" id="cancel">Cancel</button>`
    );
    console.log(oldClassObj);
  });
  //saving edited object
  $(document).on("click", "#class_save", function(event) {
    event.preventDefault();
    let editedClassObj = {
      name: $("#new_class_name")
        .val()
        .trim(),
      description: $("#new_class_desc")
        .val()
        .trim(),
      CategoryId: $("#class_category")
        .val()
        .trim(),
      duration: $("#new_class_duration")
        .val()
        .trim(),
      intensity: $("#new_class_intensity")
        .val()
        .trim(),
      price: $("#new_class_price")
        .val()
        .trim()
    };
    console.log(editedClassObj);
    $.ajax({
      url: "/admin/classes/" + $("#class_id").text(),
      type: "PUT",
      data: editedClassObj
    }).then(() => location.reload());
  });

  $("#delete_class").on("click", function(event) {
    event.preventDefault();
    if (
      confirm(
        "are you sure you want to delete the item with ID " +
          $("#class_id").text() +
          " from databbase?"
      )
    ) {
      $.ajax({
        url: "/admin/classes/" + $("#class_id").text(),
        type: "DELETE"
      }).then(() => (location.href = "/admin/classes"));
    } else {
      console.log("doing nothing");
    }
  });
});
