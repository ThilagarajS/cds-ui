export interface RemoteMFEDetail {
    remoteUrl: string;
    path: string;
    name: string;
    component: string;
    input?: any;
    output?: any;
    canShow?: boolean;
    route?: string;
}

export interface RemoteMFEDetailCollection {
    microFrontEnds: RemoteMFEDetail[];
}
