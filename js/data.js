// ============================================================
// CampusNav — REVA University Campus Data
// ============================================================

const CAMPUS = {
  name: "REVA University",
  tagline: "Indoor Campus Navigation",
  description: "Navigate REVA University campus with visual step-by-step directions. No GPS needed.",
  colors: {
    primary: "#1A237E",
    accent: "#E65100",
    success: "#2E7D32"
  }
};

// ============================================================
// BUILDINGS / DESTINATIONS
// ============================================================
const BUILDINGS = [
  // --- Academic Blocks ---
  { id: "cv_raman", name: "Sir C.V. Raman Block", shortName: "C.V. Raman Block", category: "academic", icon: "🏫", description: "Science & Research departments", floors: 4, image: "cv_raman.jpg" },
  { id: "visvesvaraya", name: "Sir M. Visvesvaraya Block", shortName: "Visvesvaraya Block", category: "academic", icon: "🏫", description: "Architecture, Civil, CIT, Mechanical Engineering", floors: 5, image: "visvesvaraya.jpg" },
  { id: "vivekananda", name: "Swami Vivekananda Block", shortName: "Vivekananda Block", category: "academic", icon: "🏫", description: "Academic block with multiple departments", floors: 5, image: "vivekananda.jpg" },
  { id: "architecture", name: "Architecture Block", shortName: "Architecture Block", category: "academic", icon: "📐", description: "School of Architecture", floors: 3, image: "architecture.jpg" },
  { id: "research_centre", name: "REVA Research Centre", shortName: "Research Centre", category: "academic", icon: "🔬", description: "Research labs and innovation centre", floors: 3, image: "research_centre.jpg" },
  { id: "coe", name: "Centre of Excellence", shortName: "Centre of Excellence", category: "academic", icon: "⭐", description: "Advanced research and excellence programs", floors: 3, image: "coe.jpg" },

  // --- Administration ---
  { id: "admin_block", name: "Administrative Block", shortName: "Admin Block", category: "admin", icon: "🏛️", description: "University administration offices", floors: 3, image: "admin.jpg" },
  { id: "admissions", name: "Admissions Office", shortName: "Admissions", category: "admin", icon: "📝", description: "Student admissions and enquiries", floors: 1, image: "admissions.jpg" },
  { id: "cdc", name: "Career Development Centre", shortName: "CDC", category: "admin", icon: "💼", description: "Placement cell and career guidance", floors: 2, image: "cdc.jpg" },
  { id: "alumni", name: "Alumni Cell", shortName: "Alumni Cell", category: "admin", icon: "🎓", description: "Alumni relations office", floors: 1, image: "alumni.jpg" },

  // --- Facilities ---
  { id: "library", name: "Central Library", shortName: "Library", category: "facility", icon: "📚", description: "Central library with digital resources", floors: 3, image: "library.jpg" },
  { id: "saugandhika", name: "Saugandhika", shortName: "Saugandhika", category: "facility", icon: "🍽️", description: "Food court and dining area", floors: 1, image: "saugandhika.jpg" },
  { id: "reva_nest", name: "REVA Nest", shortName: "REVA Nest", category: "facility", icon: "🏠", description: "Student activity and startup incubation centre", floors: 2, image: "reva_nest.jpg" },
  { id: "business_school", name: "REVA Business School", shortName: "Business School", category: "facility", icon: "📊", description: "School of Business and Management", floors: 3, image: "business_school.jpg" },
  { id: "race", name: "RACE (Corporate Excellence)", shortName: "RACE", category: "facility", icon: "🏢", description: "Corporate training and excellence centre", floors: 2, image: "race.jpg" },

  // --- Auditoriums / Events ---
  { id: "chanakya", name: "Chanakya Auditorium", shortName: "Chanakya Auditorium", category: "auditorium", icon: "🎭", description: "Main auditorium for events and seminars", floors: 1, image: "chanakya.jpg" },
  { id: "kuvempu", name: "Kuvempu Auditorium", shortName: "Kuvempu Auditorium", category: "auditorium", icon: "🎭", description: "Auditorium for lectures and programmes", floors: 1, image: "kuvempu.jpg" },
  { id: "rangasthala", name: "Rangasthala", shortName: "Rangasthala", category: "auditorium", icon: "🎪", description: "Open-air theatre and cultural space", floors: 1, image: "rangasthala.jpg" },
  { id: "nartana_nirnaya", name: "Nartana Nirnaya", shortName: "Nartana Nirnaya", category: "auditorium", icon: "💃", description: "Dance and performing arts venue", floors: 1, image: "nartana_nirnaya.jpg" },

  // --- Entry Points ---
  { id: "main_gate", name: "Main Gate", shortName: "Main Gate", category: "entrance", icon: "🚪", description: "Main campus entrance with security", floors: 0, image: "main_gate.jpg" },
];

// ============================================================
// CATEGORIES
// ============================================================
const CATEGORIES = [
  { id: "all", name: "All", icon: "🏠" },
  { id: "academic", name: "Academic", icon: "🏫" },
  { id: "admin", name: "Admin", icon: "🏛️" },
  { id: "facility", name: "Facilities", icon: "🏗️" },
  { id: "auditorium", name: "Auditoriums", icon: "🎭" },
  { id: "entrance", name: "Entrances", icon: "🚪" },
];

// ============================================================
// NAVIGATION ROUTES
// Steps use image placeholders — replace with real filenames
// ============================================================
const ROUTES = [
  // --- Main Gate → C.V. Raman Block ---
  {
    id: "gate_to_cv_raman",
    from: "main_gate",
    to: "cv_raman",
    distance: "400m",
    time: "5 min",
    accessibility: true,
    steps: [
      {
        id: 1,
        instruction: "Enter through the Main Gate past the Security & Reception booth",
        detail: "You'll see a grey security booth with an LED display screen on top. Walk past it on the right side.",
        landmark: "Security booth with LED display",
        direction: "straight",
        image: "step_gate_entry",
        distance: "50m"
      },
      {
        id: 2,
        instruction: "Walk straight along the main road lined with palm trees",
        detail: "Continue on the asphalt road. You'll see tall palm trees on both sides and modern lamp posts.",
        landmark: "Palm tree-lined road",
        direction: "straight",
        image: "step_palm_road",
        distance: "100m"
      },
      {
        id: 3,
        instruction: "Turn LEFT at the REVA University direction signboard",
        detail: "You'll see a large red and blue signboard listing all campus buildings. Take a left turn here and continue on the tree-lined walkway.",
        landmark: "Red & blue direction signboard",
        direction: "left",
        image: "step_signboard",
        distance: "30m"
      },
      {
        id: 4,
        instruction: "Walk straight past Kuvempu Auditorium on the shaded walkway",
        detail: "Continue on the stone-paved path under the tree canopy. You'll pass Kuvempu Auditorium on your left.",
        landmark: "Tree canopy walkway, Kuvempu Auditorium",
        direction: "straight",
        image: "step_tree_walkway",
        distance: "120m"
      },
      {
        id: 5,
        instruction: "Continue straight — C.V. Raman Block is visible ahead",
        detail: "Walk along the stone-paved path with trimmed hedges on both sides. The building with 'SIR C.V. RAMAN BLOCK' name on top will be visible.",
        landmark: "Trimmed hedges, building dome visible",
        direction: "straight",
        image: "step_cv_raman_approach",
        distance: "80m"
      },
      {
        id: 6,
        instruction: "You've arrived at Sir C.V. Raman Block!",
        detail: "Enter through the main entrance ahead. The building has a distinctive white dome structure and glass facade.",
        landmark: "White dome, glass facade entrance",
        direction: "arrived",
        image: "step_cv_raman_arrival",
        distance: "0m"
      }
    ]
  },

  // --- Main Gate → Sir M. Visvesvaraya Block ---
  {
    id: "gate_to_visvesvaraya",
    from: "main_gate",
    to: "visvesvaraya",
    distance: "500m",
    time: "7 min",
    accessibility: true,
    steps: [
      {
        id: 1,
        instruction: "Enter through the Main Gate past the Security booth",
        detail: "Walk past the grey security/reception booth on your right side.",
        landmark: "Security booth with LED display",
        direction: "straight",
        image: "step_gate_entry",
        distance: "50m"
      },
      {
        id: 2,
        instruction: "Walk straight along the palm tree-lined main road",
        detail: "Continue on the main road with tall palm trees on both sides.",
        landmark: "Palm trees and lamp posts",
        direction: "straight",
        image: "step_palm_road",
        distance: "100m"
      },
      {
        id: 3,
        instruction: "Turn LEFT at the REVA University direction signboard",
        detail: "You'll see the red and blue REVA direction signboard. Take a left turn here toward the academic blocks.",
        landmark: "REVA direction signboard",
        direction: "left",
        image: "step_signboard",
        distance: "50m"
      },
      {
        id: 4,
        instruction: "Walk straight past Kuvempu Auditorium",
        detail: "Continue along the shaded tree-lined walkway. Kuvempu Auditorium will be on your left.",
        landmark: "Kuvempu Auditorium on left",
        direction: "straight",
        image: "step_tree_walkway",
        distance: "80m"
      },
      {
        id: 5,
        instruction: "Turn RIGHT onto the brick pathway toward buildings",
        detail: "You'll see a brick-paved pathway leading right toward the academic blocks. Another direction board for Sir M. Visvesvaraya Block is visible.",
        landmark: "Brick-paved path with direction board",
        direction: "right",
        image: "step_visvesvaraya_path",
        distance: "80m"
      },
      {
        id: 6,
        instruction: "Walk straight through the grand archway entrance",
        detail: "You'll see a large archway with brick stone pillars and a circular dome ceiling. The entrance has steps leading up.",
        landmark: "Grand archway with dome ceiling",
        direction: "straight",
        image: "step_visvesvaraya_arch",
        distance: "30m"
      },
      {
        id: 7,
        instruction: "You've arrived at Sir M. Visvesvaraya Block!",
        detail: "Schools inside: Architecture, Civil Engineering, Computing & Information Technology, Mechanical Engineering. Check the signboard at the entrance for floor-wise directory.",
        landmark: "Block signboard at entrance",
        direction: "arrived",
        image: "step_visvesvaraya_arrival",
        distance: "0m"
      }
    ]
  },

  // --- Main Gate → Swami Vivekananda Block ---
  {
    id: "gate_to_vivekananda",
    from: "main_gate",
    to: "vivekananda",
    distance: "550m",
    time: "7 min",
    accessibility: true,
    steps: [
      {
        id: 1,
        instruction: "Enter through the Main Gate past the Security booth",
        detail: "Walk past the grey security/reception booth on your right.",
        landmark: "Security booth with LED screen",
        direction: "straight",
        image: "step_gate_entry",
        distance: "50m"
      },
      {
        id: 2,
        instruction: "Walk straight along the main palm tree road",
        detail: "Continue along the asphalt road lined with palm trees.",
        landmark: "Palm trees lining the road",
        direction: "straight",
        image: "step_palm_road",
        distance: "100m"
      },
      {
        id: 3,
        instruction: "Turn LEFT at the REVA direction signboard",
        detail: "You'll see the red and blue REVA University direction board. Take a left turn here onto the tree-lined pedestrian walkway.",
        landmark: "REVA direction signboard",
        direction: "left",
        image: "step_signboard",
        distance: "50m"
      },
      {
        id: 4,
        instruction: "Walk straight past Kuvempu Auditorium",
        detail: "Continue on the stone walkway under dense tree cover. Kuvempu Auditorium is on your left.",
        landmark: "Kuvempu Auditorium, tree canopy",
        direction: "straight",
        image: "step_tree_walkway",
        distance: "80m"
      },
      {
        id: 5,
        instruction: "Turn RIGHT onto the brick pathway toward Vivekananda Block",
        detail: "Take a right turn onto the shaded brick pathway. You'll pass building entrances on your right.",
        landmark: "Brick pathway, building staircase on right",
        direction: "right",
        image: "step_building_path",
        distance: "100m"
      },
      {
        id: 6,
        instruction: "Walk straight through the covered passageway",
        detail: "Pass through the archway corridor with a circular dome ceiling and brick pillars. The path opens up to Swami Vivekananda Block.",
        landmark: "Archway with circular dome ceiling",
        direction: "straight",
        image: "step_passageway",
        distance: "50m"
      },
      {
        id: 7,
        instruction: "You've arrived at Swami Vivekananda Block!",
        detail: "The grand entrance is ahead with a glass-covered atrium, central staircase, and the block name displayed at the top. Enter through the main door.",
        landmark: "Glass atrium entrance with staircases",
        direction: "arrived",
        image: "step_vivekananda_arrival",
        distance: "0m"
      }
    ]
  },

  // --- Main Gate → Saugandhika (Food Court) ---
  {
    id: "gate_to_saugandhika",
    from: "main_gate",
    to: "saugandhika",
    distance: "350m",
    time: "4 min",
    accessibility: true,
    steps: [
      {
        id: 1,
        instruction: "Enter through the Main Gate past Security",
        detail: "Walk past the reception/security booth.",
        landmark: "Security booth",
        direction: "straight",
        image: "step_gate_entry",
        distance: "50m"
      },
      {
        id: 2,
        instruction: "Walk straight along the main palm-tree road",
        detail: "Continue straight on the main road with palm trees.",
        landmark: "Palm tree-lined road",
        direction: "straight",
        image: "step_palm_road",
        distance: "100m"
      },
      {
        id: 3,
        instruction: "Turn LEFT at the signboard toward the buildings",
        detail: "At the REVA direction signboard, take a left turn and continue walking.",
        landmark: "REVA direction signboard",
        direction: "left",
        image: "step_signboard",
        distance: "50m"
      },
      {
        id: 4,
        instruction: "Turn RIGHT — Saugandhika is visible across the lawn",
        detail: "You'll see a large open green lawn. Across it, the Saugandhika building is visible with its distinctive dome. Walk toward it.",
        landmark: "Open green lawn, dome visible",
        direction: "right",
        image: "step_saugandhika_view",
        distance: "80m"
      },
      {
        id: 5,
        instruction: "You've arrived at Saugandhika!",
        detail: "The food court and dining area is ahead. Enjoy your meal!",
        landmark: "Saugandhika sign with dome structure",
        direction: "arrived",
        image: "step_saugandhika_arrival",
        distance: "0m"
      }
    ]
  },

  // --- Main Gate → Architecture Block ---
  {
    id: "gate_to_architecture",
    from: "main_gate",
    to: "architecture",
    distance: "480m",
    time: "6 min",
    accessibility: true,
    steps: [
      {
        id: 1,
        instruction: "Enter through the Main Gate past Security",
        detail: "Walk past the security/reception booth.",
        landmark: "Security booth with LED display",
        direction: "straight",
        image: "step_gate_entry",
        distance: "50m"
      },
      {
        id: 2,
        instruction: "Walk straight along the palm tree-lined main road",
        detail: "Continue straight on the main road.",
        landmark: "Palm trees on both sides",
        direction: "straight",
        image: "step_palm_road",
        distance: "100m"
      },
      {
        id: 3,
        instruction: "Turn LEFT at the signboard on the tree-lined walkway",
        detail: "At the REVA direction signboard, take a left turn onto the pedestrian walkway.",
        landmark: "REVA direction signboard",
        direction: "left",
        image: "step_signboard",
        distance: "50m"
      },
      {
        id: 4,
        instruction: "Walk straight past Kuvempu, C.V. Raman Block and Research Centre",
        detail: "Continue straight on the path. You'll pass Kuvempu Auditorium, C.V. Raman Block, and Research Centre on your way down.",
        landmark: "Academic blocks on both sides",
        direction: "straight",
        image: "step_tree_walkway",
        distance: "200m"
      },
      {
        id: 5,
        instruction: "Turn LEFT onto the brick-paved path toward Architecture Block",
        detail: "You'll see a modern grey and white building with REVA branding. This area has beautifully landscaped gardens.",
        landmark: "Landscaped brick pathway",
        direction: "left",
        image: "step_architecture_path",
        distance: "80m"
      },
      {
        id: 6,
        instruction: "You've arrived at Architecture Block!",
        detail: "The inauguration stone is visible at the entrance. The building is a modern grey-stone and white structure with the REVA University logo.",
        landmark: "Inauguration stone, REVA logo",
        direction: "arrived",
        image: "step_architecture_arrival",
        distance: "0m"
      }
    ]
  },

  // --- Main Gate → REVA Research Centre ---
  {
    id: "gate_to_research",
    from: "main_gate",
    to: "research_centre",
    distance: "450m",
    time: "6 min",
    accessibility: true,
    steps: [
      {
        id: 1,
        instruction: "Enter through the Main Gate past Security",
        detail: "Walk past the reception/security booth.",
        landmark: "Security booth",
        direction: "straight",
        image: "step_gate_entry",
        distance: "50m"
      },
      {
        id: 2,
        instruction: "Walk straight along the main palm tree road",
        detail: "Continue on the main road with palm trees.",
        landmark: "Palm tree road",
        direction: "straight",
        image: "step_palm_road",
        distance: "100m"
      },
      {
        id: 3,
        instruction: "Turn LEFT at the signboard onto the tree-lined walkway",
        detail: "At the REVA direction signboard, take a left turn onto the pedestrian path.",
        landmark: "REVA direction signboard",
        direction: "left",
        image: "step_signboard",
        distance: "50m"
      },
      {
        id: 4,
        instruction: "Walk straight past Kuvempu and C.V. Raman Block",
        detail: "Continue along the path. You'll pass Kuvempu Auditorium and C.V. Raman Block.",
        landmark: "Kuvempu Aud. and C.V. Raman Block",
        direction: "straight",
        image: "step_tree_walkway",
        distance: "150m"
      },
      {
        id: 5,
        instruction: "Turn RIGHT toward the brick-paved Research Centre area",
        detail: "Take a right turn onto the brick-paved path toward the research buildings with gardens on both sides.",
        landmark: "Brick path with gardens",
        direction: "right",
        image: "step_research_path",
        distance: "80m"
      },
      {
        id: 6,
        instruction: "You've arrived at REVA Research Centre!",
        detail: "The building has 'REVA Research Centre' written in both Kannada and English. Enter through the main glass door entrance.",
        landmark: "REVA Research Centre signage",
        direction: "arrived",
        image: "step_research_arrival",
        distance: "0m"
      }
    ]
  },

  // --- Main Gate → Central Library ---
  {
    id: "gate_to_library",
    from: "main_gate",
    to: "library",
    distance: "380m",
    time: "5 min",
    accessibility: true,
    steps: [
      {
        id: 1,
        instruction: "Enter through the Main Gate past Security",
        detail: "Walk past the security/reception booth on your right.",
        landmark: "Security booth",
        direction: "straight",
        image: "step_gate_entry",
        distance: "50m"
      },
      {
        id: 2,
        instruction: "Walk straight along the main palm tree road",
        detail: "Continue straight on the palm-lined road.",
        landmark: "Palm trees",
        direction: "straight",
        image: "step_palm_road",
        distance: "100m"
      },
      {
        id: 3,
        instruction: "Turn LEFT at the signboard onto the pedestrian walkway",
        detail: "At the REVA direction signboard, take a left and continue walking on the pedestrian path.",
        landmark: "REVA direction signboard",
        direction: "left",
        image: "step_signboard",
        distance: "50m"
      },
      {
        id: 4,
        instruction: "Walk straight past the academic blocks",
        detail: "Continue along the path. You'll pass Kuvempu Auditorium, C.V. Raman Block, Research Centre, and Architecture Block.",
        landmark: "Academic blocks along the way",
        direction: "straight",
        image: "step_tree_walkway",
        distance: "250m"
      },
      {
        id: 5,
        instruction: "Turn RIGHT at the bottom toward Central Library",
        detail: "At the end of the path near Rangasthala, take a right turn. The Central Library is ahead on the right side.",
        landmark: "Rangasthala area, path curves right",
        direction: "right",
        image: "step_library_approach",
        distance: "100m"
      },
      {
        id: 6,
        instruction: "You've arrived at Central Library!",
        detail: "The library entrance is ahead. Multiple floors with digital resources and reading areas.",
        landmark: "Library entrance",
        direction: "arrived",
        image: "step_library_arrival",
        distance: "0m"
      }
    ]
  },

  // --- Main Gate → Nartana Nirnaya ---
  {
    id: "gate_to_nartana",
    from: "main_gate",
    to: "nartana_nirnaya",
    distance: "320m",
    time: "4 min",
    accessibility: true,
    steps: [
      {
        id: 1,
        instruction: "Enter through the Main Gate past Security",
        detail: "Walk past the security booth.",
        landmark: "Security booth",
        direction: "straight",
        image: "step_gate_entry",
        distance: "50m"
      },
      {
        id: 2,
        instruction: "Walk straight along the main palm tree road",
        detail: "Continue on the main road.",
        landmark: "Palm trees",
        direction: "straight",
        image: "step_palm_road",
        distance: "100m"
      },
      {
        id: 3,
        instruction: "Turn LEFT at the signboard onto the walkway",
        detail: "At the REVA direction signboard, take a left turn onto the pedestrian walkway.",
        landmark: "REVA direction signboard",
        direction: "left",
        image: "step_signboard",
        distance: "50m"
      },
      {
        id: 4,
        instruction: "Turn RIGHT and look for Nartana Nirnaya across the lawn",
        detail: "Take a right. On the right side past the green lawn, you'll see Nartana Nirnaya with its distinctive dome structure.",
        landmark: "Green lawn, dome visible",
        direction: "right",
        image: "step_nartana_view",
        distance: "120m"
      },
      {
        id: 5,
        instruction: "You've arrived at Nartana Nirnaya!",
        detail: "The performing arts venue is ahead with its distinctive dome. Also near TEDx REVA University area.",
        landmark: "Dome structure, REVA signage",
        direction: "arrived",
        image: "step_nartana_arrival",
        distance: "0m"
      }
    ]
  }
];

// ============================================================
// MAP DATA — SVG coordinates for each building on the 2D map
// (x, y as percentages of the map canvas)
// Based on hand-drawn campus layout by user
// Main Gate = top-left, path goes right then down
// ============================================================
const MAP_POINTS = {
  // --- From the user's sketch (accurate positions) ---
  main_gate: { x: 8, y: 8, label: "Main Gate" },
  kuvempu: { x: 22, y: 28, label: "Kuvempu Aud." },
  cv_raman: { x: 20, y: 45, label: "C.V. Raman Block" },
  research_centre: { x: 28, y: 60, label: "Research Centre" },
  architecture: { x: 18, y: 78, label: "Architecture Block" },
  rangasthala: { x: 38, y: 82, label: "Rangasthala" },
  library: { x: 68, y: 88, label: "Library" },

  // --- Sign board waypoints (on the right-side path) ---
  // signboard_top is at top-right, signboard_mid is mid-right

  // --- Other buildings (placed based on campus context) ---
  admin_block: { x: 50, y: 10, label: "Admin Block" },
  admissions: { x: 65, y: 10, label: "Admissions" },
  chanakya: { x: 78, y: 15, label: "Chanakya Aud." },
  business_school: { x: 82, y: 28, label: "Business School" },
  race: { x: 85, y: 40, label: "RACE" },
  visvesvaraya: { x: 35, y: 38, label: "Visvesvaraya Block" },
  vivekananda: { x: 48, y: 50, label: "Vivekananda Block" },
  saugandhika: { x: 55, y: 35, label: "Saugandhika" },
  nartana_nirnaya: { x: 58, y: 65, label: "Nartana Nirnaya" },
  coe: { x: 42, y: 68, label: "Centre of Excellence" },
  cdc: { x: 80, y: 55, label: "CDC" },
  alumni: { x: 82, y: 68, label: "Alumni Cell" },
  reva_nest: { x: 52, y: 78, label: "REVA Nest" },
};

// Path connections for drawing routes on the map
// Based on the user's sketch showing connected walkways
const MAP_PATHS = [
  // Main gate path going right along the top
  { from: "main_gate", to: "admin_block" },
  { from: "admin_block", to: "admissions" },
  { from: "admissions", to: "chanakya" },

  // Right side path going down
  { from: "chanakya", to: "business_school" },
  { from: "business_school", to: "race" },
  { from: "race", to: "cdc" },
  { from: "cdc", to: "alumni" },
  { from: "alumni", to: "library" },

  // Left side path going down from gate area
  { from: "main_gate", to: "kuvempu" },
  { from: "kuvempu", to: "cv_raman" },
  { from: "kuvempu", to: "visvesvaraya" },
  { from: "cv_raman", to: "research_centre" },
  { from: "research_centre", to: "architecture" },
  { from: "architecture", to: "rangasthala" },
  { from: "rangasthala", to: "library" },

  // Cross connections (internal paths)
  { from: "visvesvaraya", to: "vivekananda" },
  { from: "vivekananda", to: "saugandhika" },
  { from: "saugandhika", to: "admin_block" },
  { from: "vivekananda", to: "nartana_nirnaya" },
  { from: "research_centre", to: "coe" },
  { from: "coe", to: "nartana_nirnaya" },
  { from: "nartana_nirnaya", to: "alumni" },
  { from: "rangasthala", to: "reva_nest" },
  { from: "reva_nest", to: "library" },
];

// ============================================================
// QR ENTRY POINTS
// ============================================================
const QR_ENTRIES = [
  { id: "main_gate_qr", location: "Main Gate", nodeId: "main_gate", description: "Primary campus entrance" },
  { id: "parking_qr", location: "Parking Area", nodeId: "main_gate", description: "Near parking lot" },
];
