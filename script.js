// Utility to set cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// Utility to get cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// Utility to set localStorage
function setLocalConsent(value) {
    try {
        localStorage.setItem("cookie_consent", value);
    } catch(e) {
        // localStorage might be disabled
    }
}

// Utility to get localStorage
function getLocalConsent() {
    try {
        return localStorage.getItem("cookie_consent");
    } catch(e) {
        return null;
    }
}

// On page load
window.onload = function() {
    const consentCookie = getCookie("cookie_consent");
    const consentLocal = getLocalConsent();
    const popup = document.getElementById("cookie-consent");

    // Hide if consent is found in either cookie or localStorage
    if (consentCookie === "accepted" || consentLocal === "accepted") {
        popup.style.display = "none";
    } else {
        popup.style.display = "flex";
    }

    document.getElementById("accept-cookie").onclick = function() {
        setCookie("cookie_consent", "accepted", 365);
        setLocalConsent("accepted");
        popup.style.display = "none";
    };
};