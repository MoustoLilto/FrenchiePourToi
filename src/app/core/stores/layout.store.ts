import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

interface LayoutState {
    isHomeLogoVisible: boolean;
}

const initialState: LayoutState = {
    isHomeLogoVisible: true,
};

export const layoutStore = signalStore(
    { providedIn: 'root' },

    withState<LayoutState>(initialState),

    withMethods((store) => ({
        setIsHomeLogoVisible(isVisible: boolean) {
            patchState(store, { isHomeLogoVisible: isVisible });
        },
    }))
);
