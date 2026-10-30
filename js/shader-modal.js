/* =========================================================
   UNITY SHADER MODAL
   Opens shader project details, loads optional video content,
   image carousel content, and restores page state when closed.
   ========================================================= */

const shaderCards = document.querySelectorAll(".shader-card");

const shaderModal = document.getElementById("shader-modal");
const shaderModalVideo = document.getElementById("shader-modal-video");
const shaderModalTitle = document.getElementById("shader-modal-title");
const shaderModalDescription = document.getElementById("shader-modal-description");
const shaderModalClose = document.getElementById("shader-modal-close");

/* Carousel elements */
const shaderGalleryImage = document.getElementById("shader-gallery-image");
const shaderGalleryCurrent = document.getElementById("shader-gallery-current");
const shaderGalleryTotal = document.getElementById("shader-gallery-total");
const shaderGalleryPrev = document.querySelector(".shader-gallery-prev");
const shaderGalleryNext = document.querySelector(".shader-gallery-next");

let shaderGalleryImages = [];
let shaderGalleryIndex = 0;

const shaderGallery = document.querySelector(".shader-gallery");


/* =========================================================
   UPDATE IMAGE CAROUSEL
   ========================================================= */
function updateShaderGallery() {
    if (shaderGalleryImages.length === 0) {
        shaderGallery.hidden = true;
        shaderGalleryCurrent.textContent = "0";
        shaderGalleryTotal.textContent = "0";
        return;
    }

    shaderGallery.hidden = false;

    shaderGalleryImage.src = shaderGalleryImages[shaderGalleryIndex];

    shaderGalleryCurrent.textContent = shaderGalleryIndex + 1;
    shaderGalleryTotal.textContent = shaderGalleryImages.length;

    const hasMultipleImages = shaderGalleryImages.length > 1;

    shaderGalleryPrev.hidden = !hasMultipleImages;
    shaderGalleryNext.hidden = !hasMultipleImages;
}


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


    /* ---------------------------------------------------------
       Load project video
       --------------------------------------------------------- */
    if (videoSource) {
        shaderModalVideo.src = videoSource;
        shaderModalVideo.hidden = false;
    } else {
        shaderModalVideo.pause();
        shaderModalVideo.removeAttribute("src");
        shaderModalVideo.hidden = true;
    }


    /* ---------------------------------------------------------
       Load project image carousel
       --------------------------------------------------------- */
    const galleryImages = card.dataset.images;

    shaderGalleryImages = galleryImages
        ? galleryImages.split(",").map((image) => image.trim())
        : [];

    shaderGalleryIndex = 0;
    updateShaderGallery();


    /* ---------------------------------------------------------
       Load title and description
       --------------------------------------------------------- */
    shaderModalTitle.textContent = shaderTitle;

    shaderModalDescription.innerHTML = descriptionTemplate
        ? descriptionTemplate.innerHTML
        : "";

    /* ---------------------------------------------------------
       Open modal
       --------------------------------------------------------- */
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

    shaderGalleryImages = [];
    shaderGalleryIndex = 0;

    shaderGalleryImage.removeAttribute("src");

    shaderModal.classList.remove("is-open");
    shaderModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}


/* =========================================================
   CAROUSEL CONTROLS
   ========================================================= */
shaderGalleryNext.addEventListener("click", () => {
    if (shaderGalleryImages.length === 0) {
        return;
    }

    shaderGalleryIndex =
        (shaderGalleryIndex + 1) % shaderGalleryImages.length;

    updateShaderGallery();
});


shaderGalleryPrev.addEventListener("click", () => {
    if (shaderGalleryImages.length === 0) {
        return;
    }

    shaderGalleryIndex =
        (shaderGalleryIndex - 1 + shaderGalleryImages.length) %
        shaderGalleryImages.length;

    updateShaderGallery();
});


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