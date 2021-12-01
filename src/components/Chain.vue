<template>
<!-- TODO: Add Logo to Chain + Styling -->
<div v-if="isAuthenticated" style="color: white">
    Current Chain : {{ getNativeByChain(chainId) }}
</div>
</template>

<script>
import useMoralis from '../hooks/useMoralis'
import { getNativeByChain } from '../helpers/networks'
export default {
    setup() {
        const { isAuthenticated, chainId } = useMoralis();

        return {
            chainId,
            isAuthenticated,
            getNativeByChain
        }
    }
}
</script>

<style>

</style>