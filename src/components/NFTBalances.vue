<template>
<div>
    <a-card v-for="nft in nftBalance" :key="nft.token_address">
        <img width="200" height="200" :src="nft.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/GHS-pictogram-unknown.svg/900px-GHS-pictogram-unknown.svg.png'"/>
        <p>{{nft.name}}</p>
    </a-card>
</div>
</template>

<script>
import { getNFTBalance, nftBalance, isLoading } from '../composables/useNFTBalance'
import useMoralis from '../composables/useMoralis'
import { watchEffect } from 'vue'
export default {
    setup() {
        const { isAuthenticated } = useMoralis()

        watchEffect(() => isAuthenticated ? getNFTBalance() : null)
        watchEffect(() => nftBalance.value.map((nft) => nft.image = JSON.parse(nft?.metadata)?.image))
        
        return {
            getNFTBalance,
            nftBalance,
            isLoading
        }
    }
}
</script>

<style>

</style>