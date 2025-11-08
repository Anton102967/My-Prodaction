import { FeatureFlags } from '@/shared/types/featureFlags';

// Фичи не реактивные, то есть в ходе сессии не меняются
let featureFlags: FeatureFlags = {};

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
