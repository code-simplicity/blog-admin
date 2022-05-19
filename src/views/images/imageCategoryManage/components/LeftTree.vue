<!--
 * @Author: bugdr
 * @Date: 2022-05-19 21:24:24
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-19 22:25:58
 * @FilePath: \blog-admin\src\views\images\imageCategoryManage\components\leftTree.vue
 * @Description:左侧栏
-->
<template>
  <div>
    <div class="text-base border-b-1 border-black m-2">用户列表</div>
    <div class="mt-2 p-2">
      <Tree
        v-model:expandedKeys="expandedKeys"
        v-model:selectedKeys="selectedKeys"
        v-model:checkedKeys="checkedKeys"
        checkable
        :tree-data="treeData"
      >
        <template #title="{ title, key }">
          <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>
          <template v-else>{{ title }}</template>
        </template>
      </Tree>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { Tree } from 'ant-design-vue';
  import type { TreeProps } from 'ant-design-vue';
  const treeData: TreeProps['treeData'] = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          disabled: true,
          children: [
            { title: 'leaf', key: '0-0-0-0', disableCheckbox: true },
            { title: 'leaf', key: '0-0-0-1' },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [{ key: '0-0-1-0', title: 'sss' }],
        },
      ],
    },
  ];

  const expandedKeys = ref<string[]>(['0-0-0', '0-0-1']);
  const selectedKeys = ref<string[]>(['0-0-0', '0-0-1']);
  const checkedKeys = ref<string[]>(['0-0-0', '0-0-1']);
  watch(expandedKeys, () => {
    console.log('expandedKeys', expandedKeys);
  });
  watch(selectedKeys, () => {
    console.log('selectedKeys', selectedKeys);
  });
  watch(checkedKeys, () => {
    console.log('checkedKeys', checkedKeys);
  });
</script>
<style lang="less" scoped></style>
