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

    function parseTimeDetails(details) {
      const location_a = details.getElementsByTagName('a')[0];
      const location_link = location_a.href;
      const building  = location_a.innerHTML;
      const time_details = details.textContent.split(' ');
      const days = time_details[0];
      const start_time = time_details[1];
      const end_time = time_details[3];
      return {building, location_link, days, start_time, end_time};
    }
  
    function parseCourseDiv(div) {
      const rows = div.getElementsByTagName('tr');
      const details = rows[0].getElementsByTagName('td');
      const subject = details[4].textContent;
      const course_number = details[5].textContent;
      const time_details = parseTimeDetails(details[9]);
      const parsedCourseDetails = {subject, course_number,...time_details};
      return parsedCourseDetails;
    }
  });
}


