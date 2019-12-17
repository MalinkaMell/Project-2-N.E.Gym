$(document).ready(function() {
  console.log("reading this");
  if ($(".lvl").text() === "4") {
    $(".lvl").text("Moderator");
  } else if ($(".lvl").text() === "5") {
    $(".lvl").text("Administrator");
  } else if ($(".lvl").text() === "6") {
    $(".lvl").text("Super administrator");
  }
  $("#create_admin").on("click", function(event) {
    event.preventDefault();
    //creating the new admin object
    let newAdminObj = {
      adminLvl: $("#admin_lvl")
        .val()
        .trim(),
      userId: $("#user_id").val()
    };
    //sending our object to the post route
    $.post("/admin/admins", newAdminObj).then(() => location.reload());
  });
});
