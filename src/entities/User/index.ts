export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';

export { getUserInited } from './model/selectors/getUserInited/getUserInited';

export {
    isUserManager,
    isUserAdmin,
    getUserRoles,
} from '../User/model/selectors/roleSelectors';

export { userReducer, userActions } from './model/slice/userSlice';
export type { UserSchema, User } from './model/types/user';
export { UserRole } from '@/entities/User/model/const/userConst';
export { saveJsonSettings } from './services/saveJsonSettings';
export {
    useJsonSettings,
    getJsonSettings,
} from './model/selectors/jsonSettings';

export { initAuthData } from './services/initAuthData';
