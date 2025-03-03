module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  },
  theme: {
    extend: {
      backgroundImage: {
        "header-gradient": "linear-gradient(270deg, #35A1DA 0%, #324AAD 100%)",
      },
      boxShadow: {
        "custom-light": "0px 0px 0.84px 0px #30497433",
        "custom-dark": "0px 0.84px 4px -1px #2E4F8833",
      },
      colors: {
        "gray-fade": "rgba(89, 86, 86, 0.65)",
      },
    },
  },
};
