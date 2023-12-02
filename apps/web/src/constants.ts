import { IS_MAINNET } from '@hey/data/constants';
import { polygon, polygonMumbai } from 'wagmi/chains';

export const CHAIN_ID = IS_MAINNET ? polygon.id : polygonMumbai.id;

export const FOREST_FEED_APP_NAME =
  process.env.NEXT_PUBLIC_FOREST_FEED_APP_NAME;
export const FOREST_FEED_API_URL = process.env.NEXT_PUBLIC_FOREST_FEED_API_URL;
export const FOREST_FEED_APP_URL = process.env.NEXT_PUBLIC_FOREST_FEED_APP_URL;

export enum CampaignStatus {
  active,
  notActive,
  finished
}

export type PendingReward = {
  _id: string;
  from: string;
  to: string;
  amount: number;
  campaignId: string;
  isDistributed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Campaign = {
  title: string;
  campaignSize: number;
  awardedCount: number;
  isFollowerOnly: boolean;
  minimumFollower: number;
  status: CampaignStatus;
  createdAt: string;
  updatedAt: string;
  pendingRewards: PendingReward[];
};
