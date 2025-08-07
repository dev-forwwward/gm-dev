gsap.registerPlugin(ScrollTrigger);

let desktopBreakpoint = 992;

if (document.readyState === 'complete') {
    init(); // page is already fully loaded
} else {
    window.addEventListener('load', init); // wait for it
}

function init() {

    if (window.innerWidth >= desktopBreakpoint) {

        console.log("Running desktop script");

        ScrollTrigger.refresh();

        setSliceLineWidth();

        const circle = document.querySelector('.circle-section');

        // console.log("screen diagonal is:", Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)));


        const heroTitle = document.querySelector('.hero_title');

        // hero title size reduction into nav
        gsap.to('.hero_title', {
            scrollTrigger: {
                trigger: '.hero_section',
                start: 'top top',
                end: 'bottom 55%',
                scrub: true,
                onEnterBack: () => {
                    heroTitle.classList.remove('mix_blend');
                },
                onLeave: () => {
                    heroTitle.classList.add('mix_blend');
                }
            },
            paddingTop: "0rem",
            fontSize: "3rem",
            top: '0'
        });

        // hero circles rotation into 2nd section
        gsap.timeline({
            scrollTrigger: {
                trigger: '.hero_section',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                // markers: true
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
                    scrub: true,
                    immediateRender: false,
                    duration: 1,
                    // anticipatePin: true,
                }
            }).to('.init-circle-section .circle_orbit_element', {
                opacity: 0,
                duration: .1,
                ease: 'power2.out'
            });
        }


        //corner lines close in to form an X
        gsap.timeline({
            scrollTrigger: {
                trigger: '.unified_lines_trigger',
                start: 'top-=20% bottom',
                end: 'bottom bottom-=10%',
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
            .from('.border_square', {
                opacity: 0,
                duration: .2
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
            .to('.init-circle-section', {
                opacity: 0,
                duration: .5
            }, "<")
            .to('.slice-line-divider.main', {
                css: {
                    display: 'flex'
                },
                duration: 0
            }, "<")
            .to('.init-circle-section', {
                css: {
                    display: 'none'
                },
                duration: 0
            }, "<")
            .to('.center_circle', {
                opacity: 1,
                duration: 0
            }, "<");

        gsap.fromTo('.circle_mask', {
            width: '0vw',
            height: '0vw',
        }, {
            scrollTrigger: {
                trigger: '.circle_mask_zoom_trigger',
                start: 'top-=30% bottom',
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
            .to('.circle-section .circle_orbit_element', {
                opacity: 0,
                duration: .25,
                ease: 'power2.out'
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
            }, "<")
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
                immediateRender: false,
                duration: 1
            }, "<");

        gsap.timeline().fromTo('.circle_mask_light', {
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
        }).from('.circle-list-el-content', {
            opacity: 0,
            duration: 0
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
                invalidateOnRefresh: true,
                antecipatePin: true,
                pin: true
            }
        })
            .to('.circle-section', {
                rotate: "-168deg",
                immediateRender: false,
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
                onLeaveBack: () => {
                    gsap.set('.rect_mask', {
                        opacity: 0,
                    });
                }
            }
        })
            .fromTo('.rect_mask', {
                opacity: 0,
            }, {
                opacity: 1,
                duration: 0,
                immediateRender: false
            })
            .fromTo('.circle-section', {
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
                }, "<");

        let boxLines = document.querySelectorAll('.circle-list-el-container.has-box');
        let boxes = document.querySelectorAll('.line_box_container');

        let amountToRotate = 85;

        // rotate circle again - with brand boxes horizontal scroll over lines
        gsap.timeline({
            scrollTrigger: {
                trigger: '.brand_carousel_trigger',
                start: 'top top',
                end: '+=350%',
                scrub: true,
                pin: true,
                markers: true,
                onEnter: () => {
                    gsap.set('.circle-list-container', {
                        rotate: '-90.1deg',
                        // immediateRender: false
                    });
                    console.clear();
                    console.log("CHANGE");
                },
                onLeaveBack: () => {
                    gsap.set('.circle-list-container', {
                        rotate: '0deg',
                        // immediateRender: false
                    });
                    console.clear();
                    console.log("LEAVE BACK");
                }
            },
        })
            .to('.circle-list-el-container', {
                // rotateZ: '-75deg',
                rotation: `-=${amountToRotate}`,
                // stagger: {
                //     each: 0.0125,
                //     from: 12, // start from the 6th element (index-based)
                // },
                immediateRender: false,
                ease: 'none',
                // onUpdate() previously here**
                onUpdate: (self) => {
                    boxLines.forEach((line, index) => {
                        let currentRotation = gsap.getProperty(line, "rotation");

                        // Account for ALL nested rotations
                        let totalRotation = -172 + (-90.1) + currentRotation;
                        let angleRad = totalRotation * (Math.PI / 180);

                        // Get the actual center of rotation (accounting for left: -42%)
                        let sectionRect = document.querySelector('.circle-section').getBoundingClientRect();
                        let originX = circle.getBoundingClientRect().left + circle.offsetWidth / 2;
                        let originY = circle.getBoundingClientRect().top + circle.offsetHeight / 2;

                        // Rest of your calculation using these corrected values
                        let boxY = boxes[index].getBoundingClientRect().top;
                        let verticalDistance = boxY - originY;

                        let intersectionX;
                        if (Math.abs(Math.cos(angleRad)) < 0.001) {
                            intersectionX = originX;
                        } else {
                            intersectionX = originX + (verticalDistance * Math.tan(angleRad));
                        }

                        gsap.set(boxes[index], {
                            left: -(intersectionX - (boxes[index].offsetWidth / 2)),
                        });
                    });
                }
            })
            .to('.rect_mask', {
                rotation: `-=${amountToRotate}`,
                immediateRender: false,
                ease: 'none',
            }, "<")
            .to('.circle-section, .box_row_container_inner', {
                left: '45%',
                immediateRender: false,
            }, "-=.2")
            .to('.box_row_container_inner', {
                xPercent: 90,
                immediateRender: false,
            }, "<")
            .to('.circle_mask_light, .rect_mask', {
                opacity: 0,
                duration: 0,
                immediateRender: false
            });


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
                markers: true
            }
        })
            .fromTo('.circle_mask_red', {
                width: '0vw',
                height: '0vw',
            }, {
                width: '120vw',
                height: '120vw',
                duration: 1,
                immediateRender: false
            })
            .to('.circle-section', {
                left: 0,
                top: 'auto',
                width: '45vw',
                height: '45vw',
                immediateRender: false,
                duration: 1
            }, "<")
            .to('.slice-line-divider', {
                rotate: "-=" + (amountToRotate * .68),
                immediateRender: false,
                duration: 1,
                ease: 'power2.in',
            }, "<")
            .to('.circle-section .circle_orbit_element', {
                opacity: 1,
                duration: 1,
                ease: 'power2.in',
                immediateRender: false
            }, "<")
            .to('.slice-line-divider:not(.main)', {
                opacity: 0,
                duration: 1,
                immediateRender: false
            }, "<")
            .to(".circle_orbit_element, .center_circle", {
                css: {
                    backgroundColor: "#fff",
                },
                duration: 1,
            }, "<");

        ScrollTrigger.refresh();
    }
}
