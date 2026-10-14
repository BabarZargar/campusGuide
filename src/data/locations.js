// All campus places live here. The whole UI is built from this array,
// so adding or removing an object here adds or removes a pin, a list
// item and a details panel — no other file needs to change.
//
// x and y are the pin position as a percentage of the map image
// (x from the left edge, y from the top edge).
//
// Data honesty: timings = null means "we don't know yet" and the UI
// hides it. facilities = [] also hides that section.
//
// label is the text drawn on the pin: the number from the printed map,
// or an icon (🍴 Food, ⚽ Sports, ★ Facility) for places without one.

// Used by the category filter buttons on the map page.
export const categories = ["All", "Academic", "Hostel", "Food", "Sports", "Facility"];

const locations = [
  // ---------- Academic departments ----------
  {
    id: "1",
    label: "1",
    name: "Chemical Engineering",
    category: "Academic",
    grid: "B1–B2",
    x: 26.4,
    y: 45.1,
    description:
      "Department of Chemical Engineering, on the western side of the academic area.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, head north into the academic area. The department is just east of the parking area, between Information Technology (8) and Mechanical Block B (10-B).",
  },
  {
    id: "2",
    label: "2",
    name: "Chemistry",
    category: "Academic",
    grid: "B2",
    x: 29.0,
    y: 63.8,
    description:
      "Department of Chemistry, in the central academic cluster close to Physics.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, walk into the academic area. Chemistry is right next to Physics (12), just south of it on the map.",
  },
  {
    id: "3",
    label: "3",
    name: "Civil Engineering",
    category: "Academic",
    grid: "C2",
    x: 35.4,
    y: 69.2,
    description:
      "Department of Civil Engineering, at the southern edge of the academic cluster.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, walk towards the academic area. Civil Engineering is beside Mathematics (9), near the small round fountain. ",
  },
  {
    id: "4",
    label: "4",
    name: "Computer Science & Engineering",
    category: "Academic",
    grid: "B2",
    x: 34.7,
    y: 33.9,
    description:
      "Department of Computer Science & Engineering, in the northern part of the academic area.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, go north through the academic area. CSE is next to ECE (6), just west of the basketball/tennis courts.",
  },
  {
    id: "5",
    label: "5",
    name: "Electrical Engineering",
    category: "Academic",
    grid: "B2",
    x: 36.2,
    y: 61.3,
    description:
      "Department of Electrical Engineering, in the central academic cluster.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, walk into the academic area. Electrical Engineering is a little east of Physics (12) and north of Mathematics (9). ",
  },
  {
    id: "6",
    label: "6",
    name: "Electronics & Communication Engineering",
    category: "Academic",
    grid: "B2",
    x: 38.5,
    y: 36.3,
    description:
      "Department of Electronics & Communication Engineering, beside CSE in the northern academic area.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, go north through the academic area. ECE is right next to CSE (4), close to the basketball/tennis courts.",
  },
  {
    id: "7",
    label: "7",
    name: "Humanities, Social Sciences & Management",
    category: "Academic",
    grid: "C3",
    x: 64.3,
    y: 73.2,
    description:
      "Department of Humanities, Social Sciences & Management. Unlike most departments, it sits in the hostel side of campus.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, head east past the academic blocks towards the hostels. The department is next to the Medical Unit, near Indus Hostel (16). ",
  },
  {
    id: "8",
    label: "8",
    name: "Information Technology",
    category: "Academic",
    grid: "A1–B1",
    x: 24.1,
    y: 30.7,
    description:
      "Department of Information Technology, in the north-west of the campus towards the Hazratbal side.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, go north along the western side of campus. IT is past the parking area, towards the Hazratbal Shrine end. ",
  },
  {
    id: "9",
    label: "9",
    name: "Mathematics",
    category: "Academic",
    grid: "C2",
    x: 37.0,
    y: 67.3,
    description:
      "Department of Mathematics, in the southern part of the academic cluster.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, walk into the academic area. Mathematics is right beside Civil Engineering (3), south of Electrical Engineering (5).",
  },
  {
    id: "10-A",
    label: "10-A",
    name: "Mechanical Engineering (Block A)",
    category: "Academic",
    grid: "B1–B2",
    x: 21.6,
    y: 59.7,
    description:
      "Block A of the Department of Mechanical Engineering, on the western edge of the academic area.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, head north. Block A is one of the first academic buildings you reach, on the west side, before Physics (12).",
  },
  {
    id: "10-B",
    label: "10-B",
    name: "Mechanical Engineering (Block B)",
    category: "Academic",
    grid: "B1–B2",
    x: 30.8,
    y: 52.2,
    description:
      "Block B of the Department of Mechanical Engineering, in the middle of the academic area.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, walk into the academic area. Block B is between Chemical Engineering (1) and Metallurgical & Materials Engineering (11).",
  },
  {
    id: "11",
    label: "11",
    name: "Metallurgical & Materials Engineering",
    category: "Academic",
    grid: "B2",
    x: 32.9,
    y: 48.5,
    description:
      "Department of Metallurgical & Materials Engineering, in the middle of the academic area.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, walk into the academic area. The department is just north-east of Mechanical Block B (10-B).",
  },
  {
    id: "12",
    label: "12",
    name: "Physics",
    category: "Academic",
    grid: "B2",
    x: 28.9,
    y: 60.0,
    description:
      "Department of Physics, in the central academic cluster next to Chemistry.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, walk into the academic area. Physics is right next to Chemistry (2), just north of it on the map.",
  },

  // ---------- Hostels ----------
  {
    id: "13",
    label: "13",
    name: "Chenab Hostel",
    category: "Hostel",
    grid: "C4",
    x: 83.8,
    y: 69.5,
    description: "Chenab Hostel, in the hostel area in the east of the campus.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, cross the campus towards Dal Lake. Chenab is next to Jehlum Extension (18) and north of Tawi Hostel (23).",
  },
  {
    id: "14",
    label: "14",
    name: "Dal Hostel",
    category: "Hostel",
    grid: "B4",
    x: 94.0,
    y: 56.2,
    description:
      "Dal Hostel, at the far eastern edge of the campus, closest to Dal Lake.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, cross the whole campus towards Dal Lake. Dal Hostel is the furthest hostel, past Jehlum Hostel (17).",
  },
  {
    id: "15",
    label: "15",
    name: "Girls' Hostel",
    category: "Hostel",
    grid: "A2",
    x: 34.4,
    y: 12.1,
    description:
      "Girls' Hostel, at the northern end of the campus near the Hazratbal Shrine side.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, go north past the academic area towards the Hazratbal side. The Girls' Hostel is at the top of the map. ",
  },
  {
    id: "16",
    label: "16",
    name: "Indus Hostel",
    category: "Hostel",
    grid: "C3",
    x: 67.4,
    y: 70.1,
    description:
      "Indus Hostel, in the southern hostel area near the Medical Unit.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, head east past the academic blocks. Indus Hostel is the long red-brick building near the Humanities department (7) and the Medical Unit.",
  },
  {
    id: "17",
    label: "17",
    name: "Jehlum Hostel",
    category: "Hostel",
    grid: "B4",
    x: 82.3,
    y: 57.1,
    description: "Jehlum Hostel, in the eastern hostel area.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, cross the campus towards Dal Lake. Jehlum is just past Mansar Hostel (20), with Jehlum Extension (18) next to it.",
  },
  {
    id: "18",
    label: "18",
    name: "Jehlum Extension Hostel",
    category: "Hostel",
    grid: "C4",
    x: 86.8,
    y: 64.8,
    description: "Jehlum Extension Hostel, beside Jehlum Hostel in the east.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, cross the campus towards Dal Lake. Jehlum Extension sits between Jehlum Hostel (17) and Chenab Hostel (13).",
  },
  {
    id: "19",
    label: "19",
    name: "Manasbal Hostel",
    category: "Hostel",
    grid: "B3",
    x: 73.0,
    y: 50.2,
    description: "Manasbal Hostel, just east of the cricket ground.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, head east to the cricket ground. Manasbal is the building just past the ground's eastern side.",
  },
  {
    id: "20",
    label: "20",
    name: "Mansar Hostel",
    category: "Hostel",
    grid: "B4",
    x: 79.0,
    y: 50.9,
    description: "Mansar Hostel, between Manasbal and Jehlum hostels.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, head east past the cricket ground. Mansar is just beyond Manasbal Hostel (19), towards Dal Lake.",
  },
  {
    id: "21",
    label: "21",
    name: "Mega Hostel",
    category: "Hostel",
    grid: "B3",
    x: 58.1,
    y: 55.6,
    description:
      "Mega Hostel, the large white building in the middle of the campus.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, walk past the academic blocks towards Dal Lake. Mega Hostel is the large white building just south of the cricket ground.",
  },
  {
    id: "22",
    label: "22",
    name: "Post Graduate Hostel",
    category: "Hostel",
    grid: "C4",
    x: 81.9,
    y: 84.9,
    description:
      "Post Graduate Hostel, in the south-east corner of the campus.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, head east to the hostel area. The PG Hostel is at the bottom-right of the map, south of Tawi Hostel (23). ",
  },
  {
    id: "23",
    label: "23",
    name: "Tawi Hostel",
    category: "Hostel",
    grid: "C4",
    x: 84.3,
    y: 77.6,
    description: "Tawi Hostel, in the south-eastern hostel area.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, head east to the hostel area. Tawi is between Chenab Hostel (13) and the PG Hostel (22).",
  },

  // ---------- Food ----------
  {
    id: "canteen-1",
    label: "🍴",
    name: "Canteen (near academic area)",
    category: "Food",
    grid: "B2–B3",
    x: 46.4,
    y: 55.0,
    description:
      "A canteen in the centre of campus, between the academic blocks and Mega Hostel.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, walk through the academic area towards Mega Hostel (21). The canteen is on the way, east of the departments.",
  },
  {
    id: "canteen-2",
    label: "🍴",
    name: "Canteen (south)",
    category: "Food",
    grid: "C2",
    x: 47.3,
    y: 84.6,
    description: "A canteen in the southern part of the campus.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, head east along the southern side of campus. The canteen is south of the academic area. ",
  },
  {
    id: "canteen-3",
    label: "🍴",
    name: "Canteen (near hostels)",
    category: "Food",
    grid: "C3",
    x: 69.2,
    y: 84.6,
    description:
      "A canteen in the southern hostel area, next to the convenience store.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, head east towards the hostels. The canteen is south of Indus Hostel (16), right next to the shop.",
  },

  // ---------- Sports ----------
  {
    id: "stadium",
    label: "⚽",
    name: "Sports Stadium & Athletics Track",
    category: "Sports",
    grid: "A3–B3",
    x: 69.0,
    y: 36.0,
    description:
      "The main sports stadium, with a running track around a football field. It is in the middle-north of campus, near Dal Lake.",
    timings: null,
    facilities: ["Athletics track", "Football field"],
    directions:
      "From the main gate, head north-east past CSE (4) and the courts. The stadium is just north of the cricket ground.",
  },
  {
    id: "ground",
    label: "⚽",
    name: "Cricket Ground",
    category: "Sports",
    grid: "B3",
    x: 63.3,
    y: 48.2,
    description:
      "The large round cricket ground in the centre of campus, between the stadium and Mega Hostel.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, walk past the academic blocks towards Dal Lake. The ground is the big green circle just north of Mega Hostel (21).",
  },
  {
    id: "courts",
    label: "⚽",
    name: "Basketball / Tennis Courts",
    category: "Sports",
    grid: "B2–B3",
    x: 51.2,
    y: 38.3,
    description:
      "Outdoor courts (the blue courts on the map), next to CSE and ECE.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, go north through the academic area. The courts are just east of CSE (4) and ECE (6).",
  },

  // ---------- Facilities ----------
  {
    id: "med",
    label: "★",
    name: "Medical Unit",
    category: "Facility",
    grid: "C3",
    x: 61.2,
    y: 77.7,
    description: "The campus medical unit, marked with a red cross on the map.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, head east towards the hostels. The Medical Unit is next to the Humanities department (7), near Indus Hostel (16).",
  },
  {
    id: "shop",
    label: "★",
    name: "Shopping / Convenience Store",
    category: "Facility",
    grid: "C3",
    x: 71.9,
    y: 84.8,
    description:
      "A shop for daily needs in the southern hostel area, beside the hostel canteen.",
    timings: null,
    facilities: [],
    directions:
      "From the main gate, head east towards the hostels. The shop is right next to the canteen near the hostels, south of Indus Hostel (16).",
  },
  {
    id: "gate",
    label: "★",
    name: "Main Gate (Nigeen side)",
    category: "Facility",
    grid: "C1",
    x: 7.1,
    y: 87.4,
    description:
      "The main entrance, on the road along the west edge of campus. Going south on this road leads to Nigeen; going north leads to Kashmir University and Hazratbal.",
    timings: null,
    facilities: [],
    directions:
      "This is the starting point for all the directions on this site. It is in the bottom-left corner of the map.",
  },
];

export default locations;
