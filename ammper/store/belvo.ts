import type { Institution, InstitutionsResponse } from '~/types/institution';
import type { ApiResponse } from '~/types/api';
import type { AccountsResponse, ErrorResponse } from '~/types/account';

export const useBelvoStore = defineStore('belvo', {
  state() {
    return {
      institutions: <Institution[]>[],
      account: <AccountsResponse | null>null
    };
  },
  actions: {
    async fetchInstitutions(): Promise<ApiResponse<InstitutionsResponse>> {
      const config = useRuntimeConfig();
      const token = useCookie('token');
      try {
        const response = await $fetch<InstitutionsResponse>(
          config.public.BASE_URL,
          {
            method: 'get',
            query: {
              controller: 'belvo',
              action: 'get_institutions',
            },
            headers: {
              Authorization: `JWT ${ token.value }`,
            },
          },
        );
        this.institutions = response.results;
        return {
          status: true,
          response,
        };
      } catch (e: any) {
        return {
          status: false,
          response: e.data,
        };
      }
    },
    async getAccount(institution: string): Promise<ApiResponse<AccountsResponse | ErrorResponse[]>> {
      const config = useRuntimeConfig();
      const token = useCookie('token');
      try {
        const response = await $fetch<AccountsResponse>(config.public.BASE_URL, {
          method: 'get',
          query: {
            controller: 'belvo',
            action: 'get_account',
            institution
          },
          headers: {
            Authorization: `JWT ${ token.value }`,
          },
        });
        this.account = response;
        return {
          status: true,
          response
        };
      } catch (e: any) {
        console.error(e);
        return {
          status: false,
          response: e.data
        };
      }
    },
    async getTransactions(institution: string, accountID: string) {
      const config = useRuntimeConfig();
      const token = useCookie('token');
      try {
        const response = await $fetch<AccountsResponse>(config.public.BASE_URL, {
          method: 'get',
          query: {
            controller: 'belvo',
            action: 'get_transactions',
            institution,
            account_id: accountID
          },
          headers: {
            Authorization: `JWT ${ token.value }`,
          },
        });
        console.log(response)
        return {
          status: true,
          response
        };
      } catch (e: any) {
        console.error(e);
        return {
          status: false,
          response: e.data
        };
      }
    }
  },
});