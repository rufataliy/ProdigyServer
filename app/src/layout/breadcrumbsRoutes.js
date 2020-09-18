export default [
  { path: "/app/klasses", name: "schedule" },
  { path: "/app/programs/*/lessons/*/sections", exact: true, name: "sections" },
  { path: "/app/programs/*/lessons/", exact: true, name: "lessons" },
  { path: "/app/programs", exact: true, name: "programs" },
  { path: "/app/lessons", exact: true, name: "lessons" },
  { path: "/app/vocabularies", exact: true, name: "vocabularies" },
  { path: "/app/vocabularies/*/words", exact: true, name: "words" },
  { path: "/app", exact: true, name: "home" },
];
