import AnnouncementMarquee from '@/components/website/annoucementMarquee';
import HeroSlider from '@/components/website/Banner';
import CitizenInteraction from '@/components/website/CitizenInteraction';
import EssentialServices from '@/components/website/EssentialServices';
import Footer from '@/components/website/footer';
import GovernmentLinksSlider from '@/components/website/govtLinks';
import InfoTabs from '@/components/website/InfoTabs';
import LeadersStrip from '@/components/website/Leadership';
import NewsUpdates from '@/components/website/NewsUpdates';
import OfficialsBanner from '@/components/website/OfficialsBanner';
import ShegaonDarshan from '@/components/website/ShegaonDarshan';
import Header from '@/components/website/subHeader';
import TopUtilityBar from '@/components/website/TopUtilityBar';

export default function HomePage() {
  return (
    <div>
      <TopUtilityBar />
      <Header />
      <HeroSlider />
      <AnnouncementMarquee />
      <LeadersStrip/>
      <InfoTabs />
      <ShegaonDarshan />
      <CitizenInteraction />
      <GovernmentLinksSlider />
      <EssentialServices />
      <OfficialsBanner />
      <NewsUpdates />
      <Footer />
    </div>
  );
}
