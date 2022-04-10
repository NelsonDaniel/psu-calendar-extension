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
    const courseInfo = [];
    const tbl_hdr = [];
    const all_divs = document.getElementsByTagName('tbody');
    const all_hdrs = document.getElementsByTagName('thead');

    for (let i = 0; i < all_divs.length; i++) {

        const div = all_divs[i];
        const hdr = all_hdrs[i];

        if (tbl_hdr.length<1 && hdr.className.match(/^css-[a-z0-9]+-headerCss/)){
          tbl_hdr.push(hdr);
        }

        if (div.className.match(/^css-[a-z0-9]+-groupCss/)){
          courseInfo.push({div, parsed: parseCourseDiv(div)});
        }
    }

    // Sort by days
    courseInfo.sort((x,y) => {
      a = x.parsed
      b = y.parsed
      if (a.days < b.days) return -1;
      if (a.days > b.days) return 1;
      return 0;
    });

    // Sort by time
    courseInfo.sort((x,y) => {
      a = x.parsed
      b = y.parsed
      if (a.days === b.days) { 
        if (a.start_time.includes('a') && b.start_time.includes('p')) {return -1;}
        if ((a.start_time.includes('a') && b.start_time.includes('a')) ||
          (a.start_time.includes('p') && b.start_time.includes('p'))) {
          if (a.start_time < b.start_time) {return -1;}
          if (a.start_time > b.start_time) {return 1;}
        }
        return 0;
      }
    });


    // New Table
  
    const newTable = [];

    // Modify Course Info
    for (let i = 0; i < courseInfo.length; i++) {
      console.log(courseInfo[i].parsed);
    }

    const table = document.getElementsByClassName('css-oeyc9i-blockCss')[0];
    
    table.appendChild(tbl_hdr[0]);


    // Insert sorted cources in table
    for (let i = 0; i < courseInfo.length-1; i++) {
      const first = courseInfo[i];
      const second = courseInfo[i+1];
      table.appendChild(first.div);
      const div = document.createElement('tbody');
      div.style.width = '100%'
      div.style.display = 'table'
      div.className = 'css-1c24da2-groupCss'
      div.innerHTML = `${getTripInfo(first.parsed.location_link, second.parsed.location_link, second.parsed.start_time)}`
      table.appendChild(div);
      table.appendChild(second.div)
    }
  });

  function getTripInfo(a_link, b_link, b_start_time) {

    return `bus: 20 mins, walk: 5 mins`;
  }

  function parseTimeDetails(details) {
    const location_a = details.getElementsByTagName('a')[0];
    let location_link = '';
    try {
      location_link = location_a.href;
    }
    catch {}

    let building = '';
    try {
      building = location_a.innerHTML;
    }
    catch{}

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

}


