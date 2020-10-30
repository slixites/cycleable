const _Cycleable_ = (() => {
    const attachments = {};
    const NUM_ITERATIONS_BEFORE_REMOVAL = 3;
    const newElem = ({ type, className, text }) => {
        const element = document.createElement(type);
        element.classList.add(className);
        element.innerHTML = text;
        return element;
    }

    return ({ attachTo = '.cycleable', itemsAttr = 'js-items', timeoutAttr = 'js-timeout', delayAttr = 'js-delay', inClass = 'in', outClass = 'out' } = {}) => {
        if (attachments[attachTo]) return; // too clingy
        attachments[attachTo] = true;

        document.querySelectorAll(attachTo).forEach(el => {
            const items = el.getAttribute(itemsAttr).split(',');
            let timeout, initialDelay;
            try {
                timeout = parseInt(el.getAttribute(timeoutAttr));
            } catch (e) { timeout=2000; }
            try {
                initialDelay = parseInt(el.getAttribute(delayAttr));
            } catch (e) { initialDelay=0; }
    
            let idx = 0,
                its = 0,
                shouldRemove = false;
            el.appendChild(newElem({ type: 'span', text: items[idx] }));
            setTimeout(() => {
                setInterval(() => {
                    if (++idx >= items.length) idx = 0;
    
                    el.firstChild.classList.remove(inClass);
                    el.firstChild.classList.add(outClass);
                    el.insertBefore(newElem({ type: 'span', className: inClass, text: items[idx] }), el.firstChild)
                    el.style.width = window.getComputedStyle(el.firstChild).width;
                    if (!shouldRemove && ++its >= NUM_ITERATIONS_BEFORE_REMOVAL) shouldRemove = true
                    if (shouldRemove) el.removeChild(el.lastChild);
    
                }, timeout);
            }, initialDelay);
        });
    };
})();