import CampaignInfo from '@components/Publication/Actions/CampaignDetails';
import { type AnyPublication } from '@hey/lens';
import getPublicationViewCountById from '@hey/lib/getPublicationViewCountById';
import isOpenActionAllowed from '@hey/lib/isOpenActionAllowed';
import { isMirrorPublication } from '@hey/lib/publicationHelpers';
import stopEventPropagation from '@hey/lib/stopEventPropagation';
import Image from 'next/image';
import { type FC, memo } from 'react';
import { useImpressionsStore } from 'src/store/non-persisted/useImpressionsStore';
import { useFeatureFlagsStore } from 'src/store/persisted/useFeatureFlagsStore';
import useProfileStore from 'src/store/persisted/useProfileStore';

import { FOREST_FEED_APP_NAME, FOREST_FEED_APP_URL } from '../../../constants';
import OpenAction from '../LensOpenActions';
import Comment from './Comment';
import Like from './Like';
import Mod from './Mod';
import ShareMenu from './Share';
import Views from './Views';

interface PublicationActionsProps {
  publication: AnyPublication;
  showCount?: boolean;
}

const PublicationActions: FC<PublicationActionsProps> = ({
  publication,
  showCount = false
}) => {
  const targetPublication = isMirrorPublication(publication)
    ? publication.mirrorOn
    : publication;
  const currentProfile = useProfileStore((state) => state.currentProfile);
  const gardenerMode = useFeatureFlagsStore((state) => state.gardenerMode);
  const publicationViews = useImpressionsStore(
    (state) => state.publicationViews
  );
  const hasOpenAction = (targetPublication.openActionModules?.length || 0) > 0;

  const canMirror = currentProfile
    ? targetPublication.operations.canMirror
    : true;
  const canAct =
    hasOpenAction && isOpenActionAllowed(targetPublication.openActionModules);
  const views = getPublicationViewCountById(
    publicationViews,
    targetPublication
  );

  return (
    <div className="-ml-2 mt-3 flex flex-col">
      <span
        className="flex flex-wrap items-center gap-x-6 gap-y-1 sm:gap-8"
        onClick={stopEventPropagation}
      >
        <Comment publication={publication} showCount={showCount} />
        {canMirror ? (
          <ShareMenu publication={publication} showCount={showCount} />
        ) : null}
        <Like publication={publication} showCount={showCount} />
        {canAct ? (
          <OpenAction publication={publication} showCount={showCount} />
        ) : null}
        {views > 0 ? <Views views={views} showCount={showCount} /> : null}
        {gardenerMode ? (
          <Mod publication={publication} isFullPublication={showCount} />
        ) : null}
      </span>
      {publication?.publishedOn?.id === FOREST_FEED_APP_NAME &&
      publication.__typename === 'Post' ? (
        <div className="mt-2 flex w-full items-center justify-between rounded-[16px] bg-[#EBF1E9] p-3 text-sm  dark:bg-gray-900 dark:group-hover:bg-black">
          <div className="mr-3">
            <p className="font-bold">Impactful Post</p>
            <p className="flex items-center">
              Mirror this post and plant one tree via
              <a
                className="ml-0.5 text-[#3174D8]"
                href={FOREST_FEED_APP_URL}
                target="_blank"
                rel="noreferrer noopener"
              >
                Forest Feed
              </a>
              <Image
                className="ml-1"
                src="/forestTree.svg"
                alt="lesnter"
                width={20}
                height={20}
                draggable={false}
                loading="lazy"
              />
            </p>
          </div>
          <div className="flex items-center">
            <CampaignInfo publicationId={publication.id} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default memo(PublicationActions);
