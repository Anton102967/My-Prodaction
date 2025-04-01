export type BuildeMode = "production"| "development"

export interface BuildPaths {
    entry: string,
    build: string,
    html: string,
    src: string,
}

export interface BuildEnv {
    mode: BuildeMode,
    port: number,
}

export interface BuildOptions {
    mode: BuildeMode,
    paths: BuildPaths,
    isDev: boolean,
    port: number,
}