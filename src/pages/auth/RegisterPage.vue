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
                        Créer un compte
                    </h1>
                    <p class="text-neutral text-center text-sm">
                        Inscrivez-vous pour réserver un chiot et suivre vos demandes
                    </p>
                </div>

                <form @submit.prevent="handleRegister">
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Prénom*</span>
                            </label>
                            <input
                                v-model="form.firstName"
                                type="text"
                                placeholder="Votre prénom"
                                class="input input-bordered"
                                required
                            />
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Nom*</span>
                            </label>
                            <input
                                v-model="form.lastName"
                                type="text"
                                placeholder="Votre nom"
                                class="input input-bordered"
                                required
                            />
                        </div>
                    </div>

                    <div class="form-control mt-4">
                        <label class="label">
                            <span class="label-text">Email*</span>
                        </label>
                        <input
                            v-model="form.email"
                            type="email"
                            placeholder="Votre adresse email"
                            class="input input-bordered"
                            required
                        />
                    </div>

                    <div class="form-control mt-4">
                        <label class="label">
                            <span class="label-text">Téléphone*</span>
                        </label>
                        <input
                            v-model="form.phone"
                            type="tel"
                            placeholder="Votre numéro de téléphone"
                            class="input input-bordered"
                            required
                        />
                    </div>

                    <div class="form-control mt-4">
                        <label class="label">
                            <span class="label-text">Mot de passe*</span>
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
                        <p class="text-neutral mt-1 text-xs">
                            Le mot de passe doit contenir au moins 8 caractères, une majuscule, une
                            minuscule et un chiffre.
                        </p>
                    </div>

                    <div class="form-control mt-4">
                        <label class="label">
                            <span class="label-text">Confirmer le mot de passe*</span>
                        </label>
                        <input
                            v-model="form.confirmPassword"
                            type="password"
                            placeholder="Confirmez votre mot de passe"
                            class="input input-bordered"
                            required
                        />
                    </div>

                    <div class="form-control mt-6">
                        <label class="label cursor-pointer justify-start gap-2">
                            <input
                                v-model="form.termsAccepted"
                                type="checkbox"
                                class="checkbox"
                                required
                            />
                            <span class="label-text">
                                J'accepte les
                                <a href="#" class="link-hover text-primary">conditions générales</a>
                                et la
                                <a href="#" class="link-hover text-primary">
                                    politique de confidentialité
                                </a>
                                *
                            </span>
                        </label>
                    </div>

                    <div class="form-control mt-6">
                        <label class="label cursor-pointer justify-start gap-2">
                            <input
                                v-model="form.newsletterSubscription"
                                type="checkbox"
                                class="checkbox"
                            />
                            <span class="label-text">
                                Je souhaite recevoir la newsletter et les offres promotionnelles
                            </span>
                        </label>
                    </div>

                    <div class="form-control mt-6">
                        <button type="submit" class="btn btn-primary" :disabled="isLoading">
                            <span v-if="isLoading" class="loading loading-spinner loading-xs" />
                            Créer mon compte
                        </button>
                    </div>
                </form>

                <div class="divider my-6">OU</div>

                <div class="form-control">
                    <button class="btn btn-outline" @click="handleGoogleRegister">
                        <i class="icon-[carbon--logo-google] mr-2" />
                        S'inscrire avec Google
                    </button>
                </div>

                <div class="mt-6 text-center text-sm">
                    Vous avez déjà un compte ?
                    <RouterLink :to="{ name: ROUTE_NAMES.LOGIN }" class="link-hover text-primary">
                        Se connecter
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
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    newsletterSubscription: false,
});

const showPassword = ref(false);
const isLoading = ref(false);

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const validateForm = () => {
    // Vérifier que les mots de passe correspondent
    if (form.value.password !== form.value.confirmPassword) {
        alert('Les mots de passe ne correspondent pas.');
        return false;
    }

    // Vérifier la complexité du mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(form.value.password)) {
        alert(
            'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.'
        );
        return false;
    }

    return true;
};

const handleRegister = async () => {
    if (!validateForm()) return;

    try {
        isLoading.value = true;

        // Simuler une requête d'inscription
        console.log("Tentative d'inscription avec:", form.value);

        // Simuler un délai de traitement
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Rediriger vers la page de connexion après inscription réussie
        alert('Votre compte a été créé avec succès ! Vous pouvez maintenant vous connecter.');
        router.push({ name: ROUTE_NAMES.LOGIN });
    } catch (error) {
        console.error("Erreur d'inscription:", error);
        alert("Erreur lors de l'inscription. Veuillez réessayer.");
    } finally {
        isLoading.value = false;
    }
};

const handleGoogleRegister = () => {
    // Ici, vous implémenteriez la logique d'inscription avec Google
    console.log("Tentative d'inscription avec Google");
    alert("L'inscription avec Google sera implémentée ultérieurement.");
};
</script>
