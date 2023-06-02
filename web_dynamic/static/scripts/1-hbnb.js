$(document).ready(function () {
  const amenityDict = {};
  $("input[type=checkbox]").change(function () {
    // get amenity id and name
    const amenityId = $(this).attr("data-id");
    const amenityName = $(this).attr("data-name");
    // if checkbox is checked, add amenity to dict
    if ($(this).is(":checked")) {
      amenityDict[amenityId] = amenityName;
    } else {
      delete amenityDict[amenityId];
    }
    // update h4 amenities list
    const amenityList = Object.values(amenityDict);

    $("div.amenities h4").text(amenityList.join(", "));
  });
});
