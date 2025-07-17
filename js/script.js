gsap.registerPlugin(ScrollTrigger);

if (document.readyState === 'complete') {
    init(); // page is already fully loaded
} else {
    window.addEventListener('load', init); // wait for it
}

function init() {

    ScrollTrigger.refresh();

    setSliceLineWidth();

    const circle = document.querySelector('.circle-section');

    console.log("doc loaded");
    console.log("screen diagonal is:", Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)));

    // hero circles rotation into 2nd section
    gsap.timeline({
        scrollTrigger: {
            trigger: '.hero_section',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            markers: true
        }
    }).to('.circle-section-container', {
        rotate: 0,
        ease: 'power2.out'
    });

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


    if (window.innerWidth > 991) {
        // fix 'advantages' row blocks - only in desktop
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
    }


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

    gsap.fromTo('.circle_mask', {
        width: '0vw',
        height: '0vw',
    }, {
        scrollTrigger: {
            trigger: '.circle_mask_zoom_trigger',
            start: 'top-=25% bottom',
            end: '+=300%',
            scrub: true,
            markers: true
        },
        width: '200vw',
        height: '200vw',
        duration: 1,
        immediateRender: false
    });

    // note: zooms AND turns a bit
    gsap.timeline({
        scrollTrigger: {
            trigger: '.zoom-left-trigger',
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
            onEnter: () => {
                document.querySelector('body').classList.add('dark');
                // document.querySelector('.circle_mask').classList.add('hide');
            },
            onEnterBack: () => {
                document.querySelector('body').classList.add('dark');
                // document.querySelector('.circle_mask').classList.add('hide');
            },
            // onLeave: () => {
            //     document.querySelector('body').classList.remove('dark');
            //     // document.querySelector('.circle_mask').classList.remove('hide');
            // },
            onLeaveBack: () => {
                document.querySelector('body').classList.remove('dark');
                // document.querySelector('.circle_mask').classList.remove('hide');
            }
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

    gsap.fromTo('.circle_mask_light', {
        width: '0vw',
        height: '0vw',
    }, {
        scrollTrigger: {
            trigger: '.circle_mask_light_zoom_trigger',
            start: 'top 55%',
            end: '+=150%',
            scrub: true,
            invalidateOnRefresh: true,
        },
        width: '350vw',
        height: '350vw',
        duration: 1,
        immediateRender: false
    });


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
            invalidateOnRefresh: true,
            antecipatePin: true,
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

    // rotate circle again - with brand boxes horizontal scroll over lines
    gsap.timeline({
        scrollTrigger: {
            trigger: '.brand_carousel_trigger',
            start: 'top top',
            end: '+=350%',
            scrub: true,
            pin: true,

        },
    }).to('.slice-line-divider', {
        // rotateZ: '-75deg',
        rotation: "-=75",
        stagger: {
            each: 0.0125,
            from: 12, // start from the 6th element (index-based)
        },
        ease: 'none',
        onUpdate: (self) => {
            boxLines.forEach((line, index) => {
                let currentRotation = gsap.getProperty(line, "rotation");
                // let angleRad = (currentRotation) * (Math.PI / 180);

                let angleRad = (currentRotation + 22.5 * index) * (Math.PI / 180);
                // let originX = line.getBoundingClientRect().left + (line.offsetWidth / 2);

                let originX = circle.getBoundingClientRect().left + circle.offsetWidth / 2;
                let originY = circle.getBoundingClientRect().top + circle.offsetHeight / 2;

                let endX = boxes[index].getBoundingClientRect().left + boxes[index].offsetWidth / 2;
                let endY = boxes[index].getBoundingClientRect().top;

                let intersectionX;
                let verticalDistance = endY - originY;

                if (Math.abs(Math.cos(angleRad)) < 0.001) {
                    intersectionX = originX;
                } else {
                    // intersectionX = originX - (Math.tan(angleRad) * line.offsetHeight);
                    intersectionX = originX + (verticalDistance * Math.tan(angleRad)) * .9;
                }

                gsap.set(boxes[index], {
                    left: -(intersectionX - (boxes[index].offsetWidth / 2)),
                });

                // boxes[index].querySelector('.line_box_circle').style.left = `${-endX*.01}px`;

                // Debugging logs - essential for fine-tuning!
                console.log(`--- Line ${index} ---`);
                console.log(`Current Line Rotation: ${currentRotation.toFixed(2)} deg`);
                console.log(`Angle Rad (for box): ${angleRad.toFixed(2)}`);
                console.log(`Origin Y: ${originY.toFixed(2)}px, Target Line Y: ${endY.toFixed(2)}px`);
                console.log(`Vertical Distance (Adjacent): ${verticalDistance.toFixed(2)}px`);
                console.log(`Calculated Tan(angleRad): ${Math.tan(angleRad).toFixed(2)}`);
                console.log(`Calculated Intersection X: ${intersectionX.toFixed(2)}px`);
                console.log(`Box Final Left Position: ${gsap.getProperty(boxes[index], "left").toFixed(2)}px`);
            });
        }
    });
    // .to(".circle-list-el-container:not(.has-box) .slice-line-divider", {
    //     skewY: '-90deg',
    //     ease: 'power2.inOut'
    // // }, "<");

    function setSliceLineWidth() {
        let lines = document.querySelectorAll('.slice-line-divider');

        // set line width to always be as wide as the viewport's diagonal*1.2 (largest possible visible line and a little more)
        lines.forEach((line) => {
            line.style.width = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)) * 1.2 + "px";
        });
    }

    window.addEventListener('resize', () => {
        setSliceLineWidth();
    });


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


    // center circle element on scroll to Contact section
    gsap.timeline({
        scrollTrigger: {
            trigger: '.contact_section',
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
            immediateRender: false
        }
    })
        .to('.circle-section', {
            left: 0,
            top: 'auto',
            width: '45vw',
            height: '45vw'
        })
        .to('.slice-line-divider', {
            rotate: (amountToRotate - 3)
        }, "<");

    ScrollTrigger.refresh();
}
