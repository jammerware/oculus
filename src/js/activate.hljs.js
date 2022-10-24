// @ts-nocheck
if (document.readyState === "complete" || document.readyState === "loaded") {
    console.log("We missed it, better load");
    const hljs = window.hljs;
    hljs.highlightAll();
}
else {
    document.addEventListener('DOMContentLoaded', () => {
        console.log("It's ready now, let's go");
        const hljs = window.hljs;
        hljs.highlightAll();
    });
}