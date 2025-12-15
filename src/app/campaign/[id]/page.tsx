import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CampaignSection } from "@/components/campaign-section"
import { campaigns } from "@/data/campaigns"
import { Button } from "@/components/ui/button"
import { Bookmark, ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const campaign = campaigns.find((c) => c.id === Number(id)) ?? campaigns[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#171a00] to-black text-white">
      <Navbar />

      <main className="pt-24 pb-12">
     

        {/* Content */}
        <section className="max-w-[1344px] mx-auto px-4 space-y-10">
          {/* Title + back + bookmark */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-[#cced00] hover:text-[#d6ff2f] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Link>
              <Button
                size="icon"
                variant="outline"
                className="h-10 w-10 rounded-full border-white/30 bg-black/40 hover:bg-black/60"
                aria-label="Save campaign"
              >
                <Bookmark className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl md:text-[32px] font-semibold leading-snug">
                Ikea adds to its sleep campaign with a series of striking posters
              </h1>
              <p className="text-base text-white/80">By {campaign.brand}</p>
            </div>
          </div>
             {/* Hero gallery */}
        <section className="mb-12">
          <div className="max-w-[1068px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="aspect-[3/5] rounded-[10px] overflow-hidden border border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                <Image
                  src={campaign.image}
                  alt={campaign.title}
                  width={600}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/5] rounded-[10px] overflow-hidden border border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.2)] hidden md:block">
                <Image
                  src={campaign.image}
                  alt={campaign.title}
                  width={600}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/5] rounded-[10px] overflow-hidden border border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.2)] hidden md:block">
                <Image
                  src={campaign.image}
                  alt={campaign.title}
                  width={600}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
        </section>
        {/* Meta chips moved above first large image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
  <rect width="30" height="30" rx="15" fill="#1D1D1D"/>
  <path d="M6 17.501V18.501C6 20.7101 7.79086 22.501 10 22.501C11.6569 22.501 13 21.1578 13 19.501V18.501C13 17.3964 13.8954 16.501 15 16.501C16.1046 16.501 17 17.3964 17 18.501V19.501C17 21.1578 18.3431 22.501 20 22.501C22.2091 22.501 24 20.7101 24 18.501V17.501" stroke="#CEF000" stroke-width="2" stroke-linecap="round"/>
  <path d="M16.999 17.5H23.999L21.3239 9.47456C21.124 8.87499 20.6091 8.43502 19.9857 8.33112C18.9457 8.15779 17.999 8.95978 17.999 10.0141V10.5" stroke="#CEF000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13 17.5H6L8.67515 9.47456C8.875 8.87499 9.3899 8.43502 10.0133 8.33112C11.0533 8.15779 12 8.95978 12 10.0141V10.5" stroke="#CEF000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>                <span className="text-white text-base">Furniture</span>
              </div>
              <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
  <rect width="30" height="30" rx="15" fill="#1D1D1D"/>
  <path d="M6 17.501V18.501C6 20.7101 7.79086 22.501 10 22.501C11.6569 22.501 13 21.1578 13 19.501V18.501C13 17.3964 13.8954 16.501 15 16.501C16.1046 16.501 17 17.3964 17 18.501V19.501C17 21.1578 18.3431 22.501 20 22.501C22.2091 22.501 24 20.7101 24 18.501V17.501" stroke="#CEF000" stroke-width="2" stroke-linecap="round"/>
  <path d="M16.999 17.5H23.999L21.3239 9.47456C21.124 8.87499 20.6091 8.43502 19.9857 8.33112C18.9457 8.15779 17.999 8.95978 17.999 10.0141V10.5" stroke="#CEF000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13 17.5H6L8.67515 9.47456C8.875 8.87499 9.3899 8.43502 10.0133 8.33112C11.0533 8.15779 12 8.95978 12 10.0141V10.5" stroke="#CEF000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>                    <span className="text-white text-base">July 2023</span>
              </div>
              <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
  <rect width="30" height="30" rx="15" fill="#1D1D1D"/>
  <path d="M15 6.29998C15 4.32008 15 3.33013 14.341 2.71505C13.682 2.09998 12.6213 2.09998 10.5 2.09998H7.5C5.37868 2.09998 4.31802 2.09998 3.65901 2.71505C3 3.33013 3 4.32008 3 6.29998V11.0793C3 12.9576 3 13.8968 3.63322 14.184C4.26644 14.4713 5.05766 13.891 6.6401 12.7306L7.14654 12.3592C8.03632 11.7067 8.48121 11.3804 9 11.3804C9.5188 11.3804 9.96369 11.7067 10.8535 12.3592L11.3599 12.7306C12.9423 13.891 13.7336 14.4713 14.3668 14.184C15 13.8968 15 12.9576 15 11.0793V6.29998Z" stroke="#CEF000" stroke-width="2"/>

</svg>
                   <span className="text-white text-base">Pillows</span>
              </div>
              <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
  <rect width="30" height="30" rx="15" fill="#1D1D1D"/>
  <path d="M6 17.501V18.501C6 20.7101 7.79086 22.501 10 22.501C11.6569 22.501 13 21.1578 13 19.501V18.501C13 17.3964 13.8954 16.501 15 16.501C16.1046 16.501 17 17.3964 17 18.501V19.501C17 21.1578 18.3431 22.501 20 22.501C22.2091 22.501 24 20.7101 24 18.501V17.501" stroke="#CEF000" stroke-width="2" stroke-linecap="round"/>
  <path d="M16.999 17.5H23.999L21.3239 9.47456C21.124 8.87499 20.6091 8.43502 19.9857 8.33112C18.9457 8.15779 17.999 8.95978 17.999 10.0141V10.5" stroke="#CEF000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13 17.5H6L8.67515 9.47456C8.875 8.87499 9.3899 8.43502 10.0133 8.33112C11.0533 8.15779 12 8.95978 12 10.0141V10.5" stroke="#CEF000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>                    <span className="text-white text-base">Amoux</span>
              </div>
              <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
  <rect width="30" height="30" rx="15" fill="#1D1D1D"/>
  <path d="M6 17.501V18.501C6 20.7101 7.79086 22.501 10 22.501C11.6569 22.501 13 21.1578 13 19.501V18.501C13 17.3964 13.8954 16.501 15 16.501C16.1046 16.501 17 17.3964 17 18.501V19.501C17 21.1578 18.3431 22.501 20 22.501C22.2091 22.501 24 20.7101 24 18.501V17.501" stroke="#CEF000" stroke-width="2" stroke-linecap="round"/>
  <path d="M16.999 17.5H23.999L21.3239 9.47456C21.124 8.87499 20.6091 8.43502 19.9857 8.33112C18.9457 8.15779 17.999 8.95978 17.999 10.0141V10.5" stroke="#CEF000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13 17.5H6L8.67515 9.47456C8.875 8.87499 9.3899 8.43502 10.0133 8.33112C11.0533 8.15779 12 8.95978 12 10.0141V10.5" stroke="#CEF000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>                    <span className="text-white text-base">Social Media &amp; TV</span>
              </div>
              <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
  <rect width="30" height="30" rx="15" fill="#1D1D1D"/>
  <path d="M6 17.501V18.501C6 20.7101 7.79086 22.501 10 22.501C11.6569 22.501 13 21.1578 13 19.501V18.501C13 17.3964 13.8954 16.501 15 16.501C16.1046 16.501 17 17.3964 17 18.501V19.501C17 21.1578 18.3431 22.501 20 22.501C22.2091 22.501 24 20.7101 24 18.501V17.501" stroke="#CEF000" stroke-width="2" stroke-linecap="round"/>
  <path d="M16.999 17.5H23.999L21.3239 9.47456C21.124 8.87499 20.6091 8.43502 19.9857 8.33112C18.9457 8.15779 17.999 8.95978 17.999 10.0141V10.5" stroke="#CEF000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13 17.5H6L8.67515 9.47456C8.875 8.87499 9.3899 8.43502 10.0133 8.33112C11.0533 8.15779 12 8.95978 12 10.0141V10.5" stroke="#CEF000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>                    <span className="text-white text-base">Billboards</span>
              </div>
              <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
  <rect width="30" height="30" rx="15" fill="#1D1D1D"/>
  <path d="M6 17.501V18.501C6 20.7101 7.79086 22.501 10 22.501C11.6569 22.501 13 21.1578 13 19.501V18.501C13 17.3964 13.8954 16.501 15 16.501C16.1046 16.501 17 17.3964 17 18.501V19.501C17 21.1578 18.3431 22.501 20 22.501C22.2091 22.501 24 20.7101 24 18.501V17.501" stroke="#CEF000" stroke-width="2" stroke-linecap="round"/>
  <path d="M16.999 17.5H23.999L21.3239 9.47456C21.124 8.87499 20.6091 8.43502 19.9857 8.33112C18.9457 8.15779 17.999 8.95978 17.999 10.0141V10.5" stroke="#CEF000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13 17.5H6L8.67515 9.47456C8.875 8.87499 9.3899 8.43502 10.0133 8.33112C11.0533 8.15779 12 8.95978 12 10.0141V10.5" stroke="#CEF000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>                    <span className="text-white text-base">Australia</span>
              </div>
            </div>

          {/* Body copy + meta + large images */}
          <div className="space-y-8 max-w-[1344px]">
            <p className="text-[20px] leading-relaxed text-[#f3f3f3] text-justify">
              One of the more documented side effects of the Covid-19 pandemic is the impact it is having on our sleep,
              with the situation described as the “perfect storm of sleep problems”. Ikea’s new ad campaign, which
              focuses on the benefits of sleeping well, is therefore nothing if not timely.
            </p>
            <p className="text-[20px] leading-relaxed text-[#f3f3f3] text-justify">
              The brand launched the first part of the campaign earlier this month, with a TV spot that spelt out how a
              lack of sleep (and a big night on the town) affected the hare’s ability to race the next day.
            </p>
            <p className="text-[20px] leading-relaxed text-[#f3f3f3] text-justify">
              Mother has now followed the spot with a series of clever and smartly designed posters which sees products
              such as energy drinks, anti-aging creams and vitamin supplements – all of which are intended to imitate
              the effects of a good night’s sleep – filled with Ikea bedding replicating the liquids, pills and creams.
            </p>

            

            <div className="border border-white/20 rounded-[10px] overflow-hidden">
              <Image
                src="/ikea-sleep-campaign-outdoor-billboard-on-street.jpg"
                alt="Ikea sleep campaign street billboard"
                width={1344}
                height={903}
                className="w-full h-auto object-cover"
              />
            </div>

            <p className="text-[20px] leading-relaxed text-[#f3f3f3] text-justify">
              The striking visuals were shot by photographer Amy Currell, using large-scale models designed by Andy
              Knight Ltd to house the Ikea bedding.
            </p>

            <div className="border border-white/20 rounded-[10px] overflow-hidden">
              <Image
                src="/ikea-sleep-campaign-poster-with-sleep-jar-product.jpg"
                alt="Ikea sleep campaign poster"
                width={1344}
                height={903}
                className="w-full h-auto object-cover"
              />
            </div>

            <p className="text-[20px] leading-relaxed text-[#f3f3f3] text-justify">
              It’s been a strong week for advertising posters, with the Ikea work following Uncommon’s release of a
              series of equally arresting visuals for B&amp;Q. Both campaigns go to show the power that the
              good&nbsp;old-fashioned poster can have when well designed, especially when also shared across social
              media.
            </p>
          </div>

          {/* Related sections */}
          <div className="mt-16 space-y-10">
            <CampaignSection title="My Campaigns" campaigns={campaigns.slice(0, 5)} viewMoreLink="/my-campaigns" />
            <CampaignSection title="You Might Like" campaigns={campaigns.slice(0, 5)} viewMoreLink="/you-might-like" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
