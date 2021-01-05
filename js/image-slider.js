function init(){
    gsap.set('.project', {x: '-100%'});
    gsap.set('.project', {autoAlpha: 1});
    let currentStep = 0; //first image
    const totalSlides = document.querySelectorAll('.project').length //total images
    const wrapper = gsap.utils.wrap(0, totalSlides) 
    createfirstTimeline('next', currentStep)

    function createfirstTimeline(direction, index) {
        const goPrev = direction === 'prev';
        const imageInnerRight = document.querySelector('div.project0' + index)
        const imageFurthestRight = document.querySelector('div.project0' + (index+1));
        leftImage = index -1 < 0 ? totalSlides -1 : index - 1;
        const imageInnerLeft = document.querySelector('div.project0' + leftImage);
        const timelineIn = gsap.timeline({
            id: "timelineIn",
            defaults: {  // it's best to set a modifier like this, so it applied to all animations on timeline
                modifiers: {
                    x: gsap.utils.unitize(function(x) { //unitize removes px so only a number is sent to math.abs function
                        return goPrev ? Math.abs(x) : x; // Math.abs returns an absolute value - positive value if negative
                    })
                }
            }
        });
        timelineIn.fromTo(imageInnerRight, {
            x: '100%', //starting position (set above)
            }, { 
                duration: 1.3,
                x: 0,
            }
        ),
        timelineIn.fromTo(imageInnerLeft, {
            x: '-100%', //starting position (set above)
            }, { 
                duration: 1.0,
                x: -650,
            }, 0.7
        ),
        timelineIn.fromTo(imageFurthestRight, {
            // autoAlpha: 0, //autoAlpha animates opacity - in this case from 0 to 1 
            x: '100%', //starting position (set above)
            }, { 
                duration: 1.0,
                x: 650,
            }, 0.7 // this 0 sets this tween to start at time 0
        )
        return timelineIn;
    }

    function createTimelineIn(direction, index, current) {
        const goPrev = direction === 'prev';
        let imageFurthestLeft, imageInnerLeft, imageFurthestRight, imageInnerRight;
        if (!goPrev) {
            toExit = current -1 < 0 ? totalSlides -1 : current - 1;
            toEnter = index + 1 > totalSlides - 1 ? 0 : index + 1;
            imageFurthestLeft = document.querySelector('div.project0' + toExit);
            imageInnerRight = document.querySelector('div.project0' + index);
            imageFurthestRight = document.querySelector('div.project0' + toEnter);
            imageInnerLeft = document.querySelector('div.project0' + current);
        } else {
            toEnter = index -1 < 0 ? totalSlides -1 : index - 1;
            toExit = current + 1 > totalSlides - 1 ? 0 : current + 1;
            imageFurthestLeft = document.querySelector('div.project0' + toEnter);
            imageFurthestRight = document.querySelector('div.project0' + toExit);
            imageInnerRight = document.querySelector('div.project0' + current)
            imageInnerLeft = document.querySelector('div.project0' + index);
        }
        const timelineIn = gsap.timeline({ id: "timelineIn" });
        timelineIn.fromTo(imageFurthestRight, {
            x: 1300, 
            }, { 
                runBackwards: goPrev ? true : false,
                duration: 0.7,
                x: 650,
            } 
        ),
        timelineIn.fromTo(imageInnerRight, {
            x: 650, 
            }, { 
                runBackwards: goPrev ? true : false,
                duration: 0.7,
                x: 0,
            }, 0
        ),
        timelineIn.fromTo(imageInnerLeft, {
            x: 0, 
            }, { 
                runBackwards: goPrev ? true : false,
                duration: 0.7,
                x: -650,
            }, 0 
        ),
        timelineIn.fromTo(imageFurthestLeft, {
            x: -650, 
            }, { 
                runBackwards: goPrev ? true : false,
                duration: 0.7,
                x: -1300,
            }, 0 
        )
        return timelineIn;
    }

    function updateCurrentStep(goToIndex) {
        currentStep = goToIndex;
        //set active to the right dot
        document.querySelectorAll('.dot').forEach(function(imageInnerRight, index) {
            imageInnerRight.setAttribute('class', 'dot')
            if(index === currentStep) {
                imageInnerRight.classList.add('active')
            }  
        })
        positionDot()
    }

    function transition(direction, toIndex) {
        // MASTER TIMELINE that calls both timelines (In and then out). I could add a delay with .add(timelineOut, '+=2')
        const timelineTransition = gsap.timeline({
            onStart: function() {
                console.log({fromIndex: currentStep}, {toIndex});
                updateCurrentStep(toIndex)
            }
        })
        const tlIn = createTimelineIn(direction, toIndex, currentStep)

        timelineTransition
            .add(tlIn) // then bring in the next slide
        
        return timelineTransition;
    }

    function isTweening() {
        return gsap.isTweening('.project');
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

    function createNavigation() {
        //create dots container
        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'dots');

        //making dot animation
        const spot = document.createElement('div')
        spot.setAttribute('class', 'spot')

        //create a dot for each slide
        for (let index = 0; index < totalSlides; index ++) {
            const imageInnerRight = document.createElement('button')
            const text = document.createTextNode(index);
            imageInnerRight.appendChild(text);
            imageInnerRight.setAttribute('class','dot');
            if(currentStep === index) {
                imageInnerRight.classList.add('active')
            }
            imageInnerRight.addEventListener('click', function() {
                if (!isTweening() && currentStep !== index) {
                    const direction = index > currentStep ? 'next' : 'prev'
                    transition(direction, index)
                }
            })
            newDiv.appendChild(imageInnerRight)
        }
        //add to projects container
        newDiv.appendChild(spot)
        document.querySelector('.projects').appendChild(newDiv)
        positionDot();
    }

    function positionDot() {
        const activeDotX = document.querySelector('.dot.active').offsetLeft;
        const spot = document.querySelector('.spot')
        const spotX = spot.offsetLeft
        const destinationX = Math.round(activeDotX - spotX + 5);

        const dotTL = gsap.timeline();
        dotTL
            .to(spot, {
                duration: 0.4,
                x: destinationX,
                scale: 2.5,
                ease: 'power1.Out'
            })
            .to(spot, {
                    duration: 1.2, 
                    scale: 1, 
                    ease: 'power1.in'
                }
            )
    }

    createNavigation();

}

window.addEventListener('load', function(){
    init();
});
