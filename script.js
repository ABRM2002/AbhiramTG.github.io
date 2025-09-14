document.addEventListener("DOMContentLoaded", () => {
    const hackerText = document.getElementById("hackerText");
    const loadingScreen = document.getElementById("loadingScreen");
    const mainContent = document.getElementById("mainContent");
    const progressBar = document.getElementById("progressBar");

    const lines = [
        "$ sudo systemctl start portfolio.service",
        "[✓] Initializing SOC modules...",
        "[✓] Establishing secure session...",
        "[⚠] Running vulnerability checks...",
        "[✓] No threats found",
        "user: abhiram",
        "password: ********",
        "Access Granted ✅",
        "[✓] Portfolio modules loaded",
        "[✓] All systems online."
    ];

    let lineIndex = 0;

    function typeLine() {
        if (lineIndex < lines.length) {
            const line = lines[lineIndex];
            hackerText.innerHTML += `<span class="cyber-line">${line}</span><br/>`;

            // update progress bar
            const progress = ((lineIndex + 1) / lines.length) * 100;
            progressBar.style.width = progress + "%";

            lineIndex++;

            // make faster (200ms per line → ~2s total)
            setTimeout(typeLine, 200);
        } else {
            // hide loading screen in ≤ 5s always
            setTimeout(() => {
                loadingScreen.classList.add("hidden");
                mainContent.classList.add("visible");

                // ✅ keep scroll position stable
                document.body.style.overflow = "auto"; 
                window.scrollTo(0, 0);

                // START Hero Stats Animation AFTER content is visible
                setTimeout(() => {
                    startCounterAnimation();
                }, 1000); // Give extra time for content to be fully rendered
            }, 500);
        }
    }

    typeLine();
});

// ---- Hero Stats Counter Animation Function ----
function startCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = +counter.innerText.replace('+',''); // get number
        let count = 0;
        const increment = Math.ceil(target / 50); // adjust speed here
        const updateCount = () => {
            count += increment;
            if(count < target){
                counter.innerText = count + '+';
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target + '+';
            }
        };
        updateCount();
    });
}

// ---- About Console Animation ----
const aboutConsole = document.getElementById("aboutConsole");
const aboutLines = [
    "$ whoami",
    "abhiram@cyberlancers",
    "$ ipconfig",
    "IPv4 Address . . . . . . : 192.168.1.100",
    "$ nmap -A abhiram.dev",
    "PORT     STATE SERVICE VERSION",
    "22/tcp   open  ssh     OpenSSH 8.9",
    "80/tcp   open  http    Apache httpd",
    "443/tcp  open  https   nginx",
    "Portfolio scan complete: No vulnerabilities found ✓"
];

function typeAboutConsole() {
    let index = 0;

    function typeNext() {
        if (index < aboutLines.length) {
            const line = aboutLines[index];
            let charIndex = 0;
            const typing = setInterval(() => {
                aboutConsole.textContent += line[charIndex];
                charIndex++;
                if (charIndex === line.length) {
                    aboutConsole.textContent += "\n";
                    clearInterval(typing);
                    index++;
                    setTimeout(typeNext, 200);
                }
            }, 20); // ⚡ faster typing
        }
    }
    typeNext();
}

// Trigger About Console only when visible
if (aboutConsole) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeAboutConsole();
            observer.disconnect();
        }
    }, { threshold: 0.3 });
    observer.observe(aboutConsole);
}

// === Theme Toggle ===
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Load saved theme or set default to dark
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        body.classList.add("light-theme");
        body.classList.remove("dark-theme");
        if (themeToggle) themeToggle.textContent = "☀️";
    } else {
        body.classList.add("dark-theme");
        body.classList.remove("light-theme");
        if (themeToggle) themeToggle.textContent = "🌙";
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            if (body.classList.contains("dark-theme")) {
                body.classList.remove("dark-theme");
                body.classList.add("light-theme");
                themeToggle.textContent = "☀️";
                localStorage.setItem("theme", "light");
            } else {
                body.classList.remove("light-theme");
                body.classList.add("dark-theme");
                themeToggle.textContent = "🌙";
                localStorage.setItem("theme", "dark");
            }
        });
    }
});

// === Smooth Scroll with Offset for Navigation ===
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    const navHeight = navbar ? navbar.offsetHeight : 80;

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - navHeight - 20; // Extra 20px padding
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 50;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// === REMOVE BOTH EXISTING MOBILE MENU SECTIONS ===
// Delete lines 136-167 (first mobile menu toggle)
// Delete lines 172-220 (enhanced mobile menu toggle)

// === REPLACE WITH THIS SINGLE, WORKING MOBILE MENU TOGGLE ===
document.addEventListener("DOMContentLoaded", () => {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Debug logging
    console.log('Mobile Toggle Found:', mobileToggle);
    console.log('Nav Links Found:', navLinks);

    if (mobileToggle && navLinks) {
        // Toggle mobile menu
        mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Mobile menu clicked!'); // Debug
            
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
                console.log('Menu opened');
            } else {
                body.style.overflow = 'auto';
                console.log('Menu closed');
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = 'auto';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });

        // Close mobile menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });
    } else {
        console.error('Mobile menu elements not found!');
        console.log('Available toggles:', document.querySelectorAll('.mobile-menu-toggle'));
        console.log('Available nav-links:', document.querySelectorAll('.nav-links'));
    }
});

// === ALSO UPDATE YOUR SMOOTH SCROLL SECTION ===
// Replace the last smooth scroll section (lines 222-252) with this:
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const mobileToggle = document.querySelector('.mobile-menu-toggle');
                const navLinksContainer = document.querySelector('.nav-links');
                if (mobileToggle && navLinksContainer && navLinksContainer.classList.contains('active')) {
                    mobileToggle.classList.remove('active');
                    navLinksContainer.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                // Calculate offset for mobile vs desktop
                const isMobile = window.innerWidth <= 768;
                const offset = isMobile ? 80 : 100;
                const offsetTop = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: Math.max(0, offsetTop),
                    behavior: 'smooth'
                });
            }
        });
    });
});