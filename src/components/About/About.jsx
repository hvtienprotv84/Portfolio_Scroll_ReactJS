import { useEffect, useRef } from 'react';

import getLetters from '../../helpers/getLetters';
import LocomotiveScroll from 'locomotive-scroll';
import SplitType from 'split-type';
import { debounce } from 'lodash';

import Logo from '/logo_22.png';

import './About.css';

const About = () => {

    const aboutMeRef = useRef();
    const myNameRef = useRef();
    const myDescriptionRef = useRef([]);
    const descriptionLinesRef = useRef([]);

    useEffect(() => {
        let scroll = null;

        const createScroll = () => {
            //locomotive
            scroll = new LocomotiveScroll({
                el: document.querySelector('.about-section'),
                smooth: true,
                smoothMobile: true,
                multiplier: 1,
                lerp: 0.06,
                smartphone: {
                    smooth: true,
                    locomotive: true,
                    init: true,
                    speed: 20,
                    multiplier: 2
                },
            });
        };

        const handleSplitText = () => {
            if (window.innerWidth > 500) {
                myDescriptionRef.current = Array.from(document.querySelectorAll('.myDescription-text'));
                if (myDescriptionRef.current.length > 0) {

                    myDescriptionRef.current.forEach((textElement) => {
                        // eslint-disable-next-line no-unused-vars
                        const text = new SplitType(textElement,
                            {
                                lineClass: 'description-line',
                                types: 'lines'
                            }
                        );
                    });
                }
            }
        };

        const handlePageLoading = () => {
            scroll.update();
        };

        const handleResize = () => {
            if (scroll) {
                scroll.update();
                window.innerWidth > 500 ? scroll.on('scroll', handleScroll) : scroll.off('scroll', handleScroll);
            }
            handleSplitText();
        };

        const handleForLoopDebounce = debounce((array, instance, scrollY) => {
            for (const divElement of array) {
                if ((document.body.offsetHeight - (window.innerHeight / 16)) > instance.scroll.y + window.innerHeight) {
                    if (divElement.offsetTop < scrollY) {
                        divElement.style.backgroundSize = '100%';
                    } else {
                        break;
                    }
                } else {
                    divElement.style.backgroundSize = '100%';
                }
            }
        }, 30);

        const handleScroll = debounce((instance) => {
            if (window.innerWidth > 500) {
                descriptionLinesRef.current = Array.from(document.querySelectorAll('.description-line'));

                if (descriptionLinesRef.current.length > 0 && scroll) {
                    let divisor = 8;
                    if (window.innerWidth < 450) {
                        divisor = 1.5;
                    } else if (window.innerWidth < 800) {
                        divisor = 2;
                    } else if (window.innerWidth < 1000) {
                        divisor = 3;
                    } else if (window.innerWidth < 1200) {
                        divisor = 6;
                    }
                    const scrollY = instance.scroll.y + (window.innerHeight / divisor);
                    handleForLoopDebounce(descriptionLinesRef.current, instance, scrollY);
                }
            }
        }, 15.9);

        handleSplitText();
        createScroll();

        if (myNameRef.current) {
            getLetters(myNameRef.current, 'myName-letters');
            setTimeout(() => {
                document.querySelectorAll('.myName-letters')
                    .forEach((span) => {
                        span.style.transform = `translateY(0vw) rotate(0deg)`;
                    });
            }, 100);
        }
        if (aboutMeRef.current) {
            getLetters(aboutMeRef.current, 'resumee-letters');

            document.querySelectorAll('.resumee-letters').forEach((el, id) => {
                el.style.transform = `rotate(${id * 23}deg)`;
            });
        }

        window.innerWidth > 500 ? scroll.on('scroll', handleScroll) : scroll.off('scroll', handleScroll);

        window.onload = handlePageLoading;

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.onload = null;
            scroll.destroy();
        };
    }, []);

    return (
        <>
            <section className="about-section">
                <header className="section-title" data-scroll-section>
                    <h1 ref={myNameRef} id='he-is-juanda'>{"Huỳnh Vĩnh Tiến"}</h1>
                </header>
                <article className="section-content" data-scroll-section>
                    <div className='section-content__container'>
                        <div className='section-content__title'>
                            <h2 ref={aboutMeRef}>
                                - ABOUT ME - ABOUT ME
                            </h2>
                        </div>
                        <div className='content__icon'>
                            <span><img src={Logo} alt="myname" /></span>
                        </div>
                    </div>
                    <div className='section-content__about-me'>
                        <b>
                            <p className='myDescription-text'>
                                Lorem ipsum odor amet, consectetuer adipiscing elit. Tincidunt volutpat nulla habitasse praesent hac nisl posuere non. 
                                Eget quam rutrum ex suscipit ridiculus dapibus; dapibus laoreet potenti. Justo torquent ipsum nisi himenaeos varius interdum quis. 
                                Mattis mus libero; volutpat himenaeos gravida inceptos adipiscing lectus. Cubilia elit efficitur accumsan dapibus velit.
                            </p>
                            <p className='myDescription-text'>
                                Taciti montes ridiculus metus blandit magnis justo facilisis. Vitae neque ullamcorper pulvinar sagittis natoque nullam adipiscing. 
                                Aptent dictumst in etiam pharetra id finibus cursus blandit nostra. Ut placerat quis vivamus viverra duis nec. 
                                Ultrices eros quisque commodo leo, elit fringilla dignissim leo.
                            </p>
                            <p className='myDescription-text'>
                                Accumsan etiam nunc sapien commodo fames. Lectus quisque tincidunt quam turpis dictumst quam. 
                                Accumsan sem suscipit eget vitae tincidunt curae. Amet fusce enim eu torquent vivamus. Tempus sit duis natoque varius facilisi. 
                                Tempus magna inceptos, sem blandit quam phasellus sodales consequat risus.
                            </p>
                            <p className='myDescription-text'>
                                Platea dignissim ipsum lacinia tempor a tincidunt sit? Etiam maximus iaculis morbi lobortis pretium aliquet lectus. 
                                Ligula tempus nulla blandit felis dolor viverra vivamus. Tincidunt taciti nisl nec facilisis maecenas suscipit tincidunt proin. 
                                Venenatis nunc sociosqu egestas ex ad; conubia ad. Habitant condimentum nulla lorem a per scelerisque inceptos. 
                                Sed libero fusce neque dis, vitae dictum proin cursus.
                            </p>
                            <p className='myDescription-text'>
                                Posuere lobortis fusce vivamus ac elementum aliquet fames. Justo ullamcorper nunc aliquam morbi euismod dolor nisi. 
                                Maximus felis massa curabitur vitae per feugiat pulvinar. Parturient arcu non condimentum consequat parturient est dui eros nibh. 
                                Nibh maecenas urna pharetra lacus finibus orci. Magnis ac fusce sollicitudin maecenas platea! Magna orci habitant ultrices nostra nec per. 
                            </p>
                        </b>

                    </div>
                </article>
            </section>
        </>
    );
};

export default About;