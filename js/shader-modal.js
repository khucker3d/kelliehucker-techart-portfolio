const shaderCards =
    document.querySelectorAll(".shader-card");

const shaderModal =
    document.getElementById("shader-modal");

const shaderModalVideo =
    document.getElementById("shader-modal-video");

const shaderModalTitle =
    document.getElementById("shader-modal-title");

const shaderModalDescription =
    document.getElementById("shader-modal-description");

const shaderModalClose =
    document.getElementById("shader-modal-close");


shaderCards.forEach((card) => {

    card.addEventListener("click", () => {

        const videoSource =
            card.dataset.video;

        const shaderTitle =
            card.dataset.title;

        const descriptionID =
            card.dataset.description;

        const descriptionTemplate =
            document.getElementById(descriptionID);


        shaderModalVideo.src =
            videoSource;

        shaderModalTitle.textContent =
            shaderTitle;


        /* Load the formatted description */
        if (descriptionTemplate) {

            shaderModalDescription.innerHTML =
                descriptionTemplate.innerHTML;

        } else {

            shaderModalDescription.innerHTML =
                "";

        }


        shaderModal.classList.add("is-open");

        shaderModal.setAttribute(
            "aria-hidden",
            "false"
        );

    });

});


function closeShaderModal() {

    shaderModalVideo.pause();

    shaderModalVideo.removeAttribute("src");

    shaderModalVideo.load();

    shaderModal.classList.remove("is-open");

    shaderModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


shaderModalClose.addEventListener(
    "click",
    closeShaderModal
);


shaderModal.addEventListener(
    "click",
    (event) => {

        if (event.target === shaderModal) {

            closeShaderModal();

        }

    }
);


document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            closeShaderModal();

        }

    }
);