import { renderFile } from "../deps.js";
import * as requestUtils from "../utils/RequestUtils.js";
import * as listsService from "../services/listsService.js";
import * as itemService from "../services/itemService.js";

const responseDetails = {
    headers: { "Content-type": "text/html;charset=UTF-8" },
};

const viewItems = async(request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    
    const data = {
        list: await listsService.findById(urlParts[2]),
        collectedItems: await itemService.viewCollectedItem(urlParts[2]),
        nonCollectedItems: await itemService.viewNonCollectedItem(urlParts[2]), 
    };

    return new Response(await renderFile("individualShoppingList.eta", data), responseDetails);
};

const addItem = async(request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const formData = await request.formData();
    const name = formData.get("name");

    await itemService.addItem(urlParts[2], name);

    return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

const collectItem = async(request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");

    await itemService.collectedById(urlParts[2], urlParts[4]);

    return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

export { viewItems, addItem, collectItem };

