//Prevent scrolling when the document is loading
document.body.style.height = "100vh";
document.body.style.overflow = "hidden";

//when document is loaded
window.addEventListener("load",()=>{
    setTimeout(()=>{
        window.scrollTo({top: 0,});

        const t1 = gsap.timeline();

        t1.to(".side-1",{
            top: "-100%",
            ease:"power3.out",
        })
            .to(".side-2",{
                top: "-100%",
                ease:"power3.out",
            },"+=0.5")

            .to("#turbulence",{
                duration:2,
                attr:{baseFrequency:"0 0"}},"<")

                .from("banner-img img",{
                    opacity:0,
                    y:-300,
                    ease:"power4.out", },"<" )

     //Logo Animation
     .to(".loader img",{
        animation: "none",
        width: "4.5em",
     },"<")

     .to("loader img",{
        top:"calc(0%+2.5em)",
        left:"calc(0%+2.5em)",
        duration:1,
        ease:"power3.out",
     },"<")
     .from(".logo img",{
        opacity:0,},"<")
        .to(".logo img",{
            opacity:1,},"<")

            //Make the body scrollable again
            .to("body",{height:"initial",overflow:"unset"});

            //remove image filter
            gsap.to(".banner-img img",{filter:"none",delay:2.5,});

            //remove the loader
            gsap.to(".loader",{display:"none",delay:2.5,});
        
        },2000);
    });

    //--------------Scroll Trigger Animation
    //Feature panel animation-------------------
    gsap.registerPlugin(ScrollTrigger);

   
    //Feature image animation
    const images = gsap.utils.toArray(".feature-img img");
    images.forEach(img =>{
        gsap.from(img,{
            y: -100,
            opacity: 0,
            ease: "power3.out",
            delay:0.5,
            scrollTrigger:{
                trigger: img.parentElement,
                start:"20% center",
                toggleActions: "play none none none",//animation start position
            }
        });
    });

    //Product Image Animation
    const gridItems = gsap.utils.toArray(".product");
    gridItems.forEach(item =>{
        gsap.from(item,{
            opacity: 0,
            ease: "power3.out",
            duration:2,
            scrollTrigger:{
                trigger: item,
                start:"20% center",
                end:"bottom top",//animation start position
            }
        });
    });

    //Mouse Move Effect
    const features = document.querySelectorAll(".feature");
    for(let i=0;i<features.length;i++){
        const panels = features[i].querySelector(".feature-img").children;
        const sensitivities = [15,35,-25,5,];

        //adda mouse event to the current feature section

        features[i].addEventListener("mousemove",e=>{
            for(let i=0;i<panels.length;i++){
                setTimeout(()=>{
                    const x = e.clientX;
                    const y = e.clientY;

                    const w= features[0].offsetWidth / 2;
                    const h= features[0].offsetHeight / 2;

                    let convertX = ((x-w)*sensitivities[i])/w;
                    let convertY = ((x-h)*sensitivities[i])/h;

                    panels[i].style.transform = `
                    translateX(${convertX}px)
                     translateX(${convertX}px)`;
                },200);
            }
        });
    }