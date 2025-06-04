import { useSetRecoilState } from 'recoil';
import { isDefined } from 'twenty-shared/utils';
import { useCheckCustomDomainValidRecordsMutation } from '~/generated/graphql';
import { customDomainRecordsState } from '~/pages/settings/workspace/states/customDomainRecordsState';

export const useCheckCustomDomainValidRecords = () => {
  const [checkCustomDomainValidRecords] =
    useCheckCustomDomainValidRecordsMutation();

  const setCustomDomainRecords = useSetRecoilState(customDomainRecordsState);

  const checkCustomDomainRecords = () => {
    setCustomDomainRecords((currentState) => ({
      ...currentState,
      isLoading: true,
    }));
    checkCustomDomainValidRecords({
      onCompleted: (data) => {
        // setCustomDomainRecords((currentState) => ({
        //   ...currentState,
        //   isLoading: false,
        //   ...(isDefined(data.checkCustomDomainValidRecords)
        //     ? { customDomainRecords: data.checkCustomDomainValidRecords }
        //     : {}),
        // }));
        if (isDefined(data.checkCustomDomainValidRecords)) {
          setCustomDomainRecords({
            isLoading: false,
            customDomainRecords: data.checkCustomDomainValidRecords,
          });
        }
      },
    });
  };

  return {
    checkCustomDomainRecords,
  };
};
