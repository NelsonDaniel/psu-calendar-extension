// Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    const courses = [];
    const all_divs = document.getElementsByTagName('tbody');
    for (let i = 0; i < all_divs.length; i++) {
        const div = all_divs[i];
        if (div.className.match(/^css-[a-z0-9]+-groupCss/)){
          courses.push(parseCourseDiv(div));
        }
    }


  });

  function parseCourseDiv(div) {
    const rows = div.getElementsByTagName('tr');
    const details = rows[0].getElementsByTagName('td');
    const subject = details[4];
    const course_number = details[5];
    const time_details = parseTimeDetails(details[9]);

    return {subject, course_number, days, time, link, bldg};
  }

  function parseTimeDetails() {
    return "a", "b", "c", "d";
  }
}


