import disk from "diskusage";
import env from "../enviroment/env";
import { Request, Response } from "express";
import { UserInterface } from "../models/user";

type userAccessType = {
    _id: string,
    emailVerified: boolean,
    email: string,
    s3Enabled: boolean,
}

interface RequestTypeRefresh extends Request {
    user?: UserInterface,
    encryptedToken?: string
}

interface RequestTypeFullUser extends Request {
    user?: UserInterface,
    encryptedToken?: string
}

interface RequestType extends Request {
    user?: userAccessType,
    encryptedToken?: string
}

class StorageController {

    constructor() {

    }

    getStorageInfo = async(req: RequestType, res: Response) => {

        if (!req.user) {

            return;
        }
    
        try {

            if (!env.root || env.root.length === 0) {
                return;
            }
    
            const info = await disk.check(env.root!);
        
            res.send(info)
    
        } catch (e) {
    
            console.log(e);
            res.status(500).send(e);
        }
    }
}

export default StorageController;