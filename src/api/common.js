import request from '@/utils/Request'
/**
 * crm2.0查询国家列表
 */
 export const getNewCountryList = params => {
    return request({
        url: "/db/sys/country/v1/list",
        method: "get",
        params,
    })
}

/**
 * crm2.0根据国家获取学校列表
 */
 export const getNewUniversityList = params => {
    return request({
        url: `/db/sys/university/v1/list`,
        method: "get",
        params,
    })
}

/**
 * Crm2.0获取专业列表
 */
 export const getNewProfessionalList = params => {
    return request({
        url: `/db/sys/professionalCourses/v1/list`,
        method: "get",
        params
    })
}

/**
 * 获取擅长学科列表新
 */
 export const getSpecialtyClass = params => {
    return request({
        url: `/oper/sys/teac/v1/specialtyList`,
        method: "get",
        params
    })
}