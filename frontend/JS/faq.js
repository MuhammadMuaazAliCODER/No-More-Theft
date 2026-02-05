// FLEXBOX FAQ - PROPERLY SCOPED CLICK HANDLER
document.addEventListener('DOMContentLoaded', function() {
    // Get all FAQ items using a more specific selector
    const faqContainer = document.querySelector('.faq-grid');
    const faqItems = faqContainer.querySelectorAll('.faq-item');
    
    // Add click handler to each item individually
    faqItems.forEach((item, index) => {
        // Create a unique handler for THIS specific item
        const clickHandler = function(e) {
            // Stop all event propagation
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            console.log(`FAQ Item ${index + 1} clicked:`, item.querySelector('.faq-question-text').textContent);
            
            // Toggle ONLY this item
            item.classList.toggle('active');
        };
        
        // Attach the handler
        item.addEventListener('click', clickHandler, true);
    });
    
    console.log(`FAQ initialized with ${faqItems.length} items`);
});