<template>
  <div v-if="isAuthenticated">
      <p>ERC20 Transfers</p>
    <a-table :columns="columns" :data-source="mutatedTransfers" :loading="isLoading" :rowKey="(record) => record.key"/>
  </div>
</template>

<script>
import { getEllipsisTxt } from '../helpers/formatters'
import useMoralis from '../hooks/useMoralis'
import { getERC20Transfers, erc20Transfers, isLoading } from '../hooks/useERC20Transfers'
import { getExplorer } from '../helpers/networks'
import { ref, watchEffect } from 'vue'
export default {

    setup() {

        const { chainId, isAuthenticated } = useMoralis()

        const mutatedTransfers = ref(null)

        const columns = [
            { title: 'Tx', dataIndex: 'link' ,key: 'link' },
            { title: 'From', dataIndex: 'from', key: 'from' },
            { title: 'To', dataIndex: 'from', key: 'to' },
        ]
        

        const mutate = () => {
            if(!chainId.value) return;
            isLoading.value = true
            let key = 0;
            let temp = erc20Transfers.value
            temp.map((transfer) => {
                transfer.key = key.toString()
                transfer.link = <a href={`${getExplorer(chainId.value)}tx/${transfer.transaction_hash}`} target="_blank">{getEllipsisTxt(transfer.transaction_hash)}</a> 
                transfer.from = getEllipsisTxt(transfer.from_address, 5)
                transfer.to = getEllipsisTxt(transfer.to_address, 5)
                key++
            })
            mutatedTransfers.value = temp
            isLoading.value = false
        }

        watchEffect(() => erc20Transfers.value ? mutate() : null)
        
        getERC20Transfers()

        return{
        getERC20Transfers,
        isAuthenticated,
        mutatedTransfers,
        getEllipsisTxt, 
        columns,
        isLoading
    }
    }
}
</script>

<style>

</style>