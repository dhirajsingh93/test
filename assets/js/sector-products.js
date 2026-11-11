/**
 * Sector Products Showcase JavaScript
 * Handles sector filtering, real-time product search, and quote links.
 * Upadhyay Rubber Industries (Faridabad)
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', initSectorShowcase);

    function initSectorShowcase() {
        const pills = document.querySelectorAll('.sec-pill-btn');
        const searchInput = document.getElementById('secSearchInput');
        const groups = document.querySelectorAll('.sec-group');
        const cards = document.querySelectorAll('.sec-card');
        const noResults = document.getElementById('secNoResults');
        const resetBtn = document.getElementById('secResetBtn');
        const searchCountDisplay = document.getElementById('secSearchCount');

        let activeSector = 'all';
        let searchQuery = '';

        // Calculate and update pill badge counts
        function updateCounts() {
            const counts = {
                all: cards.length,
                agri: 0,
                industrial: 0,
                '2w3w': 0,
                '4w': 0
            };

            cards.forEach(card => {
                const sec = card.getAttribute('data-sector');
                if (counts[sec] !== undefined) {
                    counts[sec]++;
                }
            });

            pills.forEach(pill => {
                const target = pill.getAttribute('data-sector');
                const countBadge = pill.querySelector('.sec-pill-count');
                if (countBadge && counts[target] !== undefined) {
                    countBadge.textContent = counts[target];
                }
            });
        }

        // Filter and display cards based on sector and query
        function applyFilters() {
            let visibleTotal = 0;
            const queryWords = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);

            groups.forEach(group => {
                const groupSector = group.getAttribute('data-sector-group');
                const sectorMatches = (activeSector === 'all' || activeSector === groupSector);

                if (!sectorMatches) {
                    group.style.display = 'none';
                    return;
                }

                group.style.display = '';
                const groupCards = group.querySelectorAll('.sec-card');
                let groupVisibleCount = 0;

                groupCards.forEach(card => {
                    let matchesSearch = true;

                    if (queryWords.length > 0) {
                        const title = (card.getAttribute('data-title') || '').toLowerCase();
                        const material = (card.getAttribute('data-material') || '').toLowerCase();
                        const tags = (card.getAttribute('data-tags') || '').toLowerCase();
                        const desc = (card.querySelector('.sec-card-desc')?.textContent || '').toLowerCase();
                        const fullText = `${title} ${material} ${tags} ${desc}`;

                        matchesSearch = queryWords.every(word => fullText.includes(word));
                    }

                    if (matchesSearch) {
                        card.removeAttribute('hidden');
                        card.style.display = '';
                        groupVisibleCount++;
                        visibleTotal++;
                    } else {
                        card.setAttribute('hidden', 'true');
                        card.style.display = 'none';
                    }
                });

                // Hide the whole section header if no cards match inside it during search
                if (groupVisibleCount === 0 && queryWords.length > 0) {
                    group.style.display = 'none';
                }
            });

            // Handle empty state
            if (noResults) {
                if (visibleTotal === 0) {
                    noResults.removeAttribute('hidden');
                    noResults.style.display = 'block';
                } else {
                    noResults.setAttribute('hidden', 'true');
                    noResults.style.display = 'none';
                }
            }

            if (searchCountDisplay) {
                if (searchQuery.trim().length > 0) {
                    searchCountDisplay.textContent = `Showing ${visibleTotal} product${visibleTotal === 1 ? '' : 's'} matching "${searchQuery}"`;
                    searchCountDisplay.style.display = 'block';
                } else {
                    searchCountDisplay.style.display = 'none';
                }
            }
        }

        // Pill Click Listener
        pills.forEach(pill => {
            pill.addEventListener('click', function () {
                const targetSector = this.getAttribute('data-sector');
                pills.forEach(p => p.classList.remove('active'));
                this.classList.add('active');
                activeSector = targetSector;
                applyFilters();

                // If specific sector selected, scroll smoothly into that section
                if (targetSector !== 'all') {
                    const targetGroup = document.querySelector(`.sec-group[data-sector-group="${targetSector}"]`);
                    if (targetGroup) {
                        targetGroup.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });

        // Search Input Listener with debounce
        let debounceTimer;
        if (searchInput) {
            searchInput.addEventListener('input', function () {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    searchQuery = this.value;
                    applyFilters();
                }, 150);
            });
        }

        // Reset Button
        if (resetBtn) {
            resetBtn.addEventListener('click', function () {
                if (searchInput) searchInput.value = '';
                searchQuery = '';
                activeSector = 'all';
                pills.forEach(p => p.classList.remove('active'));
                const allPill = document.querySelector('.sec-pill-btn[data-sector="all"]');
                if (allPill) allPill.classList.add('active');
                applyFilters();
            });
        }

        // Check URL Hash or Query param for pre-selection (e.g. sector-products.html#agri)
        function checkUrlSector() {
            const hash = window.location.hash.replace('#', '').toLowerCase();
            const urlParams = new URLSearchParams(window.location.search);
            const paramSector = urlParams.get('sector')?.toLowerCase();
            const initialSector = paramSector || hash;

            if (initialSector && ['agri', 'industrial', '2w3w', '4w'].includes(initialSector)) {
                const matchingPill = document.querySelector(`.sec-pill-btn[data-sector="${initialSector}"]`);
                if (matchingPill) {
                    matchingPill.click();
                }
            }
        }

        // Initial setup
        updateCounts();
        applyFilters();
        checkUrlSector();
    }
})();

