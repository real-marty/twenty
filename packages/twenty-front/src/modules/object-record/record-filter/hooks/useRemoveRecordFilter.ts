import { AdvancedFilterContext } from '@/object-record/advanced-filter/states/context/AdvancedFilterContext';
import { currentRecordFiltersComponentState } from '@/object-record/record-filter/states/currentRecordFiltersComponentState';
import { useRecoilComponentCallbackStateV2 } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentCallbackStateV2';
import { getSnapshotValue } from '@/ui/utilities/state/utils/getSnapshotValue';
import { useContext } from 'react';
import { useRecoilCallback } from 'recoil';

export const useRemoveRecordFilter = () => {
  const currentRecordFiltersCallbackState = useRecoilComponentCallbackStateV2(
    currentRecordFiltersComponentState,
  );

  const { onUpdate } = useContext(AdvancedFilterContext);

  const removeRecordFilterCallback = useRecoilCallback(
    ({ set, snapshot }) =>
      ({ recordFilterId }: { recordFilterId: string }) => {
        const currentRecordFilters = getSnapshotValue(
          snapshot,
          currentRecordFiltersCallbackState,
        );

        const foundRecordFilterInCurrentRecordFilters =
          currentRecordFilters.some(
            (existingFilter) => existingFilter.id === recordFilterId,
          );

        if (foundRecordFilterInCurrentRecordFilters) {
          set(currentRecordFiltersCallbackState, (currentRecordFilters) => {
            const newCurrentRecordFilters = [...currentRecordFilters];

            const indexOfFilterToRemove = newCurrentRecordFilters.findIndex(
              (existingFilter) => existingFilter.id === recordFilterId,
            );

            newCurrentRecordFilters.splice(indexOfFilterToRemove, 1);

            return newCurrentRecordFilters;
          });
        }
      },
    [currentRecordFiltersCallbackState],
  );

  const removeRecordFilter = ({
    recordFilterId,
  }: {
    recordFilterId: string;
  }) => {
    removeRecordFilterCallback({ recordFilterId });
    onUpdate?.();
  };

  return {
    removeRecordFilter,
  };
};
