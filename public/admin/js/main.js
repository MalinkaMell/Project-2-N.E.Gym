$(document).ready(function() {
  //show date for last apdated
  $("#date").text(moment().format("lll"));

  $("#dataTable").DataTable();

  // Toggle the side navigation
  $("#sidebarToggle").on("click", function(e) {
    e.preventDefault();
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
  });

  // Scroll to top button
  $(document).on("scroll", function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $(".scroll-to-top").fadeIn();
    } else {
      $(".scroll-to-top").fadeOut();
    }
  });

  $(document).on("click", "#cancel", function() {
    location.reload();
  });

  function include(file) {
    //const script = document.createElement("script");
    const script = $("<script>");
    script.attr("src", file);
    script.attr("type", "text/javascript");
    script.attr("defer", "true");
    $(document)
      .find("head")
      .append(script);
  }

  include("/admin/js/amenities.js");
  include("/admin/js/instructors.js");
  include("/admin/js/classes.js");
  include("/admin/js/categories.js");
  include("/admin/js/admins.js");
  include("/admin/js/users.js");
  include("/admin/js/sessions.js");
});
