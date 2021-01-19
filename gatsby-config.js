module.exports = {
  siteMetadata: {
    title: "sew-pal",
  },
  plugins: [
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "jkl",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    // "gatsby-plugin-sitemap",
    // {
    //   siteMetadata: {
    //     siteUrl: `myurl`
    //   }
    // },
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};
