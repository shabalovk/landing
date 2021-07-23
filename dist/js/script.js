
window.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.querySelector('.container__btn');
    const modal = document.querySelector('.modal');
    const modalInner = document.querySelector('.modal__window');
    const form = document.querySelector('.modal__form');
    const formBtn = document.querySelector('.modal__footer-btn');
    const modalThanks = document.querySelector('.modal__thanks')

    const tablet = document.querySelector('.container__img-tablet');
    const laptop = document.querySelector('.container__img-laptop');
    const phone_1 = document.querySelector('.container__img-phone-1');
    const phone_2 = document.querySelector('.container__img-phone-2');

    const firstContainer = document.querySelector('.container__wrapper-first');
    const secondContainer = document.querySelector('.container__wrapper-second');
    const thirdContainer = document.querySelector('.container__wrapper-third');
    
    const inputColl = document.querySelectorAll('[data-form]');

    openModalBtn.addEventListener('click', () => {
        renderFormModal();
    })

    function renderFormModal() {
        let modal = $('.modal.template').clone();
        modal.removeClass('template');
        modal.addClass('form');

        $('body').prepend(modal);

        modal.css('display', 'block')
        setTimeout(() => {
            modal.addClass('active')
            $('.modal.form .modal__window').addClass('active')
        }, 20)

        let modalForm = $('.modal__form-wrapper.template').clone();
        modalForm.removeClass('template');

        
        $('.modal.form .modal__body').html(modalForm);
    }

    function closeModal(elem) {
        let modal = $(elem).closest('.modal');

        if (modal) {
            modal.animate({
                opacity: 0
            }, 50, () => {
                modal.remove();
            });
        }
    }

    $('body').on('click', '.modal__close', function (e) {
        closeModal(this)
    });

    $('body').on('click', '.modal', function (e) {
        let modal = this.closest('.modal');
        if (e.target === modal) {
            closeModal(this)
        }
    });

    $('body').on('submit', '.modal__form', function (e) {
        e.preventDefault();
        submitForm()
    });

    // modal.addEventListener('click', (e) => {
    //     if (e.target === modal) {
    //         modalInner.classList.remove('active');
    //         modal.classList.remove('active')
    //         setTimeout(() => {
    //             modal.style.display = "none"
    //         }, 350)
    //     }
    // })

    init();

    $('[data-form="phone"]').inputmask({
        mask: ["+9 (999) 999 9999","+99 999 999 9999","+999 (999) 999 9999"],
        showMaskOnHover: false,
        showMaskOnFocus: true,
        keepStatic: true
    });

    inputColl.forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/[а-яА-ЯЁё-і]/g, '');
            e.target.value = value
        })
    })

    function submitForm(e) {
        e.preventDefault();
        let validationErr = 0

        modalThanks.classList.remove('active')

        inputColl.forEach(input => {
            input.classList.remove('validation__input');
            input.nextElementSibling.classList.remove('active')

            currentInputName = input.getAttribute('data-form');

            if (currentInputName === "password") {
                if (input.value.length < 6) {
                    const span = input.nextElementSibling;
                    span.textContent = 'Минимальная длина пароля 6 символов';
                    span.classList.add('active')
                    input.classList.add('validation__input')

                    validationErr++
                }
            }
            if (currentInputName === "password-repeat") {
                if (input.value !== document.querySelector('[data-form="password"]').value) {
                    const span = input.nextElementSibling;
                    span.textContent = 'Пароли не совпадают';
                    span.classList.add('active')
                    input.classList.add('validation__input')

                    validationErr++
                }
            }
            if (currentInputName === "phone" && input.value.replace(/\D+/g,"").length > 0) {
                console.log(true);

                if (input.value.replace(/\D+/g,"").length < 11) {
                    const span = input.nextElementSibling;
                    span.textContent = 'Минимальная длина номера телефона 11 символов';
                    span.classList.add('active')
                    input.classList.add('validation__input')

                    validationErr++
                }
                if (input.value.replace(/\D+/g,"").length > 13) {
                    const span = input.nextElementSibling;
                    span.textContent = 'Максимальная длина номера телефона 13 символов';
                    span.classList.add('active')
                    input.classList.add('validation__input')

                    validationErr++
                }
            }
        })

        if (validationErr !== 0) {
            return
        } 

        formBtn.setAttribute('disabled', 'true');
        formBtn.classList.add('disabled');

        const dataObj = {
            email: document.querySelector('[data-form="email"]').value,
            password: document.querySelector('[data-form="password"]').value,
            phone: document.querySelector('[data-form="phone"]').value.replace(/\D+/g,""),
        }

        fetch('/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(dataObj)
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(res => {
            modalThanks.classList.add('active')
            inputColl.forEach(input => {
                input.value = ''
            })
        }).finally(res => {
            formBtn.removeAttribute('disabled');
            formBtn.classList.remove('disabled');
        })
    }

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
        hideDescr('.container__wrapper-third .descr', 400)
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
            hideDescr('.container__wrapper-third .descr', 400)
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

            hideDescr('.container__wrapper-first .descr', 400)
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
            
            hideDescr('.container__wrapper-second .descr', 400)
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
})
