import service from '@/utils/request'

// @Tags area
// @Summary 分页获取区域列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body modelInterface.PageInfo true "分页获取区域列表"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /api/getAreaList [post]
// {
//  page     int
//	pageSize int
// }
export const getAreaList = (data) => {
  return service({
    url: '/api/getAreaList',
    method: 'post',
    data
  })
}

// @Tags Area
// @Summary 创建基础area
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body api.CreateApiParams true "创建area"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /api/createApi [post]
export const createArea = (data) => {
  return service({
    url: '/api/createArea',
    method: 'post',
    data
  })
}

// @Tags menu
// @Summary 根据id获取区域
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body area.GetById true "根据id获取区域"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /menu/getAreaById [post]
export const getAreaById = (data) => {
  return service({
    url: '/api/getAreaById',
    method: 'post',
    data
  })
}

// @Tags Area
// @Summary 更新area
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body api.CreateApiParams true "更新area"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /api/updateApi [post]
export const updateArea = (data) => {
  return service({
    url: '/api/updateArea',
    method: 'post',
    data
  })
}


// @Tags Area
// @Summary 获取所有的Area 不分页
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /api/getAllApis [post]
export const getAllAreas = (data) => {
  return service({
    url: '/api/getAllAreas',
    method: 'post',
    data
  })
}

// @Tags Area
// @Summary 删除指定area
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body dbModel.Api true "删除area"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /api/deleteApi [post]
export const deleteArea = (data) => {
  return service({
    url: '/api/deleteArea',
    method: 'post',
    data
  })
}