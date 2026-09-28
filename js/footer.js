(function () {
  // Placeholder footer content - edit these values to change what's shown.
  const footerInfo = {
    line1: "Made by Michael Joo Jia WONG (104381424)",
    line2: "Contact: 104381424@students.swinburne.edu.my",
    line3: "Website was made with assistance from Claude",
  };

  const footer = document.createElement("footer");
  footer.className = "site-footer";

  [footerInfo.line1, footerInfo.line2, footerInfo.line3].forEach((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    footer.appendChild(p);
  });

  // Replaces the <div id="footer"></div> placeholder, same approach as nav.js.
  document.getElementById("footer").replaceWith(footer);
})();
