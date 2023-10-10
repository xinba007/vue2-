import Layout from "@/layout/index.vue";
import { getStorage } from "@/utils/index";

const useCompanyName = getStorage('companyName')
console.log(useCompanyName);
console.log(Layout);
let  menus ;
if(useCompanyName == '上海导毕教育科技有限公司'){
    menus =  []
}else{
    menus =  []
}

export default menus
