import service from '@/utils/request'

// @Tags area
// @Summary 分页获取门房列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body modelInterface.PageInfo true "分页获取门房列表"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /api/getAreaList [post]
// {
//  page     int
//	pageSize int
// }
export const getRoomList = (data) => {
  return service({
    url: '/room/getRoomList',
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
export const createRoom = (data) => {
  return service({
    url: '/room/createRoom',
    method: 'post',
    data
  })
}

// @Tags menu
// @Summary 根据id获取门房
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body area.GetById true "根据id获取门房"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /menu/getAreaById [post]
export const getRoomById = (data) => {
  return service({
    url: '/room/getRoomById',
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
export const updateRoom = (data) => {
  return service({
    url: '/room/updateRoom',
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
export const getAllRooms = (data) => {
  return service({
    url: '/room/getAllRooms',
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
export const deleteRoom = (data) => {
  return service({
    url: '/room/deleteRoom',
    method: 'post',
    data
  })
}