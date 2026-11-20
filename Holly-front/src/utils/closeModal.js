

 export const closeModal = ({target }, setOpen, params, itemClass) => {
        const classSelector = document.querySelector(itemClass)
        const isClickInside = classSelector.contains(target);
        if (!isClickInside) {
            setOpen(params);
        }
    }