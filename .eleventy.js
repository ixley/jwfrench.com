// const sass = require("sass"); // Dart Sass
// const pluginRev = require("eleventy-plugin-rev");
// const eleventySass = require("eleventy-sass");
const fs = require("fs");
// const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  // let haml = require("hamljs");
  // eleventyConfig.setLibrary("haml", haml);

  // eleventyConfig.addPlugin(pluginRev);
  // eleventyConfig.addPlugin(eleventySass, {
  //   rev: true,
  // });
  eleventyConfig.addFilter("bust", (url) => {
    const [urlPart, paramPart] = url.split("?");
    const params = new URLSearchParams(paramPart || "");
    const relativeUrl =
      urlPart.charAt(0) == "/" ? urlPart.substring(1) : urlPart;

    try {
      const fileStats = fs.statSync(relativeUrl);
      const dateTimeModified = new DateTime(fileStats.mtime).toFormat("X");

      params.set("v", dateTimeModified);
    } catch (error) {}

    return `${urlPart}?${params}`;
  });

  // `file.html` instead of `file/index.html`
  eleventyConfig.addGlobalData("permalink", () => {
    return (data) =>
      `${data.page.filePathStem}.${data.page.outputFileExtension}`;
  });

  // Watch these directories for changes
  eleventyConfig.addWatchTarget("./src");

  // Copy Passthrough files without processing
  eleventyConfig.addPassthroughCopy("all.js");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy({ "./src/assets/favicon": "." }); // Copy favicons over
  eleventyConfig.addPassthroughCopy({ "./src/assets/images": "/images" }); // Copy image directory
  eleventyConfig.addPassthroughCopy({
    "./src/assets/Jeff-French-Resume.pdf": ".",
  });

  // // Image plugin
  // eleventyConfig.addPlugin(Image, {
  //   // Set global default options
  //   formats: ["png", "jpg"],
  //   urlPath: "/images/",

  //   // Notably `outputDir` is resolved automatically
  //   // to the project output directory

  //   defaultAttributes: {
  //     loading: "lazy",
  //     decoding: "async",
  //   },
  // });

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  eleventyConfig.setUseGitIgnore(false);

  // Input + Output directories
  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
