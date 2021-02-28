window.onresize = changeButtonPosition; //because the image container is set as absolute, we need a way of telling if the image is smaller on some screens to prevent a gap between the projects div and the navigation buttons

// changes button position to under project image & also resizez caption container with image
function changeButtonPosition() {
    makeCaptionContainers()
    projectContainerHeight = document.querySelector('.project-image').clientHeight
    document.querySelector('.projects').style.height = (projectContainerHeight + 15)+ 'px'
}

// sets caption container to the correct height of the slider image div and adds event listener to change opacity if hovered over
function makeCaptionContainers() {
    let imageArray = Array.prototype.slice.call(document.querySelectorAll('.sliderImage'))
    let captions = Array.prototype.slice.call(document.querySelectorAll('.captionContainer'))
    imageArray.forEach((imageArray, i) => {
        const halfWidth = imageArray.width / 2;
        captions[i].style.width = imageArray.width + 'px';
        captions[i].style.height = imageArray.height + 'px';
        captions[i].style.left = `calc(50% - ${halfWidth}px)`;
    });
    gsap.utils.toArray(".captionContainer").forEach((container) => {
        let tl1 = gsap.timeline();
        let tl2 = gsap.timeline();
        tl1.to(container, { opacity: 1 })
        tl2.to(container, { opacity: 0 });
        container.addEventListener("mouseleave", () => tl2.play(0));
        container.addEventListener("mouseenter", () => tl1.play(0));
    })
}

// creating the width of the progress bar by the client width of whole bar divded by no of divs in slider
function createProgessBar() {
    progressBarWidth = document.querySelector('.gallery-list__progress-track').clientWidth
    indicatorWidth = progressBarWidth/document.querySelectorAll('.project').length
    gsap.set( '.gallery-list__progress-bar', { width: indicatorWidth } );
}

// called on return of promises - when the images are loaded into the slider
function init(){
    createProgessBar()
    makeCaptionContainers()
    changeButtonPosition()

    gsap.set('.project', {x: '-100%'}); // images start off screen
    gsap.set('.project', {autoAlpha: 1}); // images all set to full opacity
    gsap.set('.captionContainer', {opacity:0}); //caption containers all set to zero opacity

    let currentStep = 0; //first image
    const totalSlides = document.querySelectorAll('.project').length //total divs in slider

    const wrapper = gsap.utils.wrap(0, totalSlides) // slider will wrap back to 0 when total slides is reached
    
    createfirstTimeline(currentStep) //calls first slide in

    function createfirstTimeline(index) {
        leftImage = index -1 < 0 ? totalSlides -1 : index - 1; // if user presses back it will show last image
        console.log('totalSlides', totalSlides)
        // Handles only one slide
        if (totalSlides === 1) {
            const image = document.querySelector('div.project0')
            gsap.timeline().fromTo(image, {
                x: '100%', //starting position - entering from righthand side
                }, { 
                    duration: 1.3,
                    x: 0, //ending position - moving into the center
                    zIndex:10,
                },
            )
        } else { // If multiple divs in slider
            const imageInnerRight = document.querySelector('div.project' + index)
            const imageFurthestRight = document.querySelector('div.project' + (index+1));
            const imageInnerLeft = document.querySelector('div.project' + leftImage);
            const timelineIn = gsap.timeline({ id: "timelineIn" }); //creating gsap timeline
            timelineIn.fromTo(imageInnerRight, {
                x: '100%', //starting position - entering from righthand side
                }, { 
                    duration: 1.3,
                    x: 0, //ending position - moving into the center
                    zIndex:10,
                }
            ),
            timelineIn.fromTo(imageInnerLeft, {
                x: '-100%', //starting position - entering from the lefthand side
                }, { 
                    duration: 1.0,
                    x: -700, //ending position - moving into the far left position (partially off lefthand side)
                }, 0.7 // this sets a 0.7 second delay in tween starting
            ),
            timelineIn.fromTo(imageFurthestRight, {
                // autoAlpha: 0, //autoAlpha animates opacity - in this case from 0 to 1 
                x: '100%', //starting position (set above)
                }, { 
                    duration: 1.0,
                    x: 700, //ending position - moving into the far right position (partially off right side)
                }, 0.7 // this sets a 0.7 second delay in tween starting
            )
            return timelineIn;
        }
    }
 
    // createTimelineIn is called when button next or prev is clicked
    function createTimelineIn(direction, index, current) {
        const goPrev = direction === 'prev';
        let imageFurthestLeft, imageInnerLeft, imageFurthestRight, imageInnerRight, position;
        
        // animating progress bar 
        progressBar = document.querySelector('.gallery-list__progress-bar') //to target in order to change position of progressbar indicator
        const progressIndicatorWidth = progressBar.clientWidth //width of progressbar indicator set earlier
        progressBarWidth = document.querySelector('.gallery-list__progress-track').clientWidth //working out width of whole progress bar (based on 100% width of page)

        if (current === 0 && direction === 'prev') {
            position = progressBarWidth - progressIndicatorWidth
        } else if(current === totalSlides -1 && direction === 'next') {
            position = 0
        } else if (direction === 'prev') {
            position = `-=` + (progressBarWidth - progressIndicatorWidth)/(totalSlides - 1);
        } else {
            position = `+=` + (progressBarWidth - progressIndicatorWidth)/(totalSlides - 1);
        }
        if (!goPrev) { //working out which images to target in order to change their position in the timeline below
            toExit = current -1 < 0 ? totalSlides -1 : current - 1;
            toEnter = index + 1 > totalSlides - 1 ? 0 : index + 1;
            imageFurthestLeft = document.querySelector('div.project' + toExit);
            imageInnerRight = document.querySelector('div.project' + index);
            imageFurthestRight = document.querySelector('div.project' + toEnter);
            imageInnerLeft = document.querySelector('div.project' + current);
        } else { //working out which images to target in order to change their position in the timeline below
            toEnter = index -1 < 0 ? totalSlides -1 : index - 1;
            toExit = current + 1 > totalSlides - 1 ? 0 : current + 1;
            imageFurthestLeft = document.querySelector('div.project' + toEnter);
            imageFurthestRight = document.querySelector('div.project' + toExit);
            imageInnerRight = document.querySelector('div.project' + current)
            imageInnerLeft = document.querySelector('div.project' + index);
        }
        const timelineIn = gsap.timeline({ id: "timelineIn" });
        timelineIn.fromTo(imageFurthestRight, {
            x: 1400, 
            }, { 
                runBackwards: goPrev ? true : false, //if user pressed back (goPrev is true) then runBackwards will reverse the start and end x position
                duration: 0.7,
                x: 700,
            } 
        ),
        timelineIn.fromTo(imageInnerRight, {
            x: 700, 
            }, { 
                runBackwards: goPrev ? true : false,
                duration: 0.7,
                x: 0,
                zIndex:10
            }, 0
        ),
        timelineIn.fromTo(imageInnerLeft, {
            x: 0, 
            }, { 
                runBackwards: goPrev ? true : false,
                duration: 0.7,
                x: -700,
            }, 0 
        ),
        timelineIn.fromTo(imageFurthestLeft, {
            x: -700, 
            }, { 
                runBackwards: goPrev ? true : false,
                duration: 0.7,
                x: -1400,
            }, 0 
        ),
        timelineIn.to(progressBar, {
                duration: 0.7,
                x: position
            }, 0
        )
        return timelineIn;
    }

    function updateCurrentStep(goToIndex) {
        currentStep = goToIndex;
    }

    function transition(direction, toIndex) {
        const timelineTransition = gsap.timeline({
            onStart: function() {
                console.log({fromIndex: currentStep}, {toIndex});
                updateCurrentStep(toIndex)
            }
        })
        const tlIn = createTimelineIn(direction, toIndex, currentStep) 
        timelineTransition.add(tlIn) //calls function above createTimelineIn
        return timelineTransition;
    }

    function isTweening() {
        return gsap.isTweening('.project'); //prevents user being able to click twice on arrows and flick through many images before the transition is finished
    }

    document.querySelector('button.next').addEventListener('click', function(e) {
        e.preventDefault();
        const nextStep = wrapper(currentStep+1)
        !isTweening() && transition('next', nextStep)
    })

    document.querySelector('button.prev').addEventListener('click', function(e) {
        e.preventDefault()
        const prevStep = wrapper(currentStep-1)
        !isTweening() && transition('prev', prevStep)
    })

    // touch events
    let ts;
    $('.project img').on({ 'touchstart' : function(e){
        ts = e.originalEvent.touches[0].clientX;
     } });


    
    $('.project img').on({ 'touchmove' : function(e){
        var te = e.originalEvent.changedTouches[0].clientX;
        if (ts > te && totalSlides > 3) {
            console.log('left');
            const nextStep = wrapper(currentStep+1);
            !isTweening() && transition('next', nextStep);
        } else {
            console.log('right');
            const prevStep = wrapper(currentStep-1);
            !isTweening() && transition('prev', prevStep);
        }
     } });

}
