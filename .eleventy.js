// const sass = require("sass"); // Dart Sass

module.exports = function (eleventyConfig) {
  // let haml = require("hamljs");
  // eleventyConfig.setLibrary("haml", haml);

  // `file.html` instead of `file/index.html`
  eleventyConfig.addGlobalData("permalink", () => {
    return (data) =>
      `${data.page.filePathStem}.${data.page.outputFileExtension}`;
  });

  // Watch these directories for changes
  eleventyConfig.addWatchTarget("./src");

  // Copy Passthrough files without processing
  eleventyConfig.addPassthroughCopy("all.js");
  // eleventyConfig.addPassthroughCopy({ "./src/assets/js": "js" });

  // Copy favicons over
  eleventyConfig.addPassthroughCopy({ "./src/assets/favicon": "." });
  // Copy image directory
  eleventyConfig.addPassthroughCopy({ "./src/assets/images": "/images" });

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  eleventyConfig.setUseGitIgnore(false);

  // Input + Output directories
  return {
    dir: {
      input: "src",
      output: "public",
    },
    pathPrefix: "/public/",
  };
};
