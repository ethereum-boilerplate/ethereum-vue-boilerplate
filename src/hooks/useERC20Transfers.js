import useMoralis from './useMoralis'
import useMoralisWeb3API from './useMoralisWeb3Api'
import { ref, watchEffect } from 'vue' 

const { user, isAuthenticated, chainId } = useMoralis()
const { account } = useMoralisWeb3API()

const erc20Transfers = ref(null)
const isLoading = ref(false)
const error = ref(null)

function getERC20Transfers () {
    if(!isAuthenticated.value || !chainId.value) return;
    isLoading.value = true
    account.getTokenTransfers(
    {
        chain: chainId.value,
        address: user.value.get('ethAddress')
    }
    )
    .then((result) => {
        erc20Transfers.value = result.result
        isLoading.value = false
    })
    .catch((err) => {
        error.value = err
        isLoading.value = false
    })
}

watchEffect(() => user.value && chainId.value ? getERC20Transfers() : null)

export { getERC20Transfers, erc20Transfers, isLoading, error }