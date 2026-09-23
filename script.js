/* ========================================
   ALKING PORTFOLIO
   PROJECT + MEDIA SYSTEM
======================================== */

document.addEventListener("DOMContentLoaded", () => {
  const projectGrid = document.getElementById("projectGrid");

  const modal = document.getElementById("modal");
  const modalMedia = document.getElementById("modalMedia");
  const modalTag = document.getElementById("modalTag");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalFeatures = document.getElementById("modalFeatures");
  const modalDownload = document.getElementById("modalDownload");
  const modalClose = document.querySelector(".modal-close");
  const modalBackdrop = document.querySelector(".modal-backdrop");

  let currentProject = null;
  let currentImageIndex = 0;

  /* ========================================
     YOUTUBE
  ======================================== */

  function getYouTubeId(url) {
    if (!url) return null;

    try {
      const parsed = new URL(url);
      const host = parsed.hostname.toLowerCase();

      if (host === "youtu.be") {
        return parsed.pathname.replace(/^\/+/, "").split("/")[0] || null;
      }

      if (host.includes("youtube.com")) {
        const watchId = parsed.searchParams.get("v");
        if (watchId) return watchId;

        const parts = parsed.pathname.split("/").filter(Boolean);

        if (parts[0] === "shorts" && parts[1]) return parts[1];
        if (parts[0] === "embed" && parts[1]) return parts[1];
        if (parts[0] === "live" && parts[1]) return parts[1];
      }
    } catch (error) {
      console.warn("Invalid YouTube URL:", url);
    }

    return null;
  }

  function createYouTube(url) {
    const videoId = getYouTubeId(url);

    if (!videoId) {
      const error = document.createElement("div");
      error.className = "media-error";
      error.textContent = "رابط YouTube غير صالح.";
      return error;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "video-wrapper";

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?rel=0`;
    iframe.title = "YouTube video";
    iframe.loading = "lazy";
    iframe.frameBorder = "0";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;

    wrapper.appendChild(iframe);
    return wrapper;
  }

  /* ========================================
     LOCAL / DIRECT VIDEO
  ======================================== */

  function createLocalVideo(url) {
    const wrapper = document.createElement("div");
    wrapper.className = "video-wrapper";

    const video = document.createElement("video");
    video.src = url;
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";

    wrapper.appendChild(video);
    return wrapper;
  }

  /* ========================================
     IMAGE
  ======================================== */

  function createImage(url) {
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Project image";
    img.loading = "lazy";

    img.onerror = () => {
      if (!img.src.endsWith("project-placeholder.svg")) {
        img.src = "assets/images/project-placeholder.svg";
      }
    };

    return img;
  }

  /* ========================================
     MEDIA TYPE DETECTION
  ======================================== */

  function getMediaType(project) {
    if (project.type) return project.type;

    if (Array.isArray(project.images) && project.images.length) {
      return "images";
    }

    if (project.image) {
      return "image";
    }

    if (project.video) {
      const id = getYouTubeId(project.video);
      return id ? "youtube" : "mp4";
    }

    return "image";
  }

  /* ========================================
     CARD MEDIA
  ======================================== */

  function createCardMedia(project) {
    const media = document.createElement("div");
    media.className = "project-media-card";

    const type = getMediaType(project);

    if (type === "images" && project.images?.length) {
      media.appendChild(createImage(project.images[0]));
      return media;
    }

    if (type === "image" && project.image) {
      media.appendChild(createImage(project.image));
      return media;
    }

    if ((type === "youtube" || type === "video") && project.video) {
      const videoId = getYouTubeId(project.video);

      if (videoId) {
        const thumb = document.createElement("div");
        thumb.className = "youtube-thumbnail";

        const img = document.createElement("img");
        img.src = `https://img.youtube.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg`;
        img.alt = `${project.title} video`;
        img.loading = "lazy";

        const play = document.createElement("span");
        play.className = "video-play";
        play.textContent = "▶";

        thumb.appendChild(img);
        thumb.appendChild(play);
        media.appendChild(thumb);
      } else {
        media.appendChild(createLocalVideo(project.video));
      }

      return media;
    }

    if (type === "mp4" && project.video) {
      media.appendChild(createLocalVideo(project.video));
      return media;
    }

    media.appendChild(createImage("assets/images/project-placeholder.svg"));
    return media;
  }

  /* ========================================
     MODAL MEDIA
  ======================================== */

  function renderModalMedia() {
    if (!modalMedia || !currentProject) return;

    modalMedia.innerHTML = "";

    const type = getMediaType(currentProject);

    if (type === "images" && currentProject.images?.length) {
      const imageBox = document.createElement("div");
      imageBox.className = "modal-image-box";

      const img = createImage(
        currentProject.images[currentImageIndex]
      );

      imageBox.appendChild(img);

      if (currentProject.images.length > 1) {
        const gallery = document.createElement("div");
        gallery.className = "modal-gallery";

        const previous = document.createElement("button");
        previous.type = "button";
        previous.className = "gallery-btn";
        previous.setAttribute("aria-label", "الصورة السابقة");
        previous.textContent = "‹";

        const counter = document.createElement("span");
        counter.className = "gallery-counter";
        counter.textContent =
          `${currentImageIndex + 1} / ${currentProject.images.length}`;

        const next = document.createElement("button");
        next.type = "button";
        next.className = "gallery-btn";
        next.setAttribute("aria-label", "الصورة التالية");
        next.textContent = "›";

        previous.addEventListener("click", (event) => {
          event.stopPropagation();
          currentImageIndex =
            (currentImageIndex - 1 + currentProject.images.length) %
            currentProject.images.length;
          renderModalMedia();
        });

        next.addEventListener("click", (event) => {
          event.stopPropagation();
          currentImageIndex =
            (currentImageIndex + 1) %
            currentProject.images.length;
          renderModalMedia();
        });

        gallery.appendChild(previous);
        gallery.appendChild(counter);
        gallery.appendChild(next);
        imageBox.appendChild(gallery);
      }

      modalMedia.appendChild(imageBox);
      return;
    }

    if (type === "image" && currentProject.image) {
      const imageBox = document.createElement("div");
      imageBox.className = "modal-image-box";
      imageBox.appendChild(createImage(currentProject.image));
      modalMedia.appendChild(imageBox);
      return;
    }

    if ((type === "youtube" || type === "video") && currentProject.video) {
      modalMedia.appendChild(createYouTube(currentProject.video));
      return;
    }

    if (type === "mp4" && currentProject.video) {
      modalMedia.appendChild(createLocalVideo(currentProject.video));
      return;
    }

    modalMedia.appendChild(
      createImage("assets/images/project-placeholder.svg")
    );
  }

  /* ========================================
     PROJECT CARD
  ======================================== */

  function createProjectCard(project) {
    const card = document.createElement("article");
    card.className = "project-card reveal";

    const media = createCardMedia(project);
    card.appendChild(media);

    const info = document.createElement("div");
    info.className = "project-info";

    const meta = document.createElement("div");
    meta.className = "project-meta";

    const category = document.createElement("span");
    category.textContent = project.category || "Project";

    const version = document.createElement("small");
    version.textContent = project.version || "";

    meta.appendChild(category);
    meta.appendChild(version);

    const title = document.createElement("h3");
    title.textContent = project.title || "Untitled Project";

    const description = document.createElement("p");
    description.textContent = project.description || "";

    const chips = document.createElement("div");
    chips.className = "chips";

    (project.features || []).forEach((feature) => {
      const chip = document.createElement("span");
      chip.textContent = feature;
      chips.appendChild(chip);
    });

    info.appendChild(meta);
    info.appendChild(title);
    info.appendChild(description);
    info.appendChild(chips);

    card.appendChild(info);

    card.addEventListener("click", () => openProject(project));

    return card;
  }

  /* ========================================
     RENDER
  ======================================== */

  function renderProjects() {
    if (!projectGrid) {
      console.error('AlKing: لم يتم العثور على عنصر #projectGrid');
      return;
    }

    projectGrid.innerHTML = "";

    projects.forEach((project) => {
      projectGrid.appendChild(createProjectCard(project));
    });

    initReveal(projectGrid);
  }

  /* ========================================
     OPEN / CLOSE MODAL
  ======================================== */

  function openProject(project) {
    currentProject = project;
    currentImageIndex = 0;

    if (modalTag) {
      modalTag.textContent =
        `${project.category || "Project"} · ${project.version || ""}`;
    }

    if (modalTitle) {
      modalTitle.textContent = project.title || "";
    }

    if (modalDescription) {
      modalDescription.textContent = project.description || "";
    }

    if (modalFeatures) {
      modalFeatures.innerHTML = "";

      (project.features || []).forEach((feature) => {
        const tag = document.createElement("span");
        tag.textContent = feature;
        modalFeatures.appendChild(tag);
      });
    }

    if (modalDownload) {
      const validDownload =
        project.download &&
        project.download !== "#";

      modalDownload.style.display =
        validDownload ? "inline-flex" : "none";

      if (validDownload) {
        modalDownload.href = project.download;
      }
    }

    renderModalMedia();

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (modalMedia) {
      modalMedia.innerHTML = "";
    }

    currentProject = null;
  }

  modalClose?.addEventListener("click", closeModal);
  modalBackdrop?.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (!currentProject) return;

    if (event.key === "Escape") {
      closeModal();
      return;
    }

    if (
      currentProject.type === "images" &&
      currentProject.images?.length > 1
    ) {
      if (event.key === "ArrowRight") {
        currentImageIndex =
          (currentImageIndex + 1) % currentProject.images.length;
        renderModalMedia();
      }

      if (event.key === "ArrowLeft") {
        currentImageIndex =
          (currentImageIndex - 1 + currentProject.images.length) %
          currentProject.images.length;
        renderModalMedia();
      }
    }
  });

  /* ========================================
     MOBILE MENU
  ======================================== */

  const menuButton = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");

  menuButton?.addEventListener("click", () => {
    nav?.classList.toggle("open");
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });

  /* ========================================
     REVEAL
  ======================================== */

  function initReveal(scope = document) {
    const elements = scope.querySelectorAll(".reveal:not(.reveal-ready)");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target.classList.add("reveal-ready");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    elements.forEach((el) => observer.observe(el));
  }
const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  renderProjects();
  initReveal();
});
