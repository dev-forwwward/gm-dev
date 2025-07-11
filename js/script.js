gsap.registerPlugin(ScrollTrigger);

if (document.readyState === 'complete') {
    init(); // page is already fully loaded
} else {
    window.addEventListener('load', init); // wait for it
}

function init() {

    console.log("doc loaded");

    const rotatorSection = document.querySelector('.rotator_section');

    // note: zooms AND turns a bit
    gsap.timeline({
        scrollTrigger: {
            trigger: '.zoom-left-trigger',
            start: 'bottom 95%',
            end: 'bottom top',
            scrub: true,
            markers: {
                startColor: "orange",
                endColor: "blue",
            },
            toggleActions: 'play none none reverse',
        },
    })
        .fromTo('.circle-section', {
            left: '0vw',
            width: '50vw',
            height: '50vw',
            rotate: '45deg',
        }, {
            left: '-80vw',
            width: '100vw',
            height: '100vw',
            rotate: '15deg',
            duration: 1,
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
            end: "+=500%",
            markers: {
                startColor: "green",
                endColor: "red",
            },
            scrub: true,
            pin: true
        }
    })
        .to('.circle-section', {
            rotate: "-168deg",
            // duration: 1
        });
    // .to('.circle-list-el-content', {
    //     delay: 1,
    //     opacity: 1,
    //     duration: 0.1,
    //     stagger: .5
    // }, "<");

    // document.querySelectorAll('.circle-list-container-outer').forEach((listEl) => {
    //     let content = listEl.querySelector('.circle-list-el-content');
    //     // ScrollTrigger.create({
    //     //     trigger: listEl,
    //     //     start: "top center",
    //     //     end: "+=80%",
    //     //     markers: true,
    //     // })
    //     gsap.to(content, {
    //         scrollTrigger: {
    //             trigger: listEl,
    //             start: "top center",
    //             end: "+=50%",
    //             markers: true,
    //         },
    //         opacity: 1,
    //         duration: .5,
    //         ease: "ease2.out"
    //     });
    // });



    // BRAND CAROUSEL
    // move circle up
    gsap.fromTo('.circle-section', {
        left: '-80vw',
        top: '0vw',
    },
        {
            scrollTrigger: {
                trigger: '.brand_carousel_trigger',
                start: 'top bottom',
                end: '+=90%',
                markers: {
                    startColor: 'pink',
                    endColor: 'pink'
                },
                scrub: true,
                toggleActions: 'play none none reverse',
            },
            top: '-65vw',
            left: '-42vw',
            duration: .8,
            ease: 'power2.inOut'
        });

    gsap.timeline({
        scrollTrigger: {
            trigger: '.brand_carousel_trigger',
            start: 'top top',
            end: '+=200%',
            scrub: true,
            pin: true,
            toggleActions: 'play none none reverse',
        },
    }).to('.slice-line-divider', {
        rotateZ: '-90deg',
        stagger: {
            each: 0.015,
            from: 9, // start from the 6th element (index-based)
        },
        ease: 'power2.inOut'
    })
    // .to(".circle-list-el-container:not(.has-box) .slice-line-divider", {
    //     skewY: '-90deg',
    //     ease: 'power2.inOut'
    // }, "<");

    ScrollTrigger.refresh();
}
