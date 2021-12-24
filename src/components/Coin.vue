<template>
<div v-if="isAuthenticated" style="display: flex; justify-content: center">
 <img :src="tokenInfo?.logo" width="25" height="25"/> <p style="margin: 0px;">{{tokenInfo?.symbol}}</p> <p style="margin: 0px;">${{price?.toFixed(7)}}</p>
</div>
</template>

<script>
import useMoralisWeb3Api from '../composables/useMoralisWeb3Api'
import useMoralis from '../composables/useMoralis'
import { ref, watchEffect } from 'vue'
export default {
    props: {
        address: String,
        chain: String
    },
    setup(props) {

        const { isAuthenticated } = useMoralis()
        const { token } = useMoralisWeb3Api()
        const price = ref(null)
        const tokenInfo = ref(null)

        watchEffect(() => {
            if(!props.address || !props.chain) return;
            token.getTokenPrice({
            address: props.address,
            chain: props.chain
            })
            .then((result) => {
                console.log(result)
                price.value = result.usdPrice
            })
            .catch((error) => console.log(error))

            token.getTokenMetadata({
                addresses: props.address,
                chain: props.chain
            })
            .then((result) => {
                tokenInfo.value = result[0]
            })
            .catch((error) => console.log(error))
        })



        return {
            price,
            tokenInfo,
            isAuthenticated
        }
    }
}
</script>

<style>
p {
    margin: 0px;
}
</style>
