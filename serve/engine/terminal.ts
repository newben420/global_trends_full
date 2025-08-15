import { SupaEngine } from './supabase';
import { MainEngine } from "./main";

export const startEngine = () => new Promise<boolean>(async (resolve, reject) => {
    const loaded = (await SupaEngine.start()) && (await MainEngine.start());
    resolve(loaded);
});

export const stopEngine = () => new Promise<boolean>(async (resolve, reject) => {
    const conclude = async () => {
        const ended = await Promise.all([
            MainEngine.stop(),
        ]);
        resolve(ended.every(v => v === true));
    }
    conclude();
});