<template>
    <div>
        <div class="gva-search-box">
            <el-form
                    ref="searchForm"
                    :inline="true"
                    :model="searchInfo"
            >
                <el-form-item label="按区域名称检索">
                    <el-input
                            v-model="searchInfo.areaName"
                            placeholder="区域名称"
                    />
                </el-form-item>

                <el-form-item>
                    <el-button
                            type="primary"
                            icon="search"
                            @click="onSubmit"
                    >
                        查询
                    </el-button>
                    <el-button
                            icon="refresh"
                            @click="onReset"
                    >
                        重置
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="gva-table-box">
            <div class="gva-btn-list">
                <el-button
                        type="primary"
                        icon="plus"
                        @click="openDialog('addArea')"
                >
                    新增
                </el-button>
            </div>
            <el-table
                    :data="tableData"
                    @sort-change="sortChange"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column
                        type="selection"
                        width="55"
                />
                <el-table-column
                        align="left"
                        label="id"
                        min-width="60"
                        prop="id"
                        sortable="custom"
                />
                <el-table-column
                        align="left"
                        label="区域编号"
                        min-width="150"
                        prop="areaCode"
                        sortable="custom"
                />
                <el-table-column
                        align="left"
                        label="区域名称"
                        min-width="150"
                        prop="areaName"
                        sortable="custom"
                />
                <el-table-column
                        align="left"
                        label="描述信息"
                        min-width="150"
                        prop="description"
                        sortable="custom"
                />
                <el-table-column
                        align="left"
                        label="创建时间"
                        width="180"
                >
                    <template #default="scope">{{ formatDate(scope.row.created) }}</template>
                </el-table-column>
                <el-table-column
                        align="left"
                        label="修改时间"
                        width="180"
                >
                    <template #default="scope">{{ formatDate(scope.row.updated) }}</template>
                </el-table-column>

                <el-table-column
                        align="left"
                        fixed="right"
                        label="操作"
                        width="200"
                >
                    <template #default="scope">
                        <el-button
                                icon="edit"
                                type="primary"
                                link
                                @click="editAreaFunc(scope.row)"
                        >
                            编辑
                        </el-button>
                        <el-button
                                icon="delete"
                                type="primary"
                                link
                                @click="deleteAreaFunc(scope.row)"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="gva-pagination">
                <el-pagination
                        :current-page="page"
                        :page-size="pageSize"
                        :page-sizes="[10, 30, 50, 100]"
                        :total="total"
                        layout="total, sizes, prev, pager, next, jumper"
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                />
            </div>

            <el-drawer
                    v-model="dialogFormVisible"
                    size="60%"
                    :before-close="closeDialog"
                    :show-close="false"
            >
                <template #header>
                    <div class="flex justify-between items-center">
                        <span class="text-lg">{{ dialogTitle }}</span>
                        <div>
                            <el-button @click="closeDialog">
                                取 消
                            </el-button>
                            <el-button
                                    type="primary"
                                    @click="enterDialog"
                            >
                                确 定
                            </el-button>
                        </div>
                    </div>
                </template>

                <warning-bar title="新增区域，需要在角色管理内配置权限才可使用" />
                <el-form
                        ref="areaForm"
                        :model="form"
                        :rules="rules"
                        label-width="80px"
                >
                    <el-form-item
                            label="区域编号"
                            prop="areaCode"
                    >
                        <el-input
                                v-model="form.areaCode"
                                autocomplete="off"
                        />
                    </el-form-item>
                    <el-form-item
                            label="区域名称"
                            prop="areaName"
                    >
                        <el-input
                                v-model="form.areaName"
                                autocomplete="off"
                        />
                    </el-form-item>
                    <el-form-item
                            label="描述信息"
                            prop="description"
                    >
                        <el-input
                                v-model="form.description"
                                autocomplete="off"
                        />
                    </el-form-item>
                </el-form>
            </el-drawer>
        </div>
    </div>
</template>

<script setup>
    import {
        getAreaById,
        getAreaList,
        createArea,
        updateArea,
        deleteArea
    } from '@/api/area'
    import { formatDate } from '@/utils/format'
    import {toSQLLine} from '@/utils/stringFun'
    import {ref} from 'vue'
    import {ElMessage, ElMessageBox} from 'element-plus'
    import WarningBar from '@/components/warningBar/warningBar.vue'

    defineOptions({
        name: 'Area',
    })

    const methodFilter = (value) => {
        const target = methodOptions.value.filter(item => item.value === value)[0]
        return target && `${target.label}`
    }

    const form = ref({
        areaCode: '',
        areaName: '',
        description: '',
        created:'',
        updated:''

    })
    const methodOptions = ref([
        {
            value: 'POST',
            label: '创建',
            type: 'success'
        },
        {
            value: 'GET',
            label: '查看',
            type: ''
        },
        {
            value: 'PUT',
            label: '更新',
            type: 'warning'
        },
        {
            value: 'DELETE',
            label: '删除',
            type: 'danger'
        }
    ])

    const type = ref('')
    const rules = ref({
        areaCode: [{required: true, message: '请输入区域编码', trigger: 'blur'}],
        areaName: [{required: true, message: '请输入区域名称', trigger: 'blur'}],
        description: [{required: true, message: '请输入描述信息', trigger: 'blur'}]
    })

    const page = ref(1)
    const total = ref(0)
    const pageSize = ref(10)
    const tableData = ref([])
    const searchInfo = ref({})

    const onReset = () => {
        searchInfo.value = {}
    }
    // 搜索
    const onSubmit = () => {
        page.value = 1
        pageSize.value = 10
        getTableData()
    }

    // 分页
    const handleSizeChange = (val) => {
        pageSize.value = val
        getTableData()
    }

    const handleCurrentChange = (val) => {
        page.value = val
        getTableData()
    }

    // 排序
    const sortChange = ({prop, order}) => {
        if (prop) {
            if (prop === 'ID') {
                prop = 'id'
            }
            searchInfo.value.orderKey = toSQLLine(prop)
            searchInfo.value.desc = order === 'descending'
        }
        getTableData()
    }

    // 查询
    const getTableData = async () => {
        const table = await getAreaList({page: page.value, pageSize: pageSize.value, ...searchInfo.value})
        if (table.code === 0) {
            tableData.value = table.data.list
            total.value = table.data.total
            page.value = table.data.page
            pageSize.value = table.data.pageSize
        }
    }

    getTableData()

    // 弹窗相关
    const areaForm = ref(null)
    const initForm = () => {
        areaForm.value.resetFields()
        form.value = {
            areaCode: '',
            areaName: '',
            description: ''
        }
    }

    const dialogTitle = ref('新增区域')
    const dialogFormVisible = ref(false)
    const openDialog = (key) => {
        switch (key) {
            case 'addArea':
                dialogTitle.value = '新增区域'
                break
            case 'edit':
                dialogTitle.value = '编辑区域'
                break
            default:
                break
        }
        type.value = key
        dialogFormVisible.value = true
    }
    const closeDialog = () => {
        initForm()
        dialogFormVisible.value = false
    }

    const editAreaFunc = async (row) => {
        const res = await getAreaById({id: row.ID})
        form.value = res.data.area
        openDialog('edit')
    }

    const enterDialog = async () => {
        areaForm.value.validate(async valid => {
            if (valid) {
                switch (type.value) {
                    case 'addArea': {
                        const res = await createArea(form.value)
                        if (res.code === 0) {
                            ElMessage({
                                type: 'success',
                                message: '添加成功',
                                showClose: true
                            })
                        }
                        getTableData()
                        closeDialog()
                    }

                        break
                    case 'edit': {
                        const res = await updateArea(form.value)
                        if (res.code === 0) {
                            ElMessage({
                                type: 'success',
                                message: '编辑成功',
                                showClose: true
                            })
                        }
                        getTableData()
                        closeDialog()
                    }
                        break
                    default:
                        // eslint-disable-next-line no-lone-blocks
                    {
                        ElMessage({
                            type: 'error',
                            message: '未知操作',
                            showClose: true
                        })
                    }
                        break
                }
            }
        })
    }

    const deleteAreaFunc = async (row) => {
        ElMessageBox.confirm('此操作将永久删除该区域, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
            .then(async () => {
                const res = await deleteArea(row)
                if (res.code === 0) {
                    ElMessage({
                        type: 'success',
                        message: '删除成功!'
                    })
                    if (tableData.value.length === 1 && page.value > 1) {
                        page.value--
                    }
                    getTableData()
                }
            })
    }

</script>

<style scoped lang="scss">
    .warning {
        color: #dc143c;
    }
</style>
