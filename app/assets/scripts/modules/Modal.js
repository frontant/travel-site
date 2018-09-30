import $ from "jquery";

class Modal{
    constructor(){
        this.openModalButton = $(".open-modal");
        this.modal = $(".modal");
        this.closeModalButton = $(".modal__close");

        this.events();
    }

    events(){
        // clicking the open modal button
        this.openModalButton.on("click", this.openModal.bind(this));

        // clicking the close modal button
        this.closeModalButton.on("click", this.closeModal.bind(this));

        // escape keypress
        $(document).keyup(this.keypressDispatcher.bind(this));
    }

    openModal(){
        this.modal.addClass("modal--is-visible");
        $("html").css("overflow-y", "hidden");
        return false;
    }

    closeModal(){
        this.modal.removeClass("modal--is-visible");
        $("html").css("overflow-y", "auto");
    }

    keypressDispatcher(e){
        if(e.keyCode === 27){
            this.closeModal();
        }
    }
}

export default Modal;