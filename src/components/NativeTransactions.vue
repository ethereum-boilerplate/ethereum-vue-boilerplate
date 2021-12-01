<template>
<div v-if="isAuthenticated">
    <p>Transactions</p>
    <a-table :columns="columns" :data-source="mutatedTransfers" :loading="isLoading" :rowKey="(record) => record.hash"/>
</div>
</template>

<script>
import { nativeTransactions, isLoading } from '../hooks/useNativeTransactions'
import useMoralis from '../hooks/useMoralis'
import { getExplorer, getNativeByChain } from '../helpers/networks'
import { getEllipsisTxt } from '../helpers/formatters'
import { ref, watchEffect } from 'vue'
export default {

    setup() {
        const { chainId, isAuthenticated, utils } = useMoralis()

        const mutatedTransfers = ref(null)

        const columns = [
            { title: 'Value', dataIndex: 'val', key: 'val' },
            { title: 'From', dataIndex: 'from', key: 'from' },
            { title: 'To', dataIndex: 'from', key: 'to' },
            { title: 'Tx', dataIndex: 'link' ,key: 'link' }
        ]
        

        const mutate = () => {
            if(!chainId.value) return;
            isLoading.value = true
            let temp = nativeTransactions.value
            temp.map((transfer) => {
                transfer.link = <a href={`${getExplorer(chainId.value)}tx/${transfer.hash}`} target="_blank">{getEllipsisTxt(transfer.hash, 4)}</a> 
                transfer.from = getEllipsisTxt(transfer.from_address, 5)
                transfer.to = getEllipsisTxt(transfer.to_address, 5)
                transfer.val = `${( transfer.value > 0 ? Number(utils.fromWei(transfer.value)).toFixed(4) : 0 )} ${getNativeByChain(chainId.value)}`
            })
            mutatedTransfers.value = temp
            isLoading.value = false
        }

        watchEffect(() => nativeTransactions.value ? mutate() : null)

        return {
            nativeTransactions,
            isAuthenticated,
            columns,
            mutatedTransfers,
            isLoading
        }
    }

}
</script>

<style>

</style>