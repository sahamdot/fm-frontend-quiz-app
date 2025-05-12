export const categoryIcon: {
  [key: string]: {
    name: string;
    color: { foreground: string; background: string };
  };
} = {
  html: {
    name: "fluent:code-16-regular",
    color: {
      foreground: "text-html",
      background: "bg-[#FFF1E9]",
    },
  },
  css: {
    name: "fluent:paint-brush-20-regular",
    color: {
      foreground: "text-css",
      background: "bg-[#E0FDEF]",
    },
  },
  javascript: {
    name: "fluent:javascript-16-regular",
    color: {
      foreground: "text-blue",
      background: "bg-[#EBF0FF]",
    },
  },
  accessibility: {
    name: "fluent:accessibility-16-regular",
    color: {
      foreground: "text-purple",
      background: "bg-[#F6E7FF]",
    },
  },
};
