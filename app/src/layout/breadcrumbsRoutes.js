export default [
  { path: '/app/klasses', name: 'schedule' },
  { path: '/app/programs/*/lessons/*/sections', exact: true, name: 'sections' },
  { path: '/app/programs/*/lessons/', exact: true, name: 'lessons' },
  { path: '/app/programs', exact: true, name: 'programs' },
  { path: '/app/lessons', exact: true, name: 'lessons' },
  { path: '/app/vocabularies', exact: true, name: 'vocabularies' },
  { path: '/app/vocabularies/*/words', exact: true, name: 'words' },
  { path: '/app', exact: true, name: 'home' },
];

export function buildRoutes(pathname) {
  const routes = [];
  customeRoutes.forEach((routeOption) => {
    const route = {};
    const match = pathname.match(routeOption.pathRegex);
    if (!match) {
      return;
    }
    const {0: matchString, index } = match;
    route.starts = index;
    route.ends = index + matchString.length;
    const [_id, childName] = matchString.split('/');
    route.id = _id
    route.name = routeOption.name
    route.entityName = routeOption.entityName;
    route.path = pathname.substring(0, route.ends);
    routes.push(route);
  });
  return routes;
}

export const customeRoutes = [
  {
    pathRegex: /app/,
    name: "Home"
  },
  {
    pathRegex: /programs/,
    name: "Programs"
  },
  {
    pathRegex: /app\/lessons/,
    name: "Lessons"
  },
  {
    pathRegex: /[a-z0-9]{24}\/lessons/,
    entityName: 'programs',
  },
  {
    pathRegex: /[a-z0-9]{24}\/sections/,
    entityName: 'lessons',
  },
  {
    pathRegex: /vocabularies/,
    name: 'Vocabularies',
  },
  {
    pathRegex: /[a-z0-9]{24}\/words/,
    entityName: 'vocabs',
  },
];
