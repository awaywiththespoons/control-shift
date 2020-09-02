// event listeners
// wait for page load
$(document).ready(function(){
    // run on page load
    createModal();

    // listen...
    // remove hash value when modal closes
    $("#infoModal").on("hidden.bs.modal", function (e) {
        e.preventDefault();
        $(this).modal('dispose');
        console.log("modal closed");
        history.replaceState(null, null, ' ');
    });

    // listen for hash to change
    $(window).bind('hashchange', function() {
         console.log("hashchanged");
         createModal();
    });
});



// create and show modal
// function to populate modal with artist info from json file, matching the url to the id
function createModal() {
    // clicking on the thumbnail image
    console.log("createModal running");
    // if hash value not empty create modal
    if (window.location.hash.substr(1) != "") {
        console.log("got a hash value create Modal");
        let param = window.location.hash.substr(1);
        param = param.replace(/%20/g, " ");
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
                        console.log('name', data[i].artist.name);
                        id = [i];
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
                // for (let i = 0; i < data[id].artwork.artwork_description_150w_long.length; i++) {
                //     let mainContainer = document.getElementById("aboutArtwork");
                //     var p = document.createElement('p');
                //     p.setAttribute("class", "modal-text text" + data[id].id);
                //     p.innerHTML = data[id].artwork.artwork_description_150w_long[i];
                //     mainContainer.appendChild(p);
                // }
                
                //Artwork TYPE
                infoModal.find('.artwork-type').text(data[id].artwork.details.filterType);
                
                //call to action
                infoModal.find('.artwork-call-to-action').text(data[id].artwork.details.bookingText);
                
                let mainContainer = document.getElementById("aboutArtwork");
                var p = document.createElement('p');
                p.setAttribute("class", "modal-text text" + data[id].id);
                p.innerHTML = data[id].artwork.artwork_description_50w_short;
                mainContainer.appendChild(p);
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
                    console.log("getAttributeNode " + data[id].artwork.details.activityLink);
                    x.getAttributeNode("href").value = data[id].artwork.details.activityLink;
                }   
            }       
        });
        return false;
    }  
}