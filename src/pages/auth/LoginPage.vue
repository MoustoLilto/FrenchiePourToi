<template>
    <div class="bg-base-200 flex min-h-screen items-center justify-center px-4 py-12">
        <div class="card bg-base-100 w-full max-w-md shadow-xl">
            <div class="card-body">
                <div class="mb-6 flex flex-col items-center">
                    <img
                        src="@/assets/frenchie-logo.png"
                        alt="Frenchie Pour Toi"
                        class="mb-4 h-16 w-16"
                    />
                    <h1 class="text-primary text-center font-serif text-2xl font-bold">
                        Connexion
                    </h1>
                    <p class="text-neutral text-center text-sm">
                        Connectez-vous à votre compte pour accéder à votre espace client
                    </p>
                </div>

                <form @submit.prevent="handleLogin">
                    <div class="form-control mb-4">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input
                            v-model="form.email"
                            type="email"
                            placeholder="Votre adresse email"
                            class="input input-bordered"
                            required
                        />
                    </div>

                    <div class="form-control mb-6">
                        <label class="label">
                            <span class="label-text">Mot de passe</span>
                        </label>
                        <div class="relative">
                            <input
                                v-model="form.password"
                                :type="showPassword ? 'text' : 'password'"
                                placeholder="Votre mot de passe"
                                class="input input-bordered w-full pr-10"
                                required
                            />
                            <button
                                type="button"
                                class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                                @click="togglePasswordVisibility"
                            >
                                <i
                                    :class="
                                        showPassword
                                            ? 'icon-[carbon--view-off]'
                                            : 'icon-[carbon--view]'
                                    "
                                />
                            </button>
                        </div>
                        <label class="label">
                            <RouterLink
                                :to="{ name: 'forgotPassword' }"
                                class="label-text-alt link-hover text-primary"
                            >
                                Mot de passe oublié ?
                            </RouterLink>
                        </label>
                    </div>

                    <div class="form-control mb-6">
                        <label class="label cursor-pointer justify-start gap-2">
                            <input v-model="form.rememberMe" type="checkbox" class="checkbox" />
                            <span class="label-text">Se souvenir de moi</span>
                        </label>
                    </div>

                    <div class="form-control">
                        <button type="submit" class="btn btn-primary" :disabled="isLoading">
                            <span v-if="isLoading" class="loading loading-spinner loading-xs" />
                            Se connecter
                        </button>
                    </div>
                </form>

                <div class="divider my-6">OU</div>

                <div class="form-control">
                    <button class="btn btn-outline" @click="handleGoogleLogin">
                        <i class="icon-[carbon--logo-google] mr-2" />
                        Continuer avec Google
                    </button>
                </div>

                <div class="mt-6 text-center text-sm">
                    Vous n'avez pas de compte ?
                    <RouterLink
                        :to="{ name: ROUTE_NAMES.REGISTER }"
                        class="link-hover text-primary"
                    >
                        Créer un compte
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ROUTE_NAMES } from '@/constants/routesConstants';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = ref({
    email: '',
    password: '',
    rememberMe: false,
});

const showPassword = ref(false);
const isLoading = ref(false);

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
    try {
        isLoading.value = true;

        // Simuler une requête d'authentification
        console.log('Tentative de connexion avec:', form.value);

        // Simuler un délai de traitement
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Rediriger vers le tableau de bord après connexion réussie
        router.push({ name: ROUTE_NAMES.DASHBOARD });
    } catch (error) {
        console.error('Erreur de connexion:', error);
        alert('Erreur de connexion. Veuillez vérifier vos identifiants et réessayer.');
    } finally {
        isLoading.value = false;
    }
};

const handleGoogleLogin = () => {
    // Ici, vous implémenteriez la logique de connexion avec Google
    console.log('Tentative de connexion avec Google');
    alert('La connexion avec Google sera implémentée ultérieurement.');
};
</script>
