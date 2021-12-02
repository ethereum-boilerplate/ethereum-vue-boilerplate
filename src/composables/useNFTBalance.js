import useMoralis from './useMoralis'
import useMoralisWeb3API from './useMoralisWeb3Api'
import { ref, watchEffect } from 'vue' 

const nftBalance = ref([])
const { user, isAuthenticated, chainId } = useMoralis()
const { account } = useMoralisWeb3API()
const isLoading = ref(false)
const error = ref(null)

function getNFTBalance () {
    if(!isAuthenticated.value || !chainId.value) return;
    isLoading.value = true
    account.getNFTs(
    {
        chain: chainId.value,
        address: user.value?.get('ethAddress')
    }
    )
    .then((result) => {
        nftBalance.value = result.result
        isLoading.value = false
    })
    .catch((err) => {
        error.value = err
        isLoading.value = false
    })
}

watchEffect(() => user.value && chainId.value ? getNFTBalance() : nftBalance.value = [])

export { getNFTBalance, nftBalance, isLoading }