chrome.action.onClicked.addListener((tab) => {
    // Überprüft, ob es eine 'chrome://' oder 'about://' Seite ist
    if (tab.url.startsWith("chrome://") || tab.url.startsWith("about://")) {
        console.log("Der Darkmode kann auf dieser Seite nicht angewendet werden.");
        return;
    }

    // Auffordern zur Eingabe von Farben im Content-Skript
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: promptForColors
    });
});

function promptForColors() {
    // Prompt zur Farbeingabe
    let backgroundPrompt = prompt("Hintergrundfarbe (z. B. #121212): ");
    let colorPrompt = prompt("Schriftfarbe (z. B. #ffffff): ");

    if (backgroundPrompt && colorPrompt) {
        // Speichern der Farben
        chrome.storage.local.set({ backgroundColor: backgroundPrompt, textColor: colorPrompt }, () => {
            console.log("Farben gespeichert:", backgroundPrompt, colorPrompt);
        });

        // Setzen der Farben auf der Seite
        document.body.style.backgroundColor = backgroundPrompt;
        document.body.style.color = colorPrompt;

        let elements = document.querySelectorAll("*");
        elements.forEach(el => {
            el.style.backgroundColor = backgroundPrompt;
            el.style.color = colorPrompt;
        });
    }
}
