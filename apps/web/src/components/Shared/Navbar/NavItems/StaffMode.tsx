import { ShieldCheckIcon as ShieldCheckIconOutline } from '@heroicons/react/24/outline';
import { ShieldCheckIcon as ShieldCheckIconSolid } from '@heroicons/react/24/solid';
import { HEY_API_URL } from '@hey/data/constants';
import { STAFFTOOLS } from '@hey/data/tracking';
import getPreferences from '@hey/lib/api/getPreferences';
import cn from '@hey/ui/cn';
import getAuthWorkerHeaders from '@lib/getAuthWorkerHeaders';
import { Leafwatch } from '@lib/leafwatch';
import axios from 'axios';
import { Magic } from 'magic-sdk';
import { type FC, useState } from 'react';
import { toast } from 'react-hot-toast';
import { usePreferencesStore } from 'src/store/non-persisted/usePreferencesStore';
import { useFeatureFlagsStore } from 'src/store/persisted/useFeatureFlagsStore';
import useProfileStore from 'src/store/persisted/useProfileStore';
import { useEffectOnce } from 'usehooks-ts';

interface StaffModeProps {
  className?: string;
}

const StaffMode: FC<StaffModeProps> = ({ className = '' }) => {
  const currentProfile = useProfileStore((state) => state.currentProfile);
  const staffMode = useFeatureFlagsStore((state) => state.staffMode);
  const setStaffMode = useFeatureFlagsStore((state) => state.setStaffMode);
  const preferences = usePreferencesStore((state) => state.preferences);
  const [magic, setMagic] = useState<Magic | null>(null);

  useEffectOnce(() => {
    const magic = new Magic('pk_live_945624918503908C');
    setMagic(magic);
  });

  const toggleStaffMode = async () => {
    const authAndSetStaffMode = async () => {
      try {
        if (!staffMode) {
          if (!preferences.email) {
            throw new Error();
          }

          const response = await magic?.auth.loginWithMagicLink({
            email: preferences.email
          });

          if (!response) {
            throw new Error();
          }
        }

        await axios.post(
          `${HEY_API_URL}/internal/feature/updateStaffMode`,
          { enabled: !staffMode },
          { headers: getAuthWorkerHeaders() }
        );
      } catch (error) {
        throw error;
      }
    };

    toast.promise(authAndSetStaffMode(), {
      loading: 'Toggling staff mode...',
      success: () => {
        getPreferences(currentProfile?.id, getAuthWorkerHeaders());
        setStaffMode(!staffMode);
        Leafwatch.track(STAFFTOOLS.TOGGLE_MODE);

        return 'Staff mode toggled!';
      },
      error: 'Failed to toggle staff mode!'
    });
  };

  return (
    <button
      onClick={toggleStaffMode}
      className={cn(
        'flex w-full items-center space-x-1.5 px-2 py-1.5 text-sm text-gray-700 dark:text-gray-200',
        className
      )}
    >
      {staffMode ? (
        <ShieldCheckIconSolid className="h-4 w-4 text-green-600" />
      ) : (
        <ShieldCheckIconOutline className="h-4 w-4 text-red-500" />
      )}
      <div>Staff mode</div>
    </button>
  );
};

export default StaffMode;
