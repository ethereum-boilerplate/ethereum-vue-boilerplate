import useMoralis from './useMoralis'
import useMoralisWeb3API from './useMoralisWeb3Api'
import { ref, watchEffect } from 'vue' 

const { user, isAuthenticated, chainId } = useMoralis()
const { account } = useMoralisWeb3API()

const nativeTransactions = ref(null)
const isLoading = ref(false)
const error = ref(null)

function getNativeTransactions () {
    if(!isAuthenticated.value || !chainId.value) return;
    isLoading.value = true
    account.getTransactions(
    {
        chain: chainId.value,
        address: user.value.get('ethAddress')
    }
    )
    .then((result) =>{
        result.result.map((tx) => {
            tx.in = user.value?.get('ethAddress') === tx.from_address ? false : true
        })
        nativeTransactions.value = result.result
        isLoading.value = false
    })
    .catch((err) => {
        error.value = err
        isLoading.value = false
    })
}

watchEffect(() => user.value && chainId.value ? getNativeTransactions() : null)

export { getNativeTransactions, nativeTransactions, isLoading, error }