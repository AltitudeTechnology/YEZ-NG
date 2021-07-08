export default [
  {
    href: "/",
    label: "Home"
  },
  {
    href: "/about",
    label: "About Us",
  },
  {
    // href: "/jobs",
    label: "Jobs",
    hasSubMenu: true,
    sub: [
      {
        href: "/jobs",
        label: "Job Seekers"
      },
      {
        href: "/jobs",
        label: "Employers"
      },
      {
        href: "/jobs",
        label: "Job Centers"
      },
      {
        href: "/jobs",
        label: "Career Advice"
      },
    ]
  },
  {
    // href: "/jobs",
    label: "Entrepreneurship",
    hasSubMenu: true,
    sub: [
      {
        href: "/jobs",
        label: "LOREM IPSUM DOLOR"
      },
      {
        href: "/jobs",
        label: "Employers"
      },
      {
        href: "/jobs",
        label: "Job Centers"
      },
      {
        href: "/jobs",
        label: "Career Advice"
      },
    ]
  },
  {
    href: "/news",
    label: "News"
  },
  {
    href: "/donate",
    label: "Donate",
    donateLink: true
  },
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
})
