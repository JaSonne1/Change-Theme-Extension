function setTheme() {
    // Nachricht an das Hintergrundskript senden, um die Farben zu erhalten
    chrome.runtime.sendMessage({ action: "getColors" }, (response) => {
        let backgroundColor = response.backgroundColor || '#121212';
        let textColor = response.textColor || '#ffffff';

        // Hintergrund- und Textfarben auf der Seite setzen
        document.body.style.backgroundColor = backgroundColor;
        document.body.style.color = textColor;

        // Alle Elemente auf der Seite anpassen
        let elements = document.querySelectorAll("*");
        elements.forEach(el => {
            el.style.backgroundColor = backgroundColor;
            el.style.color = textColor;
        });
    });
}
