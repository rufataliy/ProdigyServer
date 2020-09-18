import { home, lesson, programs, schedule, vocabularies } from "../icons";

export default [
  {
    _tag: "CSidebarNavItem",
    name: "Home",
    to: "/app",
    icon: { content: home },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Schedule",
    to: "/app/klasses",
    icon: { content: schedule },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Programs",
    to: "/app/programs",
    icon: { content: programs },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Lessons",
    to: "/app/lessons",
    icon: { content: lesson },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Vocabulary",
    to: "/app/vocabularies",
    icon: { content: vocabularies },
  },
];
