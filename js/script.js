gsap.registerPlugin(ScrollTrigger);

if (document.readyState === 'complete') {
    init(); // page is already fully loaded
} else {
    window.addEventListener('load', init); // wait for it
}

function init() {

    ScrollTrigger.refresh();

    console.log("doc loaded");

    // circle intersection
    gsap.timeline({
        scrollTrigger: {
            trigger: '.intersection_triggger',
            start: 'top bottom',
            end: '+=300%',
            scrub: true,
            // pin: true,
        }
    }).to('.circle-section, .init-circle-section', {
        // delay: 1.2,
        width: '45vw',
        height: '45vw',
        top: '0vw',
        rotate: '45deg',
        duration: 2,
        ease: 'power2.out'
    })
        .fromTo('.text-zoom-in-first', {
            yPercent: 0,
            scale: .7
        }, {
            delay: .25,
            scale: 1.05,
            yPercent: -10,
            duration: .5,
        }, "<");

    // fix 'advantages' row blocks
    gsap.timeline({
        scrollTrigger: {
            trigger: '.advantages_section',
            start: 'top top',
            end: '+=225%',
            pin: true,
            pinSpacing: false,
            // anticipatePin: true,
        }
    });


    //corner lines close in to form an X
    gsap.timeline({
        scrollTrigger: {
            trigger: '.unified_lines_trigger',
            start: 'top-=20% bottom',
            end: 'bottom bottom',
            scrub: true,
        }
    })
        .to('.advantages_section', {
            opacity: 0,
            duration: .25
        })
        .fromTo('.text-zoom-in-second', {
            yPercent: 0,
            scale: .5
        }, {
            scale: 1.05,
            yPercent: -10,
            duration: 1,
        }, "<")
        .from('.border_square.left', {
            delay: .2,
            xPercent: -100,
            duration: 1,
            ease: 'power2.out'
        }, "<")
        .from('.border_square.right', {
            xPercent: 100,
            duration: 1,
            ease: 'power2.out'
        }, "<")
        .to('.init_lines_container', {
            opacity: 0,
            duration: 0
        })
        .to('.slice-line-divider.main', {
            css: {
                display: 'block'
            },
            duration: 0
        }, "<")
        .to('.init-circle-section', {
            css: {
                display: 'none'
            },
            duration: 0
        }, "<");


    // note: zooms AND turns a bit
    gsap.timeline({
        scrollTrigger: {
            trigger: '.zoom-left-trigger',
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
            // markers: {
            //     startColor: "orange",
            //     endColor: "blue",
            // },
        },
    })
        .fromTo('.circle-section', {
            left: '0vw',
            width: '45vw',
            height: '45vw',
            rotate: '45deg',
        }, {
            left: '-80vw',
            width: '100vw',
            height: '100vw',
            rotate: '15deg',
            duration: 1,
            immediateRender: false
        })
        .to('.circle-section .slice-line-divider', {
            opacity: 1,
            duration: .5,
            ease: 'power2.out'
        }, "<")
        .fromTo('.circle-section', {
            rotate: "45deg",
        }, {
            delay: .1,
            rotate: "15deg",
            duration: 1
        }, "<");


    // CIRCLE INNER SECTIONS ROTATION
    // fuller turn after initial small turn with zoom
    gsap.timeline({
        scrollTrigger: {
            trigger: '.rotation_trigger',
            start: "top top",
            end: "+=600%",
            // markers: {
            //     startColor: "green",
            //     endColor: "red",
            // },
            scrub: true,
            // invalidateOnRefresh: true,
            pin: true
        }
    })
        .to('.circle-section', {
            rotate: "-168deg",
            duration: 1
        })
        .to('.circle-list-el-content', {
            delay: .012,
            opacity: 1,
            duration: 0.15,
            stagger: 0.077,
        }, "<")
        .to('.circle-list-el-content', {
            delay: .12,
            opacity: 0,
            duration: 0.15,
            stagger: 0.1,
        }, "<");



    // BRAND CAROUSEL
    // move circle up
    gsap.timeline({
        scrollTrigger: {
            trigger: '.brand_carousel_trigger',
            start: 'top bottom',
            end: '+=102%',
            // markers: {
            //     startColor: 'pink',
            //     endColor: 'pink'
            // },
            scrub: true,
            invalidateOnRefresh: true,
        },
    }).fromTo('.circle-section', {
        left: '-80vw',
        top: '0vw',
        rotate: "-168deg",
    },
        {
            top: '-65vw',
            left: '-42vw',
            rotate: "-172deg",
            duration: .8,
            ease: 'power2.inOut',
            immediateRender: false
        });


    let boxLines = document.querySelectorAll('.circle-list-el-container.has-box .slice-line-divider');
    let boxes = document.querySelectorAll('.line_box_container');

    // rotate circle again - with brand boxes
    gsap.timeline({
        scrollTrigger: {
            trigger: '.brand_carousel_trigger',
            start: 'top top',
            end: '+=350%',
            scrub: true,
            pin: true,
            // toggleActions: 'play none reverse none',
            onUpdate: (self) => {
                boxLines.forEach((line, index) => {
                    let currentRotation = gsap.getProperty(line, "rotation");
                    let angleRad = currentRotation * (Math.PI / 180);
                    let originX = line.getBoundingClientRect().left + (line.offsetWidth / 2);
                    let intersectionX;

                    if (Math.abs(angleRad) % Math.PI === Math.PI / 2 || Math.abs(angleRad) % Math.PI === -Math.PI / 2) {
                        intersectionX = originX;
                    } else {
                        // intersectionX = originX + (Math.tan(angleRad) * line.offsetHeight);
                        intersectionX = originX + (600 / Math.tan(angleRad)) * line.offsetHeight;
                    }

                    gsap.set(boxes[index], {
                        left: intersectionX - (boxes[index].offsetWidth / 2),
                    });

                    console.log(`Line ${index} - Intersection X: ${intersectionX}`);
                });
            }
        },
    }).to('.slice-line-divider', {
        rotateZ: '-75deg',
        // stagger: {
        //     each: 0.0125,
        //     from: 10, // start from the 6th element (index-based)
        // },
        ease: 'power2.out'
    });
    // .to(".circle-list-el-container:not(.has-box) .slice-line-divider", {
    //     skewY: '-90deg',
    //     ease: 'power2.inOut'
    // // }, "<");


    // lines.forEach((line, index) => {
    //     gsap.to('.slice-line-divider', {
    //         scrollTrigger: {
    //             trigger: '.brand_carousel_trigger',
    //             start: 'top top',
    //             end: '+=350%',
    //             scrub: true,
    //             pin: true,
    //             toggleActions: 'play none reverse none',
    //             onUpdate: (self) => {
    //                 let currentRotation = gsap.getProperty(line, "rotation");
    //                 let angleRad = currentRotation * (Math.PI / 180);

    //                 let intersectionX;
    //                 if (Math.abs(angleRad) % Math.PI === Math.PI / 2 || Math.abs(angleRad) % Math.PI === -Math.PI / 2) {
    //                     // intersectionX = originX;
    //                 } else {
    //                     gsap.to()
    //                 }

    //             }
    //         },
    //         rotateZ: '-75deg',
    //         ease: 'power2.inOut'
    //     });
    // });

    ScrollTrigger.refresh();
}
