/** Inline script for <head>: flags repeat visits before first paint so the preloader never flashes. */
export const introScript = `try{if(sessionStorage.getItem("eden-intro"))document.documentElement.classList.add("intro-seen")}catch(e){}`;
