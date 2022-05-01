import type { Router } from 'vue-router';
import { PageEnum } from '../../enums/pageEnum';
import { useAppStore } from '../../store/modules/app';
import { usePermissionStore } from '../../store/modules/permission';
import { useUserStore } from '../../store/modules/user';


export function createStateGuard(router: Router) {
    router.afterEach((to) => {
        // Just enter the login page and clear the authentication information
        if (to.path === PageEnum.BASE_LOGIN) {
            // const tabStore = useMultipleTabStore();
            const userStore = useUserStore();
            const appStore = useAppStore();
            const permissionStore = usePermissionStore();
            appStore.resetAllState();
            permissionStore.resetState();
            // tabStore.resetState();
            userStore.resetState();
            // removeTabChangeListener();
        }
    });
}
