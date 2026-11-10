// Homepage-only interactions, kept separate from shared site behavior.

// Product gallery and manufacturing process interactions.
(() => {
            const $ = s => document.querySelector(s);

            /* ---------- 3-row continuous products showcase ---------- */
            // =========================================================================
            // PRODUCTS SHOWCASE DATA
            // -------------------------------------------------------------------------
            // Aap aasani se naye products yahan add kar sakte hain:
            // Bas neeche diye format me new object add karein:
            // {
            //     title: "Product Name",
            //     material: "Material / Type (e.g. NBR, EPDM, Silicone)",
            //     image: "images/products/filename.jpg",
            //     cat: "category-id (e.g. rubber-gaskets, rubber-bushes)"
            // }
            // Yahan add kiya hua koi bhi product automatically 3 rows me divide hokar
            // infinite smooth motion me glide karne lagega!
            // =========================================================================
            const productsData = [
                // Product 1
                {
                    title: "Cylinder Head Gaskets",
                    material: "NBR / Graphite",
                    image: "images/products/gaskets.jpg",
                    cat: "rubber-gaskets"
                },
                // Product 2
                {
                    title: "Suspension Bushing",
                    material: "Rubber-to-Metal",
                    image: "images/products/bush.jpg",
                    cat: "rubber-bushes"
                },
                // Product 3
                {
                    title: "Formed Coolant Hoses",
                    material: "Reinforced Silicone",
                    image: "images/products/silicone-hoses.jpg",
                    cat: "extruded-profiles"
                },
                // Product 4
                {
                    title: "High-Temp O-Rings",
                    material: "Viton / FKM",
                    image: "images/products/o-rings.jpg",
                    cat: "o-rings-seal-kits"
                },
                // Product 5
                {
                    title: "Dust Boot Covers",
                    material: "Neoprene Rubber",
                    image: "images/dust-cover.jpg",
                    cat: "moulded-components"
                },
                // Product 6
                {
                    title: "Engine Mount Dampers",
                    material: "Natural Rubber",
                    image: "images/products/rubber-mounts.jpg",
                    cat: "rubber-bushes"
                },
                // Product 7
                {
                    title: "Rotary Shaft Oil Seals",
                    material: "HNBR / Steel",
                    image: "images/oil-seal.jpg",
                    cat: "oil-packing-seals"
                },
                // Product 8
                {
                    title: "Extruded Sealing Profiles",
                    material: "EPDM Rubber",
                    image: "images/products/rubber-profiles.jpg",
                    cat: "extruded-profiles"
                },
                // Product 9
                {
                    title: "Industrial Flange Gaskets",
                    material: "Silicone Elastomer",
                    image: "images/gasket.jpg",
                    cat: "rubber-gaskets"
                },
                // Product 10
                {
                    title: "Custom Moulded Parts",
                    material: "Custom Polymer",
                    image: "images/products/custom-molded-parts.jpg",
                    cat: "custom-moulding"
                },
                // Product 11
                {
                    title: "End Cap Seals",
                    material: "Weatherproof EPDM",
                    image: "images/end-cap-gasket.jpg",
                    cat: "rubber-gaskets"
                },
                // Product 12
                {
                    title: "Hydraulic Packing Seals",
                    material: "NBR 70 Shore",
                    image: "images/packing-seal.jpg",
                    cat: "oil-packing-seals"
                },
                // Product 13
                {
                    title: "Moulded Diaphragms",
                    material: "Fabric Reinforced",
                    image: "images/products/diaphragms.jpg",
                    cat: "custom-components"
                },
                // Product 14
                {
                    title: "Curved Radiator Hoses",
                    material: "High-Grade HNBR",
                    image: "images/hose.jpg",
                    cat: "extruded-profiles"
                },
                // Product 15
                {
                    title: "Quad-Rings & X-Rings",
                    material: "Nitrile / FKM",
                    image: "images/products/quad-rings.jpg",
                    cat: "o-rings-seal-kits"
                },
                // Product 16
                {
                    title: "Steering Rack Boots",
                    material: "Flexible Neoprene",
                    image: "images/rubber-boot.jpg",
                    cat: "moulded-components"
                },
                // Product 17
                {
                    title: "Anti-Vibration Bushes",
                    material: "Heavy Duty Rubber",
                    image: "images/products/rubber-bushes.jpg",
                    cat: "rubber-bushes"
                },
                // Product 18
                {
                    title: "Flexible Rubber Bellows",
                    material: "EPDM / Chloroprene",
                    image: "images/products/rubber-bellows.jpg",
                    cat: "custom-components"
                },
                // Product 19
                {
                    title: "Chassis Wire Grommets",
                    material: "Tear-Proof Neoprene",
                    image: "images/grommet.jpg",
                    cat: "rubber-bushes"
                },
                // Product 20
                {
                    title: "Sealing Rubber Washers",
                    material: "NBR / Viton",
                    image: "images/products/rubber-washers.jpg",
                    cat: "rubber-bushes"
                },
                // Product 21
                {
                    title: "Insulating Rubber Sleeves",
                    material: "Extruded Polymer",
                    image: "images/sleeve.jpg",
                    cat: "extruded-profiles"
                },
                // Product 22
                {
                    title: "Flexible Couplings",
                    material: "Polyurethane / Rubber",
                    image: "images/products/flexible-couplings.jpg",
                    cat: "custom-components"
                },
                // Product 23
                {
                    title: "Closed-Cell Sponge Strips",
                    material: "EPDM Sponge",
                    image: "images/products/foam-rubber.jpg",
                    cat: "extruded-profiles"
                },
                // Product 24
                {
                    title: "Torque Rod Bushes",
                    material: "Bonded Rubber-Steel",
                    image: "images/rod-bush.jpg",
                    cat: "rubber-bushes"
                }
            ];

            const createProductCard = p => `
                <a class="pr-card" href="./products.html#${p.cat}" data-product-category="${p.cat}" title="${p.title}" aria-label="${p.title}">
                    <img src="${p.image}" alt="${p.title}" loading="lazy" width="240" height="180">
                </a>
            `;

            // Distribute products evenly across the 3 rows
            const row1Items = productsData.filter((_, idx) => idx % 3 === 0);
            const row2Items = productsData.filter((_, idx) => idx % 3 === 1);
            const row3Items = productsData.filter((_, idx) => idx % 3 === 2);

            const renderTrack = items => {
                const cardsHTML = items.map(createProductCard).join("");
                // Duplicate items so CSS marquee has a seamless infinite 50% loop
                return cardsHTML + cardsHTML;
            };

            const t1 = document.getElementById("prTrack1");
            const t2 = document.getElementById("prTrack2");
            const t3 = document.getElementById("prTrack3");

            if (t1) t1.innerHTML = renderTrack(row1Items);
            if (t2) t2.innerHTML = renderTrack(row2Items);
            if (t3) t3.innerHTML = renderTrack(row3Items);

            /* ---------- process ---------- */
            const pv = $("#ppView"), steps = [...pv.querySelectorAll(".pp-step")],
                page = $("#ppPage"), pbar = $("#ppBar"), prev = $("#ppPrev"), next = $("#ppNext"),
                two = n => String(n).padStart(2, "0");

            /* icon + stage label on every step */
            const icons = [
                "<rect x='6' y='4' width='12' height='17' rx='2'/><path d='M9 4h6v3H9zM9 14l2 2 4-4'/>",
                "<path d='M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 15h8'/>",
                "<circle cx='8.5' cy='8' r='4'/><circle cx='15.5' cy='8' r='4'/><path d='M3 18c4 0 5-2 9-2s5 2 9 2'/>",
                "<rect x='4' y='3' width='16' height='7' rx='1'/><rect x='4' y='14' width='16' height='7' rx='1'/><path d='M10 10v4M14 10v4'/>",
                "<path d='M12 3v7M9 7l3 3 3-3'/><rect x='5' y='12' width='14' height='4' rx='1'/><path d='M4 21h16'/>",
                "<path d='M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 1-3 0-6 1-9z'/>",
                "<circle cx='6' cy='7' r='3'/><circle cx='6' cy='17' r='3'/><path d='M8.5 8.5L20 19M8.5 15.5L20 5'/>",
                "<rect x='3' y='9' width='18' height='6' rx='1'/><path d='M7 9v3M11 9v2M15 9v3M19 9v2'/>",
                "<path d='M5 19a9 9 0 1 1 14 0'/><path d='M12 14l4-5'/><circle cx='12' cy='14' r='1.5'/>",
                "<circle cx='12' cy='10' r='6'/><path d='M9.5 10l2 2 3-3.5M8.5 15l-1.5 6 5-3 5 3-1.5-6'/>",
                "<path d='M3 8l9-5 9 5v8l-9 5-9-5zM3 8l9 5 9-5M12 13v8'/>",
                "<path d='M3 6h11v10H3zM14 9h4l3 3v4h-7'/><circle cx='7.5' cy='17.5' r='1.8'/><circle cx='17.5' cy='17.5' r='1.8'/>"
            ];
            const stage = ["Plan", "Plan", "Make", "Make", "Make", "Make", "Make", "Check", "Check", "Check", "Deliver", "Deliver"];
            steps.forEach((el, i) => {
                el.insertAdjacentHTML("afterbegin", `<span class="pp-ic"><svg viewBox="0 0 24 24" aria-hidden="true">${icons[i]}</svg></span>`);
                el.querySelector("h3").insertAdjacentHTML("beforebegin", `<small>${stage[i]}</small>`);
            });

            function updateProcess() {
                const w = steps[0].offsetWidth + 16,
                    per = Math.max(1, Math.round(pv.clientWidth / w)),
                    first = Math.min(steps.length - 1, Math.round(pv.scrollLeft / w)),
                    last = Math.min(steps.length, first + per);
                page.textContent = `${two(first + 1)}–${two(last)} / ${steps.length}`;
                pbar.style.width = (last / steps.length) * 100 + "%";
                prev.disabled = pv.scrollLeft < 4;
                next.disabled = pv.scrollLeft >= pv.scrollWidth - pv.clientWidth - 4;
            }
            const go = dir => pv.scrollBy({ left: dir * pv.clientWidth * 0.95 });
            prev.addEventListener("click", () => go(-1));
            next.addEventListener("click", () => go(1));
            pv.addEventListener("scroll", updateProcess, { passive: true });
            addEventListener("resize", updateProcess);
            updateProcess();
        })();

// Customer logo continuous fluid carousel interaction.
(() => {
    /* logo file name, company name */
    const clients = [
      ["affy", "Affy India Pvt. Ltd."], ["eva", "EVA Industries"], ["mini-meter", "Mini Meter Pvt. Ltd."], ["palak", "Palak Plastic Pvt. Ltd."],
      ["talbros", "Talbros Automotive Components Ltd."], ["sunren", "Sunren Automotive Pvt. Ltd."], ["vishwakarma", "Vishwakarma Auto Parts Pvt. Ltd."], ["superlink", "Superlink Industries"],
      ["pragati", "Pragati Coating Pvt. Ltd."], ["alok", "Alok Industries"], ["sheller", "Sheller Industries"], ["accurate", "Accurate Industries"],
      ["rh-kioko", "RH Kioko Automotive"], ["autokoi", "Autokoi Industries"], ["century", "Century Springs Pvt. Ltd."], ["mechseal", "Mechseal Engineers Pvt. Ltd."]
    ];
    const $ = id => document.getElementById(id);
    const view = $("csView"), track = $("csTrack"), prev = $("csPrev"), next = $("csNext");
    if (!view || !track) return;

    // Render 2 sets of client cards for infinite seamless wrapping
    const cardHTML = clients.map(([f, n]) =>
      `<li class="cs-card"><span class="cs-logo"><img src="images/clients/${f}.png" alt="${n} logo" loading="lazy"></span><h3>${n}</h3></li>`
    ).join("");
    track.innerHTML = cardHTML + cardHTML;

    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let pos = 0;
    const baseSpeed = 2.10; // smooth gliding pixels per frame
    let targetSpeed = reduceMotion ? 0 : baseSpeed;
    let currentSpeed = targetSpeed;
    let impulse = 0;
    let isHovered = false;
    let isDragging = false;
    let startX = 0;
    let startPos = 0;
    let lastX = 0;
    let lastTime = 0;
    let dragVelocity = 0;
    let isVisible = false;
    let rafId = null;

    // Measure the exact offset distance where the second set begins
    const getSingleSetWidth = () => {
      const halfCount = clients.length;
      if (track.children.length >= halfCount * 2 && track.children[halfCount]) {
        const dist = track.children[halfCount].offsetLeft - track.children[0].offsetLeft;
        if (dist > 0) return dist;
      }
      return track.scrollWidth / 2;
    };

    let singleSetWidth = getSingleSetWidth();
    window.addEventListener("resize", () => {
      singleSetWidth = getSingleSetWidth();
    });
    window.addEventListener("load", () => {
      singleSetWidth = getSingleSetWidth();
    });

    const updateTransform = () => {
      track.style.transform = `translate3d(${-pos}px, 0, 0)`;
    };

    // Main 60fps/120fps physics loop
    const loop = () => {
      if (!isVisible) return;

      if (!isDragging) {
        // Smoothly ease speed towards target (hover in/out, pause)
        currentSpeed += (targetSpeed - currentSpeed) * 0.08;

        // Apply impulse (arrow clicks or swipe fling) with smooth friction decay
        if (Math.abs(impulse) > 0.05) {
          pos += impulse;
          impulse *= 0.88;
        } else {
          impulse = 0;
        }

        pos += currentSpeed;

        // Seamless wrap around
        if (singleSetWidth > 0) {
          if (pos >= singleSetWidth) {
            pos -= singleSetWidth;
          } else if (pos < 0) {
            pos += singleSetWidth;
          }
        }

        updateTransform();
      }

      rafId = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (!rafId && isVisible) {
        rafId = requestAnimationFrame(loop);
      }
    };

    const stopLoop = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    // Smooth nudge on arrow buttons (glides forward/backward by approx 1 card width)
    const nudge = (dir) => {
      const cardWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + 16 : 246;
      // With decay 0.88, initial impulse = distance * 0.12
      impulse += dir * (cardWidth * 0.12);
      startLoop();
    };

    if (prev) prev.addEventListener("click", () => nudge(-1));
    if (next) next.addEventListener("click", () => nudge(1));

    // Hover slowdown: smoothly glides to a stop on hover, resumes on leave
    view.addEventListener("pointerenter", (e) => {
      if (e.pointerType === "mouse") {
        isHovered = true;
        targetSpeed = 0;
      }
    });

    view.addEventListener("pointerleave", (e) => {
      if (e.pointerType === "mouse") {
        isHovered = false;
        targetSpeed = reduceMotion ? 0 : baseSpeed;
      }
    });

    // Drag / Touch gesture support
    view.addEventListener("pointerdown", (e) => {
      if (e.target.closest("button, a")) return;

      isDragging = true;
      startX = e.clientX;
      startPos = pos;
      lastX = e.clientX;
      lastTime = performance.now();
      dragVelocity = 0;
      impulse = 0;

      view.classList.add("is-grabbing");
      try { view.setPointerCapture(e.pointerId); } catch (_) {}
    });

    view.addEventListener("pointermove", (e) => {
      if (!isDragging) return;

      const deltaX = e.clientX - startX;
      pos = startPos - deltaX;

      const now = performance.now();
      const dt = now - lastTime;
      if (dt > 10) {
        dragVelocity = (lastX - e.clientX) / dt;
        lastX = e.clientX;
        lastTime = now;
      }

      if (singleSetWidth > 0) {
        if (pos >= singleSetWidth) {
          pos -= singleSetWidth;
          startPos -= singleSetWidth;
        } else if (pos < 0) {
          pos += singleSetWidth;
          startPos += singleSetWidth;
        }
      }

      updateTransform();
    });

    const endDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      view.classList.remove("is-grabbing");

      try {
        if (view.hasPointerCapture(e.pointerId)) {
          view.releasePointerCapture(e.pointerId);
        }
      } catch (_) {}

      // Apply inertial flick velocity
      impulse = Math.max(-30, Math.min(30, dragVelocity * 16));
      targetSpeed = (isHovered || reduceMotion) ? 0 : baseSpeed;
      startLoop();
    };

    view.addEventListener("pointerup", endDrag);
    view.addEventListener("pointercancel", endDrag);

    // Keyboard navigation (ArrowLeft & ArrowRight)
    view.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        nudge(-1);
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        nudge(1);
        e.preventDefault();
      }
    });

    // Tab visibility handling
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopLoop();
      } else if (isVisible) {
        startLoop();
      }
    });

    // Intersection observer so it only animates when visible in viewport
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        singleSetWidth = getSingleSetWidth();
        startLoop();
      } else {
        stopLoop();
      }
    }, { threshold: 0.05 });

    observer.observe(view);
})();
