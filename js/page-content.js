// event listeners
// wait for page load
$(document).ready(function(){
    // run on page load
    createPage();
});

// create and show modal
// function to populate modal with artist info from json file, matching the url to the id
function createPage() {
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
                const infoModal = $('#infoModal');
                // artwork name
                document.querySelector('.artwork-title-text').innerHTML = data[id].artwork.artwork_name;
                // artist name
                document.querySelector('.artist-name-text').innerHTML = data[id].artist.name;
                // Set modal image 
                var x = document.getElementById("modalImage");
                x.getAttributeNode("src").value = `./img/artists-work/` + data[id].artwork.image.url;

                if (data[id].artwork.details.actionLink) {                    
                    let action = document.getElementById('actionLink');
                    action.getAttributeNode("href").value = data[id].artwork.details.actionLink;
                    action.innerHTML = data[id].artwork.details.actionText;
                } else {
                    $(".actionContainer").addClass('hide')
                };

                // Artist Info: loop through array of artist bio - print new string as a <p> so displays on new line
                for (let i = 0; i < data[id].artist.bio_100w.length; i++) {
                    let mainContainer = document.getElementById("aboutArtist");
                    var p = document.createElement('p');
                    p.setAttribute("class", "about-modal-text text" + data[id].id);
                    p.innerHTML = data[id].artist.bio_100w[i];
                    mainContainer.appendChild(p);
                }
          
                // Artwork Description
                let mainContainer = document.getElementById("aboutArtwork");
                var p = document.createElement('p');
                p.setAttribute("class", "modal-text text" + data[id].id);
                p.innerHTML = data[id].artwork.artwork_description_50w_short;
                mainContainer.appendChild(p);       
                // SOCIAL MEDIA SECTION - if no social media accounts in json, then hide div
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