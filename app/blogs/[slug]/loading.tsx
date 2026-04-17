export default function BlogDetailLoadingPage() {
  return (
    <main className="min-h-screen bg-[#f4f6fa]">
      <section className="py-8 md:py-10">
        <div className="section-container">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="rounded-[24px] border border-[#dfe4ee] bg-white p-7 md:p-8">
              <div className="h-4 w-40 rounded-full bg-[#edf2f8]" />
              <div className="mt-5 h-10 w-11/12 rounded-full bg-[#edf2f8]" />
              <div className="mt-3 h-10 w-3/4 rounded-full bg-[#edf2f8]" />
              <div className="mt-8 aspect-[16/9] rounded-[20px] bg-[#eaf0fb]" />
              <div className="mt-8 h-4 w-full rounded-full bg-[#edf2f8]" />
              <div className="mt-3 h-4 w-11/12 rounded-full bg-[#edf2f8]" />
              <div className="mt-3 h-4 w-10/12 rounded-full bg-[#edf2f8]" />
            </div>
            <div className="rounded-[24px] border border-[#dfe4ee] bg-white p-5">
              <div className="h-8 w-40 rounded-full bg-[#edf2f8]" />
              <div className="mt-5 space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-20 rounded-[14px] bg-[#f3f6fb]" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
