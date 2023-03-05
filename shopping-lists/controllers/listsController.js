import { renderFile } from "../deps.js";
import * as requestUtils from "../utils/RequestUtils.js";
import * as listsService from "../services/listsService.js";
import * as itemService from "../services/itemService.js";

const responseDetails = {
    headers: { "Content-type": "text/html;charset=UTF-8" },
};

const addLists = async(request) => {
    const formData = await request.formData();
    const name = formData.get("name");

    await listsService.createList(name);

    return requestUtils.redirectTo("/lists");
};

const viewLists = async(_request) => {
    const data = {
        lists: await listsService.findAlllActiveList(),
    };

    return new Response(await renderFile("shoppingLists.eta", data), responseDetails);
};

const viewstatistics = async (_request) => {
    const data = {
        numberOfLists: await listsService.findNumberOfList(),
        numberOfItems: await itemService.findNumberOfItem(),
    };

    return new Response(await renderFile("mainPage.eta", data), responseDetails);
};

const deactiveList = async(request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await listsService.deactiveById(urlParts[2]);

    return requestUtils.redirectTo("/lists");
};


export { viewLists, addLists, viewstatistics, deactiveList };
