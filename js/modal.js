fetch('artworks.json') // fetching json code
.then(function (response) {
    return response.json(); // Takes a Response stream & returns a promise that resolves with the result of parsing the body text as JSON.
})
.then(function (data) {
    appendData(data); // If successful, runs appendData function below
})
.catch(function (err) {
    console.log('error: ' + err); // catches error & console logs out the error message
});
// function to generate grid of artworks from json file
function appendData(data) {
    // function to populate modal with artist info from json file, based on which thumbnail image is clicked
    (function($) {
        var infoModal = $('#infoModal');
        $('.thumbnail').on('click', function(){
            let id = $(this).data('id');
            $.ajax({ 
                type: "GET", 
                url: './artworks.json',
                dataType: 'json',
                success: function(data){    
                    //injecting the text into elements with class specified
                    infoModal.find('.artist-name-text').text(data[id].artist.name);
                    infoModal.find('.artist-bio-text').text(data[id].artist.bio_100w);
                    infoModal.find('.artwork-title-text').text(data[id].artwork.artwork_name);
                    infoModal.find('.artwork-info-text').text(data[id].artwork.artwork_description_150w_long);
                    infoModal.find('.when-text').text(data[id].artwork.details.date);
                    infoModal.find('.where-text').text(data[id].artwork.details.location);
                    infoModal.find('.time-text').text(data[id].artwork.details.time);
                    infoModal.modal('show');
                    
                    // large image on modal src set 
                    var x = document.getElementById("modalImage");
                    x.getAttributeNode("src").value = `./img/artists-work/` + data[id].artwork.image.url;

                    // SOCIAL MEDIA SECTION
                    // If no social media accounts in json, then hide div
                    let socialAccounts = Object.keys(data[id].social_media).length; //count how many social media accounts artist needs displaying
                    if (socialAccounts === 0) {
                        $( "#socialMediaContainer" ).addClass( "hide" );
                    } else {
                        $( "#socialMediaContainer" ).removeClass( "hide" );
                    }
                    // Show/Hide Website & add personal link
                    if (data[id].social_media["website"]) {  
                    $( "#websiteIcon" ).removeClass( "hide" );
                    var l = document.getElementById('websiteLink');
                    l.getAttributeNode("href").value = data[id].social_media.website;
                    } else {
                        $( "#websiteIcon" ).addClass( "hide" )
                    }
                    // Show/Hide Instagram & add personal link
                    if (data[id].social_media["instagram"]) {  
                        $( "#instagram" ).removeClass( "hide" );
                        var i = document.getElementById('instaLink');
                        i.getAttributeNode("href").value = data[id].social_media.instagram;
                    } else {
                        $( "#instagram" ).addClass( "hide" )
                    }
                    // Show/Hide Twitter & add personal link
                    if (data[id].social_media["twitter"]) {  
                        $( "#twitter" ).removeClass( "hide" );
                        var t = document.getElementById('twitLink');
                        t.getAttributeNode("href").value = data[id].social_media.twitter;
                    } else {
                        $( "#twitter" ).addClass( "hide" )
                    }
                    // Show/Hide LinkedIn & add personal link
                    if (data[id].social_media["linkedIn"]) {  
                        $( "#linkedIn" ).removeClass( "hide" );
                        var l = document.getElementById('linkedInLink');
                        l.getAttributeNode("href").value = data[id].social_media.linkedIn;
                    } else {
                        $( "#linkedIn" ).addClass( "hide" )
                    }
                    // CALENDAR SECTION
                    // If not bookable, then show calendar
                    if (data[id].artwork.details.bookable == true) {
                        $( "#calendarContainer" ).addClass( "hide" );
                    } else {
                        $( "#calendarContainer" ).removeClass( "hide" );
                        infoModal.find('.calendar-all-day').text(data[id].artwork.details.calendarEvent.allDay);
                        infoModal.find('.calendar-start').text(data[id].artwork.details.calendarEvent.start);
                        infoModal.find('.calendar-end').text(data[id].artwork.details.calendarEvent.end);
                        infoModal.find('.calendar-description').text(data[id].artwork.details.calendarEvent.description);
                        infoModal.find('.calendar-title').text(data[id].artwork.details.calendarEvent.calendarTitle);
                    }
                    // BOOK NOW SECTION
                    if (data[id].artwork.details.bookable == false) {
                        $( "#bookNowContainer" ).addClass( "hide" );
                    } else {
                        $( "#bookNowContainer" ).removeClass( "hide" );
                        let l = document.getElementById('bookingLink');
                        l.getAttributeNode("href").value = data[id].artwork.details.bookingLink;
                    }
                }      
            });
            return false;
        });
    })(jQuery);  
}