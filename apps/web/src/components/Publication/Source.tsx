import { apps } from '@hey/data/apps';
import { STATIC_IMAGES_URL } from '@hey/data/constants';
import type { AnyPublication } from '@hey/lens';
import getAppName from '@hey/lib/getAppName';
import { isMirrorPublication } from '@hey/lib/publicationHelpers';
import { Tooltip } from '@hey/ui';
import { type FC } from 'react';

interface SourceProps {
  publication: AnyPublication;
}

const Source: FC<SourceProps> = ({ publication }) => {
  const targetPublication = isMirrorPublication(publication)
    ? publication.mirrorOn
    : publication;
  const { publishedOn } = targetPublication;
  const show = apps.includes(publishedOn?.id);

  if (!show) {
    return null;
  }

  const appName = getAppName(publishedOn?.id);

  return (
    <Tooltip content={appName} placement="top">
      <img
        className="w-4"
        src={`${STATIC_IMAGES_URL}/source/${publishedOn?.id}.jpeg`}
        alt={appName}
      />
    </Tooltip>
  );
};

export default Source;
