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
function appendData(data) {
    // function to populate modal with artist info from json file, matching the url to the id
    (function($) {
            // clicking on the thumbnail image
            url = new URL(window.location.href);
            $('.thumbnail').on('click', function(){
                let id = $(this).data('id');
                window.location.search = '?artist=' + id
            });
            
            $("#infoModal").on("hidden.bs.modal", function (e) {
                e.preventDefault();
                $(this).modal('dispose');
                window.location.search = '';
            });
            // get params
            if (url.searchParams.get('artist')) {
                let searchParams = new URLSearchParams(window.location.search)
                let param = searchParams.get('artist')
                let id;
                console.log('modal', param)
                $.ajax({    
                    type: "GET", 
                    url: './artworks.json',
                    dataType: 'json',
                    success: function(data){  
                        // finding the right id from the artist name which is located in the query string
                        for (let i = 0; i < data.length; i++) {
                            if (param === data[i].artist.name) {
                                console.log('name', data[i].artist.name)
                                id = [i]
                            }
                        }
                        //removing any paragraphs which do not belong to this artist id
                        $("p.modal-text:not(.text" + data[id].id + ")").hide();
                        //injecting the text into elements with class specified
                        // Artist Info
                        const infoModal = $('#infoModal');
                        infoModal.find('.artist-name-text').text(data[id].artist.name);
                        // loop through array of artist bio - print new string as a <p> so displays on new line
                        for (let i = 0; i < data[id].artist.bio_100w.length; i++) {
                            let mainContainer = document.getElementById("aboutArtist");
                            var p = document.createElement('p');
                            p.setAttribute("class", "modal-text text" + data[id].id);
                            p.innerHTML = data[id].artist.bio_100w[i];
                            mainContainer.appendChild(p);
                        }
                        // Artwork Info
                        infoModal.find('.artwork-title-text').text(data[id].artwork.artwork_name);
                        // loop through array of artwork info - print new string as a <p> so displays on new line
                        for (let i = 0; i < data[id].artwork.artwork_description_150w_long.length; i++) {
                            let mainContainer = document.getElementById("aboutArtwork");
                            var p = document.createElement('p');
                            p.setAttribute("class", "modal-text text" + data[id].id);
                            p.innerHTML = data[id].artwork.artwork_description_150w_long[i];
                            mainContainer.appendChild(p);
                        }
                        if (data[id].artwork.details.date == "anytime") {
                            infoModal.find('.when-text').text("At your own pace");
                            infoModal.find('.where-text').text(data[id].artwork.details.location);
                            infoModal.find('.time-text').text("");
                        } else {
                            infoModal.find('.when-text').text(data[id].artwork.details.date + " October");
                            infoModal.find('.where-text').text(data[id].artwork.details.location);
                            infoModal.find('.time-text').text(data[id].artwork.details.time);
                        }        
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
                        infoModal.modal('show');
                        // calendar button OR book now button OR do now button
                        if (data[id].artwork.details.calendarButton) {
                            $( "#calendarContainer" ).removeClass( "hide" );
                            $( "#bookNowContainer" ).addClass( "hide" );
                            $( "#doNowContainer" ).addClass( "hide" );
                            infoModal.find('.calendar-all-day').text(data[id].artwork.details.calendarEvent.allDay);
                            infoModal.find('.calendar-start').text(data[id].artwork.details.calendarEvent.start);
                            infoModal.find('.calendar-end').text(data[id].artwork.details.calendarEvent.end);
                            infoModal.find('.calendar-description').text(data[id].artwork.details.calendarEvent.description);
                            infoModal.find('.calendar-title').text(data[id].artwork.details.calendarEvent.calendarTitle);
                        }
                        else if (data[id].artwork.details.bookNowButton) {
                            $( "#bookNowContainer" ).removeClass( "hide" );
                            $( "#calendarContainer" ).addClass( "hide" );
                            $( "#doNowContainer" ).addClass( "hide" );
                            let l = document.getElementById('bookingLink');
                            l.getAttributeNode("href").value = data[id].artwork.details.bookingLink;
                        }
                        else if (data[id].artwork.details.doNowButton) {
                            $( "#doNowContainer" ).removeClass( "hide" );
                            $( "#calendarContainer" ).addClass( "hide" );
                            $( "#bookNowContainer" ).addClass( "hide" );
                            let x = document.getElementById('goNowLink');
                            x.getAttributeNode("href").value = data[id].artwork.details.activityLink;
                        }   
                    }       
                });
                return false;
            }   

        // $('.modal-close-button').on('click', function(){
        //     console.log('modal close click')
        // });
    })(jQuery);  
}