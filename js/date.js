export function setFooterInfo() {
    const currentYear = new Date().getFullYear();
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = currentYear;
    }

    const lastModifiedP = document.getElementById('lastModified');
    if (lastModifiedP) {
        const lastModifiedDate = document.lastModified;
        if (lastModifiedDate) {
        lastModifiedP.textContent = `Last Modified: ${lastModifiedDate}`;
    } else {
        lastModifiedP.textContent = `Last Modified: (Date unavailable)`;
        }
    }
}