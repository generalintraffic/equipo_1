$(document).on('click', 'input', function () {
  $('div').removeClass('active');
  $(this).addClass('active');
  var id = $(this).attr("id");
  console.log(id);
  $.ajax({
  global: false,
 url: "/cars/"+id+"",
 data: {id_car:id}
})
});
