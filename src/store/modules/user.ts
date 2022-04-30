/*
 * @Author: bugdr
 * @Date: 2022-04-29 15:40:10
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-30 16:56:11
 * @FilePath: \blog-admin\src\store\modules\user.ts
 * @Description: Pinia-user
 */
import { defineStore } from 'pinia'
import { store } from '../index'
import { login, checkTokenUserInfo } from '../../api/user/index'
import router from '../../router/index'
import type { UserInfo } from '../../types/store'
import { RoleEnum } from '../../enums/roleEnum'
import { UserLoginModel, GetUserInfoModel } from '../../api/user/type'
import { ResultResponse } from '../../types/result'
import {
    getAutoCache,
    setAutoCache,
    clearAuthCache
} from '../../utils/auth/index'
import {
    TOKEN_KEY,
    USER_INFO_KEY,
    ROLES_KEY
} from '../../enums/cacheEnum'

interface UserState {
    userInfo: UserInfo | any,
    token?: string | any,
    roleList: RoleEnum[] | any
}
export const useUserStore = defineStore({
    id: 'app-user',
    state: (): UserState => ({
        userInfo: null,
        token: undefined,
        roleList: []
    }),
    getters: {
        getUserInfo(): UserInfo {
            return this.userInfo || getAutoCache<UserInfo>(USER_INFO_KEY) || {}
        },
        getToken(): string {
            return this.token || getAutoCache<string>(TOKEN_KEY)
        },
        getRoleList(): RoleEnum[] {
            return this.roleList.length > 0 ? this.roleList : getAutoCache<RoleEnum[]>(ROLES_KEY)
        }
    },
    actions: {
        setUserInfo(info: UserInfo | null) {
            this.userInfo = info
            setAutoCache(USER_INFO_KEY, info)
        },
        setToken(info: string | undefined) {
            this.token = info ? info : ''
            setAutoCache(TOKEN_KEY, info)

        },
        setRoleList(roleList: RoleEnum[]) {
            this.roleList = roleList
            setAutoCache(ROLES_KEY, roleList)
        },
        // 重置状态
        resetState() {
            this.userInfo = null
            this.token = ''
            this.roleList = []
        },

        /**
         * 登录
         * @param params 
         * @returns 
         */
        async doLogin(params: UserLoginModel & {
            goHome?: boolean
        }): Promise<GetUserInfoModel | null> {
            try {
                const { goHome = true, ...data } = params
                // 调用登录接口
                const result = await login(data)
                // 装填token
                this.setToken(result.data)
                // 返回登录信息
                return this.afterLoginAction(goHome)
            } catch (error) {
                return Promise.reject(error)
            }
        },

        /**
         * 登录成功之后做什么
         * @param goHome 
         * @returns 
         */
        async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
            const userInfo = await this.getUserInfoAction()
            return userInfo

        },

        async getUserInfoAction(): Promise<GetUserInfoModel | null | any> {
            const result = await checkTokenUserInfo()
            if (result.code === 20000) {
                // 登录成功
                const { data } = result
                this.setRoleList(data.roles)
                this.setUserInfo(data)
            }
            return result
        }
    }
})

/**
 * 暴露出去
 * @returns 
 */
export function useUserStoreWithOut() {
    return useUserStore(store);
}