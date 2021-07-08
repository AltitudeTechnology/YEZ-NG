export default {
  items: [
    {
      name: 'Dashboard',
      url: '/user',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    },
    {
      name: 'Profile',
      url: '/user/profile',
      icon: 'icon-user',
    },
    {
      name: 'Verification',
      url: '/verified',
      icon: 'icon-docs',
    },
    /*{
      name: 'Messages',
      url: '/dashboard',
      icon: 'icon-envelope',
      badge: {
        variant: 'success',
        text: '5 NEW'
      }
    },*/
    {
      name: 'Jobs',
      url: '/dashboard',
      icon: 'icon-feed',
      badge: {
        variant: 'success',
        text: '4 NEW'
      }
    },
    // {
    //   title: true,
    //   name: 'Outlets',
    //   wrapper: {            // optional wrapper object
    //     element: '',        // required valid HTML5 element tag
    //     attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
    //   },
    //   class: ''             // optional class names space delimited list for title item ex: "text-center"
    // },
    // {
    //   name: 'TV Stations',
    //   url: '/theme/colors',
    //   icon: 'icon-screen-desktop',
    // },
    // {
    //   name: 'Newspaper',
    //   url: '/theme/typography',
    //   icon: 'icon-book-open',
    // },
    // {
    //   name: 'Radio Stations',
    //   url: '/theme/colors',
    //   icon: 'icon-globe',
    // },
    // {
    //   name: 'Blogs',
    //   url: '/theme/typography',
    //   icon: 'icon-pencil',
    // }
  ]
};
