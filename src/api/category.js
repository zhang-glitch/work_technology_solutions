import request from "@/utils/request"


export const getCategoryList = () => {
  return request({
    method: "get",
    url: "/category"
  })
}