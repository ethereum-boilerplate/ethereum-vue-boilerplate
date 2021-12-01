<template>
<div v-if="isAuthenticated">
    <p>ERC20 Balances</p>
    <a-table :columns="columns" :data-source="mutatedBalances" :loading="isLoading" :rowKey="(record) => record.token_address">
    </a-table>
</div>
</template>

<script>
import { getERC20Balances, erc20Balances, isLoading } from '../hooks/useERC20Balance'
import useMoralis from '../hooks/useMoralis'
import { ref, watchEffect } from 'vue'
export default {

    setup() {
        const { Moralis, isAuthenticated, chainId } = useMoralis()

        const mutatedBalances = ref(null)

        const columns = [
            { title: 'logo', dataIndex: 'logo', key: 'logo', slots: { title: 'logo' } },
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Symbol', dataIndex: 'symbol', key: 'symbol' },
            { title: 'Balance', dataIndex: 'balance', key: 'balance' }
        ]

        const mutate = () => {
            if(!chainId.value) return;
            isLoading.value = true
            let temp = erc20Balances.value
            temp.map((token) => {
                token.logo  = <img width="50" heigth="50" src={`${token.logo || "https://etherscan.io/images/main/empty-token.png"}`}/>
                token.balance = `${parseFloat(Moralis.Units.FromWei(token.balance, token.decimals).toFixed(6))}`
            })
            mutatedBalances.value = temp
            isLoading.value = false
        }

        watchEffect(() => erc20Balances.value ? mutate() : null)
        
        getERC20Balances()

        return{
            getERC20Balances,
            mutatedBalances,
            columns,
            isAuthenticated,
            isLoading
        }
    }
}
</script>

<style>

</style>