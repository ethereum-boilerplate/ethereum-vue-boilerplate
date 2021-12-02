import useMoralis from './useMoralis'
import useMoralisWeb3API from './useMoralisWeb3Api'
import { ref, watchEffect } from 'vue' 

const { Moralis, user, isAuthenticated, chainId } = useMoralis()
const { account, token } = useMoralisWeb3API()

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
        if(result.result.length < 1) {
            isLoading.value = false  
            return;
        }
        getMetaData(result.result)
        .then((res) => {
            console.log(res)
            erc20Transfers.value = res
            isLoading.value = false
        })
    })
    .catch((err) => {
        error.value = err
        isLoading.value = false
    })
}

async function getMetaData (result) {

    const tokens = []
    result.map((tx) => {
        tokens.push(tx.address)
    })

    await token.getTokenMetadata({
        addresses: tokens,
        chain: chainId.value
    })
    .then((res) => {
        result.map((tx) => {
            for(let i = 0; i < res.length; i++) {
                if(tx.address === res[i].address) {
                    tx.in = user.value?.get('ethAddress') === tx.from_address ? false : true
                    tx.symbol = res[i].symbol
                    tx.logo = res[i].logo
                    tx.val = `${Number(Moralis.Units.FromWei(tx.value, res[i].decimals)).toFixed(4)}`
                    return;
                }
            }
        })
    })
    .catch((err) => {
        error.value = err
        isLoading.value = false
    })
    return result
}

watchEffect(() => user.value && chainId.value ? getERC20Transfers() : null)

export { getERC20Transfers, erc20Transfers, isLoading, error }