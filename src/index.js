const _Cycleable_ = (() => {
    const attachments = {};
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
    
            let idx = its = 0;
            el.appendChild(newElem({ type: 'span', text: items[idx] }));
            setTimeout(() => {
                setInterval(() => {
                    if (++idx >= items.length) idx = 0;
    
                    el.firstChild.classList.remove(inClass);
                    el.firstChild.classList.add(outClass);
                    el.insertBefore(newElem({ type: 'span', className: inClass, text: items[idx] }), el.firstChild)
                    el.style.width = window.getComputedStyle(el.firstChild).width;
                    if (++its >= 3) el.removeChild(el.lastChild);
    
                }, timeout);
            }, initialDelay);
        });
    };
})();