import { FeatureFlags } from '@/shared/types/featureFlags';
import { LOCAL_STORAGE_DESIGN_KEY } from '@/shared/const/localstorage';

const defaultFeatures: FeatureFlags = {
    isAppRedesigned: localStorage.getItem(LOCAL_STORAGE_DESIGN_KEY) === 'new',
};

// Фичи не реактивные, то есть в ходе сессии не меняются
let featureFlags: FeatureFlags = {
    ...defaultFeatures,
};

export function setFeatureFlag(newFeatureFlags?: FeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags;
    }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
    return featureFlags[flag];
}

export function getAllFeature() {
    return featureFlags;
}
