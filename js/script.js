gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

    const rotatorSection = document.querySelector('.rotator_section');

    gsap.timeline({
        scrollTrigger: {
            trigger: rotatorSection,
            start: "top top",
            end: "+=500%",
            pin: true,
            scrub: true,
            // onEnter: ()=> {
            //     gsap.to()
            // }
        }
    })
        .fromTo('.circle-section-container', {
            rotate: "30deg",
        }, {
            rotate: "-180deg",
            duration: 1
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