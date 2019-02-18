import express from 'express'
import Service from 'umi-build-dev/lib/Service'
import PluginAPI from 'umi-build-dev/lib/PluginAPI'

import mockMiddleware from './createMockMiddleware'

// process.env.UMI_DIR = pwd + "/node_modules/umi";

export default (options) => {
    // 初始化service
    const service = new Service({
        cwd: process.cwd()
    })

    const api = new PluginAPI('mock-data', service);

    const app = express();

    // respond with mockMiddleware
    app.use(mockMiddleware(api, []));

    // static
    app.use(express.static('dist'));

    return app
};