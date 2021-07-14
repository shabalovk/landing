
window.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.querySelector('.container__btn');
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.modal__close');
    
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
