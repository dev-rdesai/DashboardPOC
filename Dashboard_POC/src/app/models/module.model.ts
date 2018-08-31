export interface ModuleData {
    path: string;
    location: string;
    moduleName: string;
    rootComponent?: string;
    description: string;
    registered?: boolean;
    shouldSendDataToContent: boolean;
    dataInKeysAndFunctions: Array<any>;
    shouldReceiveDataFromContent: boolean;
    dataOutKeysAndFunctions: Array<any>;
    loadComponentName: string;
    instance: any;
    x: number;
    y: number;
    cols: number;
    rows: number;
    resizeEnabled: boolean;
    dragEnabled: boolean;
    compactEnabled: boolean;
}