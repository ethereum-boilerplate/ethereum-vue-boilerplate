<template>
  <div v-if="isAuthenticated" style="display: flex; border: 1px solid black; border-radius: 0.25em; padding: 0.25em; margin: auto; justify-content: center; align-items: center; background-color: white; height: 35px;" >
    <img width="25" height="25" :src="imgUrl"/>
    <p style="margin: 0px; align-self: center">{{( nativeBalance > 0 ? nativeBalance.toFixed(4) : 0 )}} {{currencySymbol}}</p>
  </div>
</template>

<script>
import useMoralis from '../composables/useMoralis.js'
import { getNativeByChain } from '../helpers/networks.js'
import { nativeBalance } from '../composables/useNativeBalance.js'
import { ref, watchEffect } from 'vue'
export default {
    setup() {
        const { chainId, isAuthenticated } = useMoralis()
        const imgUrl = ref("")
        const currencySymbol = ref("")
        

        watchEffect(() => 
        chainId.value === "0x1" ? 
        imgUrl.value = "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=014" 
        : chainId.value === "0x38" ?
        imgUrl.value = "https://cryptologos.cc/logos/binance-coin-bnb-logo.svg?v=014" 
        : chainId.value === "0xa86a" ?
        imgUrl.value = "https://cryptologos.cc/logos/avalanche-avax-logo.png" 
        : chainId.value === "0x89" ? 
        imgUrl.value = "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=014" 
        : null
        )

        watchEffect(() => chainId.value ? currencySymbol.value = getNativeByChain(chainId.value) : null)

        return {
            nativeBalance,
            imgUrl,
            currencySymbol,
            isAuthenticated
        }
    }
}
</script>

<style>

</style>