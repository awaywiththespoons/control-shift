function init(){
    gsap.set('.project', {x: '-100%'});
    gsap.set('.project', {autoAlpha: 1})

    let currentStep = 0;
    const totalSlides = document.querySelectorAll('.project').length
    const wrapper = gsap.utils.wrap(0, totalSlides)

    createTimelineIn('next', currentStep)

    function createTimelineIn(direction, index) {
        const goPrev = direction === 'prev';

        const element = document.querySelector('div.project0' + index);
        projectClasses = element.className.split(' ');
        projectClass = projectClasses[1];
        // title = element.querySelector('.project-title');
        // subtitle = element.getElementsByClassName('project-subtitle')
        // button = element.querySelector('.button-container');

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
        timelineIn.fromTo(element, {
            autoAlpha: 0, //autoAlpha animates opacity - in this case from 0 to 1 
            x: '-100%', //starting position (set above)
            }, { 
                duration: 0.7,
                x: 0,
                autoAlpha: 1,
                onStart: updateClass,
                onStartParams: [projectClass],
            })
            // .from([title, subtitle, button], {
            //     duration: 0.2,
            //     x: -20,
            //     autoAlpha: 0,
            //     stagger: 0.09
            // })

        return timelineIn;
    }

    function createTimelineOut(direction, index) {
        const goPrev = direction === 'prev';
        const element = document.querySelector('div.project0' + index);
        const tlOut = gsap.timeline();
        tlOut.to(element, {
            duration: 0.7,  x: 250,
            autoAlpha: 0,
            modifiers: {
                x: gsap.utils.unitize(function(x) { //unitize removes px so only a number s
                    return goPrev? -x : x; // either returning positive value of 250 or the negative
                })
            },
            ease: "back.in(1)" //animate out with a slight swing - try out different easings
        });

        return tlOut;
    }

    function updateCurrentStep(goToIndex) {
        currentStep = goToIndex;
        //set active to the right dot
        document.querySelectorAll('.dot').forEach(function(element, index) {
            element.setAttribute('class', 'dot')
            if(index === currentStep) {
                element.classList.add('active')
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
        const tlOut = createTimelineOut(direction, currentStep)
        const tlIn = createTimelineIn(direction, toIndex)

        timelineTransition
            .add(tlOut) //first animate out
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

    function updateClass(projectClass) {  // update the right body class - background colour
        document.querySelector('body').className = projectClass
    }

    function createNavigation() {
        //create dots container
        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'dots');

        //making dot animation
        const spot = document.createElement('div')
        spot.setAttribute('class', 'spot')

        //create a dot for each slide
        for (let index = 0; index < totalSlides; index ++) {
            const element = document.createElement('button')
            const text = document.createTextNode(index);
            element.appendChild(text);
            element.setAttribute('class','dot');
            if(currentStep === index) {
                element.classList.add('active')
            }
            element.addEventListener('click', function() {
                if (!isTweening() && currentStep !== index) {
                    const direction = index > currentStep ? 'next' : 'prev'
                    transition(direction, index)
                }
            })
            newDiv.appendChild(element)
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
