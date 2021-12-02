import useMoralis from './useMoralis'
import useMoralisWeb3API from './useMoralisWeb3Api'
import { ref, watchEffect } from 'vue' 

const { user, isAuthenticated, chainId } = useMoralis()
const { account } = useMoralisWeb3API()

const nativeBalance = ref(null)
const isLoading = ref(false)

function getNativeBalance () {
    if(!isAuthenticated.value || !chainId.value) return;
    isLoading.value = true
    account.getNativeBalance(
    {
        chain: chainId.value,
        address: user.value.get('ethAddress')
    }
    )
    .then((result) => nativeBalance.value = (result.balance * Math.pow(10,(-18)) ))
    .catch((error) => console.log(error))
    isLoading.value = false
}

watchEffect(() => user.value && chainId.value ? getNativeBalance() : null)

export { getNativeBalance, nativeBalance, isLoading }