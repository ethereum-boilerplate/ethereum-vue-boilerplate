import useMoralis from './useMoralis'
import useMoralisWeb3API from './useMoralisWeb3Api'
import { ref, watchEffect } from 'vue' 

const { user, isAuthenticated, chainId } = useMoralis()
const { account } = useMoralisWeb3API()

const erc20Balances = ref(null)
const isLoading = ref(false)
const error = ref(null)

function getERC20Balances () {
    if(!isAuthenticated.value || !chainId.value) return
    isLoading.value = true
    account.getTokenBalances(
    {
        chain: chainId.value,
        address: user.value.get('ethAddress')
    }
    )
    .then((result) => {
        erc20Balances.value = result
        isLoading.value = false
    })
    .catch((err) => {
        error.value = err
        isLoading.value = false
    } )
}


watchEffect(() => user.value && chainId.value ? getERC20Balances() : null)

export { getERC20Balances, erc20Balances, isLoading, error }