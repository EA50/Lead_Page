
const optsbar_reqlink = document.querySelector("#optsbar-reqlink");

const contactbarlist = document.querySelector(".contactbarlist");
let contactbarlist_isactive = false;

optsbar_reqlink.addEventListener("click", () => {

    if (!contactbarlist_isactive) {
        contactbarlist.classList.remove("contactbarlist-offs");
        contactbarlist.classList.add("contactbarlist-active");

        contactbarlist_isactive = true;
    } else {
        contactbarlist.classList.remove("contactbarlist-active");

        setTimeout(() => {
            contactbarlist.classList.add("contactbarlist-offs");
        }, 500);
        
        contactbarlist_isactive = false;
    }
});

const linkcopy = document.querySelectorAll(".link-copy");
const feedbackbar = document.querySelector(".feedbackbar");

function copyTextToClipboard(text) {
    try {
        navigator.clipboard.writeText(text);
        feedbackbar.classList.add("feedbackbar-active");

        setTimeout(() => {
            feedbackbar.classList.remove("feedbackbar-active");
        }, 1000);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

linkcopy.forEach(i => {
    i.addEventListener('click', () => {
        copyTextToClipboard(i.dataset.contact);
    });
});