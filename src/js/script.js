
window.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.querySelector('.container__btn');
    const modal = document.querySelector('.modal');
    const modalInner = document.querySelector('.modal__window');
    const closeModal = document.querySelector('.modal__close');
    const form = document.querySelector('.modal__form');

    const tablet = document.querySelector('.container__img-tablet');
    const laptop = document.querySelector('.container__img-laptop');
    const phone_1 = document.querySelector('.container__img-phone-1');
    const phone_2 = document.querySelector('.container__img-phone-2');

    const firstContainer = document.querySelector('.container__wrapper-first');
    const secondContainer = document.querySelector('.container__wrapper-second');
    const thirdContainer = document.querySelector('.container__wrapper-third');
    
    openModalBtn.addEventListener('click', () => {
        modal.style.display = "block";
        setTimeout(() => {
            modalInner.classList.add('active');
            modal.classList.add('active');
        }, 0)
    })

    closeModal.addEventListener('click', () => {
        modalInner.classList.remove('active');
        modal.classList.remove('active')
        setTimeout(() => {
            modal.style.display = "none"
        }, 350)
    })

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modalInner.classList.remove('active');
            modal.classList.remove('active')
            setTimeout(() => {
                modal.style.display = "none"
            }, 350)
        }
    })

    init();

    $('[data-phone]').inputmask({
        mask: ["+9 (999) 999 9999","+99 999 999 9999","+999 (999) 999 9999"],
        clearIncomplete: true,
        showMaskOnHover: false,
        showMaskOnFocus: true,
        keepStatic: true
    });

    // form.addEventListener('submit', (e) => {
    //     e.preventDefault();

    //     fetch('/check', {
    //         method: 'POST',
    //         body: new FormData(form)
    //     }).then(res => {

    //     })
    // })

    function init() {
        showElement('.container__wrapper-first .image__wrapper', 'imageMoving');
        showElement('.container__wrapper-second .image__wrapper', 'imageMoving');
        showElement('.container__wrapper-third .image__wrapper', 'imageMoving');

        firstContainer.classList.add('active')
        thirdContainer.classList.remove('active');

        showDescr('.container__wrapper-first .title')
        showSubtitle('.container__wrapper-first .subtitle', 'fadeIn', 'fadeOut', 100)
        showDescr('.container__wrapper-first .descr', 300)
        setTimeout(() => {
            showElement('.container__wrapper-first .image', 'jackInTheBox', 'bounceOut')
        }, 1200)


        setTimeout(() => {
            const images = document.querySelectorAll('.container__wrapper-first .image')
            images.forEach(item => {
                item.classList.add('bounceOut')
                item.classList.remove('jackInTheBox');
            })
        }, 4000)
        hideDescr('.container__wrapper-third .descr', 300)
        hideDescr('.container__wrapper-third .title')
        hideElement('.container__wrapper-third .subtitle', 'fadeOut', 'fadeIn', 100)

        setInterval(() => {
            changeActiveElem();
            changeActiveContainer();
        }, 5000);
    }

    function showElement(selector, firstAnimation, secondAnimation, startInterval = 0) {
        const subtitles = document.querySelectorAll(selector)
        let interval = startInterval;

        subtitles.forEach(item => {
            setTimeout(() => {
                item.classList.add(firstAnimation)
                if (secondAnimation) {
                    item.classList.remove(secondAnimation);
                }
            }, interval)
            interval += 200
        })
    }

    function showSubtitle(selector, firstAnimation, secondAnimation, startInterval = 0) {
        const subtitles = document.querySelectorAll(selector)
        let interval = startInterval;

        subtitles.forEach(item => {
            setTimeout(() => {
                item.classList.add(firstAnimation)
                item.classList.remove(secondAnimation);
            }, interval)
            interval += 100
        })
    }

    function hideElement(selector, firstAnimation, secondAnimation, startInterval = 0) {
        const subtitles = document.querySelectorAll(selector)
        let interval = startInterval;

        subtitles.forEach(item => {
            setTimeout(() => {
                item.classList.add(firstAnimation)
                item.classList.remove(secondAnimation);
            }, interval)
            interval += 200
        })
    }

    function showDescr(selector, interval = 0) {
        const item = document.querySelector(selector)

        setTimeout(() => {
            item.classList.add('fadeIn')
            item.classList.remove('fadeOut');
        }, interval)
    }

    function hideDescr(selector, interval = 0) {
        const item = document.querySelector(selector)

        setTimeout(() => {
            item.classList.add('fadeOut')
            item.classList.remove('fadeIn');
        }, interval)
    }

    function changeActiveContainer() {
        if (laptop.classList.contains('active')) {
            firstContainer.classList.add('active')
            thirdContainer.classList.remove('active');

            showDescr('.container__wrapper-first .title')
            showSubtitle('.container__wrapper-first .subtitle', 'fadeIn', 'fadeOut', 100)
            showDescr('.container__wrapper-first .descr', 300)
            setTimeout(() => {
                showElement('.container__wrapper-first .image', 'jackInTheBox', 'bounceOut')
            }, 1200)


            setTimeout(() => {
                const images = document.querySelectorAll('.container__wrapper-first .image')
                images.forEach(item => {
                    item.classList.add('bounceOut')
                    item.classList.remove('jackInTheBox');
                })
            }, 4000)
            hideDescr('.container__wrapper-third .descr', 300)
            hideDescr('.container__wrapper-third .title')
            hideElement('.container__wrapper-third .subtitle', 'fadeOut', 'fadeIn', 100)

        } else if (tablet.classList.contains('active')) {
            secondContainer.classList.add('active')
            firstContainer.classList.remove('active')

            showDescr('.container__wrapper-second .descr', 300)
            showDescr('.container__wrapper-second .title')
            showSubtitle('.container__wrapper-second .subtitle', 'fadeIn', 'fadeOut', 100)

            setTimeout(() => {
                showElement('.container__wrapper-second .image', 'jackInTheBox', 'fadeOutLeft');
            }, 1000)

            setTimeout(() => {
                const images = document.querySelectorAll('.container__wrapper-second .image')
                images.forEach(item => {
                    item.classList.add('bounceOut')
                    item.classList.remove('jackInTheBox');
                })
            }, 4000)

            hideDescr('.container__wrapper-first .descr', 300)
            hideDescr('.container__wrapper-first .title')
            hideElement('.container__wrapper-first .subtitle', 'fadeOut', 'fadeIn', 100)

        } else if (phone_1.classList.contains('active')) {
            thirdContainer.classList.add('active')
            secondContainer.classList.remove('active')

            showDescr('.container__wrapper-third .descr', 300)
            showDescr('.container__wrapper-third .title')
            showSubtitle('.container__wrapper-third .subtitle', 'fadeIn', 'fadeOut', 100)

            setTimeout(() => {
                showElement('.container__wrapper-third .image', 'jackInTheBox', 'fadeOutLeft');
                showElement('.container__wrapper-third .image__wrapper', 'imageMoving')
            }, 1000)

            setTimeout(() => {
                const images = document.querySelectorAll('.container__wrapper-third .image')
                images.forEach(item => {
                    item.classList.add('bounceOut')
                    item.classList.remove('jackInTheBox');
                })
            }, 4000)
            
            hideDescr('.container__wrapper-second .descr', 300)
            hideDescr('.container__wrapper-second .title')
            hideElement('.container__wrapper-second .subtitle', 'fadeOut', 'fadeIn', 100)
        }
    }

    function changeActiveElem() {
        if (laptop.classList.contains('active')) {
            /////make tablet container active
            laptop.classList.remove('active');
            laptop.classList.add('left')
            firstContainer.classList.remove('active');

            tablet.classList.remove('right')
            tablet.classList.add('active')
            secondContainer.classList.add('active')

            phone_1.classList.remove('left')
            phone_1.classList.add('right')

            phone_2.classList.remove('left')
            phone_2.classList.add('right')
        } else if (tablet.classList.contains('active')) {
            /////make phone container active
            tablet.classList.remove('active');
            tablet.classList.add('left')
            secondContainer.classList.remove('active')

            phone_1.classList.remove('right')
            phone_1.classList.add('active')
            thirdContainer.classList.add('active')

            phone_2.classList.remove('right')
            phone_2.classList.add('active')

            laptop.classList.remove('left')
            laptop.classList.add('right')
        } else if (phone_1.classList.contains('active')) {
            ///// make laptop container active
            phone_1.classList.remove('active')
            phone_1.classList.add('left')
            
            phone_2.classList.remove('active')
            phone_2.classList.add('left')
            thirdContainer.classList.remove('active')

            laptop.classList.add('active');
            laptop.classList.remove('right')
            firstContainer.classList.add('active')

            tablet.classList.remove('left')
            tablet.classList.add('right')
        }
    }

    // $('.container__carousel').slick({
    //     centerMode: true,
    //     slidesToShow: 1,
    //     arrows: false,
    //     autoplay: true,
    //     autoplaySpeed: 5000,
    //     draggable: false,
    //     pauseOnFocus: false,
    //     pauseOnHover: false
    // });
})
