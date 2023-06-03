$(document).ready(function () {
  const url = "http://0.0.0.0:5001/api/v1/status/";
  $.ajax({
    url: url,
    type: "GET",
    dataType: "json",
    success: function (data) {
      if (data.status === "OK") {
        console.log(data.status);
        $("div#api_status").addClass("available");
      }
    },
    error: function (data) {
      console.log(data.status);
      $("div#api_status").addClass("not_available");
    },
  });

  // create a place_search function
  function searchPlaces() {
    return $.ajax({
      url: "http://0.0.0.0:5001/api/v1/places_search/",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({}),
    });
  }

  // create place article element
  function createPlace(place) {
    const article = $("<article></article>");
    article.html(`<div class="title_box">
    <h2>${place.name}</h2>
    <div class="price_by_night">$${place.price_by_night}</div>
  </div>
  <div class="information">
    <div class="max_guest">
      ${place.max_guest} Guest${place.max_guest > 1 ? "s" : ""}
    </div>
    <div class="number_rooms">
      ${place.number_rooms} Bedroom${place.number_rooms > 1 ? "s" : ""}
    </div>
    <div class="number_bathrooms">
      ${place.number_bathrooms} Bathroom${place.number_bathrooms > 1 ? "s" : ""}
    </div>
  </div>
  <div class="description">${place.description}</div>`);
    return article;
  }

  function addPlaces() {
    // get section tag
    const placesSection = $("section.places");
    searchPlaces().done((places) => {
      places.forEach((place) => {
        // create an article
        const article = createPlace(place);
        placesSection.append(article);
      });
    });
  }

  addPlaces();

  $("button").click(() => {
    $.ajax({
      url: "http://0.0.0.0:5001/api/v1/places_search/",
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({ amenities: Object.keys(amenities) }),
      success: addPlaces,
    });
  });

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
