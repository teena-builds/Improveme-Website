export default function BlogsLoadingPage() {
  return (
    <main className="min-h-screen bg-[#f4f6fa]">
      <section className="relative overflow-hidden bg-[#002D62] pb-14 pt-20 md:pb-20 md:pt-28">
        <div className="section-container">
          <div className="h-4 w-28 rounded-full bg-white/30" />
          <div className="mt-4 h-12 max-w-3xl rounded-full bg-white/25" />
          <div className="mt-4 h-5 max-w-2xl rounded-full bg-white/20" />
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="section-container grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-[24px] border border-[#d9e1ec] bg-white p-6">
              <div className="aspect-[1.38/1] rounded-[14px] bg-[#eaf0fb]" />
              <div className="mt-5 h-4 w-36 rounded-full bg-[#edf2f8]" />
              <div className="mt-4 h-6 w-full rounded-full bg-[#edf2f8]" />
              <div className="mt-3 h-6 w-3/4 rounded-full bg-[#edf2f8]" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
