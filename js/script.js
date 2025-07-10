gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

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
        },
    })
        .to('.circle-section', {
            css: {
                left: '-80vw',
                width: '100vw',
                height: '100vw',
            },
            duration: 1
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
    .fromTo('.circle-section', {
        rotate: "15deg",
    }, {
        rotate: "-168deg",
        // duration: 1
    });
    // .to('.circle-list-el-content', {
    //     delay: 1,
    //     opacity: 1,
    //     duration: 0.1,
    //     stagger: .5
    // }, "<");

    document.querySelectorAll('.circle-list-container-outer').forEach((listEl) => {
        let content = listEl.querySelector('.circle-list-el-content');
        // ScrollTrigger.create({
        //     trigger: listEl,
        //     start: "top center",
        //     end: "+=80%",
        //     markers: true,
        // })
        gsap.to(content, {
            scrollTrigger: {
                trigger: listEl,
                start: "top center",
                end: "+=50%",
                markers: true,
            },
            opacity: 1,
            duration: .5,
            ease: "ease2.out"
        });
    })

});