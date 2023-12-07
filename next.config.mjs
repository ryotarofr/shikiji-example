/**
 * @typedef {import('next').NextConfig} NextConfig
 * @typedef {Array<((config: NextConfig) => NextConfig)>} NextConfigPlugins
 */
import fs from "node:fs";
import nextMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

/** @type {NextConfigPlugins} */
const plugins = [];

/** @type {NextConfig} */
const nextConfig = {
  output: "export",
  cleanDistDir: true,
  reactStrictMode: true,
};

/** @type {import('rehype-pretty-code').Options} */
const options = {
  keepBackground: false,
  theme: JSON.parse(
    fs.readFileSync(
      new URL("./assets/moonlight-ii.json", import.meta.url),
      "utf-8"
    )
  ),
};

plugins.push(
  nextMDX({
    extension: /\.mdx?$/,
    options: {
      providerImportSource: "@mdx-js/react",
      remarkPlugins: [],
      rehypePlugins: [[rehypePrettyCode, options], rehypeSlug],
    },
  })
);

export default () => plugins.reduce((_, plugin) => plugin(_), nextConfig);
