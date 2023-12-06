import { TreeCollectIcon } from '@components/Common/Icon';
import { APP_NAME } from '@hey/data/constants';
import { Card } from '@hey/ui';
import Link from 'next/link';

import { FOREST_FEED_APP_URL } from '../../../constants';

function CreateCampaign() {
  return (
    <Card
      as="aside"
      className="mb-4 space-y-4 !border-green-600 !bg-green-50 p-5 text-green-600 dark:bg-green-900"
    >
      <div className="flex items-center space-x-2 font-bold">
        <TreeCollectIcon className="stroke-green-600" />
        <Link
          href={FOREST_FEED_APP_URL}
          target="_blank"
          rel="noreferrer noopener"
        >
          Create campaign on {APP_NAME} profile
        </Link>
      </div>
    </Card>
  );
}

export default CreateCampaign;
