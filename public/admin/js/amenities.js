$(document).ready(function() {
  if ($(".true")) {
    $(".true").text("Premium");
  }
  if ($(".false")) {
    $(".false").text("No");
  }

  //creating new amenity
  $("#create_amenity").on("click", function(event) {
    console.log("click");
    event.preventDefault();
    //only validating name now, have to implement validation
    if ($("#amenity_name").val() === "") {
      $("#nameHelp").text("Please, insert amenity's name");
      return;
    }
    //creating the new amenity object
    let newAmenityObj = {
      name: $("#amenity_name")
        .val()
        .trim(),
      description: $("#amenity_description")
        .val()
        .trim(),
      photo: $("#amenity_photo")
        .val()
        .trim(),
      premium: $("#premium")
        .val()
        .trim()
    };
    //sending our object to the post route
    $.post("/admin/amenities", newAmenityObj).then(() => location.reload());
  });

  //edit existing amenity
  $("#edit_amenity").on("click", function(event) {
    event.preventDefault();

    //saving old information in case don't want to edit some fields
    let oldAmenityObj = {
      name: $("#amenity_name").text(),
      description: $("#amenity_desc").text(),
      photo: $("#amenity_img_url").attr("src"),
      premium: $("#amenity_premium").text()
    };
    $("#amenity_name").html(`
      <input type="text" value="${oldAmenityObj.name}" name="new_amenity_name" id="new_amenity_name" class="form-control">
    `);
    $("#amenity_desc").html(`
      <textarea type="text" name="new_amenity_desc" id="new_amenity_desc" class="form-control" rows="5">${oldAmenityObj.description}</textarea>
    `);
    $("#amenity_img_td").html(`
    <input type="text" value="${oldAmenityObj.photo}" name="new_amenity_img_url" id="new_amenity_img_url" class="form-control">
    `);
    $("#amenity_premium").html(`
    <select name="new_amenity_premium" id="new_amenity_premium" class="form-control">
          <option value="${oldAmenityObj.premium}" selected>${oldAmenityObj.premium}</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
    `);
    $("#save_btn_placeholder").html(
      // eslint-disable-next-line quotes
      `<button class="btn btn-dark" id="amenity_save">Save</button>
      <button class="btn btn-danger" id="cancel">Cancel</button>`
    );
  });

  //saving edited object
  $(document).on("click", "#amenity_save", function(event) {
    event.preventDefault();
    let editedAmenityObj = {
      name: $("#new_amenity_name")
        .val()
        .trim(),
      description: $("#new_amenity_desc")
        .val()
        .trim(),
      photo: $("#new_amenity_img_url")
        .val()
        .trim(),
      premium: $("#new_amenity_premium")
        .val()
        .trim()
    };
    $.ajax({
      url: "/admin/amenities/" + $("#amenity_id").text(),
      type: "PUT",
      data: editedAmenityObj
    }).then(() => location.reload());
  });

  //delete amenity
  $("#delete_amenity").on("click", function(event) {
    event.preventDefault();
    if (
      confirm(
        "are you sure you want to delete the item with ID " +
          $("#amenity_id").text() +
          " from databbase?"
      )
    ) {
      $.ajax({
        url: "/admin/amenities/" + $("#amenity_id").text(),
        type: "DELETE"
      }).then(() => (location.href = "/admin/amenities"));
    } else {
      console.log("doing nothing");
    }
  });
});
