const more_btn = document.querySelector(".titlemorebtn");
const gobackbar_btn = document.querySelector(".gobackbar-btn");
const more_info = document.querySelector(".moreinfo");
const moreinfobar_holder = document.querySelector(".moreinfobar-holder")
const title_bar = document.querySelector(".titlebar");
const img_bar = document.querySelector(".imgbar");

more_btn.addEventListener("click", () => {
   
    more_info.classList.add("moreinfo-active");
    title_bar.classList.add("titlebar-inactive");
    img_bar.classList.add("imgbar-inactive");

    setTimeout(() => {
        gobackbar_btn.classList.add("gobackbar-btn-active");
        gobackbar_btn.classList.remove("goback-transdel-active");

        moreinfobar_holder.classList.add("moreinfobar-holder-active");
    }, 750);

});

gobackbar_btn.addEventListener("click", () => {

    gobackbar_btn.classList.remove("gobackbar-btn-active");
    more_info.classList.remove("moreinfo-active");
    title_bar.classList.remove("titlebar-inactive");
    img_bar.classList.remove("imgbar-inactive");

    moreinfobar_holder.classList.remove("moreinfobar-holder-active");

    setTimeout(() => {
        gobackbar_btn.classList.add("goback-transdel-active");
    }, 750);
    
});

const contactbar = document.querySelector(".contactbar");
const contactbarlist = document.querySelector(".contactbarlist");
let contactbarlist_isactive = false;

const titlebar = document.querySelector(".titlebar");

contactbar.addEventListener("click", () => {

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
