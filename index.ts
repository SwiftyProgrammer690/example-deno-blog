import blog from "https://deno.land/x/blog@0.3.3/blog.tsx";

blog({
  title: "My Blog",
  author: "Swarit",
  avatar: "./avatar.svg",
  avatarClass: "full",
  links: [
    { title: "GitHub", url: "https://github.com/SwiftyProgrammer690" },
  ],
  background: "#fff",
  favicon: "./favicon.svg",
  description: "My blog",
});