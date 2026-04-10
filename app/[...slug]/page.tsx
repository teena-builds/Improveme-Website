import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InteractiveHtml } from "../../components/interactive-html";
import { allStaticSlugs, getPageByRoute, getRoutePathFromSlug } from "../../lib/site";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  return allStaticSlugs;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageByRoute(getRoutePathFromSlug(slug));

  if (!page) {
    return {
      title: "Improve ME Institute Clone",
    };
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPageByRoute(getRoutePathFromSlug(slug));

  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <InteractiveHtml html={page.html} />
    </main>
  );
}
