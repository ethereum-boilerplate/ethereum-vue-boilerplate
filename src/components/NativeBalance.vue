<template>
  <div v-if="isAuthenticated" style="display: flex; justify-content: center;" >
    <img width="25" height="25" :src="imgUrl"/>
    <p style="margin: 0 0 0 .25em; align-self: center">{{( nativeBalance > 0 ? nativeBalance.toFixed(4) : 0 )}} {{currencySymbol}}</p>
  </div>
</template>

<script>
import useMoralis from '../hooks/useMoralis.js'
import { getNativeByChain } from '../helpers/networks.js'
import { nativeBalance } from '../hooks/useNativeBalance.js'
import { ref, watchEffect } from 'vue'
export default {
    setup() {
        const { chainId, isAuthenticated } = useMoralis()
        const imgUrl = ref("")
        const currencySymbol = ref("")
        

        watchEffect(() => 
        chainId.value === "0x1" ? 
        imgUrl.value = "https://www.pngkey.com/png/detail/264-2645294_download-svg-download-png-ethereum-png.png" 
        : chainId.value === "0x38" ?
        imgUrl.value = "https://assets.trustwalletapp.com/blockchains/smartchain/info/logo.png" 
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