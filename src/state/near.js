
export { accountSuffix, networkId, contractId, walletUrl } from '../../utils/near-utils';
import getConfig from '../../utils/config';
const { networkId, contractId } = getConfig();
import { getSelector, getAccount, viewFunction, functionCall as _functionCall } from '../utils/wallet-selector-compat'

export const initNear = () => async ({ update, getState }) => {

	const selector = await getSelector({
		networkId,
		contractId,
		onAccountChange: async (accountId) => {
			if (!accountId) {
				return update('app.loading', false)
			}
			console.log('Current Account:', accountId)
		}
	})
	
	const account = await getAccount()
	selector.accountId = account.accountId
	selector.functionCall = _functionCall
	selector.viewFunction = viewFunction

	await update('', { wallet: selector });
};
