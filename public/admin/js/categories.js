$(document).ready(function() {
  //creating new category
  $("#create_category").on("click", function(event) {
    event.preventDefault();
    //only validating name now, have to implement validation
    if ($("#category_name").val() === "") {
      $("#nameHelp").text("Please, insert category name");
      return;
    }
    //creating the new category object
    let newCatObj = {
      name: $("#category_name")
        .val()
        .trim(),
      description: $("#category_description")
        .val()
        .trim(),
      photo: $("#category_photo")
        .val()
        .trim()
    };
    //sending our object to the post route
    $.post("/admin/categories", newCatObj).then(() => location.reload());
  });
  //edit existing category
  $("#edit_category").on("click", function(event) {
    event.preventDefault();
    //saving old information in case don't want to edit some fields
    let oldCatObj = {
      name: $("#category_name").text(),
      description: $("#category_desc").text(),
      photo: $("#category_img_url").attr("src")
    };
    $("#category_name").html(`
      <input type="text" value="${oldCatObj.name}" name="new_category_name" id="new_category_name" class="form-control">
    `);
    $("#category_desc").html(`
      <textarea type="text" name="new_category_desc" id="new_category_desc" class="form-control" rows="5">${oldCatObj.description}</textarea>
    `);
    $("#category_img_td").html(`
    <input type="text" value="${oldCatObj.photo}" name="new_category_img_url" id="new_category_img_url" class="form-control">
    `);
    $("#save_btn_placeholder").html(
      // eslint-disable-next-line quotes
      `<button class="btn btn-dark" id="cat_save">Save</button>
      <button class="btn btn-danger" id="cancel">Cancel</button>`
    );
  });
  //saving edited object
  $(document).on("click", "#cat_save", function(event) {
    event.preventDefault();
    let editedCatObj = {
      name: $("#new_category_name")
        .val()
        .trim(),
      description: $("#new_category_desc")
        .val()
        .trim(),
      photo: $("#new_category_img_url")
        .val()
        .trim()
    };
    $.ajax({
      url: "/admin/categories/" + $("#category_id").text(),
      type: "PUT",
      data: editedCatObj
    }).then(() => location.reload());
  });

  $("#delete_category").on("click", function(event) {
    event.preventDefault();
    if (
      confirm(
        "are you sure you want to delete the item with ID " +
          $("#category_id").text() +
          " from databbase?"
      )
    ) {
      $.ajax({
        url: "/admin/categories/" + $("#category_id").text(),
        type: "DELETE"
      }).then(() => (location.href = "/admin/categories"));
    } else {
      console.log("doing nothing");
    }
  });
});
