import type { Metadata } from "next";
import { HomepageClone } from "../components/homepage-clone";
import { getPageByRoute } from "../lib/site";

const homePage = getPageByRoute("/");

export const metadata: Metadata = {
  title: homePage?.title ?? "Improve ME Institute Clone",
  description: homePage?.description ?? "Improve ME Institute homepage clone.",
};

export default function HomePage() {
  return <HomepageClone />;
}
