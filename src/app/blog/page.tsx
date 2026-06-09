import type { Metadata } from "next";
import Link from "next/link";
import { posts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articoli, guide e approfondimenti su sviluppo web, design e tecnologia firmati Magiu.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
      <p className="mt-6 text-lg text-muted">
        Guide e approfondimenti su sviluppo web, design e tecnologia.
      </p>

      <div className="mt-12 space-y-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand"
          >
            <p className="text-sm text-muted">{formatDate(post.date)}</p>
            <h2 className="mt-2 text-xl font-semibold">
              <Link href={`/blog/${post.slug}`} className="hover:text-brand">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-muted">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-4 inline-block text-sm font-medium text-brand hover:underline"
            >
              Leggi l&apos;articolo →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
