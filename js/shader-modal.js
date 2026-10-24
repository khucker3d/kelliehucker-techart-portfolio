const shaderCards = document.querySelectorAll(".shader-card");

const shaderModal = document.getElementById("shader-modal");
const shaderModalVideo = document.getElementById("shader-modal-video");
const shaderModalTitle = document.getElementById("shader-modal-title");
const shaderModalDescription = document.getElementById("shader-modal-description");
const shaderModalClose = document.getElementById("shader-modal-close");

const galleryPreview = document.getElementById("shader-gallery-preview");
const galleryNextButton = document.getElementById("shader-gallery-next");
const galleryNextImage = document.getElementById("shader-gallery-next-image");
const galleryRange = document.getElementById("shader-gallery-range");
const galleryLabel = document.getElementById("shader-gallery-label");

let galleryImages = [];
let galleryIndex = 0;

/* =========================================================
   GALLERY
   ========================================================= */

function updateGalleryPreview() {
    if (!galleryPreview || galleryImages.length < 2) {
        if (galleryPreview) {
            galleryPreview.hidden = true;
        }

        return;
    }

    galleryPreview.hidden = false;

    const nextIndex = (galleryIndex + 1) % galleryImages.length;

    galleryNextImage.src = galleryImages[nextIndex];
    galleryNextImage.alt = `Preview image ${nextIndex + 1}`;

    galleryRange.max = String(galleryImages.length - 1);
    galleryRange.value = String(galleryIndex);

    galleryLabel.textContent =
        `Image ${galleryIndex + 1} of ${galleryImages.length} • next preview`;
}


function setGalleryIndex(index) {
    if (!galleryImages.length) {
        return;
    }

    galleryIndex =
        (index + galleryImages.length) % galleryImages.length;

    updateGalleryPreview();
}

/* =========================================================
   OPEN SHADER MODAL
   ========================================================= */

shaderCards.forEach((card) => {
    card.addEventListener("click", () => {

        const videoSource = card.dataset.video;

        const shaderTitle =
            card.dataset.title ||
            card.querySelector("h3")?.textContent.trim() ||
            "Shader Project";

        const descriptionID = card.dataset.description;

        const descriptionTemplate =
            descriptionID
                ? document.getElementById(descriptionID)
                : null;


        /* -----------------------------------------
           VIDEO
           ----------------------------------------- */

        if (videoSource) {
            shaderModalVideo.src = videoSource;
            shaderModalVideo.hidden = false;
        } else {
            shaderModalVideo.pause();
            shaderModalVideo.removeAttribute("src");
            shaderModalVideo.hidden = true;
        }


        /* -----------------------------------------
           TITLE + DESCRIPTION
           ----------------------------------------- */

        shaderModalTitle.textContent = shaderTitle;

        shaderModalDescription.innerHTML =
            descriptionTemplate
                ? descriptionTemplate.innerHTML
                : "";


        /* -----------------------------------------
           IMAGE GALLERY
           ----------------------------------------- */

        galleryImages =
            (card.dataset.images || "")
                .split(",")
                .map((value) => value.trim())
                .filter(Boolean);

        galleryIndex = 0;

        updateGalleryPreview();


        /* -----------------------------------------
           OPEN MODAL
           ----------------------------------------- */

        shaderModal.classList.add("is-open");
        shaderModal.setAttribute("aria-hidden", "false");

        document.body.classList.add("shader-modal-open");
        document.body.style.overflow = "hidden";

        shaderModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";
    });
});


/* =========================================================
   GALLERY CONTROLS
   ========================================================= */

if (galleryNextButton) {
    galleryNextButton.addEventListener(
        "click",
        () => {
            setGalleryIndex(galleryIndex + 1);
        }
    );
}


if (galleryRange) {
    galleryRange.addEventListener(
        "input",
        (event) => {
            setGalleryIndex(
                Number(event.target.value)
            );
        }
    );
}


/* =========================================================
   CLOSE SHADER MODAL
   ========================================================= */

function closeShaderModal() {
    shaderModalVideo.pause();
    shaderModalVideo.removeAttribute("src");
    shaderModalVideo.load();

    shaderModal.classList.remove("is-open");
    shaderModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("shader-modal-open");
    document.body.style.overflow = "";
}


/* =========================================================
   MODAL EVENTS
   ========================================================= */

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
        if (
            event.key === "Escape" &&
            shaderModal.classList.contains("is-open")
        ) {
            closeShaderModal();
        }
    }
);