import { serve, configure} from "./deps.js";
//import * as requestUtils from "./utils/RequestUtils.js";//
import * as listsController from "./controllers/listsController.js";
import * as itemController from "./controllers/itemController.js";

configure({
    views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
    const url = new URL(request.url);
    if (url.pathname === "/" && request.method === "GET") {
        return await listsController.viewstatistics(request);
    } else if (url.pathname === "/lists" && request.method === "GET") {
        return await listsController.viewLists(request);
    } else if (url.pathname === "/lists" && request.method === "POST") {
        return await listsController.addLists(request);
    } else if (url.pathname.match("/lists/[0-9]+/deactivate") && request.method === "POST") {
        return await listsController.deactiveList(request);
    } else if (url.pathname.match("/lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST"){
        return await itemController.collectItem(request);
    } else if (url.pathname.match("/lists/[0-9]+/items") && request.method === "POST") {
        return await itemController.addItem(request);
    } else if (url.pathname.match("/lists/[0-9]+") && request.method === "GET") {
        return await itemController.viewItems(request);
    } else {
        return new Response("Not found yet", { status: 404});
    }

};

serve(handleRequest, { port: 7777 });
