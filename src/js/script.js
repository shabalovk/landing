
window.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.querySelector('.container__btn');
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.modal__close');

    const tablet = document.querySelector('.container__img-tablet');
    const laptop = document.querySelector('.container__img-laptop');
    const phone_1 = document.querySelector('.container__img-phone-1');
    const phone_2 = document.querySelector('.container__img-phone-2');

    const firstContainer = document.querySelector('.container__wrapper-first');
    const secondContainer = document.querySelector('.container__wrapper-second');
    const thirdContainer = document.querySelector('.container__wrapper-third');

    const subtitle = document.querySelector('.subtitle')

    console.log(document.querySelector('.container__wrapper-first .subtitle'));
    
    openModalBtn.addEventListener('click', () => {
        modal.classList.add('active')
    })

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active')
    })

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active')
        }
    })

    setInterval(() => {
        changeActiveElem();
        changeActiveContainer();
    }, 2000);

    function showElement(selector, startInterval = 0) {
        const subtitles = document.querySelectorAll(selector)
        let interval = startInterval;

        subtitles.forEach(item => {
            setTimeout(() => {
                item.classList.add('animate__fadeInRight')
                item.classList.remove('animate__fadeOutLeft');
            }, interval)
            interval += 200
        })
    }

    function hideElement(selector, startInterval = 0) {
        const subtitles = document.querySelectorAll(selector)
        let interval = startInterval;

        subtitles.forEach(item => {
            setTimeout(() => {
                item.classList.add('animate__fadeOutLeft')
                item.classList.remove('animate__fadeInRight');
            }, interval)
            interval += 200
        })
    }

    function changeActiveContainer() {
        if (laptop.classList.contains('active')) {
            firstContainer.classList.add('active')
            thirdContainer.classList.remove('active');
            
            showElement('.container__wrapper-first .title')
            showElement('.container__wrapper-first .subtitle', 200)
            hideElement('.container__wrapper-third .title')
            hideElement('.container__wrapper-third .subtitle', 200)

        } else if (tablet.classList.contains('active')) {

            showElement('.container__wrapper-second .title')
            showElement('.container__wrapper-second .subtitle', 200)
            hideElement('.container__wrapper-first .title')
            hideElement('.container__wrapper-first .subtitle', 200)

        } else if (phone_1.classList.contains('active')) {
            thirdContainer.classList.add('active')
            secondContainer.classList.remove('active')

            showElement('.container__wrapper-third .title')
            showElement('.container__wrapper-third .subtitle', 200)
            hideElement('.container__wrapper-second .title')
            hideElement('.container__wrapper-second .subtitle', 200)
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
