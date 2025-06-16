document.addEventListener('DOMContentLoaded', () => {
    // --- Custom Background Configuration ---
    const useCustomBackground = true; // SET THIS TO true OR false
    const customBackgroundImageUrl = 'assets/background/back.jpg'; // Replace 'your-image.jpg' with your actual image file name
    // Ensure you have an 'assets/background/' folder at the same level as your index.html,
    // and place your background image inside it.

    const backgroundAnimationElement = document.getElementById('background-animation');

    if (useCustomBackground && backgroundAnimationElement) {
        // Apply custom background image and a subtle overlay
        backgroundAnimationElement.style.backgroundImage = `
            linear-gradient(rgba(10, 15, 20, 0.85), rgba(10, 15, 20, 0.92)), 
            url('${customBackgroundImageUrl}')
        `;
        backgroundAnimationElement.style.backgroundSize = 'cover, cover';
        backgroundAnimationElement.style.backgroundPosition = 'center center';
        backgroundAnimationElement.style.backgroundRepeat = 'no-repeat';
        // Disable the grid pulse animation if custom background is used
        backgroundAnimationElement.style.animation = 'none'; 
    }
    // If useCustomBackground is false, the default CSS for #background-animation (grid) will apply.
    // --- End Custom Background Configuration ---

    // Smooth scrolling for nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Update active class on nav links
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Intersection Observer for content section animations
    const sections = document.querySelectorAll('.content-section');
    const sectionObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Section is 15% visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // observer.unobserve(entry.target); // Optional: stop observing once visible
            } else {
                // Optional: remove class if you want animation to replay on scroll up
                // entry.target.classList.remove('is-visible'); 
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Tab functionality for Doctrine section
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabId = link.getAttribute('data-tab');

            // Update active tab link
            tabLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');

            // Update active tab content
            tabContents.forEach(content => {
                if (content.id === tabId) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
    
    // Active nav link highlighting on scroll
    const mainNavLinks = document.querySelectorAll('nav ul li a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - (section.clientHeight / 3) ) { // Adjust offset as needed
                current = section.getAttribute('id');
            }
        });
        // Hero section special case (top of page)
        if (pageYOffset < sections[0].offsetTop - (sections[0].clientHeight / 3)) {
             current = 'hero';
        }


        mainNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
         // If no section is "current" (e.g., scrolled past all sections), default to first or none
        if (!current && mainNavLinks.length > 0 && pageYOffset < sections[0].offsetTop) {
            mainNavLinks[0].classList.add('active');
        }
    });


    // Optional: Parallax effect for background or specific elements
    // window.addEventListener('scroll', () => {
    //     const scrolled = window.pageYOffset;
    //     const background = document.getElementById('background-animation');
    //     if (background) {
    //         // Adjust the '0.5' for more or less parallax effect
    //         background.style.transform = `translateY(${scrolled * 0.1}px)`;
    //     }
    // });

    // Initial call to set active nav link if page loads on a section
    window.dispatchEvent(new Event('scroll'));
});

function showEventDetails(eventType) {
    const eventDetails = {
        dday: {
            title: 'D-Day Normandy Landing',
            description: 'Recreate the historic Allied invasion of Normandy on June 6, 1944. Players will assault Omaha and Utah beaches with period-accurate vehicles and weapons.',
            objectives: ['Secure the beachhead', 'Destroy German fortifications', 'Advance inland']
        },
        ww3: {
            title: 'World War III Scenario',
            description: 'A fictional modern conflict using current-generation military technology. Features advanced jets, modern tanks, and sophisticated air defense systems.',
            objectives: ['Control strategic points', 'Establish air superiority', 'Coordinate combined arms']
        },
        stalingrad: {
            title: 'Battle of Stalingrad',
            description: 'Urban warfare in the ruins of Stalingrad. Close-quarters combat with tanks and infantry in a devastated cityscape.',
            objectives: ['Control key buildings', 'Secure supply routes', 'Eliminate enemy strongholds']
        },
        pacific: {
            title: 'Pacific Theater Operations',
            description: 'Naval and air battles across the Pacific islands. Features carrier operations, island hopping campaigns, and epic naval engagements.',
            objectives: ['Sink enemy fleet', 'Capture airfields', 'Establish naval supremacy']
        }
    };

    const event = eventDetails[eventType];
    if (event) {
        alert(`${event.title}\n\n${event.description}\n\nObjectives:\n${event.objectives.map(obj => `• ${obj}`).join('\n')}`);
    }
}
