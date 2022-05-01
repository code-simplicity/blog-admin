/*
 * @Author: bugdr
 * @Date: 2022-05-01 09:11:12
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-01 09:12:22
 * @FilePath: \blog-admin\src\settings\projectSetting.ts
 * @Description: project-settings
 */

import { PermissionModeEnum } from "../enums/appEnum";
import { CacheTypeEnum } from "../enums/cacheEnum";
import { ProjectConfig } from "../../types/config";

const setting: ProjectConfig = {
    // Permission mode
    permissionMode: PermissionModeEnum.ROUTE_MAPPING,
    permissionCacheType: CacheTypeEnum.LOCAL
}

export default setting;