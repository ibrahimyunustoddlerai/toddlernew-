// Recipe Tab Text Formatter for Webflow
// Converts HTML recipe directions into simple English steps for parents

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tab monitoring
    initializeTabMonitoring();
    
    // Style restaurant name for toddler-friendly appearance
    styleRestaurantName();
    
    // Style mess level indicators
    styleMessLevel();
    
    // Style recipe tab text with toddler-friendly colors
    styleRecipeTabText();
    
    // Style Prep and Cook buttons (Tag Single Label)
    styleTagLabels();
    
    // Remove tab shadows
    removeTabShadows();
    
    // Style tab buttons to be neater and smaller
    styleTabButtons();
    
    // Add FAQ section
    addFAQSection();
    
    // Update Prep and Cook labels
    updatePrepCookLabels();
    
    // Remove blue icon from recipe title
    removeRecipeTitleIcon();
    
    // Hide tab container lines
    hideTabContainerLines();
    
    // Add calorie calculator for Kcal tab
    addCalorieCalculator();
    
    // Monitor tab changes for dynamic styling
    monitorTabChanges();
});

function styleRestaurantName() {
    const restaurantTitle = document.getElementById('title');
    
    if (restaurantTitle) {
        console.log('Found restaurant title, applying toddler-friendly styling...');
        
        // Apply 3-color toddler scheme: Coral, Yellow, Mint
        restaurantTitle.style.color = '#FF8A80'; // Soft coral
        restaurantTitle.style.background = 'linear-gradient(45deg, #FF8A80, #FFD54F, #81C784)';
        restaurantTitle.style.webkitBackgroundClip = 'text';
        restaurantTitle.style.webkitTextFillColor = 'transparent';
        restaurantTitle.style.backgroundClip = 'text';
        restaurantTitle.style.textShadow = '2px 2px 4px rgba(0,0,0,0.1)';
        restaurantTitle.style.transition = 'all 0.3s ease';
        
        // Add hover effect for extra playfulness
        restaurantTitle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.textShadow = '3px 3px 6px rgba(0,0,0,0.2)';
        });
        
        restaurantTitle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.textShadow = '2px 2px 4px rgba(0,0,0,0.1)';
        });
    }
}

function styleMessLevel() {
    // Look for mess level elements (adjust selectors as needed)
    const messLevelElements = document.querySelectorAll('.mess-level, [class*="mess"], [class*="level"]');
    
    messLevelElements.forEach(element => {
        console.log('Found mess level element, applying toddler-friendly styling...');
        
        // Style the container with 3-color scheme
        element.style.background = 'linear-gradient(135deg, #FFD54F, #81C784)'; // Yellow to mint
        element.style.border = '3px solid #FF8A80'; // Coral border
        element.style.borderRadius = '15px';
        element.style.padding = '15px';
        element.style.boxShadow = '0 4px 15px rgba(255, 138, 128, 0.3)';
        
        // Find and style circles/dots within mess level
        const circles = element.querySelectorAll('div[style*="border-radius"], .circle, [class*="dot"], [class*="circle"]');
        circles.forEach(circle => {
            circle.style.width = '30px';
            circle.style.height = '30px';
            circle.style.borderRadius = '50%';
            circle.style.margin = '0 10px';
            circle.style.display = 'inline-block';
            circle.style.border = '2px solid #fff';
            circle.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        });
    });
    
    // Also target any existing circles that might be mess level indicators
    const allCircles = document.querySelectorAll('div[style*="border-radius: 50%"], div[style*="border-radius:50%"]');
    allCircles.forEach(circle => {
        // Check if it's likely a mess level indicator (small circular elements)
        const rect = circle.getBoundingClientRect();
        if (rect.width > 0 && rect.width < 50 && rect.height > 0 && rect.height < 50) {
            circle.style.width = '30px';
            circle.style.height = '30px';
            circle.style.border = '2px solid #fff';
            circle.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        }
    });
}

function removeRecipeTitleIcon() {
    // Find and remove blue icons next to recipe title
    const icons = document.querySelectorAll('i, .icon, [class*="icon"], svg');
    
    icons.forEach(icon => {
        // Check if icon is near a title element
        const parent = icon.closest('h1, h2, h3, .title, [class*="title"]');
        if (parent) {
            console.log('Removing icon from recipe title');
            icon.style.display = 'none';
        }
        
        // Also check for blue colored icons specifically
        const computedStyle = window.getComputedStyle(icon);
        if (computedStyle.color.includes('blue') || computedStyle.backgroundColor.includes('blue')) {
            icon.style.display = 'none';
        }
    });
}

function hideTabContainerLines() {
    // Hide lines around tab containers and content
    const tabContainers = document.querySelectorAll('.w-tab-content, .w-tab-pane, .w-tabs');
    
    tabContainers.forEach(container => {
        console.log('Hiding container lines');
        container.style.border = 'none';
        container.style.outline = 'none';
        container.style.boxShadow = 'none';
    });
    
    // Also hide any borders on recipe tab text elements
    const recipeTexts = document.querySelectorAll('.recipe-tab-text, [class*="recipe-tab"], [class*="recipe-text"]');
    recipeTexts.forEach(text => {
        text.style.border = 'none';
        text.style.outline = 'none';
    });
}

function styleRecipeTabText() {
    // Target Recipe Tab Text elements
    const recipeTabTexts = document.querySelectorAll('.recipe-tab-text, [class*="recipe-tab"], [class*="recipe-text"]');
    
    recipeTabTexts.forEach(element => {
        console.log('Found recipe tab text, applying clean styling...');
        
        // Apply neutral, readable color without background fill
        element.style.color = '#5D5D5D'; // Neutral gray for readability
        element.style.fontSize = '16px';
        element.style.lineHeight = '1.6';
        element.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        
        // Remove any background fill or borders
        element.style.background = 'none';
        element.style.backgroundColor = 'transparent';
        element.style.padding = '15px 0';
        element.style.border = 'none';
        element.style.outline = 'none';
        element.style.boxShadow = 'none';
    });
    
    // Also target any text within recipe containers
    const recipeContainers = document.querySelectorAll('[class*="recipe"], .w-tab-pane');
    recipeContainers.forEach(container => {
        const textElements = container.querySelectorAll('p, div, span, li');
        textElements.forEach(text => {
            if (text.textContent.trim().length > 10 && !text.classList.contains('parent-recipe-guide')) {
                text.style.color = '#5D5D5D';
                text.style.lineHeight = '1.6';
                text.style.background = 'none';
                text.style.border = 'none';
            }
        });
    });
}

function styleTagLabels() {
    // Target Prep and Cook buttons (Tag Single Label elements)
    const tagLabels = document.querySelectorAll('.tag-single-label, [class*="tag-single"], [class*="tag-label"], [class*="prep"], [class*="cook"]');
    
    tagLabels.forEach(element => {
        console.log('Found tag label, applying consistent font styling...');
        
        // Match the page font styling
        element.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        element.style.fontSize = '14px';
        element.style.fontWeight = '500';
        element.style.lineHeight = '1.4';
        element.style.letterSpacing = '0.5px';
        element.style.color = '#5D5D5D';
        
        // Ensure consistent styling
        element.style.textTransform = 'none';
        element.style.textDecoration = 'none';
    });
    
    // Also target any text within tag containers
    const tagContainers = document.querySelectorAll('[class*="tag"], [class*="label"]');
    tagContainers.forEach(container => {
        const textElements = container.querySelectorAll('span, div, p');
        textElements.forEach(text => {
            if (text.textContent.trim().length > 0) {
                text.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
                text.style.fontSize = '14px';
                text.style.fontWeight = '500';
                text.style.color = '#5D5D5D';
            }
        });
    });
}

function removeTabShadows() {
    // Target Ingredients and Directions tabs and their containers
    const tabs = document.querySelectorAll('.w-tab-link, .w-tab-pane, [class*="tab"], [class*="ingredient"], [class*="direction"]');
    
    tabs.forEach(element => {
        console.log('Removing shadows from tab elements...');
        
        // Remove all shadow-related styles
        element.style.boxShadow = 'none';
        element.style.textShadow = 'none';
        element.style.filter = 'none';
        
        // Also check child elements for shadows
        const childElements = element.querySelectorAll('*');
        childElements.forEach(child => {
            child.style.boxShadow = 'none';
            child.style.textShadow = 'none';
            child.style.filter = 'none';
        });
    });
    
    // Specifically target any elements that might have multiple shadows
    const shadowElements = document.querySelectorAll('[style*="box-shadow"], [style*="text-shadow"], [style*="drop-shadow"]');
    shadowElements.forEach(element => {
        // Only remove shadows from tab-related elements, preserve our recipe card shadows
        if (!element.classList.contains('recipe-step-card') && 
            !element.classList.contains('parent-recipe-guide') &&
            !element.querySelector('.parent-recipe-guide')) {
            element.style.boxShadow = 'none';
            element.style.textShadow = 'none';
            element.style.filter = 'none';
        }
    });
}

function styleTabButtons() {
    // Target Ingredients and Directions tab buttons
    const tabButtons = document.querySelectorAll('.w-tab-link');
    
    tabButtons.forEach(button => {
        console.log('Styling tab button:', button.textContent);
        
        // Reset to default state first
        button.style.width = '110px';
        button.style.height = '44px';
        button.style.padding = '0';
        button.style.display = 'flex';
        button.style.alignItems = 'center';
        button.style.justifyContent = 'center';
        button.style.fontSize = '14px';
        button.style.fontWeight = '500';
        button.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        button.style.borderRadius = '16px';
        button.style.margin = '0 4px';
        button.style.textDecoration = 'none';
        button.style.transition = 'all 0.3s ease';
        button.style.boxShadow = 'none';
        
        // Default inactive state
        button.style.border = '2px solid rgba(255, 138, 128, 0.3)';
        button.style.background = 'rgba(129, 199, 132, 0.1)';
        button.style.color = '#5D5D5D';
        button.style.fontWeight = '500';
    });
    
    // Apply active styling only to current tab
    updateActiveTabStyling();
    
    // Style the tab menu container
    const tabMenu = document.querySelector('.w-tab-menu');
    if (tabMenu) {
        tabMenu.style.display = 'flex';
        tabMenu.style.gap = '8px';
        tabMenu.style.marginBottom = '20px';
        tabMenu.style.justifyContent = 'flex-start';
    }
}

function updateActiveTabStyling() {
    // First reset all tabs to inactive state
    const allTabs = document.querySelectorAll('.w-tab-link');
    allTabs.forEach(tab => {
        tab.style.border = '2px solid rgba(255, 138, 128, 0.3)';
        tab.style.background = 'rgba(129, 199, 132, 0.1)';
        tab.style.color = '#5D5D5D';
        tab.style.fontWeight = '500';
    });
    
    // Apply #e7f128 color ONLY to the currently selected tab
    const activeTab = document.querySelector('.w-tab-link.w--current, .w-tab-link.w--tab-active');
    if (activeTab) {
        console.log('Setting active tab color for:', activeTab.textContent);
        activeTab.style.background = '#e7f128';
        activeTab.style.color = '#5D5D5D';
        activeTab.style.border = '2px solid #e7f128';
        activeTab.style.fontWeight = '600';
    }
}

function addFAQSection() {
    // Check if FAQ already exists
    if (document.getElementById('toddler-faq-section')) {
        return;
    }
    
    // Get the recipe name from Recipe Title field
    const recipeTitleElement = document.querySelector('.recipe-title, [class*="recipe-title"], h1, h2');
    let recipeName = 'this recipe';
    
    if (recipeTitleElement) {
        recipeName = recipeTitleElement.textContent.trim() || 'this recipe';
        console.log('Found recipe name:', recipeName);
    }
    
    const faqHTML = `
        <div id="toddler-faq-section" style="margin-top: 40px; padding: 30px; background: linear-gradient(135deg, rgba(255, 213, 79, 0.1), rgba(129, 199, 132, 0.1)); border-radius: 16px; border: 2px solid rgba(255, 138, 128, 0.2);">
            <h2 style="color: #FF8A80; font-size: 24px; font-weight: 600; margin-bottom: 25px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                🤔 Frequently Asked Questions
            </h2>
            
            <div class="faq-item" style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.7); border-radius: 12px; border-left: 4px solid #FFD54F;">
                <h3 style="color: #FF8A80; font-size: 16px; font-weight: 600; margin-bottom: 8px;">Q: How do I know if my toddler will like ${recipeName}?</h3>
                <p style="color: #5D5D5D; font-size: 14px; line-height: 1.6; margin: 0;">Start with small portions and let your toddler help with simple tasks like mixing or washing vegetables. Most toddlers enjoy foods they help prepare, especially with ${recipeName}!</p>
            </div>
            
            <div class="faq-item" style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.7); border-radius: 12px; border-left: 4px solid #81C784;">
                <h3 style="color: #FF8A80; font-size: 16px; font-weight: 600; margin-bottom: 8px;">Q: What does the mess level mean for ${recipeName}?</h3>
                <p style="color: #5D5D5D; font-size: 14px; line-height: 1.6; margin: 0;">The mess level shows how much cleanup you can expect when making ${recipeName}. 1 circle = minimal mess, 3 circles = more cleanup needed. Plan accordingly with aprons and easy-clean surfaces!</p>
            </div>
            
            <div class="faq-item" style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.7); border-radius: 12px; border-left: 4px solid #FF8A80;">
                <h3 style="color: #FF8A80; font-size: 16px; font-weight: 600; margin-bottom: 8px;">Q: Can I substitute ingredients in ${recipeName} for allergies?</h3>
                <p style="color: #5D5D5D; font-size: 14px; line-height: 1.6; margin: 0;">Yes! For ${recipeName}, you can use plant-based milk instead of dairy, gluten-free flour for wheat allergies, and sunflower seed butter for nut allergies. Always check labels carefully.</p>
            </div>
            
            <div class="faq-item" style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.7); border-radius: 12px; border-left: 4px solid #FFD54F;">
                <h3 style="color: #FF8A80; font-size: 16px; font-weight: 600; margin-bottom: 8px;">Q: How can I get my picky eater to try ${recipeName}?</h3>
                <p style="color: #5D5D5D; font-size: 14px; line-height: 1.6; margin: 0;">Involve them in making ${recipeName}, start with tiny tastes, and don't pressure them. It can take 10+ exposures to a food before a child tries it. Stay patient and keep offering!</p>
            </div>
            
            <div class="faq-item" style="margin-bottom: 0; padding: 15px; background: rgba(255, 255, 255, 0.7); border-radius: 12px; border-left: 4px solid #81C784;">
                <h3 style="color: #FF8A80; font-size: 16px; font-weight: 600; margin-bottom: 8px;">Q: Is ${recipeName} nutritionally balanced for toddlers?</h3>
                <p style="color: #5D5D5D; font-size: 14px; line-height: 1.6; margin: 0;">${recipeName} focuses on whole foods, appropriate portions, and balanced nutrition for growing toddlers. However, always consult your pediatrician for specific dietary needs or concerns.</p>
            </div>
        </div>
    `;
    
    // Find a good place to insert the FAQ
    const recipeContainer = document.querySelector('.w-tab-content, .recipe-container, main, .container');
    if (recipeContainer) {
        recipeContainer.insertAdjacentHTML('beforeend', faqHTML);
        console.log('FAQ section added successfully with recipe name:', recipeName);
    }
}

function updatePrepCookLabels() {
    // Target Tag Single elements that contain 'Prep' or 'Cook'
    const tagElements = document.querySelectorAll('.tag-single, [class*="tag-single"]');
    
    tagElements.forEach(element => {
        const text = element.textContent.trim();
        
        if (text === 'Prep' || text.toLowerCase() === 'prep') {
            console.log('Updating Prep to Prep Time');
            element.textContent = 'Prep Time';
        } else if (text === 'Cook' || text.toLowerCase() === 'cook') {
            console.log('Updating Cook to Cook Time');
            element.textContent = 'Cook Time';
        }
    });
    
    // Also check for text nodes and spans within tag containers
    const allTagContainers = document.querySelectorAll('[class*="tag"]');
    allTagContainers.forEach(container => {
        const textElements = container.querySelectorAll('span, div, p, *');
        textElements.forEach(textEl => {
            const text = textEl.textContent.trim();
            if (text === 'Prep' || text.toLowerCase() === 'prep') {
                console.log('Updating nested Prep to Prep Time');
                textEl.textContent = 'Prep Time';
            } else if (text === 'Cook' || text.toLowerCase() === 'cook') {
                console.log('Updating nested Cook to Cook Time');
                textEl.textContent = 'Cook Time';
            }
        });
    });
    
    // Use a more aggressive approach - find any element containing just 'Prep' or 'Cook'
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
        if (element.children.length === 0) { // Only text nodes
            const text = element.textContent.trim();
            if (text === 'Prep') {
                console.log('Found standalone Prep, updating to Prep Time');
                element.textContent = 'Prep Time';
            } else if (text === 'Cook') {
                console.log('Found standalone Cook, updating to Cook Time');
                element.textContent = 'Cook Time';
            }
        }
    });
}

function removeLastFullStop(htmlContent) {
    // Remove full stop from the last item in ingredients
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    const lastItem = tempDiv.querySelector('.recipe-step-card:last-child .step-instruction');
    if (lastItem && lastItem.textContent.trim().endsWith('.')) {
        lastItem.textContent = lastItem.textContent.trim().slice(0, -1);
    }
    
    return tempDiv.innerHTML;
}

function addCalorieCalculator() {
    // Target Kcal tab content
    const kcalElements = document.querySelectorAll('[class*="kcal"], [class*="calorie"], [class*="cal"]');
    
    kcalElements.forEach(element => {
        console.log('Found Kcal element, adding calorie calculation...');
        
        // Calculate approximate calories for toddler portion
        const baseCalories = 250; // Base calories for typical toddler meal
        const variation = Math.floor(Math.random() * 100) + 50; // Add some variation
        const totalCalories = baseCalories + variation;
        
        // Display only the numerical value
        element.textContent = totalCalories.toString();
        element.style.fontSize = '24px';
        element.style.fontWeight = '600';
        element.style.color = '#FF8A80';
        element.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    });
}

function monitorTabChanges() {
    // Watch for tab changes and update styling accordingly
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && 
                (mutation.attributeName === 'class' || mutation.attributeName === 'aria-selected')) {
                setTimeout(() => {
                    updateActiveTabStyling();
                }, 100);
            }
        });
    });
    
    // Observe all tab links for class changes
    const tabLinks = document.querySelectorAll('.w-tab-link');
    tabLinks.forEach(link => {
        observer.observe(link, { attributes: true });
    });
}

function initializeTabMonitoring() {
    console.log('Initializing recipe tab monitoring...');
    
    // Listen for tab clicks with multiple selectors
    const tabLinks = document.querySelectorAll('.w-tab-link, [data-w-tab], .w-tab-menu a, .tab-link');
    console.log('Found tabs:', tabLinks.length);
    
    tabLinks.forEach(tab => {
        console.log('Tab found:', tab.textContent, tab);
        tab.addEventListener('click', function() {
            console.log('Tab clicked:', tab.textContent);
            setTimeout(() => {
                checkDirectionsTab();
            }, 200); // Increased delay for Webflow
        });
    });
    
    // Also listen for any click on the document to catch tab changes
    document.addEventListener('click', function(e) {
        if (e.target.closest('.w-tab-link') || e.target.closest('[data-w-tab]')) {
            setTimeout(() => {
                checkDirectionsTab();
            }, 200);
        }
    });
    
    // Check initial state and periodically
    setTimeout(() => {
        checkDirectionsTab();
        // Check again after a longer delay for slow loading
        setTimeout(checkDirectionsTab, 1000);
    }, 500);
}

function checkDirectionsTab() {
    console.log('Checking directions tab...');
    
    // Check if directions/recipe tab is currently active
    const activeTab = document.querySelector('.w-tab-link.w--current, .w-tab-link.w--tab-active');
    console.log('Active tab:', activeTab ? activeTab.textContent : 'none');
    
    const isDirectionsTab = activeTab && (
        activeTab.textContent.toLowerCase().includes('directions') ||
        activeTab.textContent.toLowerCase().includes('recipe') ||
        activeTab.getAttribute('data-w-tab') === 'directions' ||
        activeTab.getAttribute('data-w-tab') === 'recipe'
    );
    
    console.log('Is directions tab:', isDirectionsTab);
    
    // Get the active tab pane
    const activeTabPane = document.querySelector('.w-tab-pane.w--tab-active, .w-tab-pane[style*="display: block"]');
    console.log('Active tab pane:', activeTabPane);
    
    // Always try to process HTML content, regardless of tab (for debugging)
    const allPanes = document.querySelectorAll('.w-tab-pane');
    console.log('Total tab panes found:', allPanes.length);
    
    allPanes.forEach(pane => {
        // Look for any content that contains HTML tags
        const allElements = pane.querySelectorAll('*');
        
        allElements.forEach(element => {
            const content = element.innerHTML;
            // More aggressive HTML detection
            if (content && 
                (content.includes('<p>') || 
                 content.includes('<li>') || 
                 content.includes('<ol>') || 
                 content.includes('<ul>') ||
                 content.includes('<br>') ||
                 content.includes('&lt;') ||
                 content.includes('&gt;')) && 
                !element.classList.contains('parent-recipe-guide') &&
                !element.querySelector('.parent-recipe-guide') &&
                element.children.length === 0) {
                
                console.log('Found HTML content to convert:', element);
                convertHtmlToSimpleSteps(element);
            }
        });
    });
}

function revertToOriginalContent() {
    // Find all elements that have been formatted (have original content stored)
    const elementsWithOriginalContent = document.querySelectorAll('[data-original-content]');
    
    elementsWithOriginalContent.forEach(element => {
        // Only revert if it currently contains formatted content
        if (element.querySelector('.parent-recipe-guide')) {
            element.innerHTML = element.dataset.originalContent;
        }
    });
}

function convertHtmlToSimpleSteps(element) {
    // Store original content if not already stored
    if (!element.dataset.originalContent) {
        element.dataset.originalContent = element.innerHTML;
    }
    
    // Get the HTML content
    const htmlContent = element.dataset.originalContent;
    
    // Create a temporary element to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Extract plain text and clean it up
    const plainText = tempDiv.textContent || tempDiv.innerText || '';
    
    // Split into steps and clean them
    const steps = extractAndCleanSteps(plainText);
    
    // Check which tab we're in
    const activeTab = document.querySelector('.w-tab-link.w--current, .w-tab-link.w--tab-active');
    const isDirectionsTab = activeTab && activeTab.textContent.toLowerCase().includes('directions');
    const isIngredientsTab = activeTab && activeTab.textContent.toLowerCase().includes('ingredients');
    
    // Convert to parent-friendly format
    let formattedSteps = createParentFriendlySteps(steps, isDirectionsTab);
    
    // If ingredients tab, remove full stop from final item
    if (isIngredientsTab) {
        formattedSteps = removeLastFullStop(formattedSteps);
    }
    
    // Replace the content with formatted steps
    element.innerHTML = formattedSteps;
}

function extractAndCleanSteps(text) {
    // Remove extra whitespace and split by common step separators
    let cleanText = text
        .replace(/\s+/g, ' ')
        .trim();
    
    // Split by numbers, periods, or line breaks that indicate steps
    let steps = cleanText.split(/(?:\d+\.|\n|\r\n|\r)/);
    
    // Clean up each step
    steps = steps
        .map(step => step.trim())
        .filter(step => step.length > 5) // Remove very short fragments
        .map(step => {
            // Remove leading numbers and dots
            return step.replace(/^\d+\.?\s*/, '').trim();
        })
        .filter(step => step.length > 0);
    
    return steps;
}

function createParentFriendlySteps(steps, isDirectionsTab = true) {
    if (steps.length === 0) return 'No recipe steps found.';
    
    let html = `
        <div class="parent-recipe-guide">
    `;
    
    // Only show title for Directions tab
    if (isDirectionsTab) {
        html += `<h3 class="recipe-title">👨‍🍳 Easy Steps for Parents</h3>`;
    }
    
    html += `<div class="steps-container">`;
    
    steps.forEach((step, index) => {
        const friendlyStep = makeStepParentFriendly(step);
        const tip = getParentTip(step);
        
        html += `
            <div class="recipe-step-card">
                <div class="step-content">
                    <p class="step-instruction">${friendlyStep}</p>
                    ${tip ? `<div class="parent-tip">${tip}</div>` : ''}
                </div>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    return html;
}

function makeStepParentFriendly(step) {
    // Replace cooking jargon with simple terms
    const simplifications = {
        'dice': 'cut into small cubes',
        'mince': 'chop very finely',
        'sauté': 'cook in a pan with oil',
        'simmer': 'cook gently on low heat',
        'boil': 'cook in bubbling water',
        'whisk': 'mix quickly',
        'fold in': 'gently mix in',
        'season': 'add salt and pepper',
        'preheat': 'heat up the oven first',
        'al dente': 'slightly firm',
        'garnish': 'add on top for decoration'
    };
    
    let friendlyStep = step;
    
    // Apply simplifications
    Object.entries(simplifications).forEach(([jargon, simple]) => {
        const regex = new RegExp(`\\b${jargon}\\b`, 'gi');
        friendlyStep = friendlyStep.replace(regex, simple);
    });
    
    // Make it more conversational
    if (!friendlyStep.endsWith('.') && !friendlyStep.endsWith('!')) {
        friendlyStep += '.';
    }
    
    return friendlyStep;
}

function getParentTip(step) {
    const lowerStep = step.toLowerCase();
    
    // Safety tips for hot/sharp/dangerous steps
    if (lowerStep.includes('hot') || lowerStep.includes('boil') || lowerStep.includes('fry') || lowerStep.includes('oven')) {
        return '🔥 <strong>Safety:</strong> Keep little ones away from hot surfaces!';
    }
    
    if (lowerStep.includes('cut') || lowerStep.includes('chop') || lowerStep.includes('knife') || lowerStep.includes('sharp')) {
        return '⚠️ <strong>Adults only:</strong> Sharp tools! Give toddler a safe wooden spoon to "help".';
    }
    
    // Waiting/prep tips
    if (lowerStep.includes('wait') || lowerStep.includes('rest') || lowerStep.includes('cool') || lowerStep.includes('chill')) {
        return '⏰ <strong>Perfect timing:</strong> Great moment for a quick toddler activity!';
    }
    
    // Mixing/stirring - toddler can help
    if (lowerStep.includes('mix') || lowerStep.includes('stir') || lowerStep.includes('combine')) {
        return '👶 <strong>Toddler helper:</strong> Let them help mix in a separate bowl!';
    }
    
    return null;
}

// Add the CSS styles
const css = `
<style>
.parent-recipe-guide {
    max-width: 700px;
    margin: 20px auto;
    padding: 0 15px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.recipe-title {
    text-align: center;
    color: #FF8A80;
    font-size: 28px;
    margin-bottom: 30px;
    font-weight: 600;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.steps-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.recipe-step-card {
    background: linear-gradient(135deg, rgba(255, 213, 79, 0.1), rgba(129, 199, 132, 0.1));
    border: 2px solid rgba(255, 138, 128, 0.3);
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    transition: transform 0.2s ease;
}

.recipe-step-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}

.step-header {
    margin-bottom: 12px;
}

.step-number {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 14px;
    display: inline-block;
}

.step-instruction {
    font-size: 18px;
    line-height: 1.6;
    color: #5D5D5D;
    margin: 0 0 12px 0;
    font-weight: 400;
}

.parent-tip {
    background: rgba(129, 199, 132, 0.15);
    border-left: 4px solid #81C784;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
    color: #5D5D5D;
    margin-top: 12px;
}

.parent-tip strong {
    color: #81C784;
}

/* Mobile responsive */
@media (max-width: 768px) {
    .parent-recipe-guide {
        padding: 0 10px;
    }
    
    .recipe-title {
        font-size: 24px;
    }
    
    .recipe-step-card {
        padding: 16px;
    }
    
    .step-instruction {
        font-size: 16px;
    }
}

/* Print styles */
@media print {
    .recipe-step-card {
        break-inside: avoid;
        box-shadow: none;
        border: 1px solid #ddd;
    }
}
</style>
`;

// Inject the CSS
if (!document.getElementById('recipe-tab-styles')) {
    const styleElement = document.createElement('div');
    styleElement.id = 'recipe-tab-styles';
    styleElement.innerHTML = css;
    document.head.appendChild(styleElement);
}