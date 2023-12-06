import CreateCampaign from '@components/Home/Sidebar/CreateCampaign';
import Footer from '@components/Shared/Footer';
import { type FC, memo } from 'react';
import useProfileStore from 'src/store/persisted/useProfileStore';

import EnableLensManager from './EnableLensManager';
import HeyMembershipNft from './HeyMembershipNft';
import RecommendedProfiles from './RecommendedProfiles';
import SetProfile from './SetProfile';
import StaffPicks from './StaffPicks';
import Waitlist from './Waitlist';

const Sidebar: FC = () => {
  const currentProfile = useProfileStore((state) => state.currentProfile);

  const loggedInWithProfile = Boolean(currentProfile);
  const loggedOut = !loggedInWithProfile;

  return (
    <>
      {/* <Gitcoin /> */}
      <CreateCampaign />
      {loggedOut && <Waitlist />}
      {loggedInWithProfile && <HeyMembershipNft />}
      {/* Onboarding steps */}
      {loggedInWithProfile && (
        <>
          <EnableLensManager />
          <SetProfile />
        </>
      )}
      {/* Recommendations */}
      <StaffPicks />
      {loggedInWithProfile && <RecommendedProfiles />}
      <Footer />
    </>
  );
};

export default memo(Sidebar);
