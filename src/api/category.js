import request from "@/utils/request"

// 获取全部分类数据
export const getCategoryList = () => {
  return request({
    method: "get",
    url: "/category"
  })
}

