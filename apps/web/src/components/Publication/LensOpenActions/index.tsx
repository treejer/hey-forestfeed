import { TreeCollectedIcon, TreeCollectIcon } from '@components/Common/Icon';
import { RectangleStackIcon } from '@heroicons/react/24/outline';
import { RectangleStackIcon as RectangleStackIconSolid } from '@heroicons/react/24/solid';
import { PUBLICATION } from '@hey/data/tracking';
import type { AnyPublication } from '@hey/lens';
import humanize from '@hey/lib/humanize';
import nFormatter from '@hey/lib/nFormatter';
import { isMirrorPublication } from '@hey/lib/publicationHelpers';
import { Modal, Tooltip } from '@hey/ui';
import cn from '@hey/ui/cn';
import { Leafwatch } from '@lib/leafwatch';
import { motion } from 'framer-motion';
import plur from 'plur';
import type { FC } from 'react';
import React, { useState } from 'react';

import { FOREST_FEED_APP_NAME } from '../../../constants';
import List from './List';

interface OpenActionProps {
  publication: AnyPublication;
  showCount: boolean;
}

const OpenAction: FC<OpenActionProps> = ({ publication, showCount }) => {
  const [showOpenActionModal, setShowOpenActionModal] = useState(false);
  const targetPublication = isMirrorPublication(publication)
    ? publication?.mirrorOn
    : publication;

  const hasActed = targetPublication.operations.hasActed.value;
  const { countOpenActions } = targetPublication.stats;

  const iconClassName = showCount
    ? 'w-[17px] sm:w-[20px]'
    : 'w-[15px] sm:w-[18px]';

  const isForestFeed = publication?.publishedOn?.id === FOREST_FEED_APP_NAME;

  return (
    <>
      <div
        className={cn(
          hasActed
            ? isForestFeed
              ? 'text-[#78B682]'
              : 'text-brand-500'
            : 'ld-text-gray-500',
          'flex items-center space-x-1'
        )}
      >
        <motion.button
          className={cn(
            hasActed
              ? `${
                  isForestFeed
                    ? 'hover:bg-[#78B682]/20'
                    : 'hover:bg-brand-300/20'
                } outline-brand-500`
              : 'outline-gray-400 hover:bg-gray-300/20',
            'rounded-full p-1.5 outline-offset-2'
          )}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setShowOpenActionModal(true);
            Leafwatch.track(PUBLICATION.COLLECT_MODULE.OPEN_COLLECT);
          }}
          aria-label="Action"
        >
          <Tooltip
            placement="top"
            content={`${humanize(countOpenActions)} ${plur(
              'Action',
              countOpenActions
            )}`}
            withDelay
          >
            {hasActed ? (
              isForestFeed ? (
                <TreeCollectedIcon className={iconClassName} />
              ) : (
                <RectangleStackIconSolid className={iconClassName} />
              )
            ) : isForestFeed ? (
              <TreeCollectIcon className={iconClassName} />
            ) : (
              <RectangleStackIcon className={iconClassName} />
            )}
          </Tooltip>
        </motion.button>
        {countOpenActions > 0 && !showCount ? (
          <span
            className={`text-[11px] sm:text-xs ${
              publication?.publishedOn?.id === FOREST_FEED_APP_NAME &&
              'text-[#78B682]'
            }`}
          >
            {nFormatter(countOpenActions)}
          </span>
        ) : null}
      </div>
      <Modal
        title="Open Actions"
        icon={<RectangleStackIcon className="text-brand-500 h-5 w-5" />}
        show={showOpenActionModal}
        onClose={() => setShowOpenActionModal(false)}
      >
        <List publication={publication} />
      </Modal>
    </>
  );
};

export default OpenAction;
