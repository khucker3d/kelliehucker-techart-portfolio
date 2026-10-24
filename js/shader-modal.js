/* =========================================================
   UNITY SHADER MODAL
   Opens shader project details, loads optional video content,
   and restores page state when the modal closes.
   ========================================================= */

const shaderCards = document.querySelectorAll(".shader-card");
const shaderModal = document.getElementById("shader-modal");
const shaderModalVideo = document.getElementById("shader-modal-video");
const shaderModalTitle = document.getElementById("shader-modal-title");
const shaderModalDescription = document.getElementById("shader-modal-description");
const shaderModalClose = document.getElementById("shader-modal-close");

/* =========================================================
   OPEN MODAL
   ========================================================= */

function openShaderModal(card) {
    const videoSource = card.dataset.video;
    const shaderTitle =
        card.dataset.title ||
        card.querySelector("h3")?.textContent.trim() ||
        "Shader Project";

    const descriptionID = card.dataset.description;
    const descriptionTemplate = descriptionID
        ? document.getElementById(descriptionID)
        : null;

    /* Load the project video only when the card provides one. */
    if (videoSource) {
        shaderModalVideo.src = videoSource;
        shaderModalVideo.hidden = false;
    } else {
        shaderModalVideo.pause();
        shaderModalVideo.removeAttribute("src");
        shaderModalVideo.hidden = true;
    }

    /* Copy the card title and reusable description template into the modal. */
    shaderModalTitle.textContent = shaderTitle;
    shaderModalDescription.innerHTML = descriptionTemplate
        ? descriptionTemplate.innerHTML
        : "";

    shaderModal.classList.add("is-open");
    shaderModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

/* =========================================================
   CLOSE MODAL
   ========================================================= */

function closeShaderModal() {
    shaderModalVideo.pause();
    shaderModalVideo.removeAttribute("src");
    shaderModalVideo.load();

    shaderModal.classList.remove("is-open");
    shaderModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

/* =========================================================
   EVENT HANDLERS
   ========================================================= */

shaderCards.forEach((card) => {
    card.addEventListener("click", () => {
        openShaderModal(card);
    });
});

shaderModalClose.addEventListener("click", closeShaderModal);

shaderModal.addEventListener("click", (event) => {
    if (event.target === shaderModal) {
        closeShaderModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        shaderModal.classList.contains("is-open")
    ) {
        closeShaderModal();
    }
});
