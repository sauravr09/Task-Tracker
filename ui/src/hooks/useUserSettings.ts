/**
 * Custom hook to read and sync user settings.
 * Subscribes to the external store via `subscribe` and re-renders 
 *  whenever `getSettings()` returns a new snapshot value.
 */

import { useSyncExternalStore } from "react"
import { getSettings, subscribe } from "../utils/userSettings"

export const useUserSettings = () => {
    return useSyncExternalStore(subscribe, getSettings)
}