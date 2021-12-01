<template>
<!-- TODO: Add Logo to Chain + Styling -->
<div>
    Current Chain : {{ getNativeByChain(chainId) }}
</div>
</template>

<script>
import useMoralis from '../hooks/useMoralis'
import { getNativeByChain } from '../helpers/networks'
export default {
    setup() {
        const { chainId } = useMoralis();

        return {
            chainId,
            getNativeByChain
        }
    }
}
</script>

<style>

</style>