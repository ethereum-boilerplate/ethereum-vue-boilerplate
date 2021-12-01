<template>
<div style="display: flex; align-items: center">
 <img :src="tokenInfo?.logo" width="25" height="25"/> <p>{{tokenInfo?.symbol}}</p> <p>${{price?.toFixed(7)}}</p>
</div>
</template>

<script>
import useMoralisWeb3Api from '../hooks/useMoralisWeb3Api'
import { ref, watchEffect } from 'vue'
export default {
    props: {
        address: String,
        chain: String
    },
    setup(props) {
        
        const { token } = useMoralisWeb3Api()
        const price = ref(null)
        const tokenInfo = ref(null)

        watchEffect(() => console.log(props.address, props.chain))

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
            tokenInfo
        }
    }
}
</script>

<style>
p {
    margin: 0px;
}
</style>