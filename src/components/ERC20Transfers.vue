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
            { title: 'Token', dataIndex: 'logo', key: 'logo', 
                customRender: (item) => {
                    let url = item.record.logo || "https://etherscan.io/images/main/empty-token.png"
                    return <div>
                        <img src={url} height="25" width="25" />
                        <p style="margin: 0">{item.record.symbol}</p>
                    </div>
                }
            },
            { title: 'Value', dataIndex: 'val', key: 'val'},

            { title: 'Type', dataIndex: 'type', key: 'type',  
                customRender: (item) => { 
                return item.record.in ? <a-tag color="green">IN</a-tag> : <a-tag color="yellow">OUT</a-tag>}  
            },

            { title: 'Tx', dataIndex: 'transaction_hash' , key: 'transaction_hash',
                customRender: (item) => {
                    return <a href={`${getExplorer(chainId.value)}tx/${item.record.transaction_hash}`} target="_blank">{getEllipsisTxt(item.record.transaction_hash)}</a> 
                }
            }
        ]
        

        const mutate = () => {
            if(!chainId.value) return;
            isLoading.value = true
            let key = 0;
            let temp = erc20Transfers.value
            temp.map((transfer) => {
                transfer.key = key.toString()
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