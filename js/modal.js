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
        $("p.modal-text").remove()
        $("p.about-modal-text").remove()
        history.replaceState(null, null, ' ');
    });

    // listen for hash to change
    $(window).bind('hashchange', function() {
         createModal();
    });
});

// create and show modal
// function to populate modal with artist info from json file, matching the url to the id
function createModal() {
    // clicking on the thumbnail image
    // if hash value not empty create modal
    if (window.location.hash.substr(1) != "") {
        let param = window.location.hash.substr(1);
        param = param.replace(/%20/g, " ");
        let id;
        $.ajax({    
            type: "GET", 
            url: './artworks.json',
            dataType: 'json',
            success: function(data){  
                // finding the right id from the artist name which is located in the query string
                for (let i = 0; i < data.length; i++) {
                    if (param === data[i].artwork.artwork_name) {
                        id = [i];
                    }
                }
                //removing any paragraphs which do not belong to this artist id
                $("p.modal-text:not(.text" + data[id].id + ")").hide();
                //injecting the text into elements with class specified
                // POPULATING INFO 
                const infoModal = $('#infoModal');
                // Set modal image 
                var x = document.getElementById("modalImage");
                x.getAttributeNode("src").value = `./img/artists-work/` + data[id].artwork.image.url;
                // Top Section Artwork TYPE
                infoModal.find('.artwork-type').text(data[id].artwork.artwork_type);
                // Top Section Artwork call to action 
                let action = document.getElementById('actionLink');
                action.getAttributeNode("href").value = data[id].artwork.details.actionLink;
                action.innerHTML=data[id].artwork.details.actionText;
                // Top Section Artwork Call to action substitute
                // delete from here when event brite live
                let substituteAction = document.querySelector('.bookingOpensText');
                //substituteAction.innerHTML = "some stuff";
                if (data[id].artwork.details.date[0] == "anytime" && data[id].artwork.details.filterOnline == "online") {
                    substituteAction.innerHTML = "Link coming soon";
                } 
                else if(data[id].artwork.details.date[0] == "anytime" && data[id].artwork.details.filterOnline == "person") {
                    substituteAction.innerHTML = "Location coming soon";
                }
                else {
                   substituteAction.innerHTML = "You can book this event from 9th September";
                };
                // delete to here when event brite live
                // Top Section: When/Where/Time text
                if (data[id].artwork.artwork_name == "Indigeneity & Digital Entanglements") {
                    infoModal.find('.where-text').text("Available online throughout the programme");
                    infoModal.find('.when-text').text("Showing at the Arnolfini 10th - 11th October, 12 - 5pm");
                    infoModal.find('.time-text').text("");
                }
                else if (data[id].artwork.details.date == "anytime") {
                    infoModal.find('.when-text').text("At your own pace");
                    infoModal.find('.where-text').text(data[id].artwork.details.location);
                    infoModal.find('.time-text').text("");
                } else if (data[id].artwork.details.date == "") {
                    infoModal.find('.when-text').text("At various dates");
                    infoModal.find('.where-text').text(data[id].artwork.details.location);
                    infoModal.find('.time-text').text(data[id].artwork.details.time);
                } else {
                    infoModal.find('.when-text').text(data[id].artwork.details.date + " October");
                    infoModal.find('.where-text').text(data[id].artwork.details.location);
                    infoModal.find('.time-text').text(data[id].artwork.details.time);
                } 
                // Artist Name
                infoModal.find('.artist-name-text').text(data[id].artist.name);
                if (data[id].artwork.details.practicalInfo != "") {
                    $( "#practicalInfoContainer" ).removeClass( "hide" );
                    $( "#middleContainer" ).addClass( "border-sides" );
                    infoModal.find('.practical-info-text').text(data[id].artwork.details.practicalInfo)
                } else {
                    $( "#practicalInfoContainer" ).addClass( "hide" );
                    $( "#middleContainer" ).removeClass( "border-sides" );
                    $( "#middleContainer" ).addClass( "border-left " );
                }
                // Artist Info: loop through array of artist bio - print new string as a <p> so displays on new line
                for (let i = 0; i < data[id].artist.bio_100w.length; i++) {
                    let mainContainer = document.getElementById("aboutArtist");
                    var p = document.createElement('p');
                    p.setAttribute("class", "about-modal-text text" + data[id].id);
                    p.innerHTML = data[id].artist.bio_100w[i];
                    mainContainer.appendChild(p);
                }
                // Artwork Name
                infoModal.find('.artwork-title-text').text(data[id].artwork.artwork_name);             
                // Artwork Description
                let mainContainer = document.getElementById("aboutArtwork");
                var p = document.createElement('p');
                p.setAttribute("class", "modal-text text" + data[id].id);
                p.innerHTML = data[id].artwork.artwork_description_50w_short;
                mainContainer.appendChild(p);       
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
            }
        });
        return false;
    }  
}