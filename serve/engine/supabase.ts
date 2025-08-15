import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Site } from '../site';
import { Log } from '../lib/log';

const SLUG = "SupaEngine";
const WEIGHT = 3;
const FILENAME = "data.json";

export class SupaEngine {
    private static client: SupabaseClient<any, "public", any> | null = null;

    static start = () => new Promise<boolean>(async (resolve, reject) => {
        if (Site.SUPA_USE()) {
            SupaEngine.client = createClient(Site.SUPA_URL(), Site.SUPA_KEY());
            const ensureBucket = () => new Promise<boolean>(async (res, rej) => {
                try {
                    const r = await SupaEngine.client?.storage.getBucket(Site.SUPA_BUCKET());
                    if (r) {
                        if (r.data) {
                            Log.flow([SLUG, `Bucket exists.`], WEIGHT);
                            res(true);
                        }
                        else {
                            if (r.error) {
                                Log.dev(r.error);
                            }
                            const x = await SupaEngine.client?.storage.createBucket(Site.SUPA_BUCKET());
                            if (x) {
                                if (x.error) {
                                    Log.dev(x.error);
                                    Log.flow([SLUG, `Failed to create bucket '${x.error.message}'.`], WEIGHT);
                                    res(false);
                                }
                                else {
                                    Log.flow([SLUG, `Bucket created.`], WEIGHT);
                                    res(true);
                                }
                            }
                            else {
                                Log.flow([SLUG, `Failed to create bucket, with unknown status.`], WEIGHT);
                                res(false);
                            }
                        }
                    }
                    else {
                        Log.flow([SLUG, `Failed to get bucket status.`], WEIGHT);
                        res(false);
                    }
                } catch (error) {
                    Log.dev(error);
                    res(false);
                }
            });

            resolve(await ensureBucket());
        }
        else {
            resolve(true);
        }
    });

    static saveBackup = (data: any) => new Promise<boolean>(async (resolve, reject) => {
        if (Site.SUPA_USE()) {
            const fileData = new Blob([JSON.stringify(data)], {
                type: "application/json"
            });

            try {
                const x = await SupaEngine.client?.storage.from(Site.SUPA_BUCKET()).upload(FILENAME, fileData, {
                    cacheControl: "0",
                    upsert: true,
                });
                if (x) {
                    if (x.error) {
                        Log.dev(x.error);
                        Log.flow([SLUG, `Failed to save backup '${x.error.message}'.`], WEIGHT);
                        resolve(false);
                    }
                    else {
                        Log.flow([SLUG, `Saved backup.`], WEIGHT);
                        resolve(true);
                    }
                }
                else {
                    resolve(false);
                }
            } catch (error) {
                Log.dev(error);
                resolve(false);
            }
        }
        else {
            resolve(true);
        }
    });

    static restoreBackup = () => new Promise<any>(async (resolve, reject) => {
        if (Site.SUPA_USE()) {
            try {
                const x = await SupaEngine.client?.storage.from(Site.SUPA_BUCKET()).download(FILENAME);
                if (x) {
                    if (x.error) {
                        Log.dev(x.error);
                        Log.flow([SLUG, `Failed to restore backup '${x.error.message}'.`], WEIGHT);
                        resolve(null);
                    }
                    else {
                        const obj = JSON.parse(await x.data.text());
                        Log.flow([SLUG, `Restored backup.`], WEIGHT);
                        resolve(obj);
                    }
                }
                else {
                    resolve(null);
                }
            } catch (error) {
                Log.dev(error);
                resolve(null);
            }
        }
        else {
            resolve(null);
        }
    })
}