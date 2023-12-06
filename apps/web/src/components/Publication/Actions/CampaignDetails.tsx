import { InformationCircleIcon } from '@heroicons/react/24/outline';
import type { PublicationId } from '@lens-protocol/metadata';
import Tippy from '@tippyjs/react';
import axios from 'axios';
import type { FC } from 'react';
import { useState } from 'react';

import type { Campaign } from '../../../constants';
import { CampaignStatus, FOREST_FEED_API_URL } from '../../../constants';

const POPOVER_SHOW_ANIMATION_MS = 100;
const POPOVER_HIDE_ANIMATION_MS = 0;

export type CampaignInfoProps = {
  publicationId: PublicationId;
};

type CampaignDetailState = {
  loading: boolean;
  error: string;
  data: Campaign | null;
};

const CampaignInfo: FC<CampaignInfoProps> = ({ publicationId }) => {
  const [campaignDetail, setCampaignDetail] = useState<CampaignDetailState>({
    loading: true,
    data: null,
    error: ''
  });

  const handleGetCampaignDetail = async () => {
    try {
      const { data: campaignRes } = await axios.get(
        `${FOREST_FEED_API_URL}/publications/${publicationId}/campaigns`
      );
      setCampaignDetail({
        data: campaignRes.data,
        error: '',
        loading: false
      });
    } catch (error: any) {
      console.log(error, 'error is fetch campaign detail');
      setCampaignDetail((prevState) => ({
        ...prevState,
        data: null,
        error: error?.response?.data?.message
      }));
    } finally {
      setCampaignDetail((prevState) => ({
        ...prevState,
        loading: false
      }));
    }
  };

  const Item = ({
    name,
    value,
    showLabel = true,
    className
  }: {
    name: string;
    value: string | number;
    showLabel?: boolean;
    className?: string;
  }) => {
    return (
      <div className={`flex items-center justify-start ${className}`}>
        {showLabel ? <span>{name}:</span> : null}
        <span className="ml-0.5">{value}</span>
      </div>
    );
  };

  const campaignStatus = (status: CampaignStatus) => {
    if (status === CampaignStatus.active) {
      return 'active';
    }
    if (status === CampaignStatus.notActive) {
      return 'not active';
    }
    if (status === CampaignStatus.finished) {
      return 'finished';
    } else {
      return 'unknown';
    }
  };

  const iconClassName = 'w-[17px] sm:w-[20px]';

  const CampaignDetail = () => {
    if (campaignDetail?.loading) {
      return (
        <div className="flex flex-col dark:bg-gray-900">
          <div className="horizontal-loader w-full">
            <div />
          </div>
          <div className="flex p-3">
            <div>...</div>
          </div>
        </div>
      );
    }

    if (campaignDetail?.error || !campaignDetail.data) {
      return (
        <div className="flex h-20 items-center justify-center rounded-xl bg-white dark:bg-gray-900">
          <p className="text-center">{campaignDetail.error}</p>
        </div>
      );
    }

    return (
      <div className="min-h-20 rounded-xl bg-white p-3 dark:bg-gray-900">
        <p className="mb-3 text-center font-bold">Campaign</p>
        <Item
          name="Title"
          value={campaignDetail.data.title}
          className="mb-3 text-lg"
        />
        <div className="mb-2 flex items-end justify-between">
          <div>
            <Item
              name="Is follower only"
              value={campaignDetail.data.isFollowerOnly ? 'Yes' : 'No'}
            />
            {campaignDetail.data.minimumFollower > 0 ? (
              <Item
                name="Minimum followers"
                value={campaignDetail.data.minimumFollower}
                className="text-xs"
              />
            ) : null}
          </div>
          <Item
            name="collected"
            value={`${campaignDetail.data.awardedCount}/${campaignDetail.data.campaignSize}`}
            showLabel={false}
            className={`${
              campaignDetail.data.awardedCount ===
              campaignDetail.data.campaignSize
                ? 'bg-green-500'
                : 'bg-brand-500'
            } rounded-[5px] px-2 py-1 text-white`}
          />
        </div>
        <Item
          name="status"
          value={campaignStatus(campaignDetail.data.status)}
          showLabel={false}
          className="w-full items-center justify-center rounded-[5px] bg-[#EBF1E9] py-1 dark:text-black"
        />
      </div>
    );
  };

  return (
    <div
      onMouseOver={!campaignDetail.data ? handleGetCampaignDetail : undefined}
      onFocus={!campaignDetail.data ? handleGetCampaignDetail : undefined}
    >
      <Tippy
        placement="top"
        delay={[POPOVER_SHOW_ANIMATION_MS, POPOVER_HIDE_ANIMATION_MS]}
        hideOnClick={false}
        content={<CampaignDetail />}
        arrow={false}
        interactive
        zIndex={1000}
        className="preview-tippy-content hidden w-64 !rounded-xl border !bg-white !text-black dark:border-gray-700 dark:!bg-black dark:!text-white md:block"
        appendTo={() => document.body}
      >
        <span>
          <InformationCircleIcon className={iconClassName} />
        </span>
      </Tippy>
    </div>
  );
};

export default CampaignInfo;
